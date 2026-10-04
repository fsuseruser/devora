/**
 * DEVORA & Co. — motion system
 * Lenis smooth scroll + GSAP ScrollTrigger/Flip.
 * Everything degrades gracefully: with prefers-reduced-motion, content is shown
 * statically and only essential UI (menu, clock, filters) is wired up.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Flip);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s as any) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s as any)) as T[];

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = 'expo.out';

let lenis: Lenis | null = null;

/* ───────── Smooth scroll ───────── */
if (!reduced) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ───────── Header: hide on scroll down, tone by section ───────── */
const header = $('#site-header');
const toneSections = () => $$('[data-tone]').filter((el) => el !== header);
let lastY = 0;
function updateHeader() {
  if (!header) return;
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 40);
  if (!header.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > lastY && y > 300);
  lastY = y;
  const probe = 38;
  let tone = 'light';
  for (const s of toneSections()) {
    const r = s.getBoundingClientRect();
    if (r.top <= probe && r.bottom > probe) tone = s.dataset.tone || 'light';
  }
  header.dataset.tone = tone;
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ───────── Mobile menu ───────── */
const menuBtn = $('#menu-btn');
const menu = $('#mobile-menu');
menuBtn?.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu?.classList.toggle('is-open', open);
  menu?.setAttribute('aria-hidden', String(!open));
  header?.classList.toggle('menu-open', open);
  open ? lenis?.stop() : lenis?.start();
  document.documentElement.style.overflow = open ? 'hidden' : '';
});

/* ───────── Clock & back to top ───────── */
const clocks = $$('[data-clock]');
const tick = () => {
  const t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }).format(new Date());
  clocks.forEach((c) => (c.textContent = t));
};
tick();
setInterval(tick, 15000);
$$('[data-scroll-top]').forEach((b) => b.addEventListener('click', () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))));

/* ───────── Work filters (Flip) ───────── */
function initFilters() {
  const bar = $('[data-filter-bar]');
  const grid = $('[data-filter-grid]');
  if (!bar || !grid) return;
  const buttons = $$<HTMLButtonElement>('[data-filter]', bar);
  const items = $$('[data-cats]', grid);
  const pill = $('[data-filter-pill]', bar);
  const empty = $('[data-filter-empty]');
  const movePill = (btn: HTMLElement) => {
    if (!pill) return;
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = `translateX(${btn.offsetLeft}px)`;
  };
  const active = buttons.find((b) => b.getAttribute('aria-pressed') === 'true') || buttons[0];
  movePill(active);
  window.addEventListener('resize', () => movePill(buttons.find((b) => b.getAttribute('aria-pressed') === 'true') || buttons[0]));

  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter!;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      movePill(btn);
      const state = Flip.getState(items, { props: 'opacity' });
      let shown = 0;
      items.forEach((it) => {
        const match = f === 'all' || it.dataset.cats!.split(' ').includes(f);
        it.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      if (reduced) { ScrollTrigger.refresh(); return; }
      Flip.from(state, {
        duration: 0.9,
        ease: 'expo.inOut',
        absolute: true,
        stagger: 0.03,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.94, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.06 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.5, ease: 'power2.in' }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    }),
  );
}
initFilters();

/* ───────── Counters ───────── */
function runCounter(el: HTMLElement, instant = false) {
  const raw = el.dataset.count || el.textContent || '';
  const m = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return;
  const [, pre, num, post] = m;
  const dec = (num.split('.')[1] || '').length;
  const pad = num.startsWith('0') && !num.includes('.') ? num.length : 0;
  const fmt = (v: number) => pre + (pad ? String(Math.round(v)).padStart(pad, '0') : v.toFixed(dec)) + post;
  if (instant) { el.textContent = raw; return; }
  const o = { v: 0 };
  el.textContent = fmt(0);
  gsap.to(o, { v: parseFloat(num), duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.v)) });
}

