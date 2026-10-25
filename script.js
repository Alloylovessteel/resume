const nav = document.querySelector('#primary-nav');
const menu = document.querySelector('.menu-toggle');
const setMenuOpen = open => {
  if (!nav || !menu) return;
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
};

menu?.addEventListener('click', () => {
  setMenuOpen(menu.getAttribute('aria-expanded') !== 'true');
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menu.focus();
  }
});

document.addEventListener('click', event => {
  if (menu?.getAttribute('aria-expanded') === 'true' &&
      !nav?.contains(event.target) && !menu.contains(event.target)) {
    setMenuOpen(false);
  }
});

const theme = document.querySelector('.theme-toggle');
const applyTheme = light => {
  document.body.classList.toggle('light-theme', light);
  theme?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  theme?.setAttribute('title', light ? 'Switch to dark theme' : 'Switch to light theme');
  theme?.setAttribute('aria-pressed', String(light));
};

theme?.addEventListener('click', () => {
  const light = !document.body.classList.contains('light-theme');
  applyTheme(light);
  try { localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); } catch { /* Storage can be disabled. */ }
});

try {
  const savedTheme = localStorage.getItem('portfolio-theme');
  applyTheme(savedTheme ? savedTheme === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches);
} catch {
  applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches);
}

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim();
  const message = String(data.get('message')).trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
  window.location.href = `mailto:yeowaloysius@gmail.com?subject=${subject}&body=${body}`;
});
