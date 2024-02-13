import { OctahedronGeometry } from 'three'
import { suspend } from 'suspend-react'
import { useRef } from 'react'
import { MeshRefractionMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

export function Cursor() {
    const cRef = useRef()
    const { viewport } = useThree()
    const city = import('@pmndrs/assets/hdri/city.exr').then((module) => module.default)
    useFrame(({ mouse }) => {
        const x = (mouse.x * viewport.width) / 2
        const y = (mouse.y * viewport.height) / 2
        cRef.current.position.set(x, y, 0)
        cRef.current.rotation.set(-y * 3, x * 3, 0)
    })

    return (
        <mesh ref={cRef}>
            <octahedronGeometry args={[0.2, 0]} />
            {/* <MeshRefractionMaterial envMap={suspend(city)} /> */}
        </mesh>
    )
}