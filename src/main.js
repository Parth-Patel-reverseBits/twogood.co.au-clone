import scroll from "./locomotive";
import { gsap } from "gsap";

gsap.from("#text-1", {
    y: 500,
    // duration: 1
})

gsap.from("#text-2", {
    y: 500,
    delay: .3
})

gsap.from("#text-3", {
    y: 500,
    delay: .5
})


  