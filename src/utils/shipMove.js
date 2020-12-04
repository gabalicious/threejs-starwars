import {
    Mesh,
    SphereGeometry,
    MeshBasicMaterial
} from 'three';
function move(count, direction) {
    if (direction === 'up' && count <= .13) {
        count = count + .001
    }
    else if (direction === 'down' && count >= 0) {
        count = count - .001
    }
    else if (count > .13) {
        direction = 'down'
    }
    else if (count < 0) {
        direction = 'up'
    }
    return [count, direction]
}

function playerActions(ship, buttonIndex, button, game) {
    // move forward
    if (buttonIndex === 7) {
        ship.position.z = ship.position.z + (1 * button.value)
    }
    // move back
    if (buttonIndex === 6) {
        ship.position.z = ship.position.z - (1 * button.value)

    }
    // Shoot
    if (buttonIndex === 0) {
        let plasmaBall = new Mesh(new SphereGeometry(0.5, 8, 4), new MeshBasicMaterial({
            color: "red"
        }));
        plasmaBall.scale.set(.15, .15, .15)
        plasmaBall.position.copy(game.ship.getWorldPosition()); // start position - the tip of the weapon
        plasmaBall.quaternion.copy(game.ship.quaternion.conjugate()); // apply camera's quaternion
        game.scene.add(plasmaBall);
        game.plasmaBalls.push(plasmaBall);
    }



}

export { move, playerActions }