import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
    const { nodes, materials } = useGLTF("/models/gacha.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder002.geometry}
                material={materials.Material}
                position={[-0.75, 1.6, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1, 1.001, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder003.geometry}
                material={nodes.Cylinder003.material}
                position={[-1.05, -0.5, 0]}
                rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials["Material.001"]}
                position={[0, -0.39, 0]}
                scale={[1, 2, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere.geometry}
                material={nodes.Sphere.material}
                position={[-1, -1.76, -0.4]}
                scale={0.4}
            />
        </group>
    );
}

useGLTF.preload("/models/gacha.glb");