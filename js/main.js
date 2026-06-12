document.addEventListener('DOMContentLoaded', () => {

  /* ===================== 모바일 메뉴 ===================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');

  function closeMobileMenu(){
    menuToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    menuBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    const willOpen = !mobileMenu.classList.contains('is-open');
    menuToggle.classList.toggle('is-open', willOpen);
    mobileMenu.classList.toggle('is-open', willOpen);
    menuBackdrop.classList.toggle('is-open', willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
  });

  menuBackdrop.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      const isOpen = btn.classList.contains('is-open');

      document.querySelectorAll('.mobile-toggle').forEach(b => {
        b.classList.remove('is-open');
        b.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen){
        btn.classList.add('is-open');
        sub.style.maxHeight = sub.scrollHeight + 'px';
      }
    });
  });

  /* ===================== HERO 롤링 배너 ===================== */
  const rollSlides = document.querySelectorAll('.roll-slide');
  const rollDotsWrap = document.getElementById('rollDots');
  const rollPrevBtn = document.getElementById('rollPrev');
  const rollNextBtn = document.getElementById('rollNext');
  const rollPlayBtn = document.getElementById('rollPlay');
  let rollIndex = 0;
  let rollTimer;
  let rollPlaying = true;
  const ROLL_INTERVAL = 4000;

  rollSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('is-active');
    dot.setAttribute('aria-label', `배너 ${i + 1}`);
    dot.addEventListener('click', () => {
      goToRoll(i);
      restartRollAuto();
    });
    rollDotsWrap.appendChild(dot);
  });
  const rollDots = rollDotsWrap.querySelectorAll('button');

  function goToRoll(i){
    rollSlides[rollIndex].classList.remove('is-active');
    rollDots[rollIndex].classList.remove('is-active');
    rollIndex = (i + rollSlides.length) % rollSlides.length;
    rollSlides[rollIndex].classList.add('is-active');
    rollDots[rollIndex].classList.add('is-active');
  }

  function nextRoll(){ goToRoll(rollIndex + 1); }
  function prevRoll(){ goToRoll(rollIndex - 1); }

  function startRollAuto(){
    if (!rollPlaying) return;
    rollTimer = setInterval(nextRoll, ROLL_INTERVAL);
  }
  function stopRollAuto(){ clearInterval(rollTimer); }
  function restartRollAuto(){ stopRollAuto(); startRollAuto(); }

  rollNextBtn.addEventListener('click', () => { nextRoll(); restartRollAuto(); });
  rollPrevBtn.addEventListener('click', () => { prevRoll(); restartRollAuto(); });

  rollPlayBtn.addEventListener('click', () => {
    rollPlaying = !rollPlaying;
    rollPlayBtn.textContent = rollPlaying ? '❙❙' : '▶';
    rollPlayBtn.setAttribute('aria-label', rollPlaying ? '자동재생 일시정지' : '자동재생 시작');
    if (rollPlaying) startRollAuto(); else stopRollAuto();
  });

  const rollingBanner = document.querySelector('.rolling-banner-inner');
  rollingBanner.addEventListener('mouseenter', stopRollAuto);
  rollingBanner.addEventListener('mouseleave', () => { if (rollPlaying) startRollAuto(); });

  startRollAuto();
});
