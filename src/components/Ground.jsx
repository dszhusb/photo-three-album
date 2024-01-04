//GROUND COMPONENT
import { usePlane } from '@react-three/cannon'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { groundMaterial } from './PhysicsMaterials'
export { Ground }

function Ground(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: props.position, material: groundMaterial, ...props }))
    return (
        <mesh ref={ref}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
    )
}