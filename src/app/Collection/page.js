'use client'

// import styles from './page.module.css'
import React, { Suspense } from "react"
import * as THREE from 'three'
import { Physics } from '@react-three/rapier'

import { RandomDraw, Common } from '../../components/CollectionUtils'
import { Overlay } from '../../components/Overlay'

import { CollectionCubes } from '../../components/capsules/GachaCube'
import { CollectionSpheres } from '../../components/capsules/GachaSphere'
import { CollectionTetrahedrons } from '../../components/capsules/GachaTetrahedron'
import { CollectionCylinders } from '../../components/capsules/GachaCylinder'
import { Ground } from '../../components/Ground'

import dynamic from 'next/dynamic'
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), { ssr: false })

export default function Home() {
  const gachas = RandomDraw(4, 4)

  return (
    <>
      <View style={{ width: '100vw', height: '100vh', margin: 0 }}>
        <Common stopHorizontal={true}>
          <Physics colliders='hull'>
            <Suspense fallback={null}>
              <CollectionCubes urlList={gachas.urls[0]} posRotList={gachas.positions[0]} />
              <CollectionTetrahedrons urlList={gachas.urls[1]} posRotList={gachas.positions[1]} />
              <CollectionSpheres urlList={gachas.urls[2]} posRotList={gachas.positions[2]} />
              <CollectionCylinders urlList={gachas.urls[3]} posRotList={gachas.positions[3]} />
            </Suspense>
            <Ground position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          </Physics>
        </Common>
      </View>
      <Overlay />
    </>
  )
}