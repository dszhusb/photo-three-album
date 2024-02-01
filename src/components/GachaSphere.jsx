import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { DropletMaterial } from './GachaMaterials'
import { useHover } from './CollectionUtils'

export { GachaSphere, CollectionSpheres }

function GachaSphere({ position, rotation, setScene, url, isClickable, type }) {
    const args = [0.6]
    const [scale, setScale] = useState(1)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    const material = <DropletMaterial colorMap={colorMap} />

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'sphere' })
    }

    return (
        <RigidBody position={position} rotation={rotation} angularDamping={2.0}>
            <mesh scale={scale} castShadow receiveShadow onClick={() => handleClick()} {...useHover(setScale, isClickable)}>
                <sphereGeometry args={args} />
                {material}
            </mesh>
        </RigidBody>
    )
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