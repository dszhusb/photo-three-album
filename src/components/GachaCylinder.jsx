import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useCylinder } from '@react-three/cannon'
import { PlasticMaterial } from './GachaMaterials'
import { sphereMaterial } from './PhysicsMaterials'
import { useHover } from './CollectionUtils'

export { GachaCylinder, CollectionCylinders }

function GachaCylinder({ position, rotation, setScene, url, isClickable, type}) {
    const args = [0.5, 0.5, 1.5]
    const [scale, setScale] = useState(1)
    const [ref] = useCylinder(() => ({ mass: 1, type: type, position: position, rotation: rotation, material: sphereMaterial, angularDamping: 0.9, args: args }))
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    const material = <PlasticMaterial colorMap={colorMap} />

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'cylinder' })
    }

    const mesh =
        <mesh ref={ref} scale={scale} castShadow receiveShadow onClick={() => handleClick()} {...useHover(setScale, isClickable)}>
            <cylinderGeometry args={args} />
            {material}
        </mesh>

    return mesh
}

GachaCylinder.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png',
    type: "Dynamic"
}

GachaCylinder.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
    type: PropTypes.string
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