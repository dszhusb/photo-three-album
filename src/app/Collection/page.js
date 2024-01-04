'use client'

// import styles from './page.module.css'
import { useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { OrbitControls, Environment } from '@react-three/drei'
import { useControls } from 'leva'

import { randPos, randRot } from '../../components/CollectionUtils'
import { Overlay } from '../../components/Overlay'

import { GachaCube, CollectionCubes } from '../../components/GachaCube'
import { GachaSphere, CollectionSpheres } from '../../components/GachaSphere'
import { GachaTetrahedron, CollectionTetrahedrons } from '../../components/GachaTetrahedron'
import { Ground } from '../../components/Ground'
import { TexturedGround } from '../../components/TexturedGround'
import { GachaScene } from '../../components/GachaScene'
import { Physics } from '@react-three/cannon'
import { useContactMaterials } from '../../components/PhysicsMaterials'

export default function Home() {
  const [scene, setScene] = useState({ name: "gacha", url: null, type: null })
  const { color } = useControls({ color: "#5e66ff"})
  return (
    <>
      <Canvas shadows camera={{ position: [0, 10, 10], fov: 30 }}>
        <color attach="background" args={[color]} />
        <ChooseScene scene={scene} setScene={setScene} />
        <AccumulativeShadows temporal frames={200} color={color} colorBlend={2} toneMapped={true} alphaTest={0.75} opacity={2} scale={25} position={[0, -0.99, 0]} >
          <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 10, -10]} bias={0.001} />
        </AccumulativeShadows>
        <Environment preset="city" />
        <OrbitControls maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <Overlay setScene={setScene} />
    </>
  )
}

function ChooseScene({ scene, setScene }) {
  const urlList = ['/hair.png', '/lemon.png', '/clip.png', '/test.png']

  let componentScene = <CollectionScene urlList={urlList} setScene={setScene} />
  if (scene.name === 'focus') { componentScene = <FocusScene url={scene.url} type={scene.type} setScene={setScene} /> }
  else if (scene.name === 'gacha') { componentScene = <GachaScene setScene={setScene} /> }

  return (
    <Physics>
      {componentScene}
    </Physics>
  )
}

function FocusScene({ url, type, setScene }) {
  let mesh = null
  if (type === 'cube') { mesh = <GachaCube url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'sphere') { mesh = <GachaSphere url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'tetrahedron') { mesh = <GachaTetrahedron url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  return (
    <group>
      <TexturedGround position={[0, 2, -5]} url={url} />
      <Ground position={[0, -1, 0]} />
      {mesh}
    </group>
  )
}

function CollectionScene({ urlList, setScene }) {
  let posRotList = []
  for (let i = 0; i < urlList.length * 2; i++) {
    posRotList.push({ pos: [randPos(), 3 + 2 * i, randPos()], rot: [randRot(), randRot(), randRot()] })
  }

  useContactMaterials()

  return (
    <group>
      <Ground position={[0, -1, 0]} />
      <CollectionCubes urlList={urlList} setScene={setScene} posRotList={posRotList.slice(0, urlList.length)} />
      <CollectionTetrahedrons urlList={urlList} setScene={setScene} posRotList={posRotList.slice(urlList.length)} />
      <CollectionSpheres urlList={urlList} setScene={setScene} posRotList={posRotList.slice(urlList.length)} />
    </group>
  )
}