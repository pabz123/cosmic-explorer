"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Stars, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ── Hyper-Realistic Atmosphere Shader ──
// Inspired by Rayleigh/Mie scattering for that "NASA/Veo" cinematic look
const AtmosphereShader = {
  uniforms: {
    uColor: { value: new THREE.Color("#4fbfff") },
    uCoefficient: { value: 0.1 },
    uPower: { value: 4.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vEyeVector;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vEyeVector = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uCoefficient;
    uniform float uPower;
    varying vec3 vNormal;
    varying vec3 vEyeVector;
    void main() {
      float intensity = pow(max(0.0, uCoefficient + dot(vNormal, vEyeVector)), uPower);
      gl_FragColor = vec4(uColor, intensity);
    }
  `,
};

function ProceduralAtmosphere({ color }: { color: string }) {
  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(color) },
    uCoefficient: { value: 0.1 },
    uPower: { value: 4.5 },
  }), [color]);

  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[3, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={AtmosphereShader.vertexShader}
        fragmentShader={AtmosphereShader.fragmentShader}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ── Saturn's Rings ──
function SaturnRings() {
  const ringTexture = useLoader(THREE.TextureLoader, "https://solartextures.b-cdn.net/2k_saturn_ring_alpha.png");
  return (
    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[3.8, 6.5, 128]} />
      <meshStandardMaterial 
        map={ringTexture}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
        color="#ffeeb1"
      />
    </mesh>
  );
}

// ── Detailed Planet with Procedural Enhancements ──
function AdvancedPlanet({ textureUrl, name }: { textureUrl: string; name: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  
  const isEarth = name.toLowerCase() === "earth";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.05;
  });

  return (
    <group>
      {/* Main Body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[3, 128, 128]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={isEarth ? 0.6 : 0.8}
          metalness={isEarth ? 0.1 : 0.0}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Saturn's Rings (Procedural Alpha) */}
      {name.toLowerCase() === "saturn" && (
        <Suspense fallback={null}>
          <SaturnRings />
        </Suspense>
      )}

      {/* Advanced Atmospheric Glow */}
      <ProceduralAtmosphere color={isEarth ? "#4fbfff" : name.toLowerCase() === "mars" ? "#ff7744" : "#ffffff"} />
    </group>
  );
}

export function PlanetScene({ textureUrl, name }: { textureUrl: string; name: string }) {
  return (
    <div className="w-full h-full bg-[#020617]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <OrbitControls 
          enablePan={false} 
          minDistance={5} 
          maxDistance={20} 
          autoRotate={false}
          makeDefault
        />

        <ambientLight intensity={0.2} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={4} castShadow />
        <pointLight position={[-15, -15, -10]} intensity={1.5} color="#4fbfff" />
        
        <Environment preset="night" />
        <Stars radius={400} depth={100} count={50000} factor={10} saturation={0} fade speed={2} />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <AdvancedPlanet textureUrl={textureUrl} name={name} />
          </Float>
          <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={20} blur={3} far={5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
