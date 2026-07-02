const projects = [
  {
    title: "Kiwi Music Store",
    tag: "Full stack / Ecommerce",
    description: "Tienda musical con catalogo, flujo de compra y una interfaz pensada para mostrar productos con claridad.",
    image: "./images/Kiwi Music.png",
    category: ["fullstack", "frontend"],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    links: {
      live: "https://kiwi-stores.netlify.app",
      code: "https://github.com/Diegozzzp/Musica-Store"
    }
  },
  {
    title: "Calendario automatico",
    tag: "Automatizacion / Google",
    description: "Automatizacion para organizar tareas y reducir trabajo manual usando Google Apps Script y servicios de Google.",
    image: "./images/proyecto-script.png",
    category: ["automation"],
    tech: ["Apps Script", "Google", "JavaScript", "Automatizacion"],
    links: {
      live: "https://script.google.com/macros/s/AKfycbzfrE41jO2ksF6FnMbHq0k9UEewffynZJ6_EAXgkzmMD45vCVDN08ANRiKASV3DMGaQGQ/exec",
      code: "https://script.google.com/d/1X4F4rxvbE5uVC9eY_3TYNbiv61O_AdRYS1zAhmH21gNGNR2BBEgPAsJp/edit?usp=sharing"
    }
  },
  {
    title: "Portafolio fotografa",
    tag: "Frontend / Visual design",
    description: "Sitio visual para presentar sesiones fotograficas con una experiencia mas editorial y orientada a imagen.",
    image: "./images/Ana-portafolio.png",
    category: ["frontend"],
    tech: ["HTML", "CSS", "JavaScript", "UX/UI"],
    links: {
      live: "https://diegozzzp.github.io/Portafolio-Anastacia"
    }
  },
  {
    title: "Rick & Morty App",
    tag: "Frontend / API",
    description: "Aplicacion que consume una API externa para explorar personajes con filtros y tarjetas dinamicas.",
    image: "./images/ricky-mort-proyecto.png",
    category: ["frontend"],
    tech: ["React", "Tailwind", "API externa"],
    links: {
      live: "https://magnificent-unicorn-b5f2b0.netlify.app",
      code: "https://github.com/Diegozzzp/RickmortysApi"
    }
  },
  {
    title: "Instagram Clone",
    tag: "Frontend / UI clone",
    description: "Practica de maquetacion y componentes para replicar patrones visuales de una interfaz social.",
    image: "./images/Instagram.png",
    category: ["frontend"],
    tech: ["HTML", "CSS", "JavaScript"],
    links: {
      live: "https://diegozzzp.github.io/Instagram/",
      code: "https://github.com/Diegozzzp/Instagram"
    }
  },
  {
    title: "Pokedex",
    tag: "Frontend / Data UI",
    description: "Interfaz para consultar y presentar informacion de Pokemon a partir de datos externos.",
    image: "./images/pokeapi.png",
    category: ["frontend"],
    tech: ["JavaScript", "API", "CSS"],
    links: {
      code: "https://github.com/Aarevalo3108/PokeAPI"
    }
  },
  {
    title: "Registro de usuarios",
    tag: "Backend / Auth",
    description: "Base de autenticacion y registro para practicar flujos de usuario, validaciones y persistencia.",
    image: "./images/registro.png",
    category: ["fullstack"],
    tech: ["PHP", "MySQL", "Bootstrap", "Auth"],
    links: {
      code: "https://github.com/Diegozzzp/registro_login"
    }
  },
  {
    title: "Proyecto salud",
    tag: "Frontend / Informativo",
    description: "Sitio de practica orientado a comunicar servicios e informacion con una estructura clara y usable.",
    image: "./images/salud.png",
    category: ["frontend"],
    tech: ["HTML", "CSS", "JavaScript"],
    links: {}
  }
];

const grid = document.getElementById("project-grid");
const filters = document.getElementById("project-filters");
const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");
const backToTop = document.getElementById("back-to-top");
const copyEmail = document.getElementById("copy-email");
const copyToast = document.getElementById("copy-toast");

function createProjectCard(project) {
  const actions = [];

  if (project.links.live) {
    actions.push(`<a class="project-link" href="${project.links.live}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ver sitio</a>`);
  }

  if (project.links.code) {
    actions.push(`<a class="project-link" href="${project.links.code}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Codigo</a>`);
  }

  if (!actions.length) {
    actions.push(`<span class="project-link" aria-label="Proyecto sin enlace publico"><i class="fa-solid fa-lock"></i> Privado</span>`);
  }

  return `
    <article class="project-card" data-category="${project.category.join(" ")}">
      <div class="project-card__media">
        <img src="${project.image}" alt="Captura de ${project.title}" loading="lazy" decoding="async" />
        <span class="project-card__tag">${project.tag}</span>
      </div>
      <div class="project-card__body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-list" aria-label="Tecnologias de ${project.title}">
          ${project.tech.map((item) => `<span>${item}</span>`).join("")}
        </div>
        <div class="project-card__actions">
          ${actions.join("")}
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "all") {
  if (!grid) return;

  const visibleProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.category.includes(filter));

  grid.innerHTML = visibleProjects.map(createProjectCard).join("");
}

function setActiveFilter(button) {
  if (!filters || !button) return;
  filters.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}

renderProjects();

if (filters) {
  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    setActiveFilter(button);
    renderProjects(button.dataset.filter || "all");
  });
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      siteMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (copyEmail) {
  copyEmail.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("diegoadan.mejias@gmail.com");
      if (copyToast) {
        copyToast.classList.add("show");
        window.setTimeout(() => copyToast.classList.remove("show"), 1700);
      }
    } catch (error) {
      window.location.href = "mailto:diegoadan.mejias@gmail.com";
    }
  });
}

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  backToTop.classList.toggle("show", window.scrollY > 420);
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
