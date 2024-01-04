//GROUND COMPONENT
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
export { TexturedGround }

function TexturedGround(props) {
    const colorMap = useLoader(TextureLoader, props.url)
    return (
        <mesh castShadow rotation={[-Math.PI / 8, 0, 0]} position={props.position}>
            <boxGeometry args={[5, 5, 0.1]} />
            <meshLambertMaterial map={colorMap} />
        </mesh>
    )
}