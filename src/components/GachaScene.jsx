import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import { Ground } from './Ground'
import { Physics } from '@react-three/cannon'

import { Model } from './GachaMachine'

export { GachaScene }

function GachaScene({ setScene }) {
    return (
        <Suspense fallback={null}>
            <Physics>
                <Model position={[0, 1.4, 0]} setScene={setScene} />
                <Ground position={[0, -1, 0]} />
                {/* <Environment preset="sunset" background /> */}
            </Physics>
        </Suspense>
    )
}