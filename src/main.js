import { gsap } from "gsap";

function scrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

scrollTrigger();
gsap.to(".image-block", {
  translateY: "-100%",
  duration: 1,
  scrollTrigger: {
    trigger: ".body-container",
    // markers: true,
    scroller: "#main",
    start: "top 0",
    end: "top -5%",
    scrub: true,
  },
});

gsap.to("#nav-ul", {
  translateY: "-100%",
  duration: 1,
  opacity: 0,
  scrollTrigger: {
    trigger: ".body-container",
    // markers: true,
    scroller: "#main",
    start: "top 0",
    end: "top -5%",
    scrub: true,
  },
});

gsap.from("h1", {
  y: 500,
  stagger: 0.3,
});

document.addEventListener("mousemove", (event) => {
  gsap.to("#cursor", {
    x: event.x,
    y: event.y,
    // scale: 1,
    // backgroundColor: "red"
  });
});

// product-card-1
document
  .getElementById("product-card-1")
  .addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
      scale: 1,
    });
  });
document
  .getElementById("product-card-1")
  .addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
      scale: 0,
    });
  });

// product-card-2
document
  .getElementById("product-card-2")
  .addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
      scale: 1,
    });
  });
document
  .getElementById("product-card-2")
  .addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
      scale: 0,
    });
  });

// product-card-3
document
  .getElementById("product-card-3")
  .addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
      scale: 1,
    });
  });
document
  .getElementById("product-card-3")
  .addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
      scale: 0,
    });
  });

// product-card-4
document
  .getElementById("product-card-4")
  .addEventListener("mouseenter", (event) => {
    gsap.to("#cursor", {
      scale: 1,
      backgroundColor: "#DCC0B4",
      transform: "translate(-50%, -50%)",
    });
  });
document
  .getElementById("product-card-4")
  .addEventListener("mouseout", (event) => {
    gsap.to("#cursor", {
      scale: 0,
      backgroundColor: "white",
    });
  });

const inputBox = document.getElementById("input-box");
const defaultBtn = document.getElementById("default-btn");
const focusBtn = document.getElementById("focus-btn");

inputBox.addEventListener("focus", () => {
  defaultBtn.classList.add("hidden");
  focusBtn.classList.remove("hidden");
});

inputBox.addEventListener("blur", () => {
  defaultBtn.classList.remove("hidden");
  focusBtn.classList.add("hidden");
});

// swiper-js container
const swiperWrapperContainer = document.querySelector(".swiper-wrapper");
let html = "";

// Generate 25 slides dynamically
for (let i = 0; i < 25; i++) {
  html += `
    <div class="swiper-slide bg-[#F7F7F7]">
      <div class="flex justify-center flex-col items-center bg-[#F7F7F7]">
        <div class="">
          <div class="w-4 h-4 rounded-full black-dots" data-index="${i}"></div>
          <div class="text-left font-medium text-2xl mt-6 texts cursor-pointer" data-index="${i}">
            m// ${i + 1} <br />
            Chrissy Nolan
          </div>
          <img 
            src="https://twogood.com.au/quote-animation.svg"
            class="quote-img"
            data-index="${i}"
            style="
              display: block;
              transform: scaleX(0);
              transform-origin: center;
              transition: transform 0.5s ease-in-out;
              margin: 0 auto;
            "
          />
        </div>
      </div>
    </div>
  `;
}

swiperWrapperContainer.innerHTML = html;

// Select all dynamic elements
const dots = document.querySelectorAll(".black-dots");
const texts = document.querySelectorAll(".texts");
const images = document.querySelectorAll(".quote-img");

// Track rotation state per image and current active index
let currentIndex = 0;
const rotationStates = new Array(25).fill(false);

// Handle activation of a specific slide
function activateSlide(index) {
  // Reset all dots
  dots.forEach((dot) => {
    dot.style.backgroundColor = "white";
    dot.style.border = "2px solid black";
  });

  // Reset all texts
  texts.forEach((text) => {
    text.classList.add("hover:opacity-[0.5]");
  });

  // Reset all images except the current one
  images.forEach((img, i) => {
    if (i !== index) {
      img.style.transition = "transform 0.5s ease-in-out";
      img.style.transformOrigin = "center";
      img.style.transform = "scaleX(0)";
      img.style.display = "block";
      img.style.margin = "0 auto";
    }
  });

  // Activate dot for the selected slide
  const activeDot = dots[index];
  activeDot.style.backgroundColor = "black";

  // Activate text
  const activeText = texts[index];
  activeText.classList.remove("hover:opacity-[0.5]");

  // Handle image animation
  const img = images[index];
  img.style.display = "block";
  img.style.margin = "0 auto";
  img.style.transition = "transform 0.5s ease-in-out";
  img.style.transformOrigin = "center"; // << THIS is the key

  if (currentIndex === index) {
    // Toggle rotation on repeated click of the same text
    rotationStates[index] = !rotationStates[index];
  } else {
    // Reset rotation if clicking a different one
    rotationStates[index] = false;
  }

  img.style.transform = rotationStates[index]
    ? "rotate(180deg) scaleX(1)"
    : "scaleX(1)";

  currentIndex = index;
}

// Initial setup
activateSlide(0);

// Add click listeners
texts.forEach((text, index) => {
  text.addEventListener("click", () => activateSlide(index));
});
