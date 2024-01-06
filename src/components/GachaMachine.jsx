import React, { useState, Suspense, useMemo } from "react"
import * as THREE from 'three'
import { useGLTF, Caustics, MeshTransmissionMaterial } from "@react-three/drei"
import { useConvexPolyhedron } from '@react-three/cannon'
import { Geometry } from 'three-stdlib'
import { Metal } from './GachaMaterials'

export function Model(props) {
    const { nodes, materials } = useGLTF("/models/gacha.glb")

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    function handleClick() {
        click(!clicked)
        props.setScene({ name: 'collection' })
    }

    const retainerGeo = useMemo(() => {
        const g = nodes.Cylinder002.geometry
        const geo = new Geometry().fromBufferGeometry(g)
        // geo.mergeVertices()
        return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]
    })
    const [retainerRef] = useConvexPolyhedron(() => ({ mass: 1, position: [-0.75, 1.6, 0], rotation: [Math.PI / 2, 0, 0], args: retainerGeo, type: "Static" }))

    return (
        <group {...props} dispose={null} scale={2}>
            <Caustics color="#9ccdff" lightSource={[5, 5, -10]} worldRadius={0.01} ior={1.2} intensity={0.005}>
                <mesh
                    ref={retainerRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder002.geometry}
                    position={[-0.75, 1.6, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[1, 1.001, 1]}
                >
                    <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#9ccdff" thickness={1} anisotropy={1} chromaticAbberation={1} />
                </mesh>
            </Caustics>
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
                <Metal color={"blue"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                position={[0, -0.39, 0]}
                scale={[1, 2, 1]}
            >
                <Metal />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere.geometry}
                position={[-1, -1.76, -0.4]}
                scale={0.4}
            >
                <Metal />
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/gacha.glb");