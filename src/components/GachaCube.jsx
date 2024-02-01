import PropTypes from 'prop-types'
import { Suspense, useState, useMemo, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { PortalMaterial } from './GachaMaterials'
import { useTexture } from '@react-three/drei'
import { useHover } from './CollectionUtils'
import * as THREE from 'three'

extend({ PortalMaterial })
export { GachaCube, CollectionCubes }

function GachaCube({ position, rotation, setScene, url, isClickable, type, physics }) {
    const [clicked, click] = useState(false)
    const [scale, setScale] = useState([1, 1, 1])
    function handleClick() { click(!clicked); setScene({ name: 'focus', url: url, type: 'cube' }) }
    const properties = getCompoundStructure()

    return (
        <RigidBody position={position} rotation={rotation} onClick={() => handleClick()} scale={scale} {...useHover(setScale, isClickable)}>
            {properties.structure.map(({ position: p, args }, i) => (
                <Cubelet key={i} position={p} args={args} url={url} puzzle={properties.ids[i]} />
            ))}
        </RigidBody>
    )
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
    setScene: PropTypes.func,
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

function CollectionCubes({ urlList, setScene, posRotList }) {
    return (
        <Suspense fallback={null}>
            {urlList.map((url, index) => {
                return <GachaCube
                    url={url}
                    key={url + index}
                    position={posRotList[index].pos}
                    rotation={posRotList[index].rot}
                    setScene={setScene}
                />
            })}
        </Suspense>
    )
}