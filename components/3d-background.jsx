'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function AnimatedSphere({ scrollY = 0, mouseX = 0, mouseY = 0 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Idle animation - continuous rotation
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
    
    // Mouse follow - smooth damped movement
    meshRef.current.rotation.y += (mouseX * 0.5 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (mouseY * 0.5 - meshRef.current.rotation.x) * 0.05;
    
    // Scroll reactive - scale and position
    const scrollFactor = scrollY * 0.001;
    meshRef.current.scale.setScalar(1 + Math.sin(scrollFactor) * 0.2);
    meshRef.current.position.y = Math.sin(scrollFactor * 2) * 0.5;
    
    // Material animation
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#8B5CF6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function ParticleField({ scrollY = 0 }) {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = scrollY * 0.0001;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#EC4899"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default function ThreeDBackground() {
  const containerRef = useRef();
  const scrollY = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });

  if (typeof window !== 'undefined') {
    // Scroll tracking
    window.addEventListener('scroll', () => {
      scrollY.current = window.scrollY;
    });

    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    });
  }

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#EC4899" intensity={0.5} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        
        <AnimatedSphere
          scrollY={scrollY.current}
          mouseX={mousePosition.current.x}
          mouseY={mousePosition.current.y}
        />
        <ParticleField scrollY={scrollY.current} />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black pointer-events-none" />
    </div>
  );
}