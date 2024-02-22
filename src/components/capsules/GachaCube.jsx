import PropTypes from 'prop-types'
import { Suspense, useState, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { PortalMaterial } from './GachaMaterials'
import { useTexture, Outlines, MeshDiscardMaterial } from '@react-three/drei'
import { useHover, MakeRigid } from '../CollectionUtils'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/zustand'
import * as THREE from 'three'

extend({ PortalMaterial })
export { GachaCube, CollectionCubes }

function GachaCube({ position, rotation, url, isClickable, physics }) {
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const properties = getCompoundStructure()
    const router = useRouter()
    const { setCapsule } = useStore()

    const group = useRef()
    useFrame(({ clock }) => {
        if (!physics) { group.current.rotation.y = clock.getElapsedTime() }
    })

    function handleClick() {
        click(!clicked)
        if (isClickable) {
            router.push('/Capsule')
            setCapsule({ url: url, type: 'cube'})
        }
    }

    const mesh =
        <group onClick={() => handleClick()} {...useHover(hover, isClickable)}>
            {properties.structure.map(({ position: p, args }, i) => (
                <Cubelet key={i} position={p} args={args} url={url} puzzle={properties.ids[i]} />
            ))}
            <mesh position={[-0.25, -0.25, -0.25]}>
                <boxGeometry args={[1, 1, 1]} />
                <MeshDiscardMaterial />
                {hovered && <Outlines thickness={0.05} color='white' />}
            </mesh>
        </group>

    return (physics ? MakeRigid(mesh, position, rotation) : <group ref={group} position={position} rotation={rotation}>{mesh}</group>)
}

GachaCube.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png',
    physics: true,
}

GachaCube.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    isClickable: PropTypes.bool,
    url: PropTypes.string,
    physics: PropTypes.bool,
}

function getCompoundStructure() {
    const s = 0.5
    let structure = []
    let ids = []
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
                structure.push({ position: [i * s - s, j * s - s, k * s - s], args: [0.5, 0.5, 0.5] })
                ids.push([i, j, k])
            }
        }
    }
    return { structure: structure, ids: ids }
}

function Cubelet({ position, url, puzzle, args }) {
    const ref = useRef()
    const tex = useTexture(url)
    const disp = useTexture('/images/waves.jpeg')
    const transform = [puzzle[0] / 2, puzzle[1] / 2]
    const num = puzzle.reduce((a, c) => a + c, 0)

    useFrame(({ clock, mouse }) => {
        ref.current.material.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <mesh castShadow receiveShadow ref={ref} position={position}>
            <boxGeometry args={args} />
            <portalMaterial img0={tex} transform={transform} disp={disp} i={num + 1} roughness={0} />
        </mesh>
    )
}

function CollectionCubes({ urlList, posRotList }) {
    return (
        <Suspense fallback={null}>
            {urlList.map((url, index) => {
                return <GachaCube
                    url={url}
                    key={url + index}
                    position={posRotList[index].pos}
                    rotation={posRotList[index].rot}
                />
            })}
        </Suspense>
    )
}