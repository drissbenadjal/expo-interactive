import "../index.css";

import React, { useState, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { useGLTF, PointerLockControls } from "@react-three/drei";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";

import * as THREE from "three";

import { Mobile } from "../components/Mobile/Mobile";
import { Loader } from "../components/Loader/Loader";
import { Gallery } from "../components/Gallery/Gallery";
import { CrossHair } from "../components/CrossHair/CrossHair";
import { Paint } from "../components/Paint/Paint";
import { WelcomeBoard } from "../components/WelcomeBoard/WelcomeBoard";
import { Sky } from "../components/Sky/Sky";

export const View = () => {

  const [device, setDevice] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setDevice("mobile");
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      setDevice("desktop");
    }
  }, []);

  const gallery = useGLTF(`./assets/modeles/vr_gallery/scene.gltf`);
  const laNuitEtoilee = useGLTF(`./assets/textures/LaNuitEtoilee.glb`);
  const soleilLevant = useGLTF(`./assets/textures/soleilLevant.glb`);
  const boulevardMontmartre = useGLTF(
    `./assets/textures/boulevardMontmartre.glb`
  );
  const coucherdesoleilEragny = useGLTF(
    `./assets/textures/coucherdesoleilEragny.glb`
  );
  const jardinMontmartre = useGLTF(`./assets/textures/jardinMontmartre.glb`);
  const pontNeuf = useGLTF(`./assets/textures/pontNeuf.glb`);
  const welcomeBoards = useGLTF(`./assets/textures/welcomeBoards.glb`);
  const sky = useGLTF(`./assets/textures/sky.glb`);

  //play le son
  useEffect(() => {
    const audioambiance = new Audio("../assets/sounds/ambiance.mp3");
    window.addEventListener("click", () => {
      audioambiance.play();
      audioambiance.volume = 0.08;
      audioambiance.loop = true;
    });

    return () => {
      window.removeEventListener("click", () => {
        audioambiance.play();
        audioambiance.volume = 0.08;
        audioambiance.loop = true;
      });
    };
  }, []);

  useEffect(() => {
    if (device === "desktop") {
      if (
        gallery &&
        laNuitEtoilee &&
        soleilLevant &&
        boulevardMontmartre &&
        coucherdesoleilEragny &&
        jardinMontmartre &&
        pontNeuf &&
        welcomeBoards &&
        sky
      ) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  }, [
    device,
    boulevardMontmartre,
    coucherdesoleilEragny,
    gallery,
    jardinMontmartre,
    laNuitEtoilee,
    pontNeuf,
    soleilLevant,
    welcomeBoards,
    sky,
  ]);

  extend({ PointerLockControls });

  if (device === "mobile") {
    return (
      <Mobile />
    );
  } else if (device === "desktop") {
    return (
      <>
        <Loader loading={loading} />
        <CrossHair />
        <VRButton />
        <Canvas
          gl={{ antialias: true }}
          camera={{ position: [0, 1.5, 0], fov: 60, rotation: [0, 0, 0] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <PointerLockControls
            position={[0, 1.5, 0]}
            rotation={[0, 0, 0]}
            speed={0.05}
          />

          <XR
            frameRate={72 | 90 | 120}
            sessionInit={{
              optionalFeatures: ["local-floor", "bounded-floor"],
              requiredFeatures: ["hit-test"],
            }}
          >
            <Hands />
            <boxGeometry />
            <directionalLight castShadow position={[1, 2, 3]} intensity={0.5} />
            <ambientLight intensity={0.5} />

            <Sky sky={sky} />

            <Gallery modele={gallery} modele2={gallery} />

            <WelcomeBoard
              modele={welcomeBoards}
              basePosition={{ x: 0, y: 1.49, z: -4.8 }}
              baseRotation={{ x: 0, y: 0, z: 0 }}
              baseScale={1.375}
            />

            <Paint
              name="soleilLevant"
              basePosition={{ x: 4.8, y: 1.5, z: -2 }}
              baseRotation={{ x: 0, y: 4.7, z: 0 }}
              hoverPosition={{ x: 4.2, y: 1.5, z: -2 }}
              clickPosition={{ x: 3, y: 1.5, z: -2 }}
              clickRotation={{ x: 0, y: 5.2, z: 0 }}
              baseScale={1.93}
              paint={soleilLevant}
            />

            <Paint
              name="pontNeuf"
              basePosition={{ x: 4.8, y: 1.5, z: 2 }}
              baseRotation={{ x: 0, y: 4.7, z: 0 }}
              hoverPosition={{ x: 4.2, y: 1.5, z: 2 }}
              clickPosition={{ x: 3, y: 1.5, z: 2 }}
              clickRotation={{ x: 0, y: 4.2, z: 0 }}
              baseScale={1}
              paint={pontNeuf}
            />

            <Paint
              name="jardinMontmartre"
              basePosition={{ x: 2, y: 1.5, z: 4.8 }}
              baseRotation={{ x: 0, y: 3.15, z: 0 }}
              hoverPosition={{ x: 2, y: 1.5, z: 4.2 }}
              clickPosition={{ x: 2, y: 1.5, z: 3 }}
              clickRotation={{ x: 0, y: 3.65, z: 0 }}
              baseScale={1.28}
              paint={jardinMontmartre}
            />

            <Paint
              name="coucherDeSoleilEragny"
              basePosition={{ x: -2, y: 1.5, z: 4.8 }}
              baseRotation={{ x: 0, y: 3.15, z: 0 }}
              hoverPosition={{ x: -2, y: 1.5, z: 4.2 }}
              clickPosition={{ x: -2, y: 1.5, z: 3 }}
              clickRotation={{ x: 0, y: 2.65, z: 0 }}
              baseScale={1}
              paint={coucherdesoleilEragny}
            />

            <Paint
              name="boulevardMontmartre"
              basePosition={{ x: -4.8, y: 1.5, z: 2 }}
              baseRotation={{ x: 0, y: -4.7, z: 0 }}
              hoverPosition={{ x: -4.2, y: 1.5, z: 2 }}
              clickPosition={{ x: -3, y: 1.5, z: 2 }}
              clickRotation={{ x: 0, y: -4.2, z: 0 }}
              baseScale={1.55}
              paint={boulevardMontmartre}
            />

            <Paint
              name="nuitEtoilee"
              basePosition={{ x: -4.8, y: 1.5, z: -2 }}
              baseRotation={{ x: 0, y: -4.7, z: 0 }}
              hoverPosition={{ x: -4.2, y: 1.5, z: -2 }}
              clickPosition={{ x: -3, y: 1.5, z: -2 }}
              clickRotation={{ x: 0, y: -5.2, z: 0 }}
              baseScale={0.5}
              paint={laNuitEtoilee}
            />

            <Controllers rayMaterial={{ color: "black" }} />
          </XR>
        </Canvas>
      </>
    );
  };
}