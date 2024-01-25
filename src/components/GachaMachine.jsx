import React, { useState, Suspense, useMemo } from "react"
import * as THREE from 'three'
import { useGLTF, Caustics, MeshTransmissionMaterial } from "@react-three/drei"
import { useConvexPolyhedron } from '@react-three/cannon'
import { Geometry } from 'three-stdlib'
import { Plastic } from './GachaMaterials'

export function Machine(props) {
    const { nodes, materials } = useGLTF("/models/gachaMachine.glb")

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    function handleClick() {
        click(!clicked)
        props.setScene({ name: 'collection' })
    }

    const retainerGeo = useMemo(() => {
        const g = nodes.Cube003.geometry
        const geo = new Geometry().fromBufferGeometry(g)
        return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]
    })
    const [retainerRef] = useConvexPolyhedron(() => ({ mass: 1, position: [0, 3, -0.95], args: retainerGeo, type: "Static" }))

    return (
        <group {...props} dispose={null} scale={2} rotation={[0, Math.PI, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                position={[0, 2, 0]}
                scale={[1.25, 2, 1]}
            >
                <Plastic color={'white'} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={nodes.Cube001.material}
                position={[0, 0.6, -1.2]}
                scale={[1.25, 0.6, 0.52]}
            >
                <Plastic color={"white"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube002.geometry}
                material={nodes.Cube002.material}
                position={[0, 4.2, -0.4]}
                scale={[1.25, 0.2, 1.4]}
            >
                <Plastic color={'white'} />
            </mesh>
                <mesh
                    ref={retainerRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={nodes.Cube003.material}
                    position={[0, 3, -0.95]}
                    scale={[1.25, 1, 0.85]}
                >
                    <MeshTransmissionMaterial samples={10} resolution={1024} distortion={0.25} color="#9ccdff" thickness={1} anisotropy={1} chromaticAbberation={1} />
                </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Icosphere.geometry}
                material={nodes.Icosphere.material}
                position={[0.65, 0.7, -1]}
                radius={10}
            >
                <Plastic color={'white'} />
            </mesh>
            <mesh
                onClick={() => handleClick()}
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001.geometry}
                material={nodes.Cylinder001.material}
                position={[0, 1.57, -1.075]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.75}
            >
                <Plastic color={'white'} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube004.geometry}
                material={nodes.Cube004.material}
                position={[-0.58, 1.56, -1]}
                scale={[0.32, 1, 0.25]}
            >
                <Plastic color={'white'} />
            </mesh>
        </group>
    )
}

useGLTF.preload("/models/gachaMachine.glb");