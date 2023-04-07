import { useFrame, useThree } from 'react-three-fiber';
import { useState, useRef } from 'react';
import { XRControllerModel, useXR } from '@react-three/xr';
import * as THREE from 'three';

function Controllers() {
  const { scene } = useThree();
  const [intersected, setIntersected] = useState([]);
  const tempMatrix = new THREE.Matrix4();
  const controller1 = useRef();
  const controller2 = useRef();
  const controllerGrip1 = useRef();
  const controllerGrip2 = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const { controllers } = useXR();

  const onSelectStart = (event) => {
    const controller = event.target;
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
      const intersection = intersections[0];

      const object = intersection.object;
      object.material.emissive.b = 1;
      controller.attach(object);

      controller.userData.selected = object;
    }
  };

  const onSelectEnd = (event) => {
    const controller = event.target;

    if (controller.userData.selected !== undefined) {
      const object = controller.userData.selected;
      object.material.emissive.b = 0;
      scene.attach(object);

      controller.userData.selected = undefined;
    }
  };

  const getIntersections = (controller) => {
    tempMatrix.identity().extractRotation(controller.matrixWorld);

    raycaster.current.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.current.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    return raycaster.current.intersectObjects(scene.children[0].children);
  };

  useFrame(() => {
    const intersections1 = getIntersections(controller1.current);
    const intersections2 = getIntersections(controller2.current);

    if (intersections1.length > 0 || intersections2.length > 0) {
      const newIntersected = [];

      if (intersections1.length > 0) newIntersected.push(intersections1[0].object);
      if (intersections2.length > 0) newIntersected.push(intersections2[0].object);

      for (const object of intersected) {
        if (!newIntersected.includes(object)) {
          object.material.emissive.r = 0;
        }
      }

      for (const object of newIntersected) {
        if (!intersected.includes(object)) {
          object.material.emissive.r = 1;
        }
      }

      setIntersected(newIntersected);
    } else {
      for (const object of intersected) {
        object.material.emissive.r = 0;
      }

      setIntersected([]);
    }
  });

  return (
    <>
      <group>
        <mesh ref={controller1} position={[-0.5, -0.5, -1]} rotation={[0, Math.PI, 0]}>
          <sphereBufferGeometry args={[0.03]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh ref={controller2} position={[0.5, -0.5, -1]} rotation={[0, Math.PI, 0]}>
          <sphereBufferGeometry args={[0.03]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      <group>
        <mesh ref={controllerGrip1} />
        <mesh ref={controllerGrip2} />
      </group>
      <group>
        {controllers.map((inputSource, index) => (
          <XRControllerModel
            key={index}
            targetRayLength={0.5}
            grip={index === 1}
            onSelectStart={onSelectStart}
            onSelectEnd={onSelectEnd}
            path={inputSource.handedness === 'right' ? '/right.glb' : '/left.glb'}
          />
        ))}
      </group>
    </>
  );
}

export default Controllers;