import { useState } from "react";
import { Interactive, RayGrab } from "@react-three/xr";
import { zoom, rotate, zoomVR, rotateVR } from "../Animations/Animations";

export const WelcomeBoard = ({
  modele,
  baseScale,
  basePosition,
  baseRotation,
}) => {
  return (
    <Interactive>
      <primitive
        object={modele.scene}
        scale={baseScale}
        position={[basePosition.x, basePosition.y, basePosition.z]}
        rotation={[baseRotation.x, baseRotation.y, baseRotation.z]}
      />
    </Interactive>
  );
};
