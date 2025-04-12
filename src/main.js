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
let swiperWrapperContainer = document.querySelector(".swiper-wrapper");
let text = "";
for (let i = 1; i <= 25; i++) {
  text += `
    <div class="swiper-slide bg-[#F7F7F7]">
      <div class="flex justify-center flex-col items-center bg-[#F7F7F7]">
        <div>
          <div class="bg-black w-4 h-4 rounded-full black-dots"></div>
          <div class="text-left font-medium text-2xl mt-6 texts cursor-pointer" for="${i}">
            m// ${i} <br />
            Chrissy Nolan
          </div>
        </div>
      </div>
    </div>
  `;
}
swiperWrapperContainer.innerHTML = text;

// Style dots: first is black, rest are white
document.querySelectorAll(".black-dots").forEach((item, index) => {
  item.style.backgroundColor = index === 0 ? "black" : "white";
  item.style.border = "2px solid black";
});

// Apply conditional hover effect to .texts
document.querySelectorAll(".texts").forEach((textEl) => {
  const dot = textEl.previousElementSibling;
  if (dot && dot.classList.contains("black-dots")) {
    const bgColor = dot.style.backgroundColor;
    if (bgColor === "white") {
      textEl.classList.add("hover:opacity-[0.5]");
    }
  }

  // Add click behavior
  textEl.addEventListener("click", () => {
    // Reset all dots and remove hover class
    document.querySelectorAll(".black-dots").forEach((dot, i) => {
      dot.style.backgroundColor = "white";
    });

    document.querySelectorAll(".texts").forEach((t) => {
      t.classList.add("hover:opacity-[0.5]");
    });

    // Set clicked one
    const currentDot = textEl.previousElementSibling;
    if (currentDot && currentDot.classList.contains("black-dots")) {
      currentDot.style.backgroundColor = "black";
      textEl.classList.remove("hover:opacity-[0.5]");
    }
  });
});
