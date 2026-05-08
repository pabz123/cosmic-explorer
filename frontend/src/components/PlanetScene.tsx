"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Stars, Float, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";

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
      <shaderMaterial uniforms={uniforms} vertexShader={AtmosphereShader.vertexShader} fragmentShader={AtmosphereShader.fragmentShader} transparent side={THREE.BackSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function SaturnRings() {
  const [ringTexture, setRingTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let disposed = false;
    const textureLoader = new THREE.TextureLoader();
    // Use the ring downloaded from the script, or fallback
    textureLoader.load(
      "/textures/saturn_ring.png",
      (loaded) => { if (!disposed) setRingTexture(loaded); },
      undefined,
      () => { if (!disposed) setRingTexture(null); }
    );
    return () => { disposed = true; };
  }, []);

  if (!ringTexture) return null;

  return (
    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[3.8, 6.5, 128]} />
      <meshStandardMaterial map={ringTexture} transparent opacity={0.9} side={THREE.DoubleSide} color="#ffeeb1" />
    </mesh>
  );
}

function AdvancedPlanet({ textureUrl, name }: { textureUrl: string; name: string }) {
  // Use useTexture for more robust loading in React Three Fiber
  // We handle the case where textureUrl might be a base64 or a hashed path
  const texture = useTexture(textureUrl);
  
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.2}
          emissive={new THREE.Color(0x000000)}
        />
      </mesh>
      {/* Atmosphere glow effect */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          transparent
          opacity={0.15}
          color="#4fbfff"
          side={THREE.BackSide}
        />
      </mesh>
      
      {name.toLowerCase() === "saturn" && (
        <Suspense fallback={null}>
          <SaturnRings />
        </Suspense>
      )}

      <ProceduralAtmosphere color={isEarth ? "#4fbfff" : name.toLowerCase() === "mars" ? "#ff7744" : "#ffffff"} />
    </group>
  );
}

export function PlanetScene({ textureUrl, name }: { textureUrl: string; name: string }) {
  return (
    <div className="w-full h-full bg-[#020617]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <OrbitControls enablePan={false} minDistance={5} maxDistance={20} autoRotate={false} makeDefault />

        <ambientLight intensity={0.6} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={10} castShadow />
        <pointLight position={[-15, -15, -10]} intensity={3} color="#4fbfff" />

        <Environment preset="night" />
        <Stars radius={400} depth={100} count={50000} factor={10} saturation={0} fade speed={2} />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <AdvancedPlanet key={name} textureUrl={textureUrl} name={name} />
          </Float>
          <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={20} blur={3} far={5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
