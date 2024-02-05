import PropTypes from 'prop-types'
import { Suspense, useState, useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { PlasticMaterial } from './GachaMaterials'
import { useHover, MakeRigid } from './CollectionUtils'
import { Outlines, useScroll } from '@react-three/drei'

export { GachaCylinder, CollectionCylinders }

function GachaCylinder({ position, rotation, setScene, url, isClickable, physics }) {
    const args = [0.5, 0.5, 1.5]
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    const material = <PlasticMaterial colorMap={colorMap} />

    const group = useRef()
    const data = useScroll()
    useFrame(() => {
        if (!physics) {
            group.current.rotation.y = data.offset
        }
    })

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'cylinder' })
    }

    const mesh =
        <mesh castShadow receiveShadow onClick={() => handleClick()} {...useHover(hover, isClickable)}>
            <cylinderGeometry args={args} />
            {material}
            {hovered && <Outlines thickness={0.04} color="white" opacity={1} />}
        </mesh>

    return (physics ? MakeRigid(mesh, position, rotation, 1) : <group ref={group} position={position} rotation={rotation}>{mesh}</group>)
}

GachaCylinder.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png',
    physics: true,
}

GachaCylinder.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
    physics: PropTypes.bool,
}

function CollectionCylinders({ urlList, setScene, posRotList }) {
    return (
        <Suspense fallback={null}>
            {urlList.map((url, index) => {
                return <GachaCylinder url={url} key={url + index} position={posRotList[index].pos} rotation={posRotList[index].rot} setScene={setScene} />
            })}
        </Suspense>
    )
}