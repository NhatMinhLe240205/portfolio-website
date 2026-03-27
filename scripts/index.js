// ────────────────────────────────────────────
//  BURGER MENU
// ────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close when a link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ────────────────────────────────────────────
//  NAVBAR: scroll shadow
// ────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

// ────────────────────────────────────────────
//  SCROLL SPY — highlight active nav link
// ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// Run once on load
updateActiveLink();

// ────────────────────────────────────────────
//  SCROLL REVEAL (IntersectionObserver)
// ────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ────────────────────────────────────────────
//  TYPEWRITER HERO
// ────────────────────────────────────────────
const phrases = [
  'Étudiant en B.U.T Informatique',
  'Développeur en formation',
  'Passionné par la technologie 💻',
  'Toujours prêt à apprendre ✨',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;

const typeEl  = document.getElementById('typewriter');

// Append a blinking cursor span once
const cursor  = document.createElement('span');
cursor.className = 'cursor';
if (typeEl) typeEl.parentElement.appendChild(cursor);

function typeLoop() {
  if (!typeEl) return;

  const current = phrases[phraseIndex];
  typeEl.textContent = isDeleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(typeLoop, 2000);   // pause before deleting
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting    = false;
    phraseIndex   = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeLoop, isDeleting ? 38 : 68);
}

// Start after hero animations settle
setTimeout(typeLoop, 1400);

// ────────────────────────────────────────────
//  SKILL ITEMS — staggered entrance
// ────────────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.skill-item');
      items.forEach((item, i) => {
        item.style.opacity    = '0';
        item.style.transform  = 'translateY(20px)';
        item.style.transition = `opacity 0.4s ease ${i * 50}ms, transform 0.4s ease ${i * 50}ms`;
        // Small timeout to let the browser register the initial state
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.style.opacity   = '1';
            item.style.transform = 'translateY(0)';
          });
        });
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// ────────────────────────────────────────────
//  CONTACT FORM — submit feedback
// ────────────────────────────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn  = form.querySelector('.contact-btn');
    const span = btn.querySelector('span');
    const icon = btn.querySelector('i');
    btn.disabled     = true;
    span.textContent = 'Envoi en cours…';
    if (icon) { icon.className = 'fa-solid fa-circle-notch fa-spin'; }
  });
}
