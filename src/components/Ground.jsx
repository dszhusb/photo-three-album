//GROUND COMPONENT
import { usePlane } from '@react-three/cannon'
export { Ground }

function Ground(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: props.position, ...props}))
    return (
        <mesh ref={ref} receiveShadow >
            <planeGeometry args={[1000, 1000]} />
            <shadowMaterial transparent color="lightblue" opacity={1} />
        </mesh>
    )
}