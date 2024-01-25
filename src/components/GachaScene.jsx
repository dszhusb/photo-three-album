import { Suspense } from 'react'
import { Ground } from './Ground'
import { Physics } from '@react-three/cannon'
import { Text3D, Center } from '@react-three/drei'
import { GachaCube } from './GachaCube'
import { GachaSphere } from './GachaSphere'
import { GachaTetrahedron } from './GachaTetrahedron'

import { Model, Machine } from './GachaMachine'

export { GachaScene }

function GachaScene({ setScene, envTexture, urlList }) {
    return (
        <Suspense fallback={null}>
            <Physics>
                <Machine position={[0, -1, 0]} setScene={setScene} envTexture={envTexture} />
                {/* <GachaCube url={urlList[0]} key={1} position={[0, 5.5, 0]} rotation={[0.2,0.5,0.3]} type={"Static"} setScene={setScene}/> */}
                {/* <GachaSphere url={urlList[0]} key={1} position={[-2, 5.5, 1.2]} rotation={[0.2,0.5,0.3]} type={"Static"} setScene={{}}/> */}
                <GachaTetrahedron url={urlList[0]} key={2} position={[0, 5, 3]} rotation={[0, 0, 0]} type={"Static"} setScene={setScene} />
                <Ground position={[0, -1, 0]} />
                <Center position={[0, 10, -5]}>
                    <Text3D font="/fonts/PP_Hatton_Medium_Regular.json" size={3}>
                        Pictopon*
                        <meshStandardMaterial color="darkblue" />
                    </Text3D>
                </Center>
            </Physics>
        </Suspense>
    )
}