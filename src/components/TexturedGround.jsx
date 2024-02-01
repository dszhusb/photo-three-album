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
    return (
        <group rotation={[-Math.PI / 6, 0, 0]} position={props.position}>
            <mesh position={[0, 0, 0.06]} >
                <planeGeometry args={[4.75, 4.75]} />
                <imageMaterial img={colorMap} />
            </mesh>
            <mesh castShadow>
                <boxGeometry args={[5, 5, 0.1]} />
                <Metal />
            </mesh>
        </group>
    )
}