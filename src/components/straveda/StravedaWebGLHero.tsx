'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WebGL Shader Hero — Straveda branded (light theme)
 * Creates an animated wave field using orange (#FF4800) and indigo (#2B2358) colors
 * on a white/light background, providing a premium visual backdrop.
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

    // Straveda-themed fragment shader: orange + indigo waves on light background
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float scrollProgress;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        // Animate based on scroll — waves slow down and spread as user scrolls
        float scrollInfluence = 1.0 - scrollProgress * 0.5;
        float t = time * 0.8 * scrollInfluence;

        // Wave distortion
        float d = length(p) * 0.04;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        // Orange channel (primary brand #FF4800)
        float r = 0.04 / abs(p.y + sin((rx + t) * 1.0) * (0.4 + scrollProgress * 0.2));

        // Indigo channel (secondary brand #2B2358)  
        float g = 0.03 / abs(p.y + sin((gx + t * 0.7) * 1.2) * (0.35 + scrollProgress * 0.15));

        // Blue-purple channel for depth
        float b = 0.035 / abs(p.y + sin((bx + t * 1.3) * 0.9) * (0.45 + scrollProgress * 0.1));

        // Light background blend — transition from light to darker as scroll progresses
        float backgroundFade = 1.0 - scrollProgress * 0.4;

        // Mix: on white background, the waves create color fields
        vec3 waveColor = vec3(r, g, b);
        vec3 lightBg = vec3(0.97, 0.97, 0.98) * backgroundFade;
        vec3 darkBg = vec3(0.02, 0.02, 0.04) * scrollProgress * 0.6;

        // Smooth blend based on scroll position
        vec3 bgColor = mix(lightBg, darkBg, scrollProgress);
        
        // Add subtle gradient overlay matching Straveda brand
        float gradientStrength = 0.08 + scrollProgress * 0.12;
        float brandGradient = smoothstep(-0.8, 0.8, p.x + sin(time * 0.3) * 0.2);
        bgColor += vec3(1.0, 0.28, 0.0) * brandGradient * gradientStrength * 0.15;
        bgColor += vec3(0.17, 0.14, 0.34) * (1.0 - brandGradient) * gradientStrength * 0.1;

        // Composite waves over background
        vec3 finalColor = bgColor + waveColor * 0.85 * (1.0 - scrollProgress * 0.3);

        // Vignette effect
        float vignette = 1.0 - length(p) * 0.15;
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const initScene = () => {
      refs.scene = new THREE.Scene();
      refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Start with light background, will transition to dark on scroll
      refs.renderer.setClearColor(new THREE.Color(0xf8f8f9));

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
      if (refs.uniforms) refs.uniforms.time.value += 0.008;
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

    // Handle scroll — update shader scrollProgress uniform
    const handleScroll = () => {
      if (!refs.uniforms) return;
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / heroHeight, 1.0);
      refs.uniforms.scrollProgress.value = progress;

      // Update clear color to transition from light to dark
      if (refs.renderer) {
        const lightR = 248 / 255;
        const lightG = 248 / 255;
        const lightB = 249 / 255;
        const darkR = 2 / 255;
        const darkG = 2 / 255;
        const darkB = 4 / 255;
        const r = lightR + (darkR - lightR) * progress;
        const g = lightG + (darkG - lightG) * progress;
        const b = lightB + (darkB - lightB) * progress;
        refs.renderer.setClearColor(new THREE.Color(r, g, b));
      }
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
