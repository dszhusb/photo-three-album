import * as THREE from 'three'
import concrete_normal from '%/images/concrete_normal.jpeg'
import { MeshTransmissionMaterial, MeshDistortMaterial } from '@react-three/drei'

export { DropletMaterial, GlassMaterial, CeramicMaterial, PlasticMaterial, Metal}

//GACHA MATERIALS
function PlasticMaterial({ colorMap }) {
    const normalTexture = new THREE.TextureLoader().load("/images/streaked.jpeg")
    return <meshPhongMaterial map={colorMap} specular="white" luminance={1} normalMap={normalTexture} normalScale={[1,0.5]} />
}

function DropletMaterial({ colorMap }) {
    return <MeshDistortMaterial map={colorMap} clearcoat={1} roughness={0.5} speed={3} opacity={0.9} transparent />
}

function GlassMaterial({ colorMap }) {
    return <MeshTransmissionMaterial map={colorMap} resolution={1024} ior={1.5} clearcoat={1} roughness={0.1} distortion={1} thickness={0.5} opacity={0.5} backside />
}

//GENERAL MATERIALS
function Metal({color}) {
    return <meshStandardMaterial metalness={1} roughness={0.1} color={color}/>
}

function CeramicMaterial({ colorMap }) {
    
}