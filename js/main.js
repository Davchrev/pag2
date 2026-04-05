// ===== REEMPLAZA CON TU URL DE APPS SCRIPT =====
const APPS_SCRIPT_URL = "TU_URL_AQUI";

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "70px";
  navLinks.style.left = "0";
  navLinks.style.width = "100%";
  navLinks.style.background = "#0A0A0A";
  navLinks.style.padding = "20px";
  navLinks.style.gap = "20px";
});

// ===== FORMULARIO =====
const formulario = document.getElementById("formulario");
const mensajeRespuesta = document.getElementById("mensaje-respuesta");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value,
    celular: document.getElementById("celular").value,
    distrito: document.getElementById("distrito").value,
    correo: document.getElementById("correo").value,
    servicio: document.getElementById("servicio").value,
  };

  const boton = formulario.querySelector("button[type='submit']");
  boton.textContent = "Enviando...";
  boton.disabled = true;

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    mensajeRespuesta.textContent = "✅ ¡Solicitud enviada! Te contactamos pronto.";
    mensajeRespuesta.style.color = "#FF9900";
    formulario.reset();
  } catch (error) {
    mensajeRespuesta.textContent = "❌ Hubo un error, intenta de nuevo.";
    mensajeRespuesta.style.color = "#FF3300";
  }

  boton.textContent = "Enviar solicitud →";
  boton.disabled = false;
});

// ===== ANIMACION AL HACER SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".servicio-card, .producto-card, .numero-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});