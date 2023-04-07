import React from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, VRButton } from '@react-three/xr';
import Objects from './Objects';
import Lights from './Light';
import Controllers from './Controllers';
import { useXR } from '@react-three/xr';
import "./style.css";
import * as THREE from 'three';

function VRScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize={[4096, 4096]} />
      <Objects />
      <Lights />
      <Controllers />
    </>
  );
}

function App() {

  return (
    <>
      <Canvas shadowMap
        camera={{ position: [0, 1.6, 3], near: 0.1, far: 10 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#171717');
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}>
        <XR>
          <VRScene />
        </XR>
      </Canvas>
      <VRButton />
    </>
  );
}

export default App;
