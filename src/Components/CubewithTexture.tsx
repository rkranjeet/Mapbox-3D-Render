import React, { useRef, useState } from "react";
import { Engine, Scene, useClick, useBeforeRender } from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core";
import { useLocation } from "react-router-dom";

const DefaultScale = new Vector3(1, 1, 1);
const BiggerScale = new Vector3(1.25, 1.25, 1.25);

const SpinningBox = (props: any) => {
  const boxRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  useClick(() => setClicked((clicked) => !clicked), boxRef);

  return (
    <box
      name={props.name}
      ref={boxRef}
      size={2}
      position={props.position}
      scaling={clicked ? BiggerScale : DefaultScale}
      height={1}
      width={0.75}
      depth={0.25}
      wrap
    >
      <standardMaterial name="MapCapture">
        <texture url={props.imageURL} assignTo={"diffuseTexture"} />
      </standardMaterial>
    </box>
  );
};

export const SceneWithSpinningBoxes = () => {
  const location = useLocation();
  return (
    <div className="Spinning-Box">
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={(3 * Math.PI) / 4}
            beta={Math.PI / 3}
            radius={2}
          />
          <hemisphericLight
            name="light1"
            intensity={1.2}
            direction={Vector3.Up()}
          />
          <SpinningBox
            name="left"
            position={new Vector3(0, 0, 0)}
            color={Color3.FromHexString("#EEB5EB")}
            imageURL={location.state.imageUrl}
          />
        </Scene>
      </Engine>
    </div>
  );
};

export default SceneWithSpinningBoxes;
