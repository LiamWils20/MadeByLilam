const gallery = [
    // Portfolio Example
    { title: "Portfolio Example",
      category: ["Website"],
      link: "https://liamwils20.github.io/index.html",
      released: "Jan 26, 2026",
      cover: "images/Gallery/Portfolio Example.png",
    },

    // Business Example
    { title: "Business Example",
      category: ["Website"],
      link: "",
      released: "",
      cover: "images/Gallery/Business Site Example.png",
    },

    // DND Initiative Example
    { title: "DND Initiative Example",
      category: ["Website"],
      link: "https://the-initiation.github.io",
      released: "",
      cover: "images/Gallery/DND Initiative Webpage.png",
    },

    // Game Backlog Example
    { title: "Game Backlog Example",
      category: ["Website"],
      link: "https://the-backlog.github.io",
      released: "",
      cover: "images/Gallery/Game Backlog.png",
    },

    // Link in Bio Webpage
    { title: "Link in Bio Webpage",
      category: ["Website"],
      link: "https://ourlinkinbio.github.io",
      released: "Jun 6, 2025",
      cover: "images/Gallery/Link in BIO webpage.png",
    },

    // Mini-Game Example
    { title: "Mini-Game Example",
      category: ["Website"],
      link: "https://mysteryboxminigame.github.io",
      released: "Jul 24, 2025",
      cover: "images/Gallery/Mini-Game Example.png",
    },

    // Portfolio Example No. 2
    { title: "Portfolio Example No. 2",
      category: ["Website"],
      link: "",
      released: "Unknown",
      cover: "images/Gallery/Portfolio Example NO2.png",
    },

    // VoidTimer Example
    { title: "A Timer Webpage Example",
      category: ["Website"],
      link: "https://voidtimer.github.io/VoidTimer/",
      released: "Jul 18, 2025",
      cover: "images/Gallery/VoidTimer Webpage.PNG",
    },

    // Wheel Randomiser Example
    { title: "Wheel Randomiser Example",
      category: ["Website"],
      link: "",
      released: "",
      cover: "images/Gallery/Wheel Randomiser Example.png",
    },

    // DND Map Display
    { title: "Map Display Example",
      category: ["Website"],
      link: "https://geoblade.github.io",
      released: "Jun 25, 2025",
      cover: "images/Gallery/DND Map Display.png",
    },

    // CineTracker
    { title: "Title Tracker Example",
      category: ["Website"],
      link: "https://cinetracker.co.uk",
      released: "Nov 12, 2026",
      cover: "images/Gallery/CineTracker.png",
    },

    // TheEchoArchive
    { title: "Game Tracker Example",
      category: ["Website"],
      link: "https://theechoarchive.github.io/TheEchoArchive/",
      released: "Oct 16, 2025",
      cover: "images/Gallery/The Echo Archive.png",
    },
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