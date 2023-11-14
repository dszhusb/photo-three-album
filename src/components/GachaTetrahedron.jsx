import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useBox, useSphere} from '@react-three/cannon'

export { GachaTetrahedron, CollectionTetrahedrons }

function GachaTetrahedron({ position, rotation, setScene, url, isClickable }) {
    const [ref] = useBox(() => ({ mass: 1, position: position, rotation: rotation, radius: 0.5 }))
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'tetrahedron' })
    }

    const mesh = <mesh ref={ref} castShadow receiveShadow
        onClick={() => handleClick()}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}>
        <tetrahedronGeometry />
        <meshLambertMaterial color={hovered && isClickable ? 'blue' : '#ffffff'} map={colorMap} />
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