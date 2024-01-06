//GROUND COMPONENT
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Metal } from './GachaMaterials'
export { TexturedGround }

function TexturedGround(props) {
    const colorMap = useLoader(TextureLoader, props.url)
    return (
        <group rotation={[-Math.PI / 8, 0, 0]} position={props.position}>
            <mesh position={[0, 0, 0.06]} >
                <planeGeometry args={[4.75, 4.75]}/>
                <meshStandardMaterial map={colorMap} />
            </mesh>
            <mesh castShadow>
                <boxGeometry args={[5, 5, 0.1]} />
                <Metal />
            </mesh>
        </group>
    )
}