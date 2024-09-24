window.onload = function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.visibility = "hidden";
    loader.style.opacity = "0";
  }
};

window.addEventListener('scroll', function () {
  const parallax = document.querySelector('.fondo-opacity');
  if (parallax) {
    parallax.style.backgroundPositionY = -(window.scrollY * 0.5) + 'px';
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

// Selecciona el botón de hamburguesa y el menú móvil
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Evento para abrir/cerrar el menú hamburguesa
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
