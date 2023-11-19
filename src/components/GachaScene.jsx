import { Suspense } from 'react'
import { Environment } from '@react-three/drei'

import { Model } from './GachaMachine'

export { GachaScene }

function GachaScene() {
    return (
        <Suspense fallback={null}>
            <Model />
            <Environment preset="sunset" background />
        </Suspense>
    )
}