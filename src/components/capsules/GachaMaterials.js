import * as THREE from 'three'
import { MeshTransmissionMaterial, MeshDistortMaterial, shaderMaterial } from '@react-three/drei'

export { DropletMaterial, GlassMaterial, CeramicMaterial, PlasticMaterial, Metal, Plastic, Glass, PortalMaterial}

//GACHA MATERIALS
function PlasticMaterial({ colorMap }) {
    const normalTexture = new THREE.TextureLoader().load("/images/streaked.jpeg")
    return <meshStandardMaterial map={colorMap} normalMap={normalTexture} normalScale={[1, 0.5]} roughness={0} metalness={0.7} />
}

function DropletMaterial({ colorMap }) {
    return <MeshDistortMaterial map={colorMap} clearcoat={1} roughness={0.5} speed={3} opacity={1} transparent />
}

function GlassMaterial({ colorMap }) {
    return <MeshTransmissionMaterial
        background={colorMap}
        resolution={2048}
        roughness={0.2}
        anisotropicBlur={0.5}
        temporalDistortion={0.05}
        distortionScale={1}
        distortion={1}
        thickness={0.5}
        backside
    />
}

function CeramicMaterial({ colorMap }) {
    return <meshToonMaterial map={colorMap} />
}

//GENERAL MATERIALS
function Metal({ color }) {
    return <meshStandardMaterial metalness={1} roughness={0.1} color={color} />
}

function Plastic({ color }) {
    return <meshPhongMaterial color={color} shininess={1} />
}

function Glass() {
    return <meshPhysicalMaterial color='#efefef' transmission={1} roughness={0.35} thickness={500} envMapIntensity={4} />
}

//Shader Materials

const PortalMaterial = shaderMaterial(
    { img0: undefined, disp: undefined, transform: [0.0, 0.0], uTime: { value: 0.0 }, i: 0.0 },
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
        uniform vec2 transform;
        uniform float i;
        uniform sampler2D img0;
        uniform sampler2D disp;
        uniform float uTime;

        vec2 rotateUV(vec2 uv, float rotation) {
            float mid = 0.5;
            return vec2(
                cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
                cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
            );
        }

        float random(float seed) {
            return fract(sin(seed) * 1000.0);
        }

        float noise(float seed) {
            float i = floor(seed);
            float f = fract(seed);
            return mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));
        }

        void main() {
            vec2 uv = vec2(vUv.x / 2.0 + transform.x, vUv.y / 2.0 + transform.y);
            float t = 6.28 * noise(uTime * i / 10.0);
            uv = rotateUV(uv, t);
            vec4 tex = vec4(texture2D(img0, uv).rgb, 1.0);
            gl_FragColor = tex;
        }
    `
)