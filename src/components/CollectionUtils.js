export { randPos, randRot, randomDraw }

function randPos(spread = 2) {
    return Math.random() * spread - spread / 2;
}

function randRot() {
    return Math.random() * 2 * Math.PI;
}

function randomDraw(urlList, nDraws, nTypes) {
    let urls = []; let positions = []
    for (let i = 0; i < nTypes; i++) { urls.push([]); positions.push([])}

    for (let n = 0; n < nDraws; n++) {
        let i = Math.floor(Math.random() * nTypes)
        let j = Math.floor(Math.random() * urlList.length)
        urls[i].push(urlList[j])
        positions[i].push({ pos: [randPos(), 3 + n, randPos()], rot: [randRot(), randRot(), randRot()] })
    }

    console.log(urls, positions)

    return { urls: urls, positions: positions }
}