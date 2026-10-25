/**
 * Site-wide behaviour: theme, header, menu, and all scroll/intro motion.
 * Every GSAP tween is created inside a gsap.matchMedia() context so that it is
 * reverted on pagehide and never runs under prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __motionFailsafe?: ReturnType<typeof setTimeout>;
  }
}

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------------------------------------------------------------- theme */
function initTheme() {
  const meta = $<HTMLMetaElement>('meta[name="theme-color"]');
  const sync = () => meta?.setAttribute('content', root.dataset.theme === 'light' ? '#e5e3dc' : '#0a0a0a');
  sync();
  $('[data-theme-toggle]')?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable */
    }
    sync();
  });
}

/* --------------------------------------------------------------- header */
function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  let last = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    const menuOpen = $('[data-menu]')?.classList.contains('is-open');
    if (!menuOpen) header.classList.toggle('is-hidden', y > last && y > 420);
    last = y;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
  $('[data-to-top]')?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' }),
  );
}

/* ----------------------------------------------------------------- menu */
function initMenu() {
  const menu = $('[data-menu]');
  const btn = $<HTMLButtonElement>('[data-menu-toggle]');
  if (!menu || !btn) return;
  const label = $('[data-menu-label]', btn);
  const items = $$('[data-menu-item]', menu);
  const foot = $('[data-menu-foot]', menu);
  let open = false;
  let tl: gsap.core.Timeline | null = null;

  const setState = (v: boolean) => {
    open = v;
    btn.setAttribute('aria-expanded', String(v));
    if (label) label.textContent = v ? 'Close' : 'Menu';
    root.style.overflow = v ? 'hidden' : '';
    $('[data-header]')?.classList.remove('is-hidden');
  };

  const show = () => {
    setState(true);
    menu.removeAttribute('inert');
    menu.classList.add('is-open');
    tl?.kill();
    if (reduced.matches) return;
    tl = gsap
      .timeline()
      .fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'expo.inOut' })
      .fromTo(items, { yPercent: 115 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, '-=0.35')
      .fromTo(foot, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
    tl.eventCallback('onComplete', () => gsap.set(menu, { clearProps: 'clipPath' }));
  };

  const hide = (restoreFocus = true) => {
    setState(false);
    menu.setAttribute('inert', '');
    tl?.kill();
    const done = () => {
      menu.classList.remove('is-open');
      gsap.set([menu, items, foot], { clearProps: 'all' });
    };
    if (reduced.matches) return done();
    tl = gsap
      .timeline({ onComplete: done })
      .set(menu, { clipPath: 'inset(0 0 0% 0)' })
      .to(items, { yPercent: -115, duration: 0.45, ease: 'power3.in', stagger: 0.03 })
      .to(menu, { clipPath: 'inset(100% 0 0 0)', duration: 0.7, ease: 'expo.inOut' }, '-=0.25');
    if (restoreFocus) btn.focus({ preventScroll: true });
  };

  btn.addEventListener('click', () => (open ? hide() : show()));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) hide();
  });
  items.forEach((a) => a.addEventListener('click', () => open && hide(false)));
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && open) hide(false);
  });
}

