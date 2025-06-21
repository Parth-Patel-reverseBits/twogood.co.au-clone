import { gsap } from "gsap";

function scrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 1,
    lerp: 0.1,
    smartphone: {
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
    },
    tablet: {
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
    },
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

  // Handle window resize
  window.addEventListener("resize", () => {
    setTimeout(() => {
      locoScroll.update();
      ScrollTrigger.refresh();
    }, 100);
  });
}

scrollTrigger();

gsap.to("#company-text", {
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

gsap.to(".image-block", {
  translateY: "-100%",
  duration: 1,
  opacity: 1,
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
let counterVariable = 0; // ✅ define it globally

// Handle activation of a specific slide
function activateSlide(index) {
  // Reset all dots
  counterVariable = index; // ✅ update on activation
  console.log("Counter Updated:", counterVariable + 1); // ✅ test this!
  showTextAnimation(counterVariable + 1);

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

// onClick open model section

let navBarBtn = document.getElementById("nav-model");

navBarBtn.addEventListener("click", () => {
  document.getElementById("model-section").style.width = "100%";
  document.getElementById("model-section").style.height = "100vh !important";
  document.getElementById("model-section").style.zIndex = "100";
  document.getElementById("model-section").style.top = "0";
  document.getElementById("model-section").style.bottom = "0";
  document.getElementById("model-section").style.left = "0";
  document.getElementById("model-section").style.right = "0";
  document.getElementById("model-section").style.transformOrigin = "top";
  document.getElementById("model-section").classList.remove("scale-y-0");
  document.getElementById("model-section").classList.add("scale-y-100");
  myTextAnimationModel();

  // Add a small delay to ensure the model is visible before animating
  setTimeout(() => {
    runModelOpenAnimation();
  }, 300);
});

let removeNavBarBtn = document.getElementById("remove-nav-model");

removeNavBarBtn.addEventListener("click", () => {
  document.getElementById("model-section").classList.remove("scale-y-100");
  document.getElementById("model-section").classList.add("scale-y-0");
  document.getElementById("model-section").style.top = "0";
  document.getElementById("model-section").style.bottom = "0";
  document.getElementById("model-section").style.left = "0";
  document.getElementById("model-section").style.right = "0";
  document.getElementById("model-section").style.transformOrigin = "top";
});

function showTextAnimation(index) {
  console.log("TextAnimation", index);
  let textAnimationContainer = document.querySelector(
    ".text-animation-container"
  );

  // Clear previous content so we don't keep appending h2s
  textAnimationContainer.innerHTML = "";

  let h2Ele = document.createElement("h2");
  textAnimationContainer.appendChild(h2Ele);
  h2Ele.classList = "textAnimateh2";

  switch (index) {
    case 1:
      h2Ele.innerHTML = "Best Shampoo + Conditioner <br /> - very happy!";
      break;
    case 2:
      {
        const lines = [
          "Thank you so much for the",
          "beautiful catering; it means",
          "a lot working with a",
          "company such as Two Good",
          "Co.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;

    case 3:
      {
        const lines = [
          "The hampers we ordered were",
          "lovely and the team are",
          "wonderful to liaise with.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 4:
      {
        const lines = [
          "Purchased for a friend who",
          "needed a hug - the bonus is",
          "that one was donated too!",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 5:
      {
        const lines = [
          "My package just arrived",
          "and the presentation is so",
          "beautiful; elegant, magical",
          "and meaningful, with the",
          "items wrapped in",
          "delicious-smelling tissue",
          "paper. Gorgeous; will be",
          "back for more.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 6:
      {
        const lines = [
          "I think I speak for everyone",
          "when I say we are very",
          "grateful to have been able",
          "to come in and help out for",
          "the day; the work you do is",
          "amazing.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 7:
      {
        const lines = [
          "Everyone at Two Good are",
          "lovely to work with.",
          "Catering was excellent and",
          "well priced, all for a good",
          "cause... what's not to love?",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 8:
      {
        const lines = [
          "My CEO asked me who I had",
          "used for the catering; when",
          "I explained about Two",
          "Good, she said \"Oh, that's",
          "why - the food is made with",
          'love."',
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 9:
      {
        const lines = [
          "This is the best catering",
          "food I have had in years. All",
          "the meals were absolutely",
          "delicious, well presented",
          "and generous.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 10:
      {
        const lines = [
          "Great cause, great people",
          "and absolutely great for",
          "the environment.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 11:
      {
        const lines = [
          "Thank you so very much",
          "for the beautiful gift packs;",
          "my heart melted. I nearly",
          "cried when I opened one; I",
          "can only imagine how the",
          "women in the shelters feel",
          "when they receive such a",
          "gift.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 12:
      {
        const lines = [
          "I wanted to say a MASSIVE",
          "thank you for the",
          "absolutely brilliant",
          "catering at our team offsite",
          "yesterday. The food was",
          "absolutely magnificent –",
          "high quality, fresh and",
          "delicious. I had so many",
          "positive comments from my",
          "team...I will definitely be a",
          "repeat customer.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 13:
      {
        const lines = [
          "Love the quality of the food",
          "and level of customer",
          "service equals the",
          "'meaningfulness' of every",
          "purchase.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 14:
      {
        const lines = [
          "I can't thank you enough",
          "for the amazing food your",
          "team provided us today. Our",
          "staff couldn't speak highly",
          "enough of the fish and the",
          "salads; looking forward",
          "to working together more.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 15:
      {
        const lines = [
          "Blown away by the quality",
          "of the food and",
          "presentation.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 16:
      {
        const lines = [
          "Blown away by the quality",
          "of the food and",
          "presentation.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 17:
      {
        const lines = [
          "You are the most amazing",
          "people. Keep doing what",
          "you are doing. <3",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 18:
      {
        const lines = ["Warmest community, with a", "beautiful heart + space."];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 19:
      {
        const lines = ["Love what you guys are", "doing."];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 20:
      {
        const lines = [
          "It was an absolute pleasure",
          "to partner with Two Good",
          "Co for the event. Your food",
          "was absolutely delicious!",
          "The feedback we have",
          "received has been",
          "resoundingly positive - with",
          "many people having been",
          "deeply touched by the",
          "experience.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 21:
      {
        const lines = [
          "I love the story behind this",
          "business and the people",
          "who run and work in it - it",
          "feels good to work with",
          "people doing a good job",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 22:
      {
        const lines = [
          "My package just arrived",
          "and the presentation is so",
          "beautiful...elegant, magical",
          "and meaningful at the same",
          "time. Thank you so much;",
          "will be back for more.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 23:
      {
        const lines = [
          "HOW GOOD IS YOUR COOK",
          "BOOK!? Oh my, oh my; I am",
          "going to have no issues",
          "working my way through it",
          "this year, it's all so bloody",
          "delicious.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 24:
      {
        const lines = [
          "An immensely great",
          "company... and what a",
          "great cause driving the",
          "business.",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    case 25:
      {
        const lines = [
          "Thank you so much for the",
          "beautiful meals - it has made",
          "a great difference to us!",
        ];

        lines.forEach((line) => {
          let h2Ele = document.createElement("h2");
          h2Ele.classList.add("textAnimateh2");
          h2Ele.textContent = line;
          textAnimationContainer.appendChild(h2Ele);
        });
      }
      break;
    default:
      break;
  }
  onClcikAnimationSwiperJs();
}

function onClcikAnimationSwiperJs() {
  gsap.fromTo(
    ".textAnimateh2",
    { opacity: 0, y: 20 },
    {
      duration: 1,
      opacity: 1,
      y: 0,
      stagger: 0.3, // show one by one
      ease: "power2.out",
    }
  );
}

// onClick open model section texts animation

function myTextAnimationModel() {
  gsap.fromTo(
    ".textAnimateh2",
    { opacity: 0, y: 20 },
    {
      duration: 0.1, // faster animation
      opacity: 1,
      y: 0,
      stagger: 0.01, // faster staggering between elements
      ease: "power2.out",
    }
  );
}

function ModelInsideTextAnimation() {
  gsap.to("#text-anime-gsap", { opacity: 0 }, { duration: 5 });
}

// Animate navigation text elements in model section
function runModelOpenAnimation() {
  // Reset states before animating
  gsap.set(".texts-container div", {
    opacity: 0,
    y: 30,
    scale: 0.9,
  });
  gsap.set(".model-footer h3, .model-footer li", {
    opacity: 0,
    x: 20,
  });

  const tl = gsap.timeline();

  // Section 1: Main Nav
  tl.to(".texts-container div", {
    duration: 0.6,
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: 0.08,
    ease: "power2.out",
  });

  // Section 2: GET STARTED
  tl.to(".footer-col-2 h3, .footer-col-2 li", {
    duration: 0.4,
    opacity: 1,
    x: 0,
    stagger: 0.08,
    ease: "power2.out",
  });

  // Section 3: NITTY GRITTIES
  tl.to(".footer-col-3 h3, .footer-col-3 li", {
    duration: 0.4,
    opacity: 1,
    x: 0,
    stagger: 0.08,
    ease: "power2.out",
  });

  // Section 4: CONNECT WITH US
  tl.to(".footer-col-4 h3, .footer-col-4 li", {
    duration: 0.4,
    opacity: 1,
    x: 0,
    stagger: 0.08,
    ease: "power2.out",
  });
}
