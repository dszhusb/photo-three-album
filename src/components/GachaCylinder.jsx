import PropTypes from 'prop-types'
import { Suspense, useState, useRef } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { PlasticMaterial } from './GachaMaterials'
import { useHover, MakeRigid, Annotation } from './CollectionUtils'

export { GachaCylinder, CollectionCylinders }

function GachaCylinder({ position, rotation, setScene, url, isClickable, physics }) {
    const args = [0.5, 0.5, 1.5]
    const main = useRef()
    const controls = useThree((state) => state.controls)
    const [scale, setScale] = useState([1, 1, 1])
    const [clicked, click] = useState(false)
    const colorMap = useLoader(TextureLoader, url)
    const material = <PlasticMaterial colorMap={colorMap} />

    function handleClick() {
        click(!clicked)
        // setScene({ name: 'focus', url: url, type: 'cylinder' })
    }

    const mesh =
        <mesh ref={main} scale={scale} castShadow receiveShadow onClick={(e) => (e.stopPropagation(), controls.fitToBox(main.current, true))} onDoubleClick={() => handleClick()} {...useHover(setScale, isClickable)}>
            <cylinderGeometry args={args} />
            {material}
            {scale[0] !== 1 && <Annotation url={url} />}
        </mesh>

    return (physics ? MakeRigid(mesh, position, rotation, 1) : mesh)
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