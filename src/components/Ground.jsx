//GROUND COMPONENT
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
export { Ground }

function Ground({ position, rotation}) {
    return (
        <RigidBody position={position} rotation={rotation}>
            <mesh receiveShadow>
                <planeGeometry args={[50, 50]} />
                <shadowMaterial transparent opacity={0.4} />
            </mesh>
        </RigidBody>
    )
}