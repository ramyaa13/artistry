"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mesh, TextureLoader, WebGLRenderer } from "three";
import { useGesture } from "@use-gesture/react";
// @ts-ignore
import { ARButton } from "three/examples/jsm/webxr/ARButton";

interface ARSceneProps {
  imageURL: string | null;
}

export default function ARScene({ imageURL }: ARSceneProps) {
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);
  const [isARActive, setIsARActive] = useState(false);

  const handleStartAR = async () => {
    if ("xr" in navigator) {
      const supported = await (navigator as any).xr.isSessionSupported("immersive-ar");
      setIsARSupported(supported);

      if (supported) {
        setIsARActive(true);
      } else {
        alert("WebXR AR not supported on this device or browser.");
      }
    } else {
      alert("WebXR not available — falling back to normal view.");
      setIsARSupported(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      {!isARActive ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-white text-2xl mb-4">Artsphere AR Experience</h1>
          <button
            onClick={handleStartAR}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Launch AR Experience
          </button>
          <p className="text-gray-400 text-sm mt-3">
            (Requires Chrome + HTTPS + camera permission)
          </p>
        </div>
      ) : (
        <ARCanvas imageURL={imageURL} />
      )}
    </div>
  );
}

function ARCanvas({ imageURL }: { imageURL: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <Canvas
      ref={canvasRef as any}
      camera={{ position: [0, 1.5, 3] }}
      onCreated={({ gl }) => {
        const renderer = gl as WebGLRenderer;
        renderer.xr.enabled = true;
        document.body.appendChild(ARButton.createButton(renderer));
      }}
      className="touch-none"
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Mural imageURL={imageURL} />
    </Canvas>
  );
}

interface MuralProps {
  imageURL: string | null;
}

function Mural({ imageURL }: MuralProps) {
  const meshRef = useRef<Mesh>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<[number, number, number]>([0, 1.5, -2]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      setPosition([x / 200, 1.5 - y / 200, -2]);
    },
    onPinch: ({ offset: [d] }) => {
      setScale(1 + d / 200);
    },
  });

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={meshRef} {...bind()} scale={scale} position={position} rotation={rotation}>
      <planeGeometry args={[1, 1]} />
      {imageURL ? (
        <meshBasicMaterial map={new TextureLoader().load(imageURL)} />
      ) : (
        <meshStandardMaterial color="orange" />
      )}
    </mesh>
  );
}
