import { Suspense } from 'react'
import { Ground } from './Ground'
import { Text3D, Center, Instances, Instance } from '@react-three/drei'
import { GachaCube } from './GachaCube'
import { GachaSphere } from './GachaSphere'
import { GachaTetrahedron } from './GachaTetrahedron'
import { GachaCylinder } from './GachaCylinder'

import { Machine } from './GachaMachine'

export { GachaScene }

function GachaScene({ setScene, envTexture, urlList }) {
    const doNothing = () => { console.log('naught') }
    return (
        <Suspense fallback={null}>
            <Machine position={[0, -1, 0]} setScene={setScene} envTexture={envTexture} />

            <GachaCube url={urlList[0]} key={0} position={[-2, 0, 0]} rotation={[0.2, 0.5, 0.3]} setScene={doNothing} isClickable={false}/>
            <GachaCube url={urlList[1]} key={1} position={[2.5, 0, 1]} rotation={[0, 0.6, 0]} setScene={doNothing} isClickable={false}/>
            <GachaCube url={urlList[2]} key={2} position={[-2.3, 0, 2]} rotation={[0.2, 0.5, 0.3]} setScene={doNothing} isClickable={false}/>

            {/* <GachaTetrahedron url={urlList[0]} key={4} position={[-3.5, 1, 1]} rotation={[0.2, 0, 0]} setScene={doNothing} /> */}
            <GachaTetrahedron url={urlList[0]} key={6} position={[1.7, 0, 2.8]} rotation={[0, 0, 0]} setScene={doNothing} isClickable={false}/>

            <GachaSphere url={urlList[3]} key={5} position={[-1, 0, 3]} rotation={[0.2, 0.5, 0.3]} setScene={doNothing} isClickable={false}/>
            <GachaSphere url={urlList[4]} key={9} position={[3.5, 0, 1]} rotation={[0.2, 0.5, 0.3]} setScene={doNothing} isClickable={false}/>

            <GachaCylinder url={urlList[5]} key={7} position={[3, 1, 0]} rotation={[0, 0, Math.PI / 2]} setScene={doNothing} isClickable={false}/>
            <GachaCylinder url={urlList[6]} key={8} position={[-2, 0, 0.8]} rotation={[0, 0, 0]} setScene={doNothing} isClickable={false}/>

            <Center position={[0, 2, -2]}>
                <Text3D font="/fonts/PP_Hatton_Medium_Regular.json" size={2}>
                    {`Pictogem`}
                    <meshStandardMaterial color="black" />
                </Text3D>
            </Center>
        </Suspense>
    )
}