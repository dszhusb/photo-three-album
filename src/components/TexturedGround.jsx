//GROUND COMPONENT
import { extend } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import { Metal } from './GachaMaterials'
export { TexturedGround }

const ImageMaterial = shaderMaterial(
    { img: undefined },
    `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    `
        precision mediump float;

        varying vec2 vUv;
        uniform sampler2D img;
        uniform float uTime;

        void main() {
            vec4 tex = vec4(texture2D(img, vUv).rgb, 1.0);
            gl_FragColor = tex;
        }
    `
)

extend({ ImageMaterial })

function TexturedGround(props) {
    const colorMap = useTexture(props.url)
    const aspectX = Math.min(colorMap.image.width / colorMap.image.height, 1)
    const aspectY = Math.min(colorMap.image.height / colorMap.image.width, 1)
    return (
        <group rotation={[-Math.PI / 6, 0, 0]} position={props.position}>
            <mesh position={[0, 0, 0.06]} >
                <planeGeometry args={[4.75 * aspectX, 4.75 * aspectY]} />
                <imageMaterial img={colorMap} />
            </mesh>
            <mesh castShadow>
                <boxGeometry args={[5 * aspectX, 5 * aspectY, 0.1]} />
                <Metal />
            </mesh>
        </group>
    )
}