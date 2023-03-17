
import { Loader } from '../components/CrossHair/Loader/Loader'

import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader, extend, createRoot, events } from '@react-three/fiber'
import { useGLTF, PointerLockControls, OrbitControls } from '@react-three/drei'
import { VRButton, XR, Controllers, Hands, Interactive, RayGrab, useXR } from '@react-three/xr'
import * as THREE from 'three'

import { CrossHair } from '../components/CrossHair/CrossHair'

export const View = () => {

    const [loading, setLoading] = useState(true)

    const gallery = useGLTF('../assets/modeles/vr_gallery/scene.gltf')

    const LaNuitEtoilee = useGLTF('../assets/textures/LaNuitEtoilee.glb')
    const soleilLevant = useGLTF('../assets/textures/soleilLevant.glb')
    const boulevardMontmartre = useGLTF('../assets/textures/boulevardMontmartre.glb')
    const coucherdesoleilEragny = useGLTF('../assets/textures/coucherdesoleilEragny.glb')
    const jardinMontmartre = useGLTF('../assets/textures/jardinMontmartre.glb')
    const pontNeuf = useGLTF('../assets/textures/pontNeuf.glb')

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

    //play le son
    useEffect(() => {
        const audioambiance = new Audio('../assets/sounds/test.mp3')
        //quand la souris a bouger on play le son
        window.addEventListener('mousemove', () => {
            audioambiance.play()
            audioambiance.volume = 0.2
        })
    }, [])
    const audiotest = new Audio('../assets/sounds/ds.mp3')

    //utiliser pointerlockcontrols
    extend({ PointerLockControls })

    return (
        <>
            {/* <Loader loading={loading} /> */}
            <CrossHair />
            <VRButton />
            <Canvas
                gl={{ antialias: true }}
                //zoomer la camera
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
                    <primitive
                        object={gallery.scene}
                        scale={1}
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        onClick={(event) => {
                            // console.log(event.object.name)
                            // console.log(event.eventObject)
                            // console.log(event.object)
                            // event.stopPropagation()
                        }}
                    />
                    <Interactive
                        onHover={() => {
                            //avance le tableau
                            LaNuitEtoilee.scene.position.set(-2, 1.5, -4.2)
                            audiotest.play()
                        }}

                        onBlur={() => {
                            //avance le tableau
                            LaNuitEtoilee.scene.position.set(-2, 1.5, -4.8)
                            audiotest.pause()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={LaNuitEtoilee.scene}
                                scale={0.5}
                                position={[-2, 1.5, -4.8]}
                                rotation={[0, 0, 0]}
                                //quand on hover le tableau sa avance
                                onPointerOver={(event) => {
                                    LaNuitEtoilee.scene.position.set(-2, 1.5, -4.2)
                                    audiotest.play()
                                }}
                                onPointerOut={(event) => {
                                    LaNuitEtoilee.scene.position.set(-2, 1.5, -4.8)
                                    audiotest.pause()
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                }}

                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            //avance le tableau
                            soleilLevant.scene.position.set(2, 1.5, -4.2)
                            audiotest.play()
                        }}

                        onBlur={() => {
                            //scale le tableau
                            soleilLevant.scene.position.set(2, 1.5, -4.8)
                            audiotest.pause()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={soleilLevant.scene}
                                scale={1.93}
                                position={[2, 1.5, -4.8]}
                                rotation={[0, 0, 0]}
                                //quand on hover le tableau sa avance
                                onPointerOver={(event) => {
                                    soleilLevant.scene.position.set(2, 1.5, -4.2)
                                    audiotest.play()
                                }}
                                onPointerOut={(event) => {
                                    soleilLevant.scene.position.set(2, 1.5, -4.8)
                                    audiotest.pause()
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            //avance le tableau
                            boulevardMontmartre.scene.position.set(4.2, 1.5, -2)
                            audiotest.play()
                        }}

                        onBlur={() => {
                            //scale le tableau
                            boulevardMontmartre.scene.position.set(4.8, 1.5, -2)
                            audiotest.pause()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={boulevardMontmartre.scene}
                                scale={1.55}
                                position={[4.8, 1.5, -2]}
                                rotation={[0, 4.7, 0]}
                                //quand on hover le tableau sa avance
                                onPointerOver={(event) => {
                                    boulevardMontmartre.scene.position.set(4.2, 1.5, -2)
                                    audiotest.play()
                                }}
                                onPointerOut={(event) => {
                                    boulevardMontmartre.scene.position.set(4.8, 1.5, -2)
                                    audiotest.pause()
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            //avance le tableau
                            coucherdesoleilEragny.scene.position.set(4.2, 1.5, 2)
                            audiotest.play()
                        }}

                        onBlur={() => {
                            //scale le tableau
                            coucherdesoleilEragny.scene.position.set(4.8, 1.5, 2)
                            audiotest.pause()
                        }}
                    >
                        <RayGrab>
                            <primitive

                                object={coucherdesoleilEragny.scene}
                                scale={1}

                                position={[4.8, 1.5, 2]}
                                rotation={[0, 4.7, 0]}
                                //quand on hover le tableau sa avance
                                onPointerOver={(event) => {
                                    coucherdesoleilEragny.scene.position.set(4.2, 1.5, 2)
                                    audiotest.play()
                                }}
                                onPointerOut={(event) => {
                                    coucherdesoleilEragny.scene.position.set(4.8, 1.5, 2)
                                    audiotest.pause()
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            //avance le tableau
                            jardinMontmartre.scene.position.set(-4.2, 1.5, -2)
                            audiotest.play()
                        }}

                        onBlur={() => {
                            //scale le tableau
                            jardinMontmartre.scene.position.set(-4.8, 1.5, -2)
                            audiotest.pause()
                        }}
                    >
                        <RayGrab>
                            <primitive
                                object={jardinMontmartre.scene}
                                scale={1.28}
                                position={[-4.8, 1.5, -2]}
                                rotation={[0, -4.7, 0]}
                                //quand on hover le tableau sa avance
                                onPointerOver={(event) => {
                                    jardinMontmartre.scene.position.set(-4.2, 1.5, -2)
                                    audiotest.play()
                                }}
                                onPointerOut={(event) => {
                                    jardinMontmartre.scene.position.set(-4.8, 1.5, -2)
                                    audiotest.pause()
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                }}
                            />
                        </RayGrab>
                    </Interactive>
                    <Interactive
                        onHover={() => {
                            //avance le tableau
                            pontNeuf.scene.position.set(-4.2, 1.5, 2)
                            audiotest.play()
                        }}

                        onBlur={() => {
                            //scale le tableau
                            pontNeuf.scene.position.set(-4.8, 1.5, 2)
                            audiotest.pause()
                        }}
                    >
                        <RayGrab>
                            <primitive

                                object={pontNeuf.scene}
                                scale={1}

                                position={[-4.8, 1.5, 2]}
                                rotation={[0, -4.7, 0]}
                                //quand on hover le tableau sa avance
                                onPointerOver={(event) => {
                                    pontNeuf.scene.position.set(-4.2, 1.5, 2)
                                    audiotest.play()
                                }}
                                onPointerOut={(event) => {
                                    pontNeuf.scene.position.set(-4.8, 1.5, 2)
                                    audiotest.pause()
                                }}
                                onClick={(event) => {
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
        </>
    )
}