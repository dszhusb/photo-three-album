'use client'
import { GachaCube } from '../../components/capsules/GachaCube'
import { GachaSphere } from '../../components/capsules/GachaSphere'
import { GachaTetrahedron } from '../../components/capsules/GachaTetrahedron'
import { GachaCylinder } from '../../components/capsules/GachaCylinder'
import { TexturedGround } from '../../components/TexturedGround'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier'
import { Ground } from '../../components/Ground'
import { Common } from '@/components/CollectionUtils'
import { useStore } from '@/store/zustand'
import { Overlay } from '@/components/Overlay'

import dynamic from 'next/dynamic'
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), { ssr: false })

export default function Page() {
    const { capsule } = useStore()

    let mesh = null
    if (capsule.type === 'cube') { mesh = <GachaCube url={capsule.url} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]} isClickable={false} /> }
    if (capsule.type === 'sphere') { mesh = <GachaSphere url={capsule.url} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]} isClickable={false} /> }
    if (capsule.type === 'tetrahedron') { mesh = <GachaTetrahedron url={capsule.url} position={[0, 2, 0]} rotation={[Math.PI / 4, 0, 0]} isClickable={false} /> }
    if (capsule.type === 'cylinder') { mesh = <GachaCylinder url={capsule.url} position={[0, 1, 0]} rotation={[0, 0, Math.PI / 3]} isClickable={false} /> }

    return (
        <>
            <View style={{ width: '100vw', height: '100vh', margin: 0 }}>
                <Common>
                    <Physics colliders='hull'>
                        <Suspense fallback={null}>
                            <TexturedGround position={[0, 1.5, -4]} url={capsule.url} />
                            {mesh}
                        </Suspense>
                        <Ground position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    </Physics>
                </Common>
            </View>
            <Overlay />
        </>
    )
}
