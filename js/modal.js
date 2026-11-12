const websiteModal = document.getElementById("websiteModal");
const websiteOpenBtn = document.getElementById("openWebsiteModal");
const websiteCloseBtn = document.getElementById("closeWebsiteModal");

function closeWebsiteModal() {
    websiteModal.style.display = "none";
}

if (websiteModal && websiteOpenBtn && websiteCloseBtn) {
    websiteOpenBtn.addEventListener("click", () => {
    websiteModal.style.display = "block";
    });

    websiteCloseBtn.addEventListener("click", closeWebsiteModal);

    window.addEventListener("click", (event) => {
        if (event.target === websiteModal) closeWebsiteModal();
    });
}

const gameModal = document.getElementById("gameDevModal");
const gameOpenBtn = document.getElementById("openGameDevModal");
const gameCloseBtn = document.getElementById("closeGameDevModal");

function closeGameDevModal() {
    gameModal.style.display = "none";
}

if (gameModal && gameOpenBtn && gameCloseBtn) {
    gameOpenBtn.addEventListener("click", () => {
    gameModal.style.display = "block";
    });

    gameCloseBtn.addEventListener("click", closeGameDevModal);

    window.addEventListener("click", (event) => {
        if (event.target === gameModal) closeGameDevModal();
    });
}

const printModal = document.getElementById("printingModal");
const printOpenBtn = document.getElementById("openPrintingModal");
const printCloseBtn = document.getElementById("closePrintingModal");

function closePrintModal() {
    printModal.style.display = "none";
}

if (printModal && printOpenBtn && printCloseBtn) {
    printOpenBtn.addEventListener("click", () => {
    printModal.style.display = "block";
    });

    printCloseBtn.addEventListener("click", closeGameDevModal);

    window.addEventListener("click", (event) => {
        if (event.target === printModal) closePrintModal();
    });
}