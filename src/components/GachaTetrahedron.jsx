import PropTypes from 'prop-types'
import { Suspense, useState, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useConvexPolyhedron } from '@react-three/cannon'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { tetraMaterial } from './PhysicsMaterials'
import { Geometry } from 'three-stdlib'
import * as THREE from 'three'

export { GachaTetrahedron, CollectionTetrahedrons }

function GachaTetrahedron({ position, rotation, setScene, url, isClickable }) {

    const geo = useMemo(() => {
        const g = new THREE.TetrahedronGeometry()
        const geo = new Geometry().fromBufferGeometry(g)
        geo.mergeVertices()
        return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]
    }, [])

    const [ref] = useConvexPolyhedron(() => ({ mass: 1, position: position, rotation: rotation, material: tetraMaterial, args: geo }))
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'tetrahedron' })
    }

    const mesh =
        <mesh ref={ref} dispose={null} castShadow receiveShadow onClick={() => handleClick()} onPointerOver={(event) => (event.stopPropagation(), hover(true))} onPointerOut={() => hover(false)}>
            <tetrahedronGeometry />
            <MeshTransmissionMaterial
                color={hovered && isClickable ? 'blue' : '#ffffff'}
                map={colorMap}
                resolution={1024}
                clearcoat={1}
                roughness={0.35}
                distortion={1}
                thickness={0.5}
                opacity={0.5}
            />
        </mesh>

    return mesh
}

GachaTetrahedron.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png'
}

GachaTetrahedron.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
}

function CollectionTetrahedrons({ urlList, setScene, posRotList }) {
    return (
        <Suspense fallback={null}>
            {urlList.map((url, index) => {
                return <GachaTetrahedron
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