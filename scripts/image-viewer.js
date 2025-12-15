const thumbs = Array.from(document.querySelectorAll(".thumb"));
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const viewerThumbsContainer = document.getElementById("viewer-thumbs");
const infoTitle = document.getElementById("info-title");
const infoDesc = document.getElementById("info-desc");

let scale = 1;
let currentIndex = 0;

// Build a structured image list
const images = thumbs.map(t => ({
    lores: t.src,
    full: t.dataset.full,
    title: t.dataset.title,
    desc: t.dataset.desc
}));

// Create viewer thumbnails
images.forEach((img, idx) => {
    const t = document.createElement("img");
    t.src = img.lores;
    t.className = "viewer-thumb";
    t.dataset.index = idx;
    viewerThumbsContainer.appendChild(t);

    t.addEventListener("click", () => openImage(idx));
});

const viewerThumbs = Array.from(document.querySelectorAll(".viewer-thumb"));

// Open viewer at specific index
thumbs.forEach((img, idx) => {
    img.addEventListener("click", () => openImage(idx));
});

function openImage(idx) {
    currentIndex = idx;
    viewer.style.display = "flex";
    viewerImg.style.opacity = "0"; // reset fade-in

    const item = images[idx];
    viewerImg.src = item.full;
    infoTitle.textContent = item.title;
    infoDesc.textContent = item.desc;

    scale = 1;
    viewerImg.style.transform = `scale(${scale})`;

    viewerThumbs.forEach(thumb => thumb.classList.remove("active"));
    viewerThumbs[idx].classList.add("active");

    setTimeout(() => viewerImg.style.opacity = "1", 40);
}

// Navigation with arrow keys
document.addEventListener("keydown", (e) => {
    if (viewer.style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeViewer();
    }
});

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    openImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openImage(currentIndex);
}

// Close viewer when clicking outside content
viewer.addEventListener("click", (e) => {
    if (e.target === viewer) closeViewer();
});

function closeViewer() {
    viewer.style.display = "none";
}

// Zoom controls
document.getElementById("zoom-in").onclick = () => {
    scale = Math.min(scale + 0.25, 5);
    viewerImg.style.transform = `scale(${scale})`;
};
document.getElementById("zoom-out").onclick = () => {
    scale = Math.max(scale - 0.25, 0.25);
    viewerImg.style.transform = `scale(${scale})`;
};
