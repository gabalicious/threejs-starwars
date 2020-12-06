import * as dat from 'dat.gui';
import { Game } from './Game/Game.js';
import { RenderControllerMap } from './react-components/gameControllerMap.js'


async function main() {
  const container = document.querySelector('#scene');
  const game = new Game(container);
  // Attach game to window for debugging in console
  window.game = game
  await game.init();

  // 2. Render the scene
  game.render();
}

function addDatGui() {
  const gui = new dat.GUI({
    height: 5 * 32 - 1
  });
  var Camera = gui.addFolder('Camera');

  var UI = gui.addFolder('UI');
  var Ship = gui.addFolder('Ship');

  var starStatus = { stars: true };
  let stars = UI.add(starStatus, 'stars', false, true);

  var palette = {
    background: '#000'
  };
  UI.addColor(palette, 'background');

  console.log(gui)
  stars.onChange((change) => {
    console.log(change)
  })
  let shipObj = {
    button: function () {

    }
  }
  Ship.add(shipObj, 'button')

}



const button = document.querySelector('.menu-container .menu-item');

button.addEventListener('click', event => {
  console.log('click')
  run()
});

function run() {

  addDatGui()
  RenderControllerMap();
  var menu = document.getElementsByClassName("menu-container")[0];
  menu.style.display = "none";

  main().catch((err) => {
    console.error(err);
  });
}

