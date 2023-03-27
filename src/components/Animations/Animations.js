import { gsap } from "gsap";

export const zoom = (target, x, y, z) => {
    gsap.to(target, { x: x, y: y, z: z })
}

export const rotate = (target, x, y, z) => {
    gsap.to(target, { x: x, y: y, z: z })
}

export const zoomVR = (target, x, y, z) => {
    const duration = 500;
    const framesNumber = 60;

    const xStep = (x - target.scene.position.x) / framesNumber;
    const yStep = (y - target.scene.position.y) / framesNumber;
    const zStep = (z - target.scene.position.z) / framesNumber;

    for (let i = 0; i < framesNumber; i++) {
        setTimeout(() => {
            target.scene.position.x += xStep;
            target.scene.position.y += yStep;
            target.scene.position.z += zStep;
        }, i * duration / framesNumber);
    }
}