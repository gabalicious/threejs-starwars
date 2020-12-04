import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadChars() {
    const loader = new GLTFLoader();

    const [blueLightsaberData, mandalorianData, c3poData, tieData, bb8Data, podracerData, cr90Data] = await Promise.all([
        loader.loadAsync('/models/blueLightsaber/scene.gltf'),
        loader.loadAsync('/models/mandalorian/scene.gltf'),
        loader.loadAsync('/models/c3po/scene.gltf'),
        loader.loadAsync('/models/tie/scene.gltf'),
        loader.loadAsync('/models/bb8/scene.gltf'),
        loader.loadAsync('/models/podracer/scene.gltf'),
        loader.loadAsync('/models/cr90/scene.gltf'),

    ]);


    const blueLightsaber = setupModel(blueLightsaberData);
    blueLightsaber.position.set(0, 20, 2.5);

    const mandalorian = setupModel(mandalorianData);
    mandalorian.position.set(0, 10, -10);

    const c3po = setupModel(c3poData);
    c3po.position.set(0, -2.5, -10);

    // const scifiBunker = setupModel(scifiBunkerData);
    const tie = setupModel(tieData);
    const bb8 = setupModel(bb8Data);
    const podracer = setupModel(podracerData);
    const cr90 = setupModel(cr90Data);


    return {
        blueLightsaber,
        mandalorian,
        c3po,
        tie,
        bb8,
        podracer,
        cr90
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

export { loadChars };