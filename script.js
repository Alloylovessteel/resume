const nav = document.querySelector('#primary-nav');
const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav?.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); menu?.setAttribute('aria-label', 'Open navigation');
}));
const theme = document.querySelector('.theme-toggle');
theme?.addEventListener('click', () => {
  const light = document.body.classList.toggle('light-theme');
  theme.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  try { localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); } catch {}
});
try { if (localStorage.getItem('portfolio-theme') === 'light') document.body.classList.add('light-theme'); } catch {}
const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')}\nReply to: ${data.get('email')}`);
  window.location.href = `mailto:yeowaloysius@gmail.com?subject=${subject}&body=${body}`;
});
