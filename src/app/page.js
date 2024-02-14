'use client'
import styles from './page.module.css'
import { useMediaQuery } from 'react-responsive'

import { Suspense } from 'react'
import { OrthographicCamera } from '@react-three/drei'

import { BasicLighting } from '../components/CollectionUtils'
import { GachaCylinder } from '../components/capsules/GachaCylinder'
import { GachaSphere } from '../components/capsules/GachaSphere'
import { GachaTetrahedron } from '../components/capsules/GachaTetrahedron'
import { useRouter } from 'next/navigation'
import { Overlay } from '@/components/Overlay'

import dynamic from 'next/dynamic'
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), { ssr: false })

export default function App() {
  const color = "#aec5ff"
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <Suspense fallback={null}>
      <div style={{ position: 'relative', width: '100%', height: '100%', margin: 0 }}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <color attach="background" args={[color]} />
        </View>
        <Type isTablet={isTablet} isMobile={isMobile} />
        <Objects />
        <Overlay back={false} />
      </div>
    </Suspense>
  )
}

function Type({ isTablet, isMobile }) {

  const widths = [['80vw', '80vw', '80vw'], ['60vw', '60vw', '60vw'], ['38vw', '40vw', '30vw']]
  const xPos = [['10vw', '10vw', '10vw'], ['10vw', '35vw', '15vw'], ['20vw', '40vw', '30vw']]
  const hSizes = [0.4, 0.7, 1]
  const router = useRouter()

  let ws = widths[2]; let xs = xPos[2]; let h = hSizes[2]
  if (isTablet) { ws = widths[1]; xs = xPos[1]; h = hSizes[1] }
  else if (isMobile) { ws = widths[0]; xs = xPos[0]; h = hSizes[0] }

  return (
    <>
      <h1 style={{ margin: 'auto', width: 'fit-content' }}>Pictogem</h1>
      <p style={{ marginLeft: xs[0], maxWidth: ws[0] }} className={styles.p}>Pictogem is a <a className={styles.a} href='https://en.wikipedia.org/wiki/Gashapon#Gacha_mechanic_(gacha_games)'>gacha</a> style photo album experience. Each day, presenting a new photo rewards you with time capsules from the past, previous pictures mapped onto the shapes of flickering cubes, jelly-like droplets, and more!</p>
      <p style={{ marginLeft: xs[1], maxWidth: ws[1] }} className={styles.p}>Wrapping an image around a 3D form can distort the image in strange and unintended ways. But instead of viewing bulges and seams as a mistake, the distortions can be a source of delight! Pictogem ignores a lesson in UV mapping, casting a common mistake as the central source of novelty. The challenge became manipulating shape and material in ways that instead of reading as a mistake, refreshes old memories with new life.</p>
      <p style={{ marginLeft: xs[2], maxWidth: ws[2] }} className={styles.p}>This project is built with React, Three.js, React Three Fiber, and more. It is my first foray into the world of developing 3D experiences for web, shaders, as well as an exercise in my graphic design and UI skills. I hope you enjoy the following prototype!</p>
      <div className={'toSite'} style={{ margin: 'auto', marginTop: '10rem', position: 'relative' }} onClick={() => { router.push('/Machine') }}><h1 style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', color: 'white', margin: 0, fontSize: `${3 * h}vw` }}>GO!</h1></div>
      <div style={{ height: '10rem', width: '100%' }} />
    </>
  )
}

function Objects() {
  return (
    <>
      <MakeView size='40rem' top={'15%'} left={'60vw'}>
        <GachaTetrahedron url={'/10.JPG'} physics={false} position={[0, 0, 0]} rotation={[0, 0, 0.4]} isClickable={false} />
      </MakeView>
      <MakeView size='40rem' top={'65%'} left={'60vw'}>
        <GachaCylinder url={'/15.JPG'} physics={false} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 3]} isClickable={false} />
      </MakeView>
      <MakeView size='40rem' top={'40%'} left={'15%'}>
        <GachaSphere url={'/11.JPG'} physics={false} position={[0, 0, 0]} rotation={[0.7, 0, 0.2]} isClickable={false} />
      </MakeView>
    </>
  )
}

function MakeView({ size, top, left, children }) {
  const color = "#aec5ff"
  return (
    <View style={{ position: 'absolute', width: size, height: size, top: top, left: left }}>
      <color attach="background" args={[color]} />
      <OrthographicCamera makeDefault position={[0, 0, 1.5]} zoom={200} />
      <Suspense fallback={null}>
        {children}
        <BasicLighting />
      </Suspense>
    </View>
  )
}