import { useCallback, useRef } from 'react'
import { useControls } from 'leva'
import { SoftShadows, useHelper } from '@react-three/drei'
import { DirectionalLightHelper, PointLightHelper } from 'three'

export { randPos, randRot, randomDraw, useHover, Lighting }

function randPos(spread = 2) {
    return Math.random() * spread - spread / 2;
}

function randRot() {
    return Math.random() * 2 * Math.PI;
}

function randomDraw(urlList, nDraws, nTypes) {
    let urls = []; let positions = []
    for (let i = 0; i < nTypes; i++) { urls.push([]); positions.push([]) }
    urlList = shuffle(urlList)

    for (let n = 0; n < nDraws; n++) {
        let i = Math.floor(Math.random() * nTypes)
        let j = Math.floor(Math.random() * urlList.length)
        urls[i].push(urlList.pop())
        positions[i].push({ pos: [randPos(), 2 + n * 1.5, randPos()], rot: [randRot(), randRot(), randRot()] })
    }

    return { urls: urls, positions: positions }
}

function useHover(setScale, isClickable, scale = [1.1, 1.1, 1.1]) {
    const onPointerOver = useCallback(() => setScale(scale), [])
    const onPointerOut = useCallback(() => setScale([1, 1, 1]), [])
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
    const { ...softConfig } = useControls({
      size: { value: 25, min: 0, max: 100 },
      focus: { value: 0, min: 0, max: 2 },
      samples: { value: 10, min: 1, max: 20, step: 1 }
    })
  
    const shadowLight = useRef()
    const pointlight = useRef()
    const pointlight2 = useRef()
  
    useHelper(shadowLight, DirectionalLightHelper, 0.5, "black")
    useHelper(pointlight, PointLightHelper, 0.5, "blue")
    useHelper(pointlight2, PointLightHelper, 0.5, "black")
  
    return (<>
      <SoftShadows {...softConfig} />
      <ambientLight intensity={0.5} color="#9778ff" />
      <directionalLight color="#f5ecdf" castShadow position={[3, 8, 8]} intensity={10} shadow-mapSize={2048}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
      </directionalLight>
      <pointLight color="#ed9a6d" position={[-5, 2, -2]} intensity={5} />
      <pointLight color="#7796fc" position={[5, 2, 0]} intensity={5} />
    </>)
  }