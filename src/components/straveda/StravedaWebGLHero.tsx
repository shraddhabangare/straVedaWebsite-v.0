'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WebGL Shader Hero — Straveda branded (light theme)
 * Ultra-subtle, premium wave patterns on a clean white background.
 * - Soft gradient from #fafafa to #f5f5f8
 * - Very faint orange/indigo wave lines (~0.025 intensity)
 * - Subtle radial spotlight glow from center-right (warm orange)
 * - Scroll controls wave amplitude only (gentler when scrolled)
 */
export default function StravedaWebGLHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    renderer: THREE.WebGLRenderer | null;
    mesh: THREE.Mesh | null;
    uniforms: Record<string, { value: unknown }>;
    animationId: number | null;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: {} as any,
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { current: refs } = sceneRef;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Premium subtle shader: faint moving light patterns on near-white background
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float scrollProgress;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        // Scroll controls wave amplitude — gentler when scrolled down
        float scrollAmp = 1.0 - scrollProgress * 0.6;
        float t = time * 0.5;

        // === Soft background gradient: #fafafa top-left → #f5f5f8 bottom-right ===
        vec3 topColor = vec3(0.980, 0.980, 0.980); // #fafafa
        vec3 bottomColor = vec3(0.961, 0.961, 0.973); // #f5f5f8
        float bgGradient = uv.y * 0.6 + uv.x * 0.4;
        vec3 bgColor = mix(topColor, bottomColor, bgGradient);

        // === Subtle radial spotlight glow from center-right (warm orange) ===
        vec2 glowCenter = vec2(0.35, 0.45); // center-right in UV space
        float glowDist = length(uv - glowCenter);
        float spotlight = exp(-glowDist * glowDist * 4.5) * 0.04;
        // Subtle pulse to keep it alive
        spotlight *= 0.85 + 0.15 * sin(time * 0.4);
        bgColor += vec3(1.0, 0.28, 0.0) * spotlight; // #FF4800 tint

        // === Ultra-subtle wave lines ===
        float waveIntensity = 0.025 * scrollAmp;

        // Orange wave lines (brand #FF4800)
        float orangeWave = 0.0;
        for (int i = 0; i < 4; i++) {
          float fi = float(i);
          float freq = 1.0 + fi * 0.35;
          float phase = t * (0.4 + fi * 0.12) + fi * 1.7;
          float amp = (0.38 + fi * 0.08) * scrollAmp;
          float y = p.y + sin((p.x + phase) * freq) * amp;
          float line = waveIntensity / (abs(y) + 0.01);
          // Feather the line width
          line *= smoothstep(0.0, 0.15, abs(y));
          orangeWave += line * 0.6;
        }

        // Indigo wave lines (secondary #2B2358)
        float indigoWave = 0.0;
        for (int i = 0; i < 3; i++) {
          float fi = float(i);
          float freq = 0.9 + fi * 0.4;
          float phase = t * (0.3 + fi * 0.1) + fi * 2.3;
          float amp = (0.35 + fi * 0.06) * scrollAmp;
          float y = p.y + sin((p.x + phase) * freq + 0.5) * amp;
          float line = (waveIntensity * 0.8) / (abs(y) + 0.01);
          line *= smoothstep(0.0, 0.18, abs(y));
          indigoWave += line * 0.5;
        }

        // Blend waves into background
        vec3 orangeColor = vec3(1.0, 0.28, 0.0);
        vec3 indigoColor = vec3(0.17, 0.14, 0.34);
        bgColor += orangeColor * orangeWave;
        bgColor += indigoColor * indigoWave;

        // === Subtle edge softening — very gentle vignette ===
        float vignette = 1.0 - length(p) * 0.08;
        bgColor *= max(vignette, 0.92);

        gl_FragColor = vec4(bgColor, 1.0);
      }
    `;

    const initScene = () => {
      refs.scene = new THREE.Scene();
      refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Clean white clear color matching light theme
      refs.renderer.setClearColor(new THREE.Color(0xfafafa));

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        scrollProgress: { value: 0.0 },
      };

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ];

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', positions);

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      });

      refs.mesh = new THREE.Mesh(geometry, material);
      refs.scene.add(refs.mesh);

      handleResize();
    };

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.006;
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
      refs.animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      refs.renderer.setSize(width, height, false);
      refs.uniforms.resolution.value = [width, height];
    };

    // Handle scroll — update shader scrollProgress uniform (amplitude control only)
    const handleScroll = () => {
      if (!refs.uniforms) return;
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / heroHeight, 1.0);
      refs.uniforms.scrollProgress.value = progress;
    };

    initScene();
    animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh);
        refs.mesh.geometry.dispose();
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose();
        }
      }
      refs.renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ zIndex: 0 }}
    />
  );
}
