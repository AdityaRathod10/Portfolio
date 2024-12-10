import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Decal, Float, useTexture } from '@react-three/drei'; 
import CanvasLoader from '../Loader';

const Ball = ({ imgUrl, isMobile }) => {
  // Only use useTexture for desktop (3D rendering)
  const decal = isMobile ? null : useTexture(imgUrl);

  // For mobile view, render icon inside a white box
  if (isMobile) {
    return (
      <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg shadow-md">
        <img src={imgUrl} alt="icon" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
      </div>
    );
  }

  // For desktop, render 3D sphere with decal
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.5]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb" // Fix the color to a valid hex format
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* Only render the Decal if the decal texture is available */}
        {decal ? (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            map={decal}
          />
        ) : (
          // If decal is not available, provide fallback behavior (for example, an alternative texture or color)
          <meshStandardMaterial color="grey" />
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Update screen width state
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile); // Listen to resize events

    return () => {
      window.removeEventListener('resize', checkIfMobile); // Clean up event listener
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        // For mobile, show a simple white box with icon
        <Ball imgUrl={icon} isMobile={true} />
      ) : (
        // For desktop, render the 3D model inside Canvas
        <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls enableZoom={false} />
            <Ball imgUrl={icon} isMobile={false} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default BallCanvas;
