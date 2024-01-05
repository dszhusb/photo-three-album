import * as THREE from 'three'
import { MeshTransmissionMaterial, MeshDistortMaterial } from '@react-three/drei'

export { DropletMaterial, GlassMaterial, CeramicMaterial }

function CeramicMaterial({ colorMap }) {
    
}

function BasicMaterial({ colorMap }) {
    return <meshBasicMaterial map={colorMap} />
}

function DropletMaterial({ colorMap }) {
    return <MeshDistortMaterial map={colorMap} clearcoat={1} roughness={0.5} />
}

function GlassMaterial({ colorMap }) {
    return (
        <MeshTransmissionMaterial
            map={colorMap}
            resolution={1024}
            clearcoat={1}
            roughness={0.35}
            distortion={1}
            thickness={0.5}
            opacity={0.5}
        />
    )
}