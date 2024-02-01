'use client'

// import styles from './page.module.css'
import React, { useState, Suspense, useRef, useMemo } from "react"
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Environment, Loader, Bvh } from '@react-three/drei'
import { useControls } from 'leva'

import { randomDraw, Lighting } from '../../components/CollectionUtils'
import { Overlay } from '../../components/Overlay'

import { GachaCube, CollectionCubes } from '../../components/GachaCube'
import { GachaSphere, CollectionSpheres } from '../../components/GachaSphere'
import { GachaTetrahedron, CollectionTetrahedrons } from '../../components/GachaTetrahedron'
import { GachaCylinder, CollectionCylinders } from '../../components/GachaCylinder'
import { Ground } from '../../components/Ground'
import { TexturedGround } from '../../components/TexturedGround'
import { GachaScene } from '../../components/GachaScene'

export default function Home() {
  const [scene, setScene] = useState({ name: "gacha", url: null, type: null })
  const { color } = useControls({ color: "#e5dede" })

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0 }}>
      <Canvas shadows camera={{ position: [-20, 15, 25], fov: 30 }} linear >
        <color attach="background" args={[color]} />
        <Lighting />
        <Bvh firstHitOnly>
          <Suspense fallback={null}>
            <ChooseScene scene={scene} setScene={setScene} />
          </Suspense>
        </Bvh>
        <Environment preset="studio" />
        <OrbitControls maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <Loader />
      <Overlay setScene={setScene} />
    </div>
  )
}

function ChooseScene({ scene, setScene }) {
  const urlList = ['/9.JPG', '/10.JPG', '/11.JPG', '/12.JPG', '/13.JPG', '/14.JPG', '/15.JPG', '/16.JPG', "17.jpg"]

  let componentScene = <CollectionScene urlList={urlList} setScene={setScene} />
  if (scene.name === 'focus') { componentScene = <FocusScene url={scene.url} type={scene.type} setScene={setScene} /> }
  else if (scene.name === 'gacha') { componentScene = <GachaScene setScene={setScene} urlList={urlList} /> }

  return (
    <Physics colliders='hull'>
      {componentScene}
      <Ground position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </Physics>
  )
}

function FocusScene({ url, type, setScene }) {
  let mesh = null
  if (type === 'cube') { mesh = <GachaCube url={url} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'sphere') { mesh = <GachaSphere url={url} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'tetrahedron') { mesh = <GachaTetrahedron url={url} position={[0, 2, 0]} rotation={[Math.PI / 4, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'cylinder') { mesh = <GachaCylinder url={url} position={[0, 1, 0]} rotation={[0, 0, Math.PI / 3]} setScene={setScene} isClickable={false} /> }
  return (
    <group>
      <TexturedGround position={[0, 1.5, -4]} url={url} />
      {mesh}
    </group>
  )
}

function CollectionScene({ urlList, setScene }) {
  const gachas = useMemo(() => { return randomDraw(urlList, 4, 4) })

  return (
    <Suspense fallback={null}>
      <CollectionCubes urlList={gachas.urls[0]} setScene={setScene} posRotList={gachas.positions[0]} />
      <CollectionTetrahedrons urlList={gachas.urls[1]} setScene={setScene} posRotList={gachas.positions[1]} />
      <CollectionSpheres urlList={gachas.urls[2]} setScene={setScene} posRotList={gachas.positions[2]} />
      <CollectionCylinders urlList={gachas.urls[3]} setScene={setScene} posRotList={gachas.positions[3]} />
    </Suspense>
  )
}