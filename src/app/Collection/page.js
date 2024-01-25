'use client'

// import styles from './page.module.css'
import React, { useState, Suspense, useRef } from "react"
import * as THREE from 'three'
import { DirectionalLightHelper, PointLightHelper } from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, SoftShadows, Loader, useHelper } from '@react-three/drei'
import { useControls } from 'leva'

import { randomDraw } from '../../components/CollectionUtils'
import { Overlay } from '../../components/Overlay'

import { GachaCube, CollectionCubes } from '../../components/GachaCube'
import { GachaSphere, CollectionSpheres } from '../../components/GachaSphere'
import { GachaTetrahedron, CollectionTetrahedrons } from '../../components/GachaTetrahedron'
import { GachaCylinder, CollectionCylinders } from '../../components/GachaCylinder'
import { Ground } from '../../components/Ground'
import { TexturedGround } from '../../components/TexturedGround'
import { GachaScene } from '../../components/GachaScene'
import { Physics } from '@react-three/cannon'
import { useContactMaterials } from '../../components/PhysicsMaterials'

export default function Home() {
  const [scene, setScene] = useState({ name: "gacha", url: null, type: null })
  const { color } = useControls({ color: "white" })

  return (
    <>
      <Canvas shadows camera={{ position: [-20, 15, 25], fov: 30 }} linear >
        <color attach="background" args={[color]} />
        <Lighting />
        <Suspense fallback={null}>
          <ChooseScene scene={scene} setScene={setScene} color={color} />
        </Suspense>
        <Environment preset="studio" />
        <OrbitControls maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <Loader />
      <Overlay setScene={setScene} />
    </>
  )
}

function Lighting() {
  const { ...softConfig } = useControls({
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 }
  })

  const shadowLight = useRef()
  const pointlight = useRef()
  const pointlight2 = useRef()

  useHelper(shadowLight, DirectionalLightHelper, 0.5, "black")
  useHelper(pointlight, PointLightHelper, 0.5, "blue")
  useHelper(pointlight2, PointLightHelper, 0.5, "black")

  return (<>
    <SoftShadows {...softConfig} />
    <ambientLight intensity={0.5} />
    <directionalLight ref={shadowLight} castShadow position={[3, 8, 8]} intensity={10} shadow-mapSize={2048}>
      <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
    </directionalLight>
    <pointLight ref={pointlight} position={[-5, 2, -2]} intensity={5} />
    <pointLight ref={pointlight2} position={[5, 2, 0]} intensity={5} />
  </>)
}

function ChooseScene({ scene, setScene, color }) {
  const urlList = ['/9.JPG', '/10.JPG', '/11.JPG', '/12.JPG', '/13.JPG', '/14.JPG', '/15.JPG', '/16.JPG', "17.jpg"]

  let componentScene = <CollectionScene urlList={urlList} setScene={setScene} />
  if (scene.name === 'focus') { componentScene = <FocusScene url={scene.url} type={scene.type} setScene={setScene} /> }
  else if (scene.name === 'gacha') { componentScene = <GachaScene setScene={setScene} urlList={urlList} /> }

  return (
    <Physics>
      {componentScene}
      <Ground position={[0, -1, 0]} color={color} />
    </Physics>
  )
}

function FocusScene({ url, type, setScene }) {
  useThree(({ camera }) => { camera.position.set(0, 0, 10) })
  let mesh = null
  if (type === 'cube') { mesh = <GachaCube url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'sphere') { mesh = <GachaSphere url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'tetrahedron') { mesh = <GachaTetrahedron url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  if (type === 'cylinder') { mesh = <GachaCylinder url={url} position={[0, 0, 0]} rotation={[0, 0, 0]} setScene={setScene} isClickable={false} /> }
  return (
    <group>
      <TexturedGround position={[0, -1.1, 0]} url={url} />
      {mesh}
    </group>
  )
}

function CollectionScene({ urlList, setScene }) {
  const gachas = randomDraw(urlList, 4, 4)
  useContactMaterials()

  return (
    <Suspense fallback={null}>
      <CollectionCubes urlList={gachas.urls[0]} setScene={setScene} posRotList={gachas.positions[0]} />
      <CollectionTetrahedrons urlList={gachas.urls[1]} setScene={setScene} posRotList={gachas.positions[1]} />
      <CollectionSpheres urlList={gachas.urls[2]} setScene={setScene} posRotList={gachas.positions[2]} />
      <CollectionCylinders urlList={gachas.urls[3]} setScene={setScene} posRotList={gachas.positions[3]} />
    </Suspense>
  )
}