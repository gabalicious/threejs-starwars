import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadShips() {
    const loader = new GLTFLoader();

    const [blueLightsaberData, goldenLightsaberData, greenLightsaberData, jediLightsaberData, lightsaberDoubleData, redLightsaberData] = await Promise.all([
        loader.loadAsync('/models/blueLightsaber/scene.gltf'),
        loader.loadAsync('/models/greenLightsaber/scene.gltf'),
        loader.loadAsync('/models/goldenLightsaber/scene.gltf'),
        loader.loadAsync('/models/jediLightsaber/scene.gltf'),
        loader.loadAsync('/models/lightsaberDouble/scene.gltf'),
        loader.loadAsync('/models/redLightsaber/scene.gltf'),

    ]);


    const blueLightsaber = setupModel(blueLightsaberData);
    blueLightsaber.position.set(0, 20, 2.5);

    const greenLightsaber = setupModel(greenLightsaberData);
    greenLightsaber.position.set(0, 10, -10);



    const goldenLightsaber = setupModel(goldenLightsaberData);
    const jediLightsaber = setupModel(jediLightsaberData);
    const lightsaberDouble = setupModel(lightsaberDoubleData);
    const redLightsaber = setupModel(redLightsaberData);


    return {
        blueLightsaber,
        greenLightsaber,
        goldenLightsaber,
        jediLightsaber,
        lightsaberDouble,
        redLightsaber
    };

}

export { loadShips };