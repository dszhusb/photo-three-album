'use client'

// import styles from './page.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
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

export default function Home() {
  const [scene, setScene] = useState({ name: "gacha", url: null, type: null })
  const cameraConfig = { position: [0, 10, 0], fov: 30, near: 1, far: 100, minDistance: 3, maxDistance: 10 }
  return (
    <>
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }} >
        <PerspectiveCamera {...cameraConfig} />
        <color attach="background" args={['white']} />

        <ambientLight />
        <directionalLight position={[5, 12, 10]} castShadow shadow-mapSize={[2048, 2048]} />

        <OrbitControls maxPolarAngle={Math.PI / 2} />
        <ChooseScene scene={scene} setScene={setScene} />
      </Canvas>
      <Overlay setScene={setScene} />
    </>
  )
}

function ChooseScene({ scene, setScene }) {
  const urlList = ['/hair.png', '/lemon.png', '/clip.png']
  let componentScene = <CollectionScene urlList={urlList} setScene={setScene} />
  if (scene.name === 'focus') {
    componentScene = <FocusScene url={scene.url} type={scene.type} setScene={setScene} />
  } else if (scene.name === 'gacha') {
    componentScene = <GachaScene setScene={setScene} />
  }
  return componentScene
}

function FocusScene({ url, type, setScene }) {
  let mesh = null
  if (type === 'cube') { mesh = <GachaCube url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'sphere') { mesh = <GachaSphere url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'tetrahedron') { mesh = <GachaTetrahedron url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  return (
    <>
      <TexturedGround position={[0, 2, -5]} url={url} />
      <Physics>
        <Ground position={[0, -1, 0]} />
        {mesh}
      </Physics>
    </>
  )
}

function CollectionScene({ urlList, setScene }) {
  let posRotList = []
  for (let i = 0; i < urlList.length * 2; i++) {
    posRotList.push({ pos: [randPos(), 3 + 2 * i, randPos()], rot: [randRot(), randRot(), randRot()] })
  }

  return (
    <Physics>
      <Ground position={[0, -1, 0]} />
      <CollectionCubes urlList={urlList} setScene={setScene} posRotList={posRotList.slice(0, urlList.length)} />
      <CollectionTetrahedrons urlList={urlList} setScene={setScene} posRotList={posRotList.slice(urlList.length)} />
      <CollectionSpheres urlList={urlList} setScene={setScene} posRotList={posRotList.slice(urlList.length)} />
    </Physics>
  )
}