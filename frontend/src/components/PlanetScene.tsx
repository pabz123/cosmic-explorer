"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, PerspectiveCamera, Environment, Stars, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface PlanetSceneProps {
  textureUrl: string;
  secondTextureUrl?: string;
  infoPoint?: {
    position: [number, number, number];
    title: string;
    description: string;
  };
}

function Atmosphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1.0 + Math.sin(clock.getElapsedTime() * 0.5) * 0.005);
    }
  });

  return (
    <group>
      {/* Inner Glow */}
      <mesh>
        <sphereGeometry args={[3.05, 64, 64]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Outer Atmosphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[3.2, 64, 64]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function PlanetSphere({ textureUrl, infoPoint }: { textureUrl: string; infoPoint?: PlanetSceneProps["infoPoint"] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Core Planet */}
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[3, 128, 128]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.8} 
          metalness={0.1} 
        />
      </mesh>

      {/* Atmospheric Glow */}
      <Atmosphere color="#4fbfff" />

      {/* Info Hotspot */}
      {infoPoint && (
        <group position={infoPoint.position}>
          <Html distanceFactor={10}>
            <div className={`flex flex-col items-start gap-2 whitespace-nowrap transition-all duration-500 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <div>
                  <h3 className="text-white font-black text-xs uppercase tracking-widest mb-1">{infoPoint.title}</h3>
                  <p className="text-white/60 text-[10px] font-medium max-w-[180px] leading-relaxed whitespace-normal">
                    {infoPoint.description}
                  </p>
                </div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent ml-4" />
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

function ComparisonScene({ textureUrl, secondTextureUrl }: { textureUrl: string; secondTextureUrl: string }) {
  const tex1 = useLoader(THREE.TextureLoader, textureUrl);
  const tex2 = useLoader(THREE.TextureLoader, secondTextureUrl);
  
  return (
    <group>
      <mesh position={[-3.5, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial map={tex1} />
      </mesh>
      <mesh position={[3.5, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial map={tex2} />
      </mesh>
    </group>
  );
}

export function PlanetScene({ textureUrl, secondTextureUrl, infoPoint }: PlanetSceneProps) {
  return (
    <div className="w-full h-full bg-[#020617]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={4} 
          maxDistance={15}
          autoRotate={false}
          makeDefault
        />

        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4fbfff" />
        <Environment preset="night" />

        {/* Background Elements */}
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
        
        {/* Main Content with Suspense */}
        <Suspense fallback={null}>
          <group rotation={[0, 0, 0.41]}>
            {!secondTextureUrl ? (
              <PlanetSphere textureUrl={textureUrl} infoPoint={infoPoint} />
            ) : (
              <ComparisonScene textureUrl={textureUrl} secondTextureUrl={secondTextureUrl} />
            )}
          </group>
          <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
