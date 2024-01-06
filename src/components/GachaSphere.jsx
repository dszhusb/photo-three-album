import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSphere } from '@react-three/cannon'
import { DropletMaterial } from './GachaMaterials'
import { sphereMaterial } from './PhysicsMaterials'
import { useHover } from './CollectionUtils'

export { GachaSphere, CollectionSpheres }

function GachaSphere({ position, rotation, setScene, url, isClickable, type}) {
    const [scale, setScale] = useState(1)
    const [ref] = useSphere(() => ({ mass: 1, type: type, position: position, rotation: rotation, radius: 0.25, material: sphereMaterial, angularDamping: 0.9 }))
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    const material = <DropletMaterial colorMap={colorMap} />

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'sphere' })
    }

    const mesh =
        <mesh ref={ref} scale={scale} castShadow receiveShadow onClick={() => handleClick()} radius={0.25} {...useHover(setScale, isClickable)}>
            <sphereGeometry />
            {material}
        </mesh>

    return mesh
}

GachaSphere.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png',
    type: "Dynamic"
}

GachaSphere.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
    type: PropTypes.string
}

function CollectionSpheres({ urlList, setScene, posRotList }) {
    return (
        <Suspense fallback={null}>
            {urlList.map((url, index) => {
                return <GachaSphere url={url} key={url + index} position={posRotList[index].pos} rotation={posRotList[index].rot} setScene={setScene} />
            })}
        </Suspense>
    )
}