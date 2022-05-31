import React, { useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';
import { Vector3 } from 'three';
import { Box3, Euler } from 'three';

export function Car() {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + '/models/car/car.gltf',
        
    );

    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);

    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();

        let group = gltf.scene.children[0].children[0].children[0];
        group.children[0].rotation.x = t * 2;
        group.children[2].rotation.x = t * 2;
        group.children[4].rotation.x = t * 2;
        group.children[6].rotation.x = t * 2;
        
        
    });
    return <primitive object={gltf.scene} />
}