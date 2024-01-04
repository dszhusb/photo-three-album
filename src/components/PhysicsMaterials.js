import { useContactMaterial } from '@react-three/cannon'
export { useContactMaterials, groundMaterial, sphereMaterial, cubeMaterial, tetraMaterial }

const groundMaterial = 'ground'
const sphereMaterial = 'sphere'
const cubeMaterial = 'cube'
const tetraMaterial = 'tetra'

const useContactMaterials = () => {
    useContactMaterial(sphereMaterial, groundMaterial, {
      friction: 1,
      restitution: 0.3,
    })
  }