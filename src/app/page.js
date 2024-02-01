"use client"
import styles from './page.module.css'
import Link from 'next/link'

import { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

import { Ground } from '../components/Ground'
import { Lighting } from '../components/CollectionUtils'
import { GachaSphere } from '../components/GachaSphere'
import { GachaTetrahedron } from '../components/GachaTetrahedron'
import { GachaCube } from '../components/GachaCube'

export default function Home() {
  const ref = useRef()
  const doNothing = () => { console.log('naught') }
  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.title}><h1 className={styles.h1}>Pictogem</h1></div>
        <p className={styles.p}>Welcome to Pictopon - an amalgam of “pictus” from the Latin “to draw” and “gachapon” a style of Japanese collectable vending machine toy. Each day, presenting a new photo rewards you with time capsules from the past, previous pictures mapped onto the shapes of flickering cubes, jelly-like droplets, and more!</p>
        <p className={styles.p}>Pictopon emerged from an early exploration of 3D learning. As new 3D modelers quickly learn, wrapping a raw 2D image onto a 3D form often distorts the image in strange and unintended ways. But instead of seeing the bulges and seams as a mistake, I found in the weirdness a source of delight! Pictopon ignores a lesson in UV mapping, casting a common mistake as the central source of novelty. The challenge became manipulating shape and material in ways that instead of reading as a mistake, refreshes old memories with new life.</p>
        <p className={styles.p}>This project is built with React, Three.js, React Three Fiber, and more. It is my first foray into the world of developing 3D experiences for web, shaders, as well as an exercise in my graphic design and UI skills. I hope you enjoy the following prototype!</p>
        <Link href='/Collection'>Collection</Link>
      </div>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Canvas
          shadows
          linear
          eventSource={ref}
          eventPrefix="offset"
          style={{ pointerEvents: 'none' }}
          camera={{ position: [0, 4, 0] }}
        >
          <Lighting />
          <Physics>
            <Ground position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <GachaCube url={'/9.JPG'} position={[2, 0, -1]} setScene={doNothing} rotation={[0, Math.PI / 3, 0]} isClickable={false} />
            <GachaTetrahedron url={'/10.JPG'} position={[0, 2, 0]}  setScene={doNothing} rotation={[0, 0, 0.4]} isClickable={false} />
          </Physics>
        </Canvas>
      </div>
    </div>
  )
}