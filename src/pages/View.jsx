import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader, extend, createRoot, events } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { VRButton, XR, Controllers, Hands } from '@react-three/xr'
import * as THREE from 'three'

export const View = () => {

    const gallery = useGLTF('../assets/modeles/Scene2/scene.gltf')

    const tableau = useGLTF('../assets/textures/p.glb')

    return (
        <>
            <VRButton />
            <Canvas
                gl={{ antialias: true }}
                //monter la caméra vers le haut
                camera={{ position: [0, 2, 0], fov: 70, rotation: [0, 0, 0] }}
            >
                <XR>
                    <Hands />
                    <boxGeometry />
                    <directionalLight castShadow position={[1, 2, 3]} intensity={5} />
                    <ambientLight intensity={1} />
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
                    <primitive
                        object={tableau.scene}
                        scale={3}
                        position={[0, 1.7, -4.9]}
                        rotation={[0, 0, 0]}
                    />
                    <Controllers />
                </XR>
            </Canvas>
        </>
    )
}