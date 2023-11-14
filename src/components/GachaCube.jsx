import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useBox } from '@react-three/cannon'

export { GachaCube, CollectionCubes }

function GachaCube({ position, rotation, setScene, url, isClickable }) {
    const [ref] = useBox(() => ({ mass: 1, position: position, rotation: rotation }))
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'cube' })
    }

    const mesh = <mesh ref={ref} castShadow receiveShadow
        onClick={() => handleClick()}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}>
        <boxGeometry />
        <meshPhysicalMaterial color={hovered && isClickable ? 'blue' : '#ffffff'} map={colorMap} reflectivity={1} metalness={0.5} iridescense={1} roughness={0} clearcoat={1} clearcoatRoughness={0} />
    </mesh>

    return mesh
}

GachaCube.defaultProps = {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    isClickable: true,
    url: 'images/placeholder.png'
}

GachaCube.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    setScene: PropTypes.func,
    isClickable: PropTypes.bool,
    url: PropTypes.string,
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