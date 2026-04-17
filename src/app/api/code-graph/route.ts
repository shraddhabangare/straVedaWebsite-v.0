import { NextResponse } from 'next/server';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname, relative, dirname } from 'path';

/* ------------------------------------------------------------------ */
/*  In-memory cache — TTL 60 s to avoid expensive re-scans            */
/* ------------------------------------------------------------------ */
let _cache: { data: GraphData; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60_000; // 60 seconds

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GraphNode {
  id: string;
  label: string;
  category: string;
  path: string;
  size: number; // line count → node radius
  imports: string[];
}

interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: {
    totalFiles: number;
    totalEdges: number;
    categories: { name: string; count: number; color: string }[];
  };
}

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const PROJECT_ROOT = process.cwd();
const SRC_DIR = join(PROJECT_ROOT, 'src');

const CATEGORY_CONFIG: Record<string, { color: string; priority: number }> = {
  // ── App routes ────────────────────────────────────────────────────
  'app/page':       { color: '#FF4800', priority: 1 },
  'app/layout':     { color: '#FF4800', priority: 1 },
  'app/error':      { color: '#FF4800', priority: 1 },
  'app/api':        { color: '#FF6B33', priority: 2 },
  // ── Components ───────────────────────────────────────────────────
  'sections/pages': { color: '#7C3AED', priority: 3 },
  'sections':       { color: '#9D5CF7', priority: 4 },
  'layout':         { color: '#2B2358', priority: 5 },
  'forms':          { color: '#0D9488', priority: 6 },
  'shared':         { color: '#DB2777', priority: 7 },
  'seo':            { color: '#16A34A', priority: 8 },
  'blog':           { color: '#CA8A04', priority: 9 },
  'ui':             { color: '#0891B2', priority: 10 },
  // ── App logic ────────────────────────────────────────────────────
  'hooks':          { color: '#D97706', priority: 11 },
  'lib':            { color: '#DC2626', priority: 12 },
  'features':       { color: '#EA580C', priority: 13 },
  'server':         { color: '#7F1D1D', priority: 14 },
  'types':          { color: '#6B7280', priority: 15 },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function categorize(filePath: string): string {
  // Normalize to forward slashes for cross-platform compatibility (Windows uses backslashes)
  const rel = relative(SRC_DIR, filePath).replace(/\\/g, '/');

  // ── App routes ────────────────────────────────────────────────────
  if (rel.startsWith('app/api') || rel.includes('/api/')) return 'app/api';
  if (rel.startsWith('app') && (
    rel.includes('page.tsx') || rel.includes('layout.tsx') ||
    rel.includes('error.tsx') || rel.includes('not-found.tsx') ||
    rel.includes('loading.tsx')
  )) return 'app/page';

  // ── Components ────────────────────────────────────────────────────
  if (rel.includes('components/sections/pages/')) return 'sections/pages';
  if (rel.includes('components/sections/'))       return 'sections';
  if (rel.includes('components/layout/'))         return 'layout';
  if (rel.includes('components/forms/'))          return 'forms';
  if (rel.includes('components/shared/'))         return 'shared';
  if (rel.includes('components/seo/'))            return 'seo';
  if (rel.includes('components/blog/'))           return 'blog';
  if (rel.includes('components/ui/'))             return 'ui';

  // ── App logic ─────────────────────────────────────────────────────
  if (rel.startsWith('features/'))  return 'features';
  if (rel.startsWith('server/'))    return 'server';
  if (rel.startsWith('hooks/'))     return 'hooks';
  if (rel.startsWith('lib/'))       return 'lib';
  if (rel.startsWith('types/'))     return 'types';

  return 'other';
}

function getColor(filePath: string): string {
  const cat = categorize(filePath);
  return CATEGORY_CONFIG[cat]?.color ?? '#6B7280';
}

function getPriority(filePath: string): number {
  const cat = categorize(filePath);
  return CATEGORY_CONFIG[cat]?.priority ?? 99;
}

function getShortLabel(filePath: string): string {
  const rel = relative(SRC_DIR, filePath);
  return rel;
}

function extractImports(content: string, currentFilePath: string): string[] {
  const imports: string[] = [];
  
  // Match: import ... from '@/...'
  const aliasRegex = /import\s+(?:[\s\S]*?)\s+from\s+['"](@\/[^'"]+)['"]/g;
  let match;
  while ((match = aliasRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  // Match: import ... from 'relative/path'
  const relRegex = /import\s+(?:[\s\S]*?)\s+from\s+['"](\.\.?\/[^'"]+)['"]/g;
  while ((match = relRegex.exec(content)) !== null) {
    const resolved = resolveRelativePath(currentFilePath, match[1]);
    if (resolved) imports.push(resolved);
  }
  
  // Match dynamic imports: import('...')
  const dynamicRegex = /import\(['"](@\/[^'"]+)['"]\)/g;
  while ((match = dynamicRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  const dynamicRelRegex = /import\(['"](\.\.?\/[^'"]+)['"]\)/g;
  while ((match = dynamicRelRegex.exec(content)) !== null) {
    const resolved = resolveRelativePath(currentFilePath, match[1]);
    if (resolved) imports.push(resolved);
  }
  
  return imports;
}

function resolveRelativePath(currentFile: string, importPath: string): string | null {
  try {
    const dir = dirname(currentFile);
    let resolved = join(dir, importPath);
    
    // Add extensions
    const extensions = ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.jsx', '/index.js'];
    
    for (const ext of extensions) {
      const tryPath = resolved + ext;
      if (tryPath.startsWith(SRC_DIR)) {
        // Try to stat it - but we'll resolve later
        return '@/' + relative(SRC_DIR, tryPath).replace(/\\/g, '/').replace(/\.(tsx?|jsx?)$/, '').replace(/\/index$/, '');
      }
    }
    
    return '@/' + relative(SRC_DIR, resolved).replace(/\\/g, '/');
  } catch {
    return null;
  }
}

async function resolveImportToFilePath(importPath: string): Promise<string | null> {
  if (!importPath.startsWith('@/')) return null;
  
  const withoutAlias = importPath.slice(2);
  const fullPath = join(SRC_DIR, withoutAlias);
  
  const extensions = ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.jsx', '/index.js'];
  
  for (const ext of extensions) {
    try {
      const s = await stat(fullPath + ext);
      if (s.isFile()) return fullPath + ext;
    } catch {
      // continue
    }
  }
  
  try {
    const s = await stat(fullPath);
    if (s.isFile()) return fullPath;
  } catch {
    // continue
  }
  
  return null;
}

async function getAllFiles(dir: string, extensions: string[]): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '.next') {
        continue;
      }
      
      if (entry.isDirectory()) {
        files.push(...(await getAllFiles(fullPath, extensions)));
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  
  return files;
}

/* ------------------------------------------------------------------ */
/*  GET handler                                                        */
/* ------------------------------------------------------------------ */

export async function GET() {
  // Restrict in production — the graph exposes internal file paths
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Code graph is not available in production' },
      { status: 403 }
    );
  }

  // Serve from cache if still valid
  if (_cache && Date.now() < _cache.expiresAt) {
    return NextResponse.json(_cache.data, {
      headers: { 'Cache-Control': 'private, max-age=60' },
    });
  }

  try {
    const allFiles = await getAllFiles(SRC_DIR, ['.tsx', '.ts']);
    
    // Build file node map
    const fileNodes = new Map<string, { path: string; content: string; imports: string[] }>();
    
    for (const filePath of allFiles) {
      try {
        const content = await readFile(filePath, 'utf-8');
        const rawImports = extractImports(content, filePath);
        fileNodes.set(filePath, { path: filePath, content, imports: rawImports });
      } catch {
        // Skip unreadable files
      }
    }
    
    // Resolve import paths to actual file paths
    const nodes: GraphNode[] = [];
    const nodeMap = new Map<string, string>(); // id -> path
    
    for (const [filePath, data] of fileNodes) {
      const id = '@/' + relative(SRC_DIR, filePath).replace(/\\/g, '/');
      const lineCount = data.content.split('\n').length;
      nodeMap.set(id, filePath);
      
      nodes.push({
        id,
        label: getShortLabel(filePath),
        category: categorize(filePath),
        path: filePath,
        size: Math.max(4, Math.min(20, Math.sqrt(lineCount) * 1.2)),
        imports: data.imports,
      });
    }
    
    // Build edges
    const edges: GraphEdge[] = [];
    const edgeSet = new Set<string>();
    
    for (const node of nodes) {
      for (const importPath of node.imports) {
        let resolvedImport = importPath;
        
        // Resolve to actual file path
        const targetPath = await resolveImportToFilePath(importPath);
        if (targetPath) {
          resolvedImport = '@/' + relative(SRC_DIR, targetPath).replace(/\\/g, '/');
        }
        
        const edgeKey = `${node.id}->${resolvedImport}`;
        if (node.id !== resolvedImport && nodeMap.has(resolvedImport) && !edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push({
            source: node.id,
            target: resolvedImport,
            label: importPath,
          });
        }
      }
    }
    
    // Build category stats
    const categoryMap = new Map<string, number>();
    for (const node of nodes) {
      categoryMap.set(node.category, (categoryMap.get(node.category) || 0) + 1);
    }
    
    const categories = Array.from(categoryMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        color: CATEGORY_CONFIG[name]?.color ?? '#6B7280',
      }))
      .sort((a, b) => (CATEGORY_CONFIG[a.name]?.priority ?? 99) - (CATEGORY_CONFIG[b.name]?.priority ?? 99));
    
    const graphData: GraphData = {
      nodes,
      edges,
      stats: {
        totalFiles: nodes.length,
        totalEdges: edges.length,
        categories,
      },
    };
    
    // Store in cache
    _cache = { data: graphData, expiresAt: Date.now() + CACHE_TTL_MS };

    return NextResponse.json(graphData, {
      headers: { 'Cache-Control': 'private, max-age=60' },
    });
  } catch (error) {
    console.error('[code-graph] build error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json(
      { error: 'Failed to generate code graph' },
      { status: 500 }
    );
  }
}
