import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Helper to detect actual mobile devices
const isMobileDevice = () => {
  return (
    typeof window !== 'undefined' && 
    (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i))
  );
};

const Computers = ({ isMobile }) => {
  const desktopModel = useGLTF("./desktop_pc/scene.gltf");
  const mobileModel = useGLTF("./iphone_13_concept/scene.gltf");
  const model = isMobile ? mobileModel : desktopModel;

  // Get device pixel ratio
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  
  // Adjust scale based on device pixel ratio for mobile
  const mobileScale = 0.015 * (pixelRatio > 2 ? (2 / pixelRatio) : 1);

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
        position={isMobile ? [-5.5, -5.2, -1.5] : [0, -3.25, -1.5]}
        rotation={isMobile ? [0.01, 0, 0] : [-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Combine media query with actual device detection
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      return mediaQuery.matches || isMobileDevice();
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);

    // Also check on orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows={!isMobile}
      dpr={[1, isMobile ? Math.min(window.devicePixelRatio, 2) : 2]}
      camera={{
        position: isMobile ? [10, 5, 8] : [20, 3, 5],
        fov: isMobile ? 50 : 25,
      }}
      gl={{ 
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: true
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