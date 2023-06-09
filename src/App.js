import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, VRButton, Controllers, Hands } from '@react-three/xr';
import Objects from './Objects';
import Lights from './Light';
// import CustomControllers from './Controllers';
import { Environment, Cloud, OrbitControls} from '@react-three/drei';
import "./style.css";
import mushRoom from './textures/mushroom.hdr'
import * as THREE from 'three';
import VRPlane from './Plane';
import { Physics } from '@react-three/cannon';

function VRScene() {
  return (
    <>
      <ambientLight intensity={0.01} />
      <directionalLight color={[0,0,0]} position={[0, 10, 0]} intensity={0.1} />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize={[4096, 4096]} />
      <Objects />
      <Lights />
      <OrbitControls />
      {/* <Physics>
        <VRPlane />
      </Physics> */}
      {/* <CustomControllers /> */}
    </>
  );
}

function App() {

  return (
    <>
      <Canvas shadowMap
        camera={{ position: [0, 1.6, 3], near: 0.1, far: 1000 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#ffffff');
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}>
        <color attach="background" args={['#000000']} />
        <XR>
          <Suspense fallback={null}>
            <Environment background={true} files={mushRoom}/>
            <Cloud
              opacity={1}
              speed={1} // Rotation speed
              width={10} // Width of the full cloud
              depth={1.5} // Z-dir depth
              segments={5} // Number of particles
            />
          </Suspense>
          
          <Controllers /** Optional material props to pass to controllers' ray indicators */
            rayMaterial={{ color: 'blue' }}
            /** Whether to hide controllers' rays on blur. Default is `false` */
            hideRaysOnBlur={false}/>
          <Hands />
          <VRScene />
        </XR>
      </Canvas>
      <VRButton />
    </>
  );
}

export default App;
