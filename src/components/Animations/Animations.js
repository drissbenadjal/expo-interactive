import { gsap } from "gsap";

export const zoom = (target, x, y, z) => {
    gsap.to(target, { x: x, y: y, z: z })
}

export const rotate = (target, x, y, z) => {
    gsap.to(target, { x: x, y: y, z: z })
}

// zoom animation in vanilla js without gsap with transition
// export const zoomVR = (target, x, y, z) => {
//     const duration = 500;
//     //for three.js
//     target.position.x = x;
//     target.position.y = y;
//     target.position.z = z;

//     target.setAttribute('position', { x: x, y: y, z: z });
//     target.setAttribute('animation', { property: 'position', to: { x: x, y: y, z: z }, dur: duration, easing: 'easeOutElastic' });
// }

export const zoomVR = (target, x, y, z) => {
    const duration = 500;
    const framesNumber = 60;

    const xStep = (x - target.scene.position.x) / framesNumber;
    const yStep = (y - target.scene.position.y) / framesNumber;
    const zStep = (z - target.scene.position.z) / framesNumber;

    setInterval(() => {
        target.scene.position.x += xStep;
        target.scene.position.y += yStep;
        target.scene.position.z += zStep;
    }, duration / framesNumber);
}



