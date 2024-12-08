import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from 'three'; // Make sure to import THREE

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();

  // Optimize model for mobile
  useEffect(() => {
    if (isMobile) {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          // Lower texture quality for mobile devices
          if (child.material.map) {
            child.material.map.minFilter = THREE.LinearFilter;
            child.material.map.generateMipmaps = false;
          }
          // Reduce complexity by lowering material properties
          child.material.roughness = Math.min(child.material.roughness, 0.6);
          child.material.metalness = Math.min(child.material.metalness, 0.4);
        }
      });
    }
  }, [isMobile, computer.scene]);

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={1.5} groundColor='white' />
      <ambientLight intensity={1.5} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, isMobile ? 1.5 : 2]} // Adjusting DPI for mobile
      camera={{ 
        position: isMobile ? [10, 2, 5] : [20, 3, 5], 
        fov: isMobile ? 35 : 25 // Adjusting FOV for mobile
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={!isMobile}
          enableRotate={!isMobile}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
