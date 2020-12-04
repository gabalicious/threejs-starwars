
async function render() {
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        autoClear: true,
        physicallyCorrectLights: true
    });
    renderer.setPixelRatio(2);
    // renderer.gammaOutput = true;
    // renderer.gamaFactor = 2.2;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // draw Scene
    const renderThree = () => {
        camera.updateMatrixWorld();
        renderer.render(scene, camera);
    };

    // run loop (update, render, repeat)
    const animate = () => {
        requestAnimationFrame(animate);
        renderThree();
    };
    return {
        test: ''
    };
}

export { loadChars };