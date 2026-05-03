"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";

interface PlanetSceneProps {
  textureUrl: string;
  className?: string;
  infoPoint?: {
    position: [number, number, number];
    title: string;
    description: string;
  };
}

function PlanetSphere({ textureUrl, infoPoint }: Omit<PlanetSceneProps, "className">) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate the planet slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={[isMobile ? 0 : 2, isMobile ? -1 : 0, 0]}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.7}
          metalness={0.2}
          bumpMap={texture}
          bumpScale={0.02}
        />
        
        {/* Atmosphere / 3D Glow Layer */}
        <mesh scale={1.05}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshPhongMaterial 
            color="#38bdf8"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
        
        {/* Hotspot */}
        {infoPoint && (
          <mesh 
            position={infoPoint.position}
            onClick={(e) => {
              e.stopPropagation();
              setShowInfo(!showInfo);
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
            }}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
            <meshBasicMaterial color="#38bdf8" wireframe />
            
            {showInfo && (
              <Html distanceFactor={10} position={[0, 0.2, 0]} center zIndexRange={[100, 0]}>
                <div className="w-64 p-5 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl text-white shadow-2xl pointer-events-none transition-all duration-300">
                  <h4 className="font-bold text-lg mb-2 text-sky-400">{infoPoint.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{infoPoint.description}</p>
                </div>
              </Html>
            )}
          </mesh>
        )}
      </mesh>
    </group>
  );
}

function LoadingPlaceholder() {
  return (
    <Html center>
      <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 text-sm font-medium tracking-wide">
        <div className="w-4 h-4 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
        Rendering Universe...
      </div>
    </Html>
  );
}

export function PlanetScene({ textureUrl, className = "", infoPoint }: PlanetSceneProps) {
  return (
    <div className={`w-full h-full absolute inset-0 -z-10 ${className}`}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#38bdf8" />
        <Stars radius={150} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={<LoadingPlaceholder />}>
          <PlanetSphere textureUrl={textureUrl} infoPoint={infoPoint} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          minDistance={3}
          maxDistance={15}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
