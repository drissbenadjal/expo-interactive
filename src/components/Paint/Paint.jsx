import { Interactive, RayGrab } from '@react-three/xr';
import { zoom, rotate } from '../Animations/Animations';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export const Paint = ({ name, basePosition, baseRotation, hoverPosition, clickPosition, clickRotation, baseScale, paint }) => {

    const playBtn = useLoader(TextureLoader, './assets/Images/Icons/play.png')
    const sound = new Audio(`./assets/sounds/${name}.mp3`);

    return (
        <Interactive
            onHover={() => {
                zoom(paint.scene.position, hoverPosition.x, hoverPosition.y, hoverPosition.z);
            }}

            onBlur={() => {
                sound.pause()
                paint.scene.position.set(basePosition.x, basePosition.y, basePosition.z);
            }}

            onClick={() => {
                sound.play()
            }}
        >

        <mesh
            position={[0, 1.5, -2]}
            rotation={[0, 0, 0]}
            scale={[0.5, 0.5, 0.5]}
            onClick={() => {
                console.log('click')
            }}
        >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={playBtn} />
        </mesh>
            {/* <RayGrab> */}
                <primitive
                    object={paint.scene}
                    scale={baseScale}
                    position={[basePosition.x, basePosition.y, basePosition.z]}
                    rotation={[baseRotation.x, baseRotation.y, baseRotation.z]}
                    onPointerOver={(event) => {
                        zoom(paint.scene.position, hoverPosition.x, hoverPosition.y, hoverPosition.z);
                    }}
                    onPointerOut={(event) => {
                        sound.pause()
                        zoom(paint.scene.position, basePosition.x, basePosition.y, basePosition.z);
                        rotate(paint.scene.rotation, baseRotation.x, baseRotation.y, baseRotation.z);

                    }}
                    onClick={(event) => {
                        rotate(paint.scene.rotation, clickRotation.x, clickRotation.y, clickRotation.z);
                        zoom(paint.scene.position, clickPosition.x, clickPosition.y, clickPosition.z);
                        sound.play()
                        event.stopPropagation()
                    }}
                />
            {/* </RayGrab> */}
        </Interactive>
    )
}