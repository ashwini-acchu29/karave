const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const counter = document.getElementById("counter");

let currentIndex = 0;

const imagePath = "images/gallery-images/";
const totalImages = 149;
const extension = ".jpeg"; // adjust if needed

/* Create gallery */
for (let i = 1; i <= totalImages; i++) {
    let img = document.createElement("img");

    img.src = imagePath + "Pic" + i + extension;
    img.loading = "lazy";

    img.onload = () => img.classList.add("loaded");

    img.onclick = () => openLightbox(i);

    gallery.appendChild(img);
}

/* Open */
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("show");
}

/* Update */
function updateLightbox() {
    lightboxImg.src = imagePath + "Pic" + currentIndex + extension;
    counter.innerText = currentIndex + " / " + totalImages;
}

/* Close */
function closeLightbox() {
    lightbox.classList.remove("show");
}

/* Next */
function nextImage() {
    currentIndex = currentIndex === totalImages ? 1 : currentIndex + 1;
    updateLightbox();
}

/* Prev */
function prevImage() {
    currentIndex = currentIndex === 1 ? totalImages : currentIndex - 1;
    updateLightbox();
}

/* Click outside */
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

/* Keyboard */
document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("show")) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeLightbox();
    }
});

/* Swipe support */
let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (endX - startX > 50) prevImage();
    if (startX - endX > 50) nextImage();
});