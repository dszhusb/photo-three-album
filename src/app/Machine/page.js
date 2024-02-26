'use client'

import { Suspense } from 'react'
import { GachaScene } from '@/components/GachaScene'
import { Common } from '@/components/CollectionUtils'
import { Physics } from '@react-three/rapier'
import { Ground } from '@/components/Ground'
import { Overlay } from '@/components/Overlay'

import dynamic from 'next/dynamic'
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), { ssr: false })

export default function Page() {
    const urlList = ['/9.JPG', '/10.JPG', '/11.JPG', '/12.JPG', '/13.JPG', '/14.JPG', '/15.JPG', '/16.JPG', "17.jpg"]
    return (
        <>
            <View style={{ width: '100vw', height: '100vh', margin: 0 }}>
                <Common>
                    <Physics colliders='hull'>
                        <Suspense fallback={null}>
                            <GachaScene urlList={urlList} />
                        </Suspense>
                        <Ground position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    </Physics>
                </Common>
            </View>
            <Overlay />
        </>
    )
}