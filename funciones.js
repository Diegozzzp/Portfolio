window.onload = function () {
  // Ocultar loader una vez cargado
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }

  // Texto tipo máquina en héroe
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const phrases = ['Programador Jr', 'Full Stack Dev', 'Creador de Soluciones'];
    let i = 0, j = 0, deleting = false;
    const type = () => {
      const current = phrases[i];
      if (!deleting) {
        typedEl.textContent = current.slice(0, j++);
        if (j > current.length + 8) deleting = true; // pausa
      } else {
        typedEl.textContent = current.slice(0, j--);
        if (j < 0) { deleting = false; i = (i + 1) % phrases.length; }
      }
      setTimeout(type, deleting ? 50 : 90);
    };
    type();
  }

  // Filtros de proyectos
  const filterContainer = document.getElementById('project-filters');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterContainer && projectCards.length) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const filter = btn.getAttribute('data-filter');
      // estado activo
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // filtrar
      projectCards.forEach(card => {
        const cats = (card.getAttribute('data-category') || '').split(/\s+/);
        const visible = filter === 'all' || cats.includes(filter);
        card.style.display = visible ? '' : 'none';
      });
    });
  }

  // Copiar correo y toast
  const copyBtn = document.getElementById('copy-email');
  const toast = document.getElementById('copy-toast');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('adanmejias908@gmail.com');
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => toast.classList.add('hidden'), 1600);
        }
      } catch (err) {
        console.error('No se pudo copiar el correo', err);
      }
    });
  }
};

window.addEventListener('scroll', function () {
  const parallax = document.querySelector('.fondo-opacity');
  if (parallax) {
    parallax.style.backgroundPositionY = -(window.scrollY * 0.5) + 'px';
  }
  // Mostrar/ocultar botón volver arriba
  const topBtn = document.getElementById('back-to-top');
  if (topBtn) {
    const show = window.scrollY > 400;
    topBtn.style.opacity = show ? '1' : '0';
    topBtn.style.pointerEvents = show ? 'auto' : 'none';
    topBtn.style.transform = show ? 'translateY(0)' : 'translateY(32px)';
  }
});


// Seleccionamos todas las tarjetas que queremos animar
const cards = document.querySelectorAll('.card');

// Configuramos las opciones del IntersectionObserver
const options = {
  root: null,  // Usa el viewport
  threshold: 0.1,  // Se activa cuando al menos el 10% de la tarjeta es visible
};

// Creamos una instancia del IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Agrega las clases de animación de Animate.css cuando la tarjeta es visible
      entry.target.classList.add('animate__fadeInLeft');  // Puedes cambiar esta animación por la que desees
      entry.target.classList.add('animate__animated');
      // Una vez que la tarjeta ha sido animada, deja de observarla
      observer.unobserve(entry.target);
    }
  });
}, options);

// Observamos cada tarjeta
cards.forEach(card => {
  observer.observe(card);
});

// Manejo del menú hamburguesa (solo si existen los elementos)
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('translate-y-full');
  });
}

// Volver arriba
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#back-to-top');
  if (btn) window.scrollTo({ top: 0, behavior: 'smooth' });
});
