import React from "react";
import ReactDOM from "react-dom";
import RtButton from "../images/rt-button.svg"
import LtButton from "../images/lt-button.svg"
import AButton from "../images/a-button.svg"

import WKey from "../images/w-key.svg"
import SKey from "../images/s-key.svg"
import SpaceBarKey from "../images/spacebar.svg"

class GameMap extends React.Component {
    render() {
        return <div className="controller-map">
            <h4>Controls</h4>
            <h5>Xbox Controller</h5>
            <ul>
                <li> <span>Accelerate</span>  <RtButton />  </li>
                <li> <span>Reverse</span> <LtButton /> </li>
                <li> <span>Shoot</span> <AButton /> </li>
            </ul>
            <h5>Keyboard</h5>
            <ul>
                <li> <span>Accelerate</span>  <WKey />  </li>
                <li> <span>Reverse</span> <SKey /> </li>
                <li> <span>Shoot</span> <SpaceBarKey /> </li>
            </ul>
        </div>;
    }
}


function RenderControllerMap() {
    ReactDOM.render(
        <GameMap />,
        document.body.appendChild(document.createElement("DIV"))
    )
}

export {
    RenderControllerMap
}