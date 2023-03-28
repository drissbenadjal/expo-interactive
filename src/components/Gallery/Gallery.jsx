import React from "react";


export const Gallery = ({ modele }) => {
  return (
    <>
      <primitive
        object={modele.scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 3.15, 0]}
      />
    </>
  );
};
