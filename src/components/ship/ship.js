import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadShip(shipName) {
    const loader = new GLTFLoader();
    console.log(`/models/${shipName}/scene.gltf`)
    const shipData = await loader.loadAsync(`${process.env.root}models/${shipName}/scene.gltf`)
    // console.log('ship', shipData)
    const ship = setupModel(shipData);
    ship.position.set(0, 0, 0);

    if (ship === 'starDestroyer') {
        ship.scale.set(100, 100, 100)

    }

    if (ship === 'halcon') {
        ship.scale.set(.5, .5, .5)

    }

    if (ship === 'tie') {
        ship.scale.set(10, 10, 10)

    }

    if (ship === 'podracer') {
        ship.scale.set(.1, .1, .1)

    }

    if (ship === 'cr90') {
        ship.scale.set(100, 100, 100)
    }

    if (ship === 'aWing') {
        ship.scale.set(1000, 1000, 1000)

    }

    if (ship === 'wWing') {
        ship.scale.set(.5, .5, .5)

    }

    if (ship === 'xWing') {
        ship.scale.set(.005, .005, .005)

    }

    if (ship === 'yWing') {
        ship.scale.set(1000, 1000, 1000)

    }


    return ship;

}

export { loadShip };