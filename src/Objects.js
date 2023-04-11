import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

function Objects() {
    const { scene } = useThree();

    const groupRef = useRef();

    const geometries = [
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        new THREE.ConeGeometry(0.2, 0.2, 64),
        new THREE.CylinderGeometry(0.2, 0.2, 0.2, 64),
        new THREE.IcosahedronGeometry(0.2, 8),
        new THREE.TorusGeometry(0.2, 0.04, 64, 32)
    ];

    // Create a group and add it to the scene
    useEffect(() => {
        if (groupRef.current && scene) {
            scene.add(groupRef.current);
        }
        addItem()
    }, [scene, groupRef]);

    function addItem() {
        for (let i = 0; i < 50; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshStandardMaterial({
                color: Math.random() * 0xffffff,
                roughness: 0.7,
                metalness: 0.0
            });

            const object = new THREE.Mesh(geometry, material);

            object.position.x = Math.random() * 50 - 2;
            object.position.y = Math.random() * 2;
            object.position.z = Math.random() * 50 - 2;

            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;

            object.scale.setScalar(Math.random() + 0.5);

            object.castShadow = true;
            object.receiveShadow = true;

            groupRef.current.add(object)
        }
    }

    useFrame(() => {
        groupRef.current.rotation.y += 0.01;
        // groupRef.current.rotation.x += 0.01;
        // groupRef.current.rotation.z += 0.01;

    });

    return <group ref={groupRef} />;
}

export default Objects;