import PropTypes from 'prop-types'
import { Suspense, useState, useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GlassMaterial } from './GachaMaterials'
import { useHover, MakeRigid } from './CollectionUtils'
import { Outlines, useScroll } from '@react-three/drei'

export { GachaTetrahedron, CollectionTetrahedrons }

function GachaTetrahedron({ position, rotation, setScene, url, isClickable, physics }) {

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    const material = <GlassMaterial colorMap={colorMap} />

    const group = useRef()
    const data = useScroll()
    useFrame(() => {
        if (!physics) { group.current.rotation.y = data.offset * 3 }
    })

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'tetrahedron' })
    }

    const mesh =
        <mesh castShadow receiveShadow onClick={() => handleClick()} {...useHover(hover, isClickable)}>
            <tetrahedronGeometry />
            {material}
            {hovered && <Outlines thickness={0.05} color='white' />}
        </mesh>

    return (physics ? MakeRigid(mesh, position, rotation) : <group ref={group} position={position} rotation={rotation}>{mesh}</group>)
}

GachaTetrahedron.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png',
    physics: true,
}

GachaTetrahedron.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
    physics: PropTypes.bool,
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