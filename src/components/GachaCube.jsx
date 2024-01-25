import PropTypes from 'prop-types'
import { Suspense, useState, useMemo, useEffect, useRef } from 'react'
import { useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useBox } from '@react-three/cannon'
import { cubeMaterial } from './PhysicsMaterials'
import { shaderMaterial, useTexture } from '@react-three/drei'
import { useHover } from './CollectionUtils'
import * as THREE from 'three'

const PortalMaterial = shaderMaterial(
    { img0: undefined, transform: [0, 0] },
    `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    `
        precision mediump float;

        varying vec2 vUv;
        uniform vec2 transform;
        uniform sampler2D img0;

        void main() {
            vec2 uv = vec2(vUv.x / 2.0 + transform.x, vUv.y / 2.0 + transform.y);
            vec3 texture = texture2D(img0, uv).rgb;
            gl_FragColor = vec4(texture, 1.0);
        }
    `
)

extend({ PortalMaterial })

export { GachaCube, CollectionCubes }

function GachaCube({ position, rotation, setScene, url, isClickable, type }) {
    const [scale, setScale] = useState(1)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    // const ref = useBox(() => ({ mass: 1, type: type, position: position, rotation: rotation, material: cubeMaterial }))

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'cube' })
    }

    const s = 0.5
    const boxGeometry = useMemo(() => {
        return new THREE.BoxGeometry(s, s, s)
    }, [])

    // const mesh =
    //     <mesh scale={scale} ref={ref} castShadow onClick={() => handleClick()} {...useHover(setScale, isClickable)}>
    //         <boxGeometry />
    //         <CeramicMaterial colorMap={colorMap} />
    //     </mesh>

    return (
        <>
            <group>
                {[...Array(2).keys()].map((i) =>
                    [...Array(2).keys()].map((j) =>
                        [...Array(2).keys()].map((k) =>
                            <Cubelet key={i + j * 3 + k * 9} position={[i * s - s, j * s - s, k * s - s]} geometry={boxGeometry} url={url} puzzle={[i,j,k]} />
                        ))
                )}
            </group>
        </>
    )
}

GachaCube.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png',
    type: "Dynamic"
}

GachaCube.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
    type: PropTypes.string
}

function Cubelet({ position, geometry, url, puzzle }) {
    const tex = useTexture(url)
    const transform = [puzzle[0], puzzle[1]]
    return (
        <mesh position={position} geometry={geometry}>
            <portalMaterial img0={tex} transform={transform} />
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