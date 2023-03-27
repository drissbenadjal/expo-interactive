import { gsap } from "gsap";

export const zoom = (target, x, y, z) => {
    gsap.to(target, { x: x, y: y, z: z })
}

export const rotate = (target, x, y, z) => {
    gsap.to(target, { x: x, y: y, z: z })
}



