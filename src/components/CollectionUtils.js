import { useCallback, useRef } from 'react'
import { useControls } from 'leva'
import { SoftShadows, useHelper, Html, Bvh, Environment, OrbitControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { DirectionalLightHelper, PointLightHelper } from 'three'
import { Suspense } from 'react'
import { useStore } from '@/store/zustand'
import './3D_styles.css'

export { randPos, randRot, RandomDraw, useHover, Lighting }

function randPos(spread = 2) {
    return Math.random() * spread - spread / 2;
}

function randRot() {
    return Math.random() * 2 * Math.PI;
}

function RandomDraw(nDraws, nTypes) {
    const { urlList } = useStore()
    let list = JSON.parse(JSON.stringify(urlList))
    let urls = []; let positions = []
    for (let i = 0; i < nTypes; i++) { urls.push([]); positions.push([]) }
    list = shuffle(list)

    for (let n = 0; n < nDraws; n++) {
        let i = Math.floor(Math.random() * nTypes)
        let j = Math.floor(Math.random() * list.length)
        urls[i].push(list.pop())
        positions[i].push({ pos: [randPos(), 2 + n * 1.5, randPos()], rot: [randRot(), randRot(), randRot()] })
    }

    return { urls: urls, positions: positions }
}

function useHover(hover, isClickable) {
    const onPointerOver = useCallback((e) => { e.stopPropagation(); hover(true) }, [])
    const onPointerOut = useCallback(() => { hover(false) }, [])
    return isClickable && { onPointerOver, onPointerOut }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function Lighting() {
    const shadowLight = useRef()
    const pointlight = useRef()
    const pointlight2 = useRef()

    useHelper(shadowLight, DirectionalLightHelper, 0.5, "black")
    useHelper(pointlight, PointLightHelper, 0.5, "blue")
    useHelper(pointlight2, PointLightHelper, 0.5, "black")

    return (
        <>
            <SoftShadows />
            <ambientLight intensity={0.5} color="#9778ff" />
            <directionalLight color="#f5ecdf" castShadow position={[3, 8, 8]} intensity={10} shadow-mapSize={2048}>
                <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
            </directionalLight>
            <pointLight color="#ed9a6d" position={[-5, 2, -2]} intensity={5} />
            <pointLight color="#7796fc" position={[5, 2, 0]} intensity={5} />
        </>
    )
}

export function BasicLighting() {
    return (
        <>
            <ambientLight intensity={0.5} color="#bac8ff" />
            <directionalLight color="#f5ecdf" position={[3, 5, 5]} intensity={10} />
            <pointLight color="#ed9a6d" position={[2, -3, 1]} intensity={5} />
            <pointLight color="#7796fc" position={[-2, -3, 1]} intensity={5} />
        </>
    )
}

export function MakeRigid(mesh, position, rotation, angularDamping = 0) {
    return (<RigidBody position={position} rotation={rotation} angularDamping={angularDamping}>{mesh}</RigidBody>)
}

export function Annotation({ url }) {
    return (
        <Html distanceFactor={10}>
            <div className="content">
                <img src={url} alt='map source' />
            </div>
        </Html>
    )
}

export function Common({ children, color = "#bac8ff" }) {
    return (
        <>
            <color attach="background" args={[color]} />
            <Lighting />
            <Bvh firstHitOnly>
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Bvh>
            <Environment preset="studio" />
            <OrbitControls maxPolarAngle={Math.PI / 9 * 4} minPolarAngle={Math.PI / 8} maxDistance={30} minDistance={5} enableDamping damping={0.2} />
        </>
    )
}