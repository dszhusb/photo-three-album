import PropTypes from 'prop-types'
import { Suspense, useState, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
// import { RigidBody } from '@react-three/rapier'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GlassMaterial } from './GachaMaterials'
import { useHover, MakeRigid, Annotation } from './CollectionUtils'

export { GachaTetrahedron, CollectionTetrahedrons }

function GachaTetrahedron({ position, rotation, setScene, url, isClickable, physics }) {

    const [scale, setScale] = useState([1, 1, 1])
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    const material = <GlassMaterial colorMap={colorMap} />

    function handleClick() {
        click(!clicked)
        setScene({ name: 'focus', url: url, type: 'tetrahedron' })
    }

    const mesh =
        <mesh scale={scale} castShadow receiveShadow onClick={() => handleClick()} {...useHover(setScale, isClickable)}>
            <tetrahedronGeometry />
            {material}
            {scale[0] !== 1 && <Annotation url={url} />}
        </mesh>

    return (physics ? MakeRigid(mesh, position, rotation) : mesh)
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