// cardsgrid
const menuButtons = document.querySelectorAll(".menu-button");

menuButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const parentCard = this.closest(".menu-card");
    document.querySelectorAll(".menu-card").forEach((card) => {
      if (card !== parentCard) card.classList.remove("is-open");
    });
    parentCard.classList.toggle("is-open");
  });
});

// navbar
const headerButton = document.getElementById("headerButton");
const headerButtonIcon = headerButton ? headerButton.querySelector("i") : null;
const row = document.getElementById("row");

if (headerButton) {
  headerButton.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      row.classList.toggle("mobile-active");
      if (row.classList.contains("mobile-active")) {
        headerButtonIcon.className = "fa fa-times";
        setTimeout(function () {
          document.body.addEventListener(
            "click",
            function () {
              row.classList.remove("mobile-active");
              headerButtonIcon.className = "fa fa-bars";
            },
            { once: true },
          );
        }, 100);
      } else {
        headerButtonIcon.className = "fa fa-bars";
      }
    }
  });
}

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    if (row) row.classList.remove("mobile-active");
    if (headerButtonIcon) headerButtonIcon.className = "fa fa-bars";
  }
});

window.dispatchEvent(new Event("resize"));

// hidebutton

const header = document.querySelector("header");
const main = document.querySelector("main");
const mainHideButton = document.getElementById("mainhide");
const backgroundImg = document.getElementById("background");
const homeButton = document.querySelector("a");
const sidebar = document.querySelector("nav");

mainHideButton.addEventListener("click", function () {
  [sidebar, main, header, headerButton, homeButton, icon]
    .filter(Boolean)
    .forEach((el) => el.classList.toggle("main-hidden"));
  backgroundImg.style.opacity =
    backgroundImg.style.opacity === "1" ? ".15" : "1";
  mainHideButton.className =
    mainHideButton.className === "fa fa-eye-slash"
      ? "fa fa-eye"
      : "fa fa-eye-slash";
  document.body.style.overflow =
    document.body.style.overflow === "hidden" ? "auto" : "hidden";
});

// cards grid
const characterCards = document.querySelectorAll(".char-card");
const charModal = document.getElementById("character-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeModalBtn = document.querySelector(".close-modal");

if (characterCards.length > 0) {

  characterCards.forEach((card) => {
    card.addEventListener("click", function () {
      const imgSrc = this.querySelector(".char-image").src;
      const charName = this.querySelector(".char-hover-info h3").innerText;
      const charLore = this.querySelector(".char-detail-text").innerHTML;

      modalImg.src = imgSrc;
      modalTitle.innerText = charName;
      modalDesc.innerHTML = charLore;

      charModal.classList.add("active");

      document.body.style.overflow = "hidden";
    });
  });

  function closeCharModal() {
    charModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  closeModalBtn.addEventListener("click", closeCharModal);

  charModal.addEventListener("click", function (e) {
    if (e.target === charModal) {
      closeCharModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && charModal.classList.contains("active")) {
      closeCharModal();
    }
  });
}

// lokace

const locationCards = document.querySelectorAll(".location-card");

if (locationCards.length > 0) {
  locationCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("view-mode");
    });
  });
}

const toggle = document.getElementById("music-toggle");
const icon = document.getElementById("music-icon");
const music = document.getElementById("bg-music");

music.src = MUSIC_FILE;
music.volume = 0.2;

const musicEnabled = localStorage.getItem("music") === "on";

if (musicEnabled) {
  icon.src = OFF_ICON;

  music.play().catch(() => {
    localStorage.setItem("music", "off");
    icon.src = OFF_ICON;
  });
} else {
  icon.src = ON_ICON;
}

toggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    icon.src = OFF_ICON;
    localStorage.setItem("music", "on");
  } else {
    music.pause();
    icon.src = ON_ICON;
    localStorage.setItem("music", "off");
  }
});
