
import { Loader } from '../components/Loader/Loader'

import React, { Suspense, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame, useLoader, extend, createRoot, events } from '@react-three/fiber'
import { useGLTF, PointerLockControls, shaderMaterial, Sphere } from '@react-three/drei'
import { VRButton, XR, Controllers, Hands, Interactive, RayGrab, useXR } from '@react-three/xr'
import * as THREE from 'three'
import glsl from 'babel-plugin-glsl/macro'
import { gsap } from "gsap";

import { CrossHair } from '../components/CrossHair/CrossHair'

export const View = () => {

    const [loading, setLoading] = useState(true)



    const ColorShiftMaterial = shaderMaterial(
        { uTime: 0, uColorStart: new THREE.Color('lightBlue'), uColorEnd: new THREE.Color('white') },
        glsl`
        varying vec2 vUv;
        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectionPosition = projectionMatrix * viewPosition;
            gl_Position = projectionPosition;
            vUv = uv;
        }`,
        glsl`
        #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
        uniform float uTime;
        uniform vec3 uColorStart;
        uniform vec3 uColorEnd;
        varying vec2 vUv;
        void main() {
            vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
            float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
            float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
            strength += outerGlow;
            strength += step(-0.2, strength) * 0.8;
            strength = clamp(strength, 0.0, 1.0);
            vec3 color = mix(uColorStart, uColorEnd, strength);
            gl_FragColor = vec4(color, 1.0);
        }`,
    )
    extend({ ColorShiftMaterial })

    const gallery = useGLTF('../assets/modeles/vr_gallery/scene.gltf')
    // console.log(gallery.scene.children[0].children[0].children[0].children[0].children[0]);

    //chargement des gltf
    const LaNuitEtoilee = useGLTF('../assets/textures/LaNuitEtoilee.glb')
    const soleilLevant = useGLTF('../assets/textures/soleilLevant.glb')
    const boulevardMontmartre = useGLTF('../assets/textures/boulevardMontmartre.glb')
    const coucherdesoleilEragny = useGLTF('../assets/textures/coucherdesoleilEragny.glb')
    const jardinMontmartre = useGLTF('../assets/textures/jardinMontmartre.glb')
    const pontNeuf = useGLTF('../assets/textures/pontNeuf.glb')

    //chargement des sons
    const boulevardMontmartreSound = new Audio('../assets/sounds/Boulevard_Montmartre.mp3');
    const coucherdesoleilEragnySound = new Audio('../assets/sounds/Coucher_du_soleil_a_Eragny.mp3');
    const jardinMontmartreSound = new Audio('../assets/sounds/Un_jardin_a_montmartre.mp3');
    const LaNuitEtoileeSound = new Audio('../assets/sounds/La_Nuit_Etoilee.mp3');
    const pontNeufSound = new Audio('../assets/sounds/Pont_Neuf.mp3');
    const soleilLevantSound = new Audio('../assets/sounds/Impression_Soleil_Levant.mp3');


    //play le son
    useEffect(() => {
        const tableauSon = [boulevardMontmartreSound, coucherdesoleilEragnySound, jardinMontmartreSound, LaNuitEtoileeSound, pontNeufSound, soleilLevantSound]
        const audioambiance = new Audio('../assets/sounds/ambiance.mp3')
        window.addEventListener('click', () => {
            audioambiance.play()
            audioambiance.volume = 0.08
        })
        //mettre tout les audio en loop
        tableauSon.forEach((audio) => {
            audio.loop = true
        })
    }, [])


    //quand tout les gltf sont chargé on enleve le loading
    useEffect(() => {
        if (
            gallery &&
            LaNuitEtoilee &&
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
    }, [gallery, LaNuitEtoilee, soleilLevant, boulevardMontmartre, coucherdesoleilEragny, jardinMontmartre, pontNeuf])

    //utiliser pointerlockcontrols
    extend({ PointerLockControls })

    function Model(props) {
        const mymaterial = useRef(null);
        useFrame((state, delta) => { (mymaterial.current.uTime += delta) })
        // gallery.scene.children[0].children[0].children[0].children[0].children[0].material
        return (
            <>
                {/* <mesh>
                    <Sphere position={[0, 1.3, 4]} scale={1}>
                        <colorShiftMaterial ref={mymaterial} time={1} />
                    </Sphere>
                </mesh> */}
                <primitive
                    object={gallery.scene}
                    scale={1}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    onCreated={() => {
                        console.log("event");
                    }}
                    onClick={(event) => {
                        // console.log(event.object.name)
                        // console.log(event.eventObject)
                        // console.log(event.object)
                        // event.stopPropagation()
                    }}
                >
                        <colorShiftMaterial ref={mymaterial} time={1} />
                </primitive>
            </>
        )
    }

    const zoom = (target, x, y, z) => {
        gsap.to(target, { x: x, y: y, z: z })
    }

    const rotate = (target, x, y, z) => {
        gsap.to(target, { x: x, y: y, z: z })
    }
    
        



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
        <Suspense fallback={<Loader loading={loading} />}>
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
                    {
                        //pointerlockcontrols
                        <PointerLockControls
                            position={[0, 1.5, 0]}
                            rotation={[0, 0, 0]}
                            speed={0.05}
                            onLock={() => console.log('locked')}
                            onUnlock={() => console.log('unlocked')}
                        />
                    }
                    <Hands />
                    <boxGeometry />
                    <directionalLight castShadow position={[1, 2, 3]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <Model />
                    <Interactive
                        onHover={() => {
                            // LaNuitEtoilee.scene.position.set(-2, 1.5, -4.2)

                        }}

                        onBlur={() => {
                            LaNuitEtoileeSound.pause()
                            LaNuitEtoilee.scene.position.set(-2, 1.5, -4.8)
                        }}

                        onClick={() => {
                            LaNuitEtoileeSound.play()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={LaNuitEtoilee.scene}
                                scale={0.5}
                                position={[-2, 1.5, -4.8]}
                                rotation={[0, 0, 0]}
                                onPointerOver={(event) => {
                                    zoom(LaNuitEtoilee.scene.position, -2, 1.5, -4.2);

                                }}
                                onPointerOut={(event) => {
                                    LaNuitEtoileeSound.pause()
                                    zoom(LaNuitEtoilee.scene.position, -2, 1.5, -4.8);
                                    rotate(LaNuitEtoilee.scene.rotation, 0, 0, 0);

                                }}
                                onClick={(event) => {
                                    rotate(LaNuitEtoilee.scene.rotation, 0, 0.5, 0);
                                    zoom(LaNuitEtoilee.scene.position, -2, 1.5, -3);
                                    LaNuitEtoileeSound.play()
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            soleilLevant.scene.position.set(2, 1.5, -4.2)
                        }}

                        onBlur={() => {
                            soleilLevantSound.pause()
                            soleilLevant.scene.position.set(2, 1.5, -4.8)
                        }}

                        onClick={() => {
                            soleilLevantSound.play()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={soleilLevant.scene}
                                scale={1.93}
                                position={[2, 1.5, -4.8]}
                                rotation={[0, 0, 0]}
                                onPointerOver={(event) => {
                                    soleilLevant.scene.position.set(2, 1.5, -4.2)
                                }}
                                onPointerOut={(event) => {
                                    soleilLevantSound.pause()
                                    soleilLevant.scene.position.set(2, 1.5, -4.8)
                                }}
                                onClick={(event) => {
                                    soleilLevantSound.play()
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            boulevardMontmartre.scene.position.set(4.2, 1.5, -2)
                        }}

                        onBlur={() => {
                            boulevardMontmartreSound.pause()
                            boulevardMontmartre.scene.position.set(4.8, 1.5, -2)
                        }}

                        onClick={() => {
                            boulevardMontmartreSound.play()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={boulevardMontmartre.scene}
                                scale={1.55}
                                position={[4.8, 1.5, -2]}
                                rotation={[0, 4.7, 0]}
                                onPointerOver={(event) => {
                                    boulevardMontmartre.scene.position.set(4.2, 1.5, -2)
                                }}
                                onPointerOut={(event) => {
                                    boulevardMontmartreSound.pause()
                                    boulevardMontmartre.scene.position.set(4.8, 1.5, -2)
                                }}
                                onClick={(event) => {
                                    boulevardMontmartreSound.play()
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            coucherdesoleilEragny.scene.position.set(4.2, 1.5, 2)
                        }}

                        onBlur={() => {
                            coucherdesoleilEragnySound.pause()
                            coucherdesoleilEragny.scene.position.set(4.8, 1.5, 2)
                        }}

                        onClick={() => {
                            coucherdesoleilEragnySound.play()
                        }}
                    >
                        <RayGrab>
                            <primitive

                                object={coucherdesoleilEragny.scene}
                                scale={1}

                                position={[4.8, 1.5, 2]}
                                rotation={[0, 4.7, 0]}

                                onPointerOver={(event) => {
                                    coucherdesoleilEragny.scene.position.set(4.2, 1.5, 2)
                                }}
                                onPointerOut={(event) => {
                                    coucherdesoleilEragnySound.pause()
                                    coucherdesoleilEragny.scene.position.set(4.8, 1.5, 2)
                                }}
                                onClick={(event) => {
                                    coucherdesoleilEragnySound.play()
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            jardinMontmartre.scene.position.set(-4.2, 1.5, -2)
                        }}

                        onBlur={() => {
                            jardinMontmartreSound.pause()
                            jardinMontmartre.scene.position.set(-4.8, 1.5, -2)
                        }}

                        onClick={() => {
                            jardinMontmartreSound.play()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={jardinMontmartre.scene}
                                scale={1.28}
                                position={[-4.8, 1.5, -2]}
                                rotation={[0, -4.7, 0]}
                                onPointerOver={(event) => {
                                    jardinMontmartre.scene.position.set(-4.2, 1.5, -2)
                                }}
                                onPointerOut={(event) => {
                                    jardinMontmartreSound.pause()
                                    jardinMontmartre.scene.position.set(-4.8, 1.5, -2)
                                }}
                                onClick={(event) => {
                                    jardinMontmartreSound.play()
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            pontNeuf.scene.position.set(-4.2, 1.5, 2)
                        }}

                        onBlur={() => {
                            pontNeufSound.pause()
                            pontNeuf.scene.position.set(-4.8, 1.5, 2)
                        }}

                        onClick={() => {
                            pontNeufSound.play()
                        }}
                    >
                        <RayGrab>
                            <primitive

                                object={pontNeuf.scene}
                                scale={1}

                                position={[-4.8, 1.5, 2]}
                                rotation={[0, -4.7, 0]}
                                //faut tu fasses l'animation dans les truc normaux et les truc interactif
                                onPointerOver={(event) => {
                                    pontNeuf.scene.position.set(-4.2, 1.5, 2)
                                }}
                                onPointerOut={(event) => {
                                    pontNeufSound.pause()
                                    pontNeuf.scene.position.set(-4.8, 1.5, 2)
                                }}
                                onClick={(event) => {
                                    pontNeufSound.play()
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Controllers
                        rayMaterial={{ color: 'blue' }}
                    />
                </XR>
            </Canvas>
        </Suspense>
    )
}