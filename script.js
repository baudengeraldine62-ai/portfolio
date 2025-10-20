// Portfolio Scripts
const slidesEl = document.getElementById('slides');
const slides = document.querySelectorAll('.slide');
const navBtns = document.querySelectorAll('.nav-btn');
const gotoBtns = document.querySelectorAll('[data-target]');
const indicatorsEl = document.getElementById('indicators');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const openBtns = document.querySelectorAll('.open-btn');
const yearEl = document.getElementById('year');

// Year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Build indicators
slides.forEach((s, i) => {
  const btn = document.createElement('button');
  btn.className = i === 0 ? 'active' : '';
  btn.addEventListener('click', () => scrollToSlide(i));
  indicatorsEl.appendChild(btn);
});

function scrollToSlide(index) {
  const slide = slides[index];
  if (!slide) return;
  const isHorizontal = getComputedStyle(slidesEl).flexDirection === 'row';
  slidesEl.scrollTo({
    [isHorizontal ? 'left' : 'top']: isHorizontal ? slide.offsetLeft : slide.offsetTop,
    behavior: 'smooth'
  });
  setActive(index);
}

function setActive(index) {
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === `slide-${index}`));
  const ind = indicatorsEl.querySelectorAll('button');
  ind.forEach((btn, i) => btn.classList.toggle('active', i === index));
}

// Nav and goto
gotoBtns.forEach(btn => btn.addEventListener('click', () => {
  const target = btn.dataset.target;
  const slide = document.getElementById(target);
  if (!slide) return;
  scrollToSlide(Number(slide.dataset.index));
}));

// Keyboard
document.addEventListener('keydown', (e) => {
  const active = [...indicatorsEl.children].findIndex(btn => btn.classList.contains('active'));
  if (e.key === 'ArrowRight') scrollToSlide(Math.min(slides.length - 1, active + 1));
  if (e.key === 'ArrowLeft') scrollToSlide(Math.max(0, active - 1));
});

// Modal
openBtns.forEach(btn => btn.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  const title = card.dataset.title;
  const desc = card.dataset.desc;
  const imgs = JSON.parse(card.dataset.imgs);
  modalBody.innerHTML = `<h3>${title}</h3><p>${desc}</p>${imgs.map(src => `<img src="${src}" style="width:100%;border-radius:8px;margin:10px 0;">`).join('')}`;
  modal.classList.add('open');
}));
closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

// --- Labs ---
const labsGrid = document.getElementById('labsGrid');
if (labsGrid) {
  const LABS = [
    { title: 'Lab Activity 1', desc: 'Web Introduction', link: 'lab1.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+1' },
    { title: 'Lab Activity 2', desc: 'CSS Styling and Layout', link: 'lab2.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+2' },
    { title: 'Lab Activity 3', desc: 'Card Hover Effect', link: 'lab3.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+3' },
    { title: 'Lab Activity 4', desc: 'Dark Mode Toggle', link: 'lab4.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+4' },
    { title: 'Lab Activity 5', desc: 'Form Validation', link: 'lab5.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+5' },
  ];

  labsGrid.innerHTML = LABS.map(lab => `
    <article class="card project-card">
      <div class="project-thumb" style="background-image:url(${lab.thumb}); background-size:cover;"></div>
      <h4>${lab.title}</h4>
      <div class="muted">${lab.desc}</div>
      <a href="${lab.link}" class="btn" target="_blank">Open Lab</a>
    </article>
  `).join('');
}
