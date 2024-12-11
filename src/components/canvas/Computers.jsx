import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { isMobile as detectMobile } from 'react-device-detect';

// Model component with dynamic viewport-based scaling
const Computers = ({ isMobile }) => {
  const desktopModel = useGLTF("./desktop_pc/scene.gltf");
  const mobileModel = useGLTF("./iphone_13_concept/scene.gltf");
  const model = isMobile ? mobileModel : desktopModel;
  
  // Get viewport dimensions for dynamic scaling
  const { viewport } = useThree();
  
  // Calculate scale based on viewport width
  const mobileScale = Math.min(viewport.width * 0.15, 0.7);
  
  // Dynamic positioning based on viewport
  const mobilePosition = [
    0,
    -viewport.height * 0.2,
    -2
  ];

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
        scale={isMobile ? mobileScale : 0.75}
        position={isMobile ? mobilePosition : [0, -3.25, -1.5]}
        rotation={isMobile ? [-0.01, -0.2, -0.1] : [-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Use react-device-detect instead of media queries
    setIsMobile(detectMobile);

    // Fallback to viewport width check for tablets
    const checkTablet = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      return (width <= 1024 && aspectRatio < 1.2) || detectMobile;
    };

    const handleResize = () => {
      setIsMobile(checkTablet());
    };

    // Initial check
    handleResize();

    // Add event listener for orientation changes and resizes
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows={!isMobile}
      dpr={[1, 2]} // Consistent DPR for better performance
      camera={{
        position: isMobile ? [0, 0, 12] : [20, 3, 5],
        fov: isMobile ? 40 : 25,
        near: 0.1,
        far: 200
      }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true // Better quality on mobile
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
          enableRotate={true}
          target={isMobile ? [-5.5, 0.5, -1.5] : [0, 0, 0]}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;