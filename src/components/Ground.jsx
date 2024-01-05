//GROUND COMPONENT
import { usePlane } from '@react-three/cannon'
import * as THREE from 'three'
import { groundMaterial } from './PhysicsMaterials'
export { Ground }

function Ground(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: props.position, material: groundMaterial, ...props }))
    const base = new THREE.Color(props.color)
    const shadows = new THREE.Color(props.color).lerp(0.1)
    return (
        <group>
            <mesh ref={ref} receiveShadow >
                <planeGeometry args={[50, 50]} />
                <shadowMaterial transparent opacity={0.4} />
            </mesh>
        </group>
    )
}