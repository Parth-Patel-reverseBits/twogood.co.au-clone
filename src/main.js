import scroll from "./locomotive";
import { gsap } from "gsap";


gsap.from("h1", {
    y: 500,
    stagger: .3,
})

document.addEventListener("mousemove", (event) =>{
    gsap.to("#cursor", {
        x: event.x,
        y: event.y,
        // scale: 1,
        // backgroundColor: "red"
    })
})


// product-card-1 
document.getElementById("product-card-1").addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
        scale: 1
    })
})
document.getElementById("product-card-1").addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
        scale: 0
    })
})

// product-card-2
document.getElementById("product-card-2").addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
        scale: 1
    })
})
document.getElementById("product-card-2").addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
        scale: 0
    })
})

// product-card-3
document.getElementById("product-card-3").addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
        scale: 1
    })
})
document.getElementById("product-card-3").addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
        scale: 0
    })
})


// product-card-4
document.getElementById("product-card-4").addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
        scale: 1,
        backgroundColor: "#DCC0B4",
        transform: "translate(-50%, -50%)"
    })
})
document.getElementById("product-card-4").addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
        scale: 0,
        backgroundColor: "white"
    })
})

const inputBox = document.getElementById('input-box');
const defaultBtn = document.getElementById('default-btn');
const focusBtn = document.getElementById('focus-btn');

inputBox.addEventListener('focus', () => {
  defaultBtn.classList.add('hidden');   
  focusBtn.classList.remove('hidden');
});

inputBox.addEventListener('blur', () => {
  defaultBtn.classList.remove('hidden');
  focusBtn.classList.add('hidden');
});











  