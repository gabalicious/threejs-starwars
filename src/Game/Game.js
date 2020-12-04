// import { loadChars } from '../components/chars/chars.js';
// import { loadShips } from '../components/ships/ships.js';
import { loadShip } from '../components/ship/ship.js';
import { move, playerActions } from '../utils/shipMove.js';
import { followPlayer } from '../utils/thirdPerson.js';


// import { createCamera } from './components/camera.js';
// import { createLights } from './components/lights.js';
// import { createScene } from './components/scene.js';
import {
    AmbientLight,
    PointLight,
    HemisphereLight,
    Color,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    TextureLoader,
    PointsMaterial,
    Geometry,
    Vector3,
    Points,
    Clock,
    GridHelper
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from 'stats.js'



class Game {
    // 1. Create an instance of the Game app
    constructor(container) {
        // VARS
        this.count = 0;
        this.direction = 'up'

        // Stats
        this.stats = new Stats();
this.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( this.stats.dom );

        // Scene
        this.scene = new Scene();
        this.scene.background = new Color('#191970');

        // Light
        this.light = new PointLight(0xff0000, 1, 100);
        this.light.position.set(50, 50, 50);
        this.scene.add(this.light)

        // ambient light
        this.ambientLight = new AmbientLight(0x404040, 0.001);
        this.hemisphericLight = new HemisphereLight({
            skyColor: 0xffffbb,
            groundColor: 0x080820,
            intensity: 0.25,
            position: {
                x: 0,
                y: 430,
                z: -2500
            }
        });
        this.scene.add(this.ambientLight)
        this.scene.add(this.hemisphericLight)

        // grids
        const size = 10;
        const divisions = 10;

        const gridHelper = new GridHelper(size, divisions);
        this.scene.add(gridHelper);

        // Camera
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0.12508207657421436, 0.37977934278732867, -3.4409478526870916);
        // this.camera.lookAt(this.scene.position);

        // Renderer
        this.renderer = new WebGLRenderer({
            antialias: true
        });
        this.renderer.setPixelRatio(2);
        this.renderer.gammaOutput = true;
        this.renderer.gamaFactor = 2.2;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // controls
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.minZoom = 0.5;
        // this.controls.maxZoom = 1.5;
        // this.controls.enablePan = true;

        // plasma
        this.speed = 50;
        this.clock = new Clock();
        this.delta = 0;

    }
    async init() {

        console.log('game init')

        // const { blueLightsaber, mandalorian, c3po, tie, bb8, podracer, cr90 } = await loadChars();
        // this.scene.add(blueLightsaber, mandalorian, c3po, tie, bb8, podracer, cr90);

        this.ship = await loadShip('aWing');
        this.ship.add(this.camera)
        this.scene.add(this.ship);
        this.drawSpace()
        this.plasmaBalls = [];
        this.camera.lookAt(this.ship.position);



    }

    drawSpace() {
        this.starGeo = new Geometry();
        for (let i = 0; i < 6000; i++) {
            let star = new Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            );
            this.starGeo.vertices.push(star);
        }
        const sprite = new TextureLoader().load('star.png');
        const starMaterial = new PointsMaterial({
            color: 0xffffff,
            fog: true,
            size: 1,
            map: sprite,
            transparent: true,
            opacity: 0.9,
        });
        this.stars = new Points(this.starGeo, starMaterial);
        this.scene.add(this.stars);

    }
    animateStars() {
        this.starGeo.vertices.forEach(p => {
            p.velocity += p.acceleration
            // p.y -= p.velocity;
            // console.log(p)
            // if (p.y < -200) {
            //     p.y = 200;
            //     p.velocity = 0;
            // }
        });
        this.starGeo.verticesNeedUpdate = true;
        this.stars.rotation.y += 0.002;
    }

    // draw Scene
    renderThree() {
        this.camera.updateMatrixWorld();
        this.renderer.render(this.scene, this.camera);
        this.gamepad()
        // console.log(count, direction, move(count, direction))

        let array = move(this.count, this.direction)
        this.count = array[0]
        this.direction = array[1]
        // [this.count, this.direction] = array
        this.ship.position.y = this.count
        // if (count === 150) count = 100;
        // followPlayer(this.ship, this.camera)
    }

    gamepad() {

        // one of the apis are supported and controller is plugged in
        let gp;
        if (navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0]) {
            gp = navigator.webkitGetGamepads()[0];
        } else if (navigator.getGamepads && navigator.getGamepads().length > 0) {
            gp = navigator.getGamepads()[0];
        }

        // Map leftstick and rightstick
        let leftStickX = 0, leftStickY = 0, rightStickX = 0, rightStickY = 0;
        if (gp?.axes?.[0] !== 0) {
            leftStickX -= gp?.axes?.[0] || 0;
            // console.log(`leftStickX ${leftStickX}`);

        }
        if (gp?.axes?.[1] !== 0) {
            leftStickY += gp?.axes?.[1] || 0;
            // console.log(`leftStickY ${leftStickY}`);

        }
        if (gp?.axes?.[2] !== 0) {
            rightStickX += gp?.axes?.[2] || 0;
            // console.log(`rightStickX ${rightStickX}`);

        }
        if (gp?.axes?.[3] !== 0) {
            rightStickY -= gp?.axes?.[3] || 0;
            // console.log(`rightStickY ${rightStickY}`);

        }
        if (leftStickX !== 0 || leftStickY !== 0 || rightStickX !== 0 || rightStickY !== 0) {
            // console.log(`a ${a} b ${b}`);
            // console.log(`gp`, gp);
        }

        // 
        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            for (const [index, button] of gamepad.buttons.entries()) {
                if (button.touched || button.pressed) {
                    console.log('button.touched', button, index)
                    playerActions(this.ship, index, button, this)
                }
            }
        }
    }

    // run loop (update, render, repeat)
    animate() {

          this.stats.begin();
 
    // monitored code goes here
 
    this.stats.end();

        requestAnimationFrame(this.animate.bind(this));
        this.renderThree();
        this.animateStars()

        // Animate plasma
        this.delta = this.clock.getDelta();

        this.plasmaBalls.forEach(b => {
            b.translateZ(this.speed * this.delta); // move along the local z-axis
        });
    }
    // 2. Render the scene
    render() {
        window.addEventListener('gamepadconnected', (e) => {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
        });
        this.animate()
    }
}

export { Game };