/* -------------------------------------------------------------- contact */
function initForm() {
  const form = $<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const status = $('[data-form-status]', form);
  const btn = $<HTMLButtonElement>('button[type="submit"]', form);
  const email = form.dataset.fallback ?? '';
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    if (btn) btn.disabled = true;
    if (status) {
      status.dataset.state = '';
      status.textContent = 'Sending…';
    }
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      if (status) status.textContent = 'Thank you — your message has been sent.';
    } catch {
      if (status) {
        status.dataset.state = 'error';
        const subject = encodeURIComponent(`Message from ${String(data.name ?? '')}`);
        const body = encodeURIComponent(String(data.message ?? ''));
        status.innerHTML = `The form couldn’t send right now. <a class="link" href="mailto:${email}?subject=${subject}&body=${body}">Email directly instead</a>.`;
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

/* --------------------------------------------------------------- motion */
function initMotion() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* Hero intro: curtain lifts, portrait settles, title rises out of masks. */
    const hero = $('[data-hero]');
    if (hero) {
      const img = $('.hero__figure img', hero);
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      gsap.set(img, { scale: 1.3, transformOrigin: '50% 30%' });
      tl.to($('[data-hero-curtain]', hero), { scaleY: 0, duration: 1.35, ease: 'expo.inOut' }, 0.1)
        .to(img, { scale: 1.1, duration: 2.2 }, 0.1)
        .from($$('.hero__title b', hero), { yPercent: 112, duration: 1.3, stagger: 0.12 }, 0.55)
        .from($$('.hero__roles span, .hero__tag', hero), { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.07 }, 0.95)
        .from($('.hero__scroll', hero), { autoAlpha: 0, duration: 0.8 }, 1.4);

      gsap.to(img, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to($('.hero__type', hero), {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    /* Editorial line reveals. */
    $$('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          return gsap.from(self.lines, {
            yPercent: 112,
            duration: 1.15,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        },
      });
    });

    /* Scroll-lit statements (Jesper's "linear text reveal"). */
    $$('[data-lit]').forEach((el) => {
      SplitText.create(el, {
        type: 'words',
        wordsClass: 'word',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          return gsap.fromTo(
            self.words,
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.12,
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 50%', scrub: true },
            },
          );
        },
      });
    });

    /* Generic fade-ups, batched so many rows cost one trigger. */
    const fades = $$('[data-fade]');
    if (fades.length) {
      gsap.set(fades, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(fades, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      });
    }

    /* Image mask reveals. */
    $$('[data-mask]').forEach((el) => {
      const img = $('img', el);
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      tl.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'expo.inOut' });
      if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
    });
    $$('[data-parallax-img]').forEach((frame) => {
      const img = $('img', frame);
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    /* Quote / section headings fade handled above; marquee speeds up with scroll. */
    $$('.marquee__track').forEach((track) => {
      const tween = gsap.getTweensOf(track);
      void tween;
      ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 1200, 2.4);
          track.getAnimations().forEach((a) => (a.playbackRate = 1 + v));
        },
      });
    });
  });

  /* Pointer-only extras. */
  mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
    /* Hero cursor mask: a circle follows the pointer revealing the alternate caption. */
    const hero = $('[data-hero]');
    const mask = $('[data-hero-mask]', hero ?? document);
    if (hero && mask) {
      const s = { x: 0, y: 0, r: 0 };
      const apply = () => (mask.style.clipPath = `circle(${s.r}px at ${s.x}px ${s.y}px)`);
      const xTo = gsap.quickTo(s, 'x', { duration: 0.55, ease: 'power3', onUpdate: apply });
      const yTo = gsap.quickTo(s, 'y', { duration: 0.55, ease: 'power3', onUpdate: apply });
      const rTo = gsap.quickTo(s, 'r', { duration: 0.5, ease: 'power3', onUpdate: apply });
      const pos = (e: PointerEvent) => {
        const b = hero.getBoundingClientRect();
        return [e.clientX - b.left, e.clientY - b.top] as const;
      };
      const move = (e: PointerEvent) => {
        const [x, y] = pos(e);
        xTo(x);
        yTo(y);
      };
      const enter = (e: PointerEvent) => {
        const [x, y] = pos(e);
        s.x = x;
        s.y = y;
        rTo(Math.min(190, window.innerWidth * 0.13));
      };
      const leave = () => rTo(0);
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerenter', enter);
      hero.addEventListener('pointerleave', leave);
      return () => {
        hero.removeEventListener('pointermove', move);
        hero.removeEventListener('pointerenter', enter);
        hero.removeEventListener('pointerleave', leave);
        mask.style.clipPath = '';
      };
    }
  });

  /* Gentle magnetic pull on primary buttons. */
  mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
    const cleanups: (() => void)[] = [];
    $$('.btn').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' });
      const move = (e: PointerEvent) => {
        const r = b.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
      };
      const out = () => {
        xTo(0);
        yTo(0);
      };
      b.addEventListener('pointermove', move);
      b.addEventListener('pointerleave', out);
      cleanups.push(() => {
        b.removeEventListener('pointermove', move);
        b.removeEventListener('pointerleave', out);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  });

  window.addEventListener('pagehide', () => mm.revert());
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) ScrollTrigger.refresh();
  });
}

function boot() {
  initTheme();
  initHeader();
  initMenu();
  initForm();
  try {
    initMotion();
  } catch (err) {
    console.error('Motion failed; content left visible.', err);
    root.classList.add('no-anim');
    return;
  }
  clearTimeout(window.__motionFailsafe);
  // Re-measure once webfonts have settled so triggers are accurate.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
