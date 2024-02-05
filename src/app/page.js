"use client"
import styles from './page.module.css'
import Link from 'next/link'

import { useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Text, Scroll, ScrollControls, Preload } from '@react-three/drei'

import { Lighting } from '../components/CollectionUtils'
import { GachaSphere } from '../components/GachaSphere'
import { GachaTetrahedron } from '../components/GachaTetrahedron'
import { GachaCube } from '../components/GachaCube'

export default function App() {
  return (
    <Canvas linear camera={{ position: [0, 0, 20], fov: 15 }} style={{ height: '100vh' }}>
      <ScrollControls damping={0.5} pages={2}>
        <Type />
        <Objects />
        <Lighting />
        <Preload />
      </ScrollControls>
    </Canvas>
  )
}

function Type() {
  const { width, height } = useThree((state) => state.viewport)
  const header = { font: '/fonts/PPHatton-Medium.otf', color: "black" }
  return (
    <Scroll style={{ width: '100%' }}>
      <Text children="Pictogem" anchorX="center" position={[0, height / 3, 0]} {...header} />
      {/* <p className={styles.p}>Welcome to Pictopon - an amalgam of “pictus” from the Latin “to draw” and “gachapon” a style of Japanese collectable vending machine toy. Each day, presenting a new photo rewards you with time capsules from the past, previous pictures mapped onto the shapes of flickering cubes, jelly-like droplets, and more!</p>
      <p className={styles.p}>Pictopon emerged from an early exploration of 3D learning. As new 3D modelers quickly learn, wrapping a raw 2D image onto a 3D form often distorts the image in strange and unintended ways. But instead of seeing the bulges and seams as a mistake, I found in the weirdness a source of delight! Pictopon ignores a lesson in UV mapping, casting a common mistake as the central source of novelty. The challenge became manipulating shape and material in ways that instead of reading as a mistake, refreshes old memories with new life.</p>
      <p className={styles.p}>This project is built with React, Three.js, React Three Fiber, and more. It is my first foray into the world of developing 3D experiences for web, shaders, as well as an exercise in my graphic design and UI skills. I hope you enjoy the following prototype!</p>
      <Link href='/Collection'>Collection</Link> */}
    </Scroll>
  )
}

function Objects() {
  const doNothing = () => { console.log('naught') }
  const { width, height } = useThree((state) => state.viewport)
  return (
    <Scroll>
      <group>
        <GachaCube url={'/9.JPG'} physics={false} position={[width / 4, height / 5, 0]} setScene={doNothing} rotation={[0, Math.PI / 3, 0]} isClickable={false} />
        <GachaTetrahedron url={'/10.JPG'} physics={false} position={[0, -height, 0]} setScene={doNothing} rotation={[0, 0, 0.4]} isClickable={false} />
      </group>
    </Scroll>
  )
}