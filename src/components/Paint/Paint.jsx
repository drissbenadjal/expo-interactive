import { useState } from "react";
import { Interactive, RayGrab } from "@react-three/xr";
import { zoom, rotate, zoomVR, rotateVR } from "../Animations/Animations";
import { gsap } from "gsap";

export const Paint = ({
  name,
  basePosition,
  baseRotation,
  hoverPosition,
  clickPosition,
  clickRotation,
  baseScale,
  paint,
}) => {
  const sound = new Audio(`./assets/sounds/${name}.mp3`);

  return (
    <Interactive
      onHover={() => {
        zoomVR(paint, hoverPosition.x, hoverPosition.y, hoverPosition.z);
      }}
      onBlur={() => {
        sound.pause();
        zoomVR(paint, basePosition.x, basePosition.y, basePosition.z);
        rotateVR(paint, baseRotation.x, baseRotation.y, baseRotation.z);
      }}
      onSelect={() => {
        rotateVR(paint, clickRotation.x, clickRotation.y, clickRotation.z);
        zoomVR(paint, clickPosition.x, clickPosition.y, clickPosition.z);
        sound.play();
      }}
    >
      {/* <RayGrab> */}
      <primitive
        object={paint.scene}
        scale={baseScale}
        position={[basePosition.x, basePosition.y, basePosition.z]}
        rotation={[baseRotation.x, baseRotation.y, baseRotation.z]}
        onPointerOver={(event) => {
          zoom(
            paint.scene.position,
            hoverPosition.x,
            hoverPosition.y,
            hoverPosition.z
          );
        }}
        onPointerOut={(event) => {
          sound.pause();
          zoom(
            paint.scene.position,
            basePosition.x,
            basePosition.y,
            basePosition.z
          );
          rotate(
            paint.scene.rotation,
            baseRotation.x,
            baseRotation.y,
            baseRotation.z
          );
        }}
        onClick={(event) => {
          rotate(
            paint.scene.rotation,
            clickRotation.x,
            clickRotation.y,
            clickRotation.z
          );
          zoom(
            paint.scene.position,
            clickPosition.x,
            clickPosition.y,
            clickPosition.z
          );
          sound.play();
          event.stopPropagation();
        }}
      />
      {/* </RayGrab> */}
    </Interactive>
  );
};
