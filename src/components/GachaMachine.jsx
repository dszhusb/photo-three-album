import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
    const { nodes, materials } = useGLTF("/models/gacha.glb")

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    const glassMaterial = <meshPhysicalMaterial
        color={'white'}
        metalness={0.9}
        roughness={0.05}
        envMapIntensity={0.9}
        clearcoat={1}
        transparent
        opacity={0.5}
        reflectivity={0.2}
        refractionRatio={0.985}
        transmission={0.95}
        iridescence={1}
        ior={0.9}
    />

    const plasticMaterial = <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} metalness={0.5} color={'white'} />
    const knobMaterial = <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={0.5}
        color={hovered ? 'blue' : '#d1d1d1'}
    />

    function handleClick() {
        click(!clicked)
        props.setScene({ name: 'collection' })
    }

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder002.geometry}
                position={[-0.75, 1.6, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1, 1.001, 1]}
            >
                {glassMaterial}
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder003.geometry}
                material={nodes.Cylinder003.material}
                position={[-1.05, -0.5, 0]}
                rotation={[0, 0, -Math.PI / 2]}

                onClick={() => handleClick()}
                onPointerOver={(event) => (event.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
            >
                {knobMaterial}
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                position={[0, -0.39, 0]}
                scale={[1, 2, 1]}
            >
                {plasticMaterial}
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere.geometry}
                position={[-1, -1.76, -0.4]}
                scale={0.4}
            >
                {plasticMaterial}
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/gacha.glb");