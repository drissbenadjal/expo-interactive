import { Interactive } from "@react-three/xr";

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
