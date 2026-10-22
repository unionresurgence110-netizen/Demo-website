document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  const galleryBtn = document.querySelector(".gallery-nav-btn");
  const galleryBox = document.querySelector(".nav-gallery");
  const theme = document.getElementById("themeToggle");

  if (menu && links) {
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => links.classList.remove("open"));
    });

    document.addEventListener("click", (e) => {
      if (!links.contains(e.target) && e.target !== menu) links.classList.remove("open");
      if (galleryBox && !galleryBox.contains(e.target)) {
        galleryBox.classList.remove("open");
        if (galleryBtn) galleryBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (galleryBtn && galleryBox) {
    galleryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      galleryBox.classList.toggle("open");
      galleryBtn.setAttribute("aria-expanded", galleryBox.classList.contains("open") ? "true" : "false");
    });

    galleryBox.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        galleryBox.classList.remove("open");
        galleryBtn.setAttribute("aria-expanded", "false");
        if (links) links.classList.remove("open");
      });
    });
  }

  const saved = localStorage.getItem("martyrs-theme");
  if (saved === "dark") document.body.classList.add("dark");

  if (theme) {
    const update = () => {
      theme.textContent = document.body.classList.contains("dark") ? "☀" : "◐";
      theme.setAttribute("aria-label", document.body.classList.contains("dark") ? "Switch to light mode" : "Switch to dark mode");
    };
    update();
    theme.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("martyrs-theme", document.body.classList.contains("dark") ? "dark" : "light");
      update();
    });
  }

document.querySelectorAll(".movable-text").forEach(el => {
    const originalText = el.innerText; // 1. PEHLE TEXT SAVE KAR LIYA
    el.innerText = ""; // 2. PHIR KHALI KIYA
    
    let i = 0;
    let isDeleting = false;

    function run() {
        // 3. SAVE KIYE HUE TEXT SE HI TYPE/DELETE KARENGE
        el.innerText = originalText.substring(0, i) + "|";

        if (!isDeleting && i < originalText.length) {
            i++;
            setTimeout(run, 80); // type speed
        } 
        else if (!isDeleting && i === originalText.length) {
            isDeleting = true;
            setTimeout(run, 3000); // 3 sec baad delete
        } 
        else if (isDeleting && i > 0) {
            i--;
            setTimeout(run, 40); // delete speed
        } 
        else {
            isDeleting = false;
            setTimeout(run, 500); // wapas type
        }
    }
    run(); // start
});
});