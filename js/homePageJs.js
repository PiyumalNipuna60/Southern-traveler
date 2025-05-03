const data = [
  {
    place: "Sri Lanka - Dabulla",
    title: "SIGIRIYA",
    title2: "ROCK",
    description:
      "Sigiriya or Sinhagiri is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka.",
    image: "assets/sigiriya2.jpg",
  },
  {
    place: "Sri Lanka - Kandy",
    title: "DALADA",
    title2: "MALIGAVA",
    description:
      "Sri Dalada Maligawa, commonly known in English as the Temple of the Sacred Tooth Relic, is a Buddhist temple in Kandy, Sri Lanka. It is located in the Royal Palace Complex of the former Kingdom of Kandy, which houses the relic of the tooth of the Buddha.",
    image: "assets/kandy2.jpg",
  },
  {
    place: "Sri Lanka - Galle",
    title: "GALLE",
    title2: "KOTUVA",
    description:
      "Galle Fort, in the Bay of Galle on the southwest coast of Sri Lanka, was built first in 1588 by the Portuguese, then extensively fortified by the Dutch during the 17th century from 1649 onwards.",
    image: "assets/galle4.jpg",
  },
  {
    place: "Sri Lanka - Anuradhapura",
    title: "JAYASIRI",
    title2: "MAHA BODHIYA",
    description:
      "Jaya Sri Maha Bodhi Tree is a historical sacred bo tree (Ficus religiosa) in the Mahamewuna Garden in historical city of Anuradhapura, Sri Lanka. This is believed to be a tree grown from a cutting of the southern branch from the historical sacred bo tree, Sri Maha Bodhi, which was destroyed during the time of Emperor Ashoka the Great, at Buddha Gaya in India, under which Siddhartha Gautama (Buddha) attained Enlightenment.",
    image: "assets/jayasiri_maha_bodiya.jpg",
  },
  {
    place: "Sri Lanka - Jaffna",
    title: "NALLUR",
    title2: "KOVIL",
    description:
      "Nallur Kandaswamy Kovil or Nallur Murugan Kovil is one of the most significant Hindu temples in the Jaffna District of Northern Province, Sri Lanka. The temple is a socially important institution for the Sri Lankan Tamils Hindu identity and many temples have been built in Europe and North America using the same name as a cultural memory",
    image: "assets/kovila2.jpg",
  },
  {
    place: "Sri Lanka - Alla",
    title: "NINE ARCH",
    title2: "BRIDGE",
    description:
      "The Nine Arch Bridge also called the Bridge in the Sky, is a viaduct bridge in Sri Lanka and one of the best examples of colonial-era railway construction in the country. The bridge was designed to accommodate a challenging nine-degree curve and steep gradient",
    image: "assets/ella.jpg",
  },
];

const _ = (id) => document.getElementById(id);
const cards = data
  .map(
    (i, index) =>
      `<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`
  )
  .join("");

const cardContents = data
  .map(
    (i, index) => `<div class="card-content" id="card-content-${index}">
  <div class="content-start"></div>
  <div class="content-place">${i.place}</div>
  <div class="content-title-1">${i.title}</div>
  <div class="content-title-2">${i.title2}</div>
  </div>`
  )
  .join("");

const sildeNumbers = data
  .map(
    (_, index) =>
      `<div class="item" id="slide-item-${index}" >${index + 1}</div>`
  )
  .join("");
_("demo").innerHTML = cards + cardContents;
_("slide-numbers").innerHTML = sildeNumbers;

const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;
let autoSlideInterval;
let isAutoSliding = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        startAutoSlide();
      }, 500);
    },
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

  // Add event listeners for pagination buttons
  document.querySelector(".arrow-left").addEventListener("click", () => {
    stopAutoSlide();
    order.unshift(order.pop());
    detailsEven = !detailsEven;
    step().then(() => {
      startAutoSlide();
    });
  });

  document.querySelector(".arrow-right").addEventListener("click", () => {
    stopAutoSlide();
    order.push(order.shift());
    detailsEven = !detailsEven;
    step().then(() => {
      startAutoSlide();
    });
  });
}

