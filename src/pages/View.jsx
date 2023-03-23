import '../index.css'

import React, { Suspense, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame, useLoader, extend, createRoot, events } from '@react-three/fiber'
import { useGLTF, PointerLockControls, shaderMaterial, Sphere } from '@react-three/drei'
import { VRButton, XR, Controllers, Hands, Interactive, RayGrab, useXR } from '@react-three/xr'
import * as THREE from 'three'

import { Gallery } from '../components/Gallery/Gallery'
import { CrossHair } from '../components/CrossHair/CrossHair'
import { Paint } from '../components/Paint/Paint'
import { Loader } from '../components/Loader/Loader'

export const View = () => {

    const [loading, setLoading] = useState(true)

    const gallery = useGLTF(`./assets/modeles/vr_gallery/scene.gltf`);
    const laNuitEtoilee = useGLTF(`./assets/textures/LaNuitEtoilee.glb`);
    const soleilLevant = useGLTF(`./assets/textures/soleilLevant.glb`);
    const boulevardMontmartre = useGLTF(`./assets/textures/boulevardMontmartre.glb`);
    const coucherdesoleilEragny = useGLTF(`./assets/textures/coucherdesoleilEragny.glb`);
    const jardinMontmartre = useGLTF(`./assets/textures/jardinMontmartre.glb`);
    const pontNeuf = useGLTF(`./assets/textures/pontNeuf.glb`);

    //play le son
    useEffect(() => {
        const audioambiance = new Audio('../assets/sounds/ambiance.mp3')
        window.addEventListener('click', () => {
            audioambiance.play()
            audioambiance.volume = 0.08
            audioambiance.loop = true
        })
    }, [])

    // quand tout les gltf sont chargé on enleve le loading
    useEffect(() => {
        if (
            gallery &&
            laNuitEtoilee &&
            soleilLevant &&
            boulevardMontmartre &&
            coucherdesoleilEragny &&
            jardinMontmartre &&
            pontNeuf
        ) {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }, [gallery, laNuitEtoilee, soleilLevant, boulevardMontmartre, coucherdesoleilEragny, jardinMontmartre, pontNeuf])

    //utiliser pointerlockcontrols
    extend({ PointerLockControls })


    // Animation
    //     const comp = useRef(); // create a ref for the root level element (for scoping)
    //     const circle = useRef();

    //     useLayoutEffect(() => {

    //   // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    //   let ctx = gsap.context(() => {

    //     // Our animations can use selector text like ".box" 
    //     // this will only select '.box' elements that are children of the component
    //     gsap.to(".box", {});
    //     // or we can use refs
    //     gsap.to(circle.current, { rotation: 360 });

    //   }, comp); // <- IMPORTANT! Scopes selector text

    //   return () => ctx.revert(); // cleanup

    // }, []); // <- empty dependency Array so it doesn't re-run on every render



    return (
        <>
            {/* <Suspense fallback={<h1>test</h1>}> */}
            <Loader loading={loading} />
            <CrossHair />
            <VRButton />
            <Canvas
                gl={{ antialias: true }}
                camera={{ position: [0, 1.5, 0], fov: 70, rotation: [0, 0, 0] }}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true
                    gl.shadowMap.type = THREE.PCFSoftShadowMap
                }}
            >
                <XR>
                    <PointerLockControls
                        position={[0, 1.5, 0]}
                        rotation={[0, 0, 0]}
                        speed={0.05}
                        onLock={() => console.log('locked')}
                        onUnlock={() => console.log('unlocked')}
                    />
                    <Hands />
                    <boxGeometry />
                    <directionalLight castShadow position={[1, 2, 3]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <Gallery modele={gallery} />

                    <Paint
                        name="LaNuitEtoilee"
                        basePosition={{ x: -2, y: 1.5, z: -4.8 }}
                        baseRotation={{ x: 0, y: 0, z: 0 }}
                        hoverPosition={{ x: -2, y: 1.5, z: -4.2 }}
                        clickPosition={{ x: -2, y: 1.5, z: -3 }}
                        clickRotation={{ x: 0, y: 0.5, z: 0 }}
                        baseScale={0.5}
                        paint={laNuitEtoilee}
                    />
                    
                    <Paint
                        name="soleilLevant"
                        basePosition={{ x: 2, y: 1.5, z: -4.8 }}
                        baseRotation={{ x: 0, y: 0, z: 0 }}
                        hoverPosition={{ x: 2, y: 1.5, z: -4.2 }}
                        clickPosition={{ x: 2, y: 1.5, z: -3 }}
                        clickRotation={{ x: 0, y: -0.5, z: 0 }}
                        baseScale={1.93}
                        paint={soleilLevant}
                    />

                    <Paint
                        name="boulevardMontmartre"
                        basePosition={{ x: 4.8, y: 1.5, z: -2 }}
                        baseRotation={{ x: 0, y: 4.7, z: 0 }}
                        hoverPosition={{ x: 4.2, y: 1.5, z: -2 }}
                        clickPosition={{ x: 3, y: 1.5, z: -2 }}
                        clickRotation={{ x: 0, y: 5.2, z: 0 }}
                        baseScale={1.55}
                        paint={boulevardMontmartre}
                    />

                    <Paint
                        name="coucherDeSoleilEragny"
                        basePosition={{ x: 4.8, y: 1.5, z: 2 }}
                        baseRotation={{ x: 0, y: 4.7, z: 0 }}
                        hoverPosition={{ x: 4.2, y: 1.5, z: 2 }}
                        clickPosition={{ x: 3, y: 1.5, z: 2 }}
                        clickRotation={{ x: 0, y: 4.2, z: 0 }}
                        baseScale={1}
                        paint={coucherdesoleilEragny}
                    />

                    <Paint
                        name="jardinMontmartre"
                        basePosition={{ x: -4.8, y: 1.5, z: -2 }}
                        baseRotation={{ x: 0, y: -4.7, z: 0 }}
                        hoverPosition={{ x: -4.2, y: 1.5, z: -2 }}
                        clickPosition={{ x: -3, y: 1.5, z: -2 }}
                        clickRotation={{ x: 0, y: -5.2, z: 0 }}
                        baseScale={1.28}
                        paint={jardinMontmartre}
                    />

                    <Paint
                        name="pontNeuf"
                        basePosition={{ x: -4.8, y: 1.5, z: 2 }}
                        baseRotation={{ x: 0, y: -4.7, z: 0 }}
                        hoverPosition={{ x: -4.2, y: 1.5, z: 2 }}
                        clickPosition={{ x: -3, y: 1.5, z: 2 }}
                        clickRotation={{ x: 0, y: -4.2, z: 0 }}
                        baseScale={1}
                        paint={pontNeuf}
                    />

                    <Controllers
                        rayMaterial={{ color: 'blue' }}
                    />
                </XR>
            </Canvas>
            {/* </Suspense> */}
        </>
    )
}