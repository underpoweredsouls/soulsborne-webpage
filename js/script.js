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

    if (window.innerWidth <= 1700 && window.innerWidth > 768) {
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
})

window.addEventListener('resize', function () {
    if (window.innerWidth > 1700) {
        row.style.opacity = "1";
        row.style.pointerEvents = "all";
        header.style.maxHeight = "120px";
        row.classList.remove('mobile-active');
        headerButtonIcon.className = "fa fa-bars";
    }
    else if (window.innerWidth <= 1700 && window.innerWidth > 768) {
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

window.dispatchEvent(new Event('resize'));

// --- LOGIKA PRO MŘÍŽKU POSTAV (MODÁLNÍ OKNO) ---
const characterCards = document.querySelectorAll('.char-card');
const charModal = document.getElementById('character-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModalBtn = document.querySelector('.close-modal');

if (characterCards.length > 0) { // Ochrana: Spustí se jen na stránkách, kde mřížka reálně je

    characterCards.forEach(card => {
        card.addEventListener('click', function () {

            // 1. Získáme data ze specifické karty, na kterou se kliklo
            const imgSrc = this.querySelector('.char-image').src;
            const charName = this.querySelector('.char-hover-info h3').innerText;
            const charLore = this.querySelector('.char-detail-text').innerHTML;

            // 2. Naplníme prázdné modální okno těmito daty
            modalImg.src = imgSrc;
            modalTitle.innerText = charName;
            modalDesc.innerHTML = charLore;

            // 3. Zobrazíme okno
            charModal.classList.add('active');

            // Zablokujeme scrollování stránky v pozadí
            document.body.style.overflow = "hidden";
        });
    });

    // Funkce pro zavření okna
    function closeCharModal() {
        charModal.classList.remove('active');
        document.body.style.overflow = "auto"; // Povolíme scrollování
    }

    // Zavření kliknutím na křížek
    closeModalBtn.addEventListener('click', closeCharModal);

    // Zavření kliknutím kamkoliv do tmavého pozadí (mimo obsah okna)
    charModal.addEventListener('click', function (e) {
        if (e.target === charModal) { // Kontrola, zda jsme klikli na pozadí, ne na text/obrázek
            closeCharModal();
        }
    });

    // Bonus: Zavření pomocí klávesy ESC (učitel ocení)
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape" && charModal.classList.contains('active')) {
            closeCharModal();
        }
    });
}

// --- LOGIKA PRO LOKACE (SCHOVÁNÍ TEXTU A ZOBRAZENÍ SCENÉRIE) ---
const locationCards = document.querySelectorAll('.location-card');

if (locationCards.length > 0) {
    locationCards.forEach(card => {
        card.addEventListener('click', function () {
            // Přepne třídu 'view-mode' při každém kliknutí
            this.classList.toggle('view-mode');
        });
    });
}