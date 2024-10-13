import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

const Sphere = ({ rotationSpeed, scale }) => {
  const texture = useLoader(TextureLoader, "/earthlights1k.jpg");
  const sphereRef = useRef();

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * rotationSpeed;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Stars = () => {
  const starGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }, []);

  return (
    <points>
      <bufferGeometry attach="geometry" {...starGeo} />
      <pointsMaterial attach="material" size={0.5} color="white" />
    </points>
  );
};

const Background = ({ rotationSpeed, scale }) => {
  return (
    <div className="background">
      <Canvas style={{ background: "black" }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere rotationSpeed={rotationSpeed} scale={scale} />
        <Stars />
      </Canvas>
    </div>
  );
};

export default Background;
