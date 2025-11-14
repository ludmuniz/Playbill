document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                if (entry.target.id === 'timer' && !entry.target.dataset.animated) {
                    animateCounters();
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    }, {
        threshold: 0.1
    });
    const sections = document.querySelectorAll('.act');
    sections.forEach(section => {
        observer.observe(section);
    });

    const cover = document.querySelector(".playbill-cover");
    const spotlight = document.querySelector(".spotlight-overlay");

    if (spotlight) {
        cover.addEventListener("mousemove", (e) => {
            const rect = cover.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 10%, rgba(0,0,0,0.7) 100px)`;
        });
    }

    const dataInicio = new Date(2022, 10, 18, 9, 0, 0).getTime();

    const timerElement = {
        years: document.getElementById("years"),
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };

    let finalCounts = {};

    function updateTimerValues() {
        const agora = new Date().getTime();
        const diferenca = agora - dataInicio;

        const s = Math.floor(diferenca / 1000);
        const m = Math.floor(s / 60);
        const h = Math.floor(m / 60);
        const d = Math.floor(h / 24);
        const y = Math.floor(d / 365.25); 

        finalCounts = {
            years: y,
            days: d % 365,
            hours: h % 24,
            minutes: m % 60,
            seconds: s % 60
        };

        timerElement.seconds.innerText = finalCounts.seconds;
    }

    setInterval(() => {
        if (timerElement.seconds) {
            const s = Math.floor((new Date().getTime() - dataInicio) / 1000);
            timerElement.seconds.innerText = s % 60;
        }
    }, 1000);

    updateTimerValues();

    function animateCounters() {
        const elements = [
            timerElement.years, 
            timerElement.days, 
            timerElement.hours, 
            timerElement.minutes
        ];
        
        elements.forEach(element => {
            if (!element) return;
            
            const target = finalCounts[element.id];
            let current = 0;
            const duration = 1500;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.innerText = target;
                    clearInterval(timer);
                } else {
                    element.innerText = Math.floor(current);
                }
            }, stepTime);
        });

        timerElement.seconds.innerText = finalCounts.seconds;
    }

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