function startAutoSlide() {
  if (isAutoSliding) {
    autoSlideInterval = setInterval(() => {
      order.push(order.shift());
      detailsEven = !detailsEven;
      step();
    }, 5000);
  }
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

// Theme switcher functionality
document
  .getElementById("theme-switcher")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });

start();

document.addEventListener("DOMContentLoaded", function () {
  // Target values for each counter (in thousands)
  const targetValues = [2.5, 1.8, 2.0, 1.5];
  const durations = [2, 2, 2, 2]; // Duration in seconds for each counter

  // Function to format number with K+
  function formatNumber(num) {
    // If the number is a whole number, show without decimal
    if (num % 1 === 0) {
      return num + "K+";
    } else {
      return num.toFixed(1) + "K+";
    }
  }

  // Animate each counter
  targetValues.forEach((value, index) => {
    const counterId = `counter${index + 1}`;
    const counterElement = document.getElementById(counterId);

    // Start from 0
    let currentValue = 0;
    const increment = value / (durations[index] * 100);

    const updateCounter = () => {
      currentValue += increment;
      if (currentValue < value) {
        counterElement.textContent = formatNumber(currentValue);
        requestAnimationFrame(updateCounter);
      } else {
        counterElement.textContent = formatNumber(value);
      }
    };

    updateCounter();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("playButton");
  const videoModal = document.getElementById("videoModal");
  const youtubeVideo = document.getElementById("youtubeVideo");
  const closeModal = document.getElementById("closeModal");

  playButton.addEventListener("click", function () {
    const videoId = this.getAttribute("data-video-id");
    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
    videoModal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", function () {
    youtubeVideo.src = "";
    videoModal.classList.add("hidden");
  });

  // Close modal when clicking outside the video
  videoModal.addEventListener("click", function (e) {
    if (e.target === videoModal) {
      youtubeVideo.src = "";
      videoModal.classList.add("hidden");
    }
  });
});

//scrolling effect--------------------------------
// Add this script to your existing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(
    "nav > div:last-child > div:not(.svg-container)"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the target section ID from the link text
      const targetId = this.textContent.trim().toLowerCase();
      let targetSection;

      // Map link text to section IDs
      switch (targetId) {
        case "home":
          targetSection = document.querySelector(".home-section");
          break;
        case "calculator":
          targetSection = document.querySelector(".calculator-section");
          break;
        case "destination":
          targetSection = document.querySelector(".popular-destinations");
          break;
        case "packages":
          targetSection = document.querySelector(".popular-packages");
          break;
        case "activity":
          // Change this to your offers section if you have one
          targetSection = document.querySelector(".activity-section");
          break;
        case "contact":
          // Change this to your contact section if you have one
          targetSection = document.querySelector("");
          break;
        default:
          return;
      }

      if (targetSection) {
        // Smooth scroll to the target section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active nav item
        navLinks.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Add this to your existing homePageJs.js or create a new file
  // This handles the scroll spy functionality to highlight the current section
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navHeight = document.querySelector("nav").offsetHeight;
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - navHeight - 100) {
        current = section.getAttribute("id") || section.className.split(" ")[0];
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const linkText = link.textContent.trim().toLowerCase();

      if (
        (linkText === "home" && current.includes("home")) ||
        (linkText === "calculator" && current.includes("calculator")) ||
        (linkText === "packages" && current.includes("packages")) ||
        (linkText === "destination" && current.includes("destination")) ||
        (linkText === "activity" && current.includes("activity")) ||
        (linkText === "contact" && current.includes("callback"))
      ) {
        link.classList.add("active");
      }
    });
  });
});


// Mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  
  if (mobileNavToggle && mobileNav && mobileNavOverlay) {
      mobileNavToggle.addEventListener('click', function() {
          mobileNav.classList.toggle('active');
          mobileNavOverlay.classList.toggle('active');
      });
      
      mobileNavOverlay.addEventListener('click', function() {
          mobileNav.classList.remove('active');
          mobileNavOverlay.classList.remove('active');
      });
      
      // Close menu when clicking on links
      const mobileNavLinks = mobileNav.querySelectorAll('a');
      mobileNavLinks.forEach(link => {
          link.addEventListener('click', function() {
              mobileNav.classList.remove('active');
              mobileNavOverlay.classList.remove('active');
          });
      });
  }
});