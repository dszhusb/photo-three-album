export { randPos, randRot }

function randPos(spread = 2) {
    return Math.random() * spread - spread / 2;
}

function randRot() {
    return Math.random() * 2 * Math.PI;
}