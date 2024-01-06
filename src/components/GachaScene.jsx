import { Suspense } from 'react'
import { Ground } from './Ground'
import { Physics } from '@react-three/cannon'
import { GachaCube } from './GachaCube'
import { GachaSphere } from './GachaSphere'
import { GachaTetrahedron } from './GachaTetrahedron'

import { Model } from './GachaMachine'

export { GachaScene }

function GachaScene({ setScene, envTexture, urlList }) {
    return (
        <Suspense fallback={null}>
            <Physics>
                <Model position={[0, 3.8, 0]} setScene={setScene} envTexture={envTexture} />
                <GachaCube url={urlList[0]} key={1} position={[-2, 5.5, 0]} rotation={[0.2,0.5,0.3]} type={"Static"} setScene={{}}/>
                <GachaSphere url={urlList[0]} key={1} position={[-2, 5.5, 1]} rotation={[0.2,0.5,0.3]} type={"Static"} setScene={{}}/>
                <GachaTetrahedron url={urlList[0]} key={1} position={[-2, 5.5, -1]} rotation={[0.2,0.5,0.3]} type={"Static"} setScene={{}}/>
                <Ground position={[0, -1, 0]} />
                {/* <Environment preset="sunset" background /> */}
            </Physics>
        </Suspense>
    )
}