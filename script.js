document.addEventListener("DOMContentLoaded", () => {
    
    const cover = document.querySelector(".playbill-cover");
    const spotlight = document.querySelector(".spotlight-overlay");

    cover.addEventListener("mousemove", (e) => {
        const rect = cover.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 10%, rgba(0,0,0,0.7) 100px)`;
    });


    const dataInicio = new Date(2022, 10, 18, 9, 0, 0).getTime();

    const timerElement = {
        years: document.getElementById("years"),
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };

    function updateTimer() {
        const agora = new Date().getTime();
        const diferenca = agora - dataInicio;

        const s = Math.floor(diferenca / 1000);
        const m = Math.floor(s / 60);
        const h = Math.floor(m / 60);
        const d = Math.floor(h / 24);
        const y = Math.floor(d / 365.25); 

        timerElement.seconds.innerText = s % 60;
        timerElement.minutes.innerText = m % 60;
        timerElement.hours.innerText = h % 24;
        timerElement.days.innerText = d % 365;
        timerElement.years.innerText = y;
    }
    setInterval(updateTimer, 1000);
    updateTimer();

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".close-button");

    const galleryImages = document.querySelectorAll(".gallery-grid img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
            lightboxCaption.innerText = img.dataset.description || img.alt;
        });
    });

    function closeModal() {
        lightbox.style.display = "none";
    }
    closeBtn.addEventListener("click", closeModal);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeModal();
        }
    });
});