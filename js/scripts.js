// cardsgrid
const menuButtons = document.querySelectorAll('.menu-button');

menuButtons.forEach(button => {
    button.addEventListener('click', function () {
        const parentCard = this.closest('.menu-card');
        document.querySelectorAll('.menu-card').forEach(card => {
            if (card !== parentCard) card.classList.remove('is-open');
        });
        parentCard.classList.toggle('is-open');
    });
});

// navbar
const headerButton = document.getElementById("headerButton");
const headerButtonIcon = headerButton.querySelector("i");
const header = document.getElementById("header");
const row = document.getElementById("row");

headerButton.addEventListener('click', function () {

    if (window.innerWidth <= 1536 && window.innerWidth > 768) {
        row.style.opacity = row.style.opacity === "1" ? "0" : "1";
        row.style.pointerEvents = row.style.pointerEvents === "all" ? "none" : "all";
        header.style.maxHeight = header.style.maxHeight === "500px" ? "100px" : "500px";
    }

    else if (window.innerWidth <= 768) {
        row.classList.toggle('mobile-active');
        if (row.classList.contains('mobile-active')) {
            headerButtonIcon.className = "fa fa-times";
            setTimeout(function () {
                document.body.addEventListener('click', function () {
                    row.classList.remove('mobile-active'); headerButtonIcon.className = "fa fa-bars";
                }, { once: true });
            }, 100);
        }
    };
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1536) {
            row.style.opacity = "1";
            row.style.pointerEvents = "all";
            header.style.maxHeight = "120px";
            row.classList.remove('mobile-active');
            headerButtonIcon.className = "fa fa-bars";
        }
        else if (window.innerWidth <= 1536 && window.innerWidth > 768) {
            row.style.opacity = "0";
            row.style.pointerEvents = "none";
            header.style.maxHeight = "100px";
            row.classList.remove('mobile-active');
            headerButtonIcon.className = "fa fa-bars";
        }
        else {
            row.style.opacity = "";
            row.style.pointerEvents = "";
            header.style.maxHeight = "";
        }
    });

    window.dispatchEvent(new Event('resize'))})