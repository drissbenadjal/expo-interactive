import { Interactive, RayGrab } from '@react-three/xr';
import { zoom, rotate } from '../Animations/Animations';
import { gsap } from "gsap";


export const Paint = ({ name, basePosition, baseRotation, hoverPosition, clickPosition, clickRotation, baseScale, paint }) => {
    const sound = new Audio(`./assets/sounds/${name}.mp3`);

    return (
        <Interactive
            onHover={() => {
                gsap.to(paint.scene.position, { x: hoverPosition.x, y: hoverPosition.y, z: hoverPosition.z });
                console.log("hover")
            }}

            onBlur={() => {
                sound.pause()
                zoom(paint.scene.position, basePosition.x, basePosition.y, basePosition.z);
                rotate(paint.scene.rotation, baseRotation.x, baseRotation.y, baseRotation.z);
            }}

            onSelect={() => {

                rotate(paint.scene.rotation, clickRotation.x, clickRotation.y, clickRotation.z);
                zoom(paint.scene.position, clickPosition.x, clickPosition.y, clickPosition.z);
                sound.play()
            }}
        >
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