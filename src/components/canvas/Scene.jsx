'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, Loader, PerformanceMonitor } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'

export default function Scene({ ...props }) {
  const [dpr, setDpr] = useState(1.5)
  return (
    <>
      <Canvas {...props} dpr={dpr} camera={{ position: [0, 0, 20], fov: 15 }} shadows linear>
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
        <r3f.Out />
        <Preload all />
      </Canvas>
      <Loader />
    </>
  )
}