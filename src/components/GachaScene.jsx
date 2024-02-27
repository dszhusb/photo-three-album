import { Suspense } from 'react'
import { Text3D, Center, Html } from '@react-three/drei'
import { GachaCube } from './capsules/GachaCube'
import { GachaSphere } from './capsules/GachaSphere'
import { GachaTetrahedron } from './capsules/GachaTetrahedron'
import { GachaCylinder } from './capsules/GachaCylinder'

import { Machine } from './GachaMachine'

export { GachaScene }

function GachaScene({ envTexture, urlList }) {
    return (
        <Suspense fallback={null}>
            <Machine position={[0, -1, 0]} envTexture={envTexture} />
            <Html
                transform
                position={[-0.9, 0.5, 1.1]}
                // occlude={true}
            >
                <div style={{ position: 'relative' }}>
                    <p style={{
                        fontSize: '0.5rem',
                        color: 'black',
                        padding: '0.5rem 1rem 0.5rem 1rem',
                        background: 'white',
                        borderRadius: '1rem'
                    }}>{'click me'}</p>
                </div>
                <div style={{
                    position: 'absolute',
                    width: '0.5rem',
                    height: '0.1rem',
                    background: 'white',
                    top: '50%',
                    right: '-8%',
                    borderRadius: '0.25rem'
                }} />
            </Html >

            <GachaCube url={urlList[0]} key={0} position={[-2, 0, 0]} rotation={[0.2, 0.5, 0.3]} isClickable={false} />
            <GachaCube url={urlList[1]} key={1} position={[2.5, 0, 1]} rotation={[0, 0.6, 0]} isClickable={false} />
            <GachaCube url={urlList[2]} key={2} position={[-2.3, 0, 2]} rotation={[0.2, 0.5, 0.3]} isClickable={false} />

            {/* <GachaTetrahedron url={urlList[0]} key={4} position={[-3.5, 1, 1]} rotation={[0.2, 0, 0]} setScene={doNothing} /> */}
            <GachaTetrahedron url={urlList[0]} key={6} position={[1.7, 0, 2.8]} rotation={[0, 0, 0]} isClickable={false} />

            <GachaSphere url={urlList[3]} key={5} position={[-1, 0, 3]} rotation={[0.2, 0.5, 0.3]} isClickable={false} />
            <GachaSphere url={urlList[4]} key={9} position={[3.5, 0, 1]} rotation={[0.2, 0.5, 0.3]} isClickable={false} />

            <GachaCylinder url={urlList[5]} key={7} position={[3, 1, 0]} rotation={[0, 0, Math.PI / 2]} isClickable={false} />
            <GachaCylinder url={urlList[6]} key={8} position={[-2, 0, 0.8]} rotation={[0, 0, 0]} isClickable={false} />

            <Center position={[0, 2, 0.2]}>
                <Text3D font="/fonts/PP_Hatton_Medium_Regular.json" size={2} receiveShadow>
                    {`Pictogem`}
                    <meshStandardMaterial color="white" />
                </Text3D>
            </Center>
        </Suspense>
    )
}