import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadShips() {
    const loader = new GLTFLoader();

    const [starDestroyerData, halconData, tieData, podracerData, cr90Data, aWingData] = await Promise.all([
        loader.loadAsync('/models/starDestroyer/scene.gltf'),
        loader.loadAsync('/models/halcon/scene.gltf'),
        loader.loadAsync('/models/tie/scene.gltf'),
        loader.loadAsync('/models/podracer/scene.gltf'),
        loader.loadAsync('/models/cr90/scene.gltf'),
        loader.loadAsync('/models/aWing/scene.gltf'),
 

    ]);


    const starDestroyer = setupModel(starDestroyerData);
    starDestroyer.position.set(25, -400, -10);
    starDestroyer.scale.set(100, 100, 100)

    const halcon = setupModel(halconData);
    halcon.position.set(0, 10, -10);
    halcon.scale.set(.5, .5, .5)

    const tie = setupModel(tieData);
    tie.position.set(25, -300, -10);
    tie.scale.set(10, 10, 10)

    const podracer = setupModel(podracerData);
    podracer.position.set(25, -200, -10)
    podracer.scale.set(.1, .1, .1)

    const cr90 = setupModel(cr90Data);
    cr90.position.set(25, -100, -10);
    cr90.scale.set(100, 100, 100)

    const aWing = setupModel(aWingData);
    aWing.position.set(25, 150, -10);
    aWing.scale.set(100, 100, 100)

    // const wWing = setupModel(wWingData);
    // wWing.position.set(25, 100, -10);
    // wWing.scale.set(.5, .5, .5)

    // const xWing = setupModel(xWingData);
    // xWing.position.set(25, 150, -10);
    // xWing.scale.set(.5, .5, .5)

    // const yWing = setupModel(yWingData);
    // yWing.position.set(25, 200, -10);
    // yWing.scale.set(.25, .25, .25)

    return {
        starDestroyer,
        halcon,
        tie,
        podracer,
        cr90,
        aWing
     
    };

    // const [bb8Data, cr90Data] = await Promise.all([
    //     loader.loadAsync('/models/bb8/scene.gltf'),
    //     loader.loadAsync('/models/cr90/scene.gltf'),

    // ]);
    // const bb8 = setupModel(bb8Data);
    // const cr90 = setupModel(cr90Data);

    // return {
    //     bb8,
    //     cr90
    // }
}

export { loadShips };