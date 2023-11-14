import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSphere } from '@react-three/cannon'

export { GachaSphere, CollectionSpheres }

function GachaSphere({ position, rotation, setScene, url, isClickable }) {
    const [ref] = useSphere(() => ({ mass: 1, position: position, rotation: rotation, radius: 0.5 }))
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'sphere' })
    }

    const mesh = <mesh ref={ref} castShadow receiveShadow
        onClick={() => handleClick()}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}>
        <sphereGeometry />
        <meshLambertMaterial color={hovered && isClickable ? 'purple' : '#ffffff'} map={colorMap} />
    </mesh>

    return mesh
}

GachaSphere.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png'
}

GachaSphere.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
}

function CollectionSpheres({ urlList, setScene, posRotList }) {
    return (
        <Suspense fallback={null}>
            {urlList.map((url, index) => {
                return <GachaSphere
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