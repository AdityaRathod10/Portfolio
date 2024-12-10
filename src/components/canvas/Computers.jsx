import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const desktopModel = useGLTF("./desktop_pc/scene.gltf");
  const mobileModel = useGLTF("./iphone_13_concept/scene.gltf");
  const model = isMobile ? mobileModel : desktopModel;

  return (
    <mesh>
      <hemisphereLight intensity={isMobile ? 1 : 1.5} groundColor="white" />
      <ambientLight intensity={isMobile ? 0.8 : 1.5} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobile ? 1 : 1.5}
        castShadow={!isMobile}
        shadow-mapSize={1024}
      />
      <primitive
        object={model.scene}
        scale={isMobile ? 0.07 : 0.75} // Adjusted for mobile
        position={isMobile ? [-5.5, -10, -1.5] : [0, -3.25, -1.5]} // Adjusted for mobile
        rotation={isMobile ? [0.01, 0, 0] : [-0.01, -0.2, -0.1]} // Adjusted for mobile
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
      frameloop="demand"
      shadows={!isMobile}
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{
        position: isMobile ? [100, 5, 8] : [20, 3, 5], // Adjusted camera position for mobile
        fov: isMobile ? 50 : 25, // Adjusted field of view for mobile
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
          enableRotate={true}
           target={isMobile ? [-5.5, 9.5, -1.5] : [0, 0, 0]} // Match target to the model's position
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>

    
  );
};

export default ComputersCanvas;