/* ───────── Reduced motion: stop here, show everything ───────── */
if (reduced) {
  $('#loader')?.classList.add('is-skip');
  $$('[data-count]').forEach((el) => runCounter(el, true));
} else {
  initMotion();
}

function initMotion() {
  /* Split words for scrubbed statements */
  $$('[data-words]').forEach((root) => {
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent!.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(root);
    gsap.fromTo($$('.w', root), { opacity: 0.14 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  });

  /* Line reveals */
  $$('[data-lines]').forEach((el) => {
    if (el.closest('[data-hero]')) return; // hero handled by intro
    gsap.to($$('.line-mask > span', el), {
      y: 0, duration: 1.3, ease: EASE, stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* Fade-up reveals (batched for stagger) */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: EASE, stagger: 0.08 }),
  });

  /* Clip reveals */
  $$('[data-clip]').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* Image parallax */
  $$('[data-parallax]').forEach((img) => {
    const amt = parseFloat(img.dataset.parallax || '10');
    gsap.set(img, { scale: 1 + amt / 50 });
    gsap.fromTo(img, { yPercent: -amt }, {
      yPercent: amt, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* Counters */
  $$('[data-count]').forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => runCounter(el) }));

  /* Marquee — velocity reactive */
  $$('[data-marquee]').forEach((m) => {
    const track = $('.mq-track', m)!;
    const loop = gsap.to(track, { xPercent: -50, duration: parseFloat(m.dataset.marquee || '30'), ease: 'none', repeat: -1 });
    let dir = 1;
    lenis?.on('scroll', (l: Lenis) => {
      if (l.direction) dir = l.direction;
      const boost = 1 + Math.min(Math.abs(l.velocity) / 8, 4);
      gsap.to(loop, { timeScale: boost * dir, duration: 0.3, overwrite: true });
      gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3 });
    });
  });

  /* Rotating marks */
  $$('[data-spin]').forEach((el) => {
    gsap.to(el, { rotate: parseFloat(el.dataset.spin || '180'), ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Horizontal process */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    $$('[data-hscroll]').forEach((sec) => {
      const track = $('[data-hs-track]', sec)!;
      const bar = $('[data-hs-bar]', sec);
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: sec, pin: true, scrub: 1, start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true,
          onUpdate: (st) => bar && gsap.set(bar, { scaleX: st.progress }),
        },
      });
      $$('[data-hs-card]', sec).forEach((card) => {
        ScrollTrigger.create({
          trigger: card, containerAnimation: tween, start: 'left 70%', end: 'right 30%',
          toggleClass: { targets: card, className: 'is-active' },
        });
      });
    });
  });

  /* Hero */
  initHero();

  /* Next project hover image */
  $$('[data-next]').forEach((el) => {
    const img = $('[data-next-img]', el);
    if (!img || !finePointer) return;
    const xTo = gsap.quickTo(img, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(img, 'y', { duration: 0.6, ease: 'power3' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left - img.offsetWidth / 2);
      yTo(e.clientY - r.top - img.offsetHeight / 2);
    });
  });

  /* Cursor & magnetic */
  if (finePointer) initCursor();

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ───────── Hero: three frames that re-compose into one ───────── */
function initHero() {
  const hero = $('[data-hero]');
  const loader = $('#loader');
  let seen = false;
  try { seen = sessionStorage.getItem('devora-intro') === '1'; sessionStorage.setItem('devora-intro', '1'); } catch {}

  const startIntro = (delay = 0) => {
    if (!hero) return;
    const tl = gsap.timeline({ delay, onComplete: () => lenis?.start() });
    tl.to($$('.hero-title .line-mask > span', hero), { y: 0, duration: 1.5, ease: EASE, stagger: 0.1 })
      .fromTo('.hf-inner, .hero-full-inner', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut', stagger: 0.12 }, 0.1)
      .fromTo('.hf-inner img, .hero-full-inner img', { scale: 1.35 }, { scale: 1, duration: 2, ease: EASE, stagger: 0.12 }, 0.1)
      .fromTo('.hero-top > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.1 }, 0.6);
  };

  if (loader) {
    if (seen) { loader.classList.add('is-skip'); }
    else {
      lenis?.stop();
      setTimeout(() => { loader.classList.add('is-done'); setTimeout(() => loader.classList.add('is-skip'), 1000); }, 1350);
    }
  }
  if (!hero) return;
  lenis?.stop();
  startIntro(loader && !seen ? 1.55 : 0.1);

  const pin = $('.hero-pin', hero)!;
  const slot = $('.hf-slot', hero)!;
  const full = $('.hero-full', hero)!;
  const frames = $('.hero-frames', hero)!;

  // size the frames to fit available height & width
  const size = () => {
    const cs = getComputedStyle(frames);
    const gap = parseFloat(cs.columnGap) || 16;
    const availW = frames.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - gap * 2;
    const availH = frames.clientHeight;
    const ratio = window.innerWidth < 768 || window.innerHeight > window.innerWidth ? 1.75 : 3.2; // on phones the side frames bleed off-screen
    const h = Math.max(0, Math.min(availH, availW / ratio));
    frames.style.setProperty('--fh', h + 'px');
  };
  const slotInset = () => {
    const p = pin.getBoundingClientRect();
    const s = slot.getBoundingClientRect();
    return `inset(${s.top - p.top}px ${p.right - s.right}px ${p.bottom - s.bottom}px ${s.left - p.left}px round 4px)`;
  };
  size();
  gsap.set(full, { clipPath: slotInset() });
  ScrollTrigger.addEventListener('refreshInit', () => { gsap.set(full, { clearProps: 'clipPath' }); size(); gsap.set(full, { clipPath: slotInset() }); });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: hero, start: 'top top', end: '+=150%', pin: pin, scrub: 1, invalidateOnRefresh: true,
      onUpdate: (st) => (hero.dataset.tone = st.progress > 0.45 ? 'dark' : 'light'),
    },
  });
  tl.to('.hero-title', { yPercent: -35, opacity: 0, duration: 0.45 }, 0)
    .to('.hero-top', { opacity: 0, y: -30, duration: 0.3 }, 0)
    .to('.hf-left', { xPercent: -130, rotate: -4, duration: 1 }, 0)
    .to('.hf-right', { xPercent: 130, rotate: 4, duration: 1 }, 0)
    .fromTo(full, { clipPath: () => slotInset() }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1 }, 0)
    .fromTo('.hero-full-inner img', { scale: 1.12 }, { scale: 1, duration: 1, immediateRender: false }, 0)
    .fromTo('.hero-shade', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4)
    .fromTo('.hero-full-copy .line-mask > span', { yPercent: 105 }, { yPercent: 0, duration: 0.35, stagger: 0.06 }, 0.62)
    .fromTo('.hero-full-copy [data-hfade]', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.8);
}

/* ───────── Cursor ───────── */
function initCursor() {
  const c = $('.cursor');
  if (!c) return;
  const label = $('span', c)!;
  gsap.set(c, { x: -100, y: -100 });
  const xTo = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener('mouseover', (e) => {
    const t = e.target as HTMLElement;
    const view = t.closest<HTMLElement>('[data-cursor="view"]');
    const link = t.closest('a, button, [data-cursor="link"], input, textarea, select, label');
    c.classList.toggle('is-view', !!view);
    c.classList.toggle('is-link', !view && !!link);
    if (view) label.textContent = view.dataset.cursorLabel || 'View';
  });
  document.addEventListener('mouseleave', () => gsap.to(c, { opacity: 0 }));
  document.addEventListener('mouseenter', () => gsap.to(c, { opacity: 1 }));

  $$('[data-magnetic]').forEach((el) => {
    const xTo2 = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const yTo2 = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo2((e.clientX - r.left - r.width / 2) * 0.3);
      yTo2((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener('mouseleave', () => { xTo2(0); yTo2(0); });
  });
}
