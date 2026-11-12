const gallery = [
    // 4 Mini Godot Projects
    { title: "Portfolio Example",
      category: ["Website"],
      link: "https://liamwils20.github.io/index.html",
      released: "Jan 26, 2026",
      cover: "images/Gallery/Portfolio Example.png",
    }
];

function renderGallery(filter = {}) {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";

    const filtered = gallery.filter(g => {
        return (!filter.search || g.title.toLowerCase().includes(filter.search)) &&
            (!filter.category || g.category.includes(filter.category));
    });



  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.innerHTML = `
    <a target="_blank" href="${game.link}"><img src="${game.cover}" alt="${game.title}" /></a>
        <div class="gallery-info">
            <h3><span class="purple">${game.title}</span></h3>
            <p><strong>Released:</strong> ${game.released || "TBD"}</p>
        </div>
    `;

    grid.appendChild(card);
  });
}

document.querySelectorAll(".filters input, .filters select").forEach(el => {
  el.addEventListener("input", () => {
    renderGallery({
      search: document.getElementById("search").value.toLowerCase(),
      category: document.getElementById("category").value,
    });
  });
});

renderGallery();