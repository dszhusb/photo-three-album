import * as THREE from 'three'
import { MeshTransmissionMaterial, MeshDistortMaterial } from '@react-three/drei'

export { DropletMaterial, GlassMaterial, CeramicMaterial, PlasticMaterial, Metal, Plastic}

//GACHA MATERIALS
function PlasticMaterial({ colorMap }) {
    const normalTexture = new THREE.TextureLoader().load("/images/streaked.jpeg")
    return <meshStandardMaterial map={colorMap} normalMap={normalTexture} normalScale={[1,0.5]} roughness={0} metalness={0.7} />
}

function DropletMaterial({ colorMap }) {
    return <MeshDistortMaterial map={colorMap} clearcoat={1} roughness={0.5} speed={3} opacity={0.9} transparent />
}

function GlassMaterial({ colorMap }) {
    return <MeshTransmissionMaterial map={colorMap} resolution={2048} clearcoat={0.5} distortion={1} thickness={0.5} backside chromaticAbberation={1} />
}

function CeramicMaterial({ colorMap }) {
    return <meshToonMaterial map={colorMap} />
}

//GENERAL MATERIALS
function Metal({color}) {
    return <meshStandardMaterial metalness={1} roughness={0.1} color={color}/>
}

function Plastic({color}) {
    return <meshPhongMaterial shininess={1} />
}