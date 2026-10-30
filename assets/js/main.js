// Intersection Observer — reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Gantt bars animation
const ganttObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.gantt-bar').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 120);
      });
      ganttObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
const ganttTable = document.querySelector('.gantt-table');
if (ganttTable) ganttObs.observe(ganttTable);

// Topbar shrink on scroll
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  topbar.style.height = window.scrollY > 60 ? '52px' : '64px';
}, { passive: true });

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.topbar__nav a');
const navObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.topbar__nav a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => navObs.observe(s));

// Add active style via JS
const style = document.createElement('style');
style.textContent = `.topbar__nav a.active { color: var(--gold-light) !important; }`;
document.head.appendChild(style);

// DFD Tab switcher
const dfdTabs = document.getElementById('dfd-tabs');
if (dfdTabs) {
  dfdTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.diag-tab');
    if (!btn) return;
    const target = btn.dataset.target;

    // Deactivate all
    dfdTabs.querySelectorAll('.diag-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.diag-panel').forEach(p => p.classList.remove('active'));

    // Activate clicked
    btn.classList.add('active');
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
}
