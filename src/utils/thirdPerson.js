function followPlayer(camera, ship) {
    // let {x, y, z} = ship.position
    // camera.position.set(x + 0.028739493515614712, y + 0.31478689289773176, z + 1.2251905238441057 )
    camera.lookAt(ship.position);

}

export { followPlayer }