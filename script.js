/* ================= HERO SLIDER ================= */

let heroSlides = [];
let dots = [];
let progressBar;

let currentIndex = 0;
let interval;
let isPaused = false;

/* Kannada letters */

const kannadaLetters = [
    "ಅ","ಆ","ಇ","ಈ","ಉ","ಊ","ಎ","ಏ","ಐ","ಒ","ಓ",
    "ಕ","ಗ","ಚ","ಜ","ಟ","ಡ","ತ","ದ","ಪ","ಬ",
    "ಮ","ಯ","ರ","ಲ","ವ","ಶ","ಸ","ಹ"
];

/* Create scattered letters */

function createLetters()
{
    document.querySelectorAll(".letters-bg").forEach(container => {

        container.innerHTML = "";

        let positions = [];
        let maxLetters = 30;

        for (let i = 0; i < maxLetters; i++)
        {
            let tries = 0;
            let placed = false;

            while (!placed && tries < 50)
            {
                tries++;

                let top = Math.random() * 100;
                let left = Math.random() * 100;
                let fontSize = 18 + Math.random() * 28;

                let valid = true;

                for (let pos of positions)
                {
                    let distance = Math.sqrt(
                        Math.pow(top - pos.top, 2) +
                        Math.pow(left - pos.left, 2)
                    );

                    if (distance < (fontSize / 3))
                    {
                        valid = false;
                        break;
                    }
                }

                if (valid)
                {
                    positions.push({ top, left });

                    let span = document.createElement("span");

                    span.classList.add("letter");

                    span.innerText =
                        kannadaLetters[
                            Math.floor(Math.random() * kannadaLetters.length)
                        ];

                    span.style.top = top + "%";
                    span.style.left = left + "%";
                    span.style.fontSize = fontSize + "px";

                    let rotate = Math.random() * 360;

                    span.style.transform =
                        `scale(0.5) rotate(${rotate}deg)`;

                    span.style.animationDelay =
                        (Math.random() * 1.2) + "s";

                    container.appendChild(span);

                    placed = true;
                }
            }
        }
    });
}

/* Show hero slide */

function showHeroSlide(index)
{
    if (!heroSlides.length) return;

    heroSlides.forEach(slide =>
        slide.classList.remove("active")
    );

    dots.forEach(dot =>
        dot.classList.remove("active")
    );

    if (heroSlides[index])
    {
        heroSlides[index].classList.add("active");
    }

    if (dots[index])
    {
        dots[index].classList.add("active");
    }

    createLetters();

    /* Restart progress bar */

    if (progressBar)
    {
        progressBar.style.animation = "none";
        progressBar.style.width = "0%";

        progressBar.offsetHeight;

        progressBar.style.animation =
            "progress 4.2s linear forwards";

        progressBar.style.animationPlayState = "running";
    }
}

/* Hero auto slide */

function slideHero()
{
    currentIndex =
        (currentIndex + 1) % heroSlides.length;

    showHeroSlide(currentIndex);
}

/* Dot click */

function goToSlide(index)
{
    currentIndex = index;

    showHeroSlide(index);

    resetInterval();
}

/* Start auto slider */

function startInterval()
{
    clearInterval(interval);

    interval = setInterval(() => {

        slideHero();

    }, 4200);
}

/* Reset auto slider */

function resetInterval()
{
    clearInterval(interval);

    startInterval();
}

/* Pause slider */

function pauseSlider()
{
    if (isPaused) return;

    isPaused = true;

    clearInterval(interval);

    if (progressBar)
    {
        progressBar.style.animationPlayState = "paused";
    }
}

/* Resume slider */

function resumeSlider()
{
    if (!isPaused) return;

    isPaused = false;

    if (progressBar)
    {
        progressBar.style.animationPlayState = "running";
    }

    startInterval();
}

/* ================= PHOTO SLIDER ================= */

let photoSlides = [];
let photoIndex = 0;

function showPhotoSlide(index)
{
    if (!photoSlides.length) return;

    photoSlides.forEach(slide =>
        slide.classList.remove("active")
    );

    if (photoSlides[index])
    {
        photoSlides[index].classList.add("active");
    }
}

function changeSlide(direction)
{
    if (!photoSlides.length) return;

    photoIndex += direction;

    if (photoIndex >= photoSlides.length)
    {
        photoIndex = 0;
    }

    if (photoIndex < 0)
    {
        photoIndex = photoSlides.length - 1;
    }

    showPhotoSlide(photoIndex);
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* Select elements */

    heroSlides =
        document.querySelectorAll(".hero-slide");

    dots =
        document.querySelectorAll(".dot");

    progressBar =
        document.querySelector(".progress-bar");

    photoSlides =
        document.querySelectorAll(".photo-slider .slide");

    /* Set blur background */

    photoSlides.forEach(slide => {

        const img = slide.querySelector("img");

        if (img)
        {
            const setBg = () => {

                slide.style.setProperty(
                    "--bg",
                    `url('${img.src}')`
                );
            };

            if (img.complete)
            {
                setBg();
            }
            else
            {
                img.onload = setBg;
            }
        }
    });

    /* ================= HERO INIT ================= */

    if (heroSlides.length > 0)
    {
        createLetters();

        showHeroSlide(currentIndex);

        startInterval();

        /* Mobile touch pause */

        const hero =
            document.querySelector(".hero");

        if (hero)
        {
            hero.addEventListener(
                "touchstart",
                pauseSlider
            );

            hero.addEventListener(
                "touchend",
                resumeSlider
            );
        }
    }

    /* ================= PHOTO INIT ================= */

    if (photoSlides.length > 0)
    {
        showPhotoSlide(photoIndex);

        setInterval(() => {

            changeSlide(1);

        }, 4000);
    }

    /* ================= TEAM SLIDER ================= */

    const teamContainer =
        document.querySelector('.team-container');

    const nextBtn =
        document.querySelector('.team-slider .next');

    const prevBtn =
        document.querySelector('.team-slider .prev');

    if (teamContainer && nextBtn && prevBtn)
    {
        nextBtn.addEventListener('click', () => {

            teamContainer.scrollBy({
                left: 220,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {

            teamContainer.scrollBy({
                left: -220,
                behavior: 'smooth'
            });
        });
    }

});