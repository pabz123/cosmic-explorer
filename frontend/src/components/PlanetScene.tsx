"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Stars, Float, ContactShadows } from "@react-three/drei";
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
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/textures/saturn_ring.png",
      (loaded) => setRingTexture(loaded),
      undefined,
      () => setRingTexture(null),
    );
  }, []);

  if (!ringTexture) return null;

  return (
    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[3.8, 6.5, 128]} />
      <meshStandardMaterial map={ringTexture} transparent opacity={0.9} side={THREE.DoubleSide} color="#ffeeb1" />
    </mesh>
  );
}

function AdvancedPlanet({ textureUrl, name, normalMapUrl, roughnessMapUrl }: { textureUrl: string; name: string; normalMapUrl?: string; roughnessMapUrl?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [normalMap, setNormalMap] = useState<THREE.Texture | null>(null);
  const [roughnessMap, setRoughnessMap] = useState<THREE.Texture | null>(null);
  const isEarth = name.toLowerCase() === "earth";
  const [cloudMap, setCloudMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let disposed = false;
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      textureUrl,
      (loaded) => {
        if (disposed) return;
        loaded.colorSpace = THREE.SRGBColorSpace;
        setTexture(loaded);
      },
      undefined,
      () => setTexture(null),
    );

    return () => {
      disposed = true;
    };
  }, [textureUrl]);



  useEffect(() => {
    if (!normalMapUrl) return;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(normalMapUrl, (loaded) => setNormalMap(loaded), undefined, () => setNormalMap(null));
  }, [normalMapUrl]);

  useEffect(() => {
    if (!roughnessMapUrl) return;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(roughnessMapUrl, (loaded) => setRoughnessMap(loaded), undefined, () => setRoughnessMap(null));
  }, [roughnessMapUrl]);

  useEffect(() => {
    if (!isEarth) return;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/textures/earth_clouds.jpg",
      (loaded) => setCloudMap(loaded),
      undefined,
      () => setCloudMap(null),
    );
  }, [isEarth]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.05;
  });

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[3, 128, 128]} />
        <meshStandardMaterial map={texture ?? undefined} normalMap={normalMap ?? undefined} roughnessMap={roughnessMap ?? undefined} color={texture ? "#ffffff" : "#6ea8ff"} roughness={isEarth ? 0.6 : 0.8} metalness={isEarth ? 0.1 : 0.0} envMapIntensity={0.8} />
      </mesh>
      {isEarth && cloudMap && (
        <mesh>
          <sphereGeometry args={[3.05, 96, 96]} />
          <meshStandardMaterial map={cloudMap} transparent opacity={0.35} depthWrite={false} />
        </mesh>
      )}

      {name.toLowerCase() === "saturn" && (
        <Suspense fallback={null}>
          <SaturnRings />
        </Suspense>
      )}

      <ProceduralAtmosphere color={isEarth ? "#4fbfff" : name.toLowerCase() === "mars" ? "#ff7744" : "#ffffff"} />
    </group>
  );
}

export function PlanetScene({ textureUrl, name, normalMapUrl, roughnessMapUrl }: { textureUrl: string; name: string; normalMapUrl?: string; roughnessMapUrl?: string }) {
  return (
    <div className="w-full h-full bg-[#020617]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <OrbitControls enablePan={false} minDistance={5} maxDistance={20} autoRotate={false} makeDefault />

        <ambientLight intensity={0.2} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={4} castShadow />
        <pointLight position={[-15, -15, -10]} intensity={1.5} color="#4fbfff" />

        <Environment preset="night" />
        <Stars radius={400} depth={100} count={50000} factor={10} saturation={0} fade speed={2} />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <AdvancedPlanet key={name} textureUrl={textureUrl} name={name} normalMapUrl={normalMapUrl} roughnessMapUrl={roughnessMapUrl} />
          </Float>
          <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={20} blur={3} far={5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
