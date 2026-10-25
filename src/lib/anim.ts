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

/* --------------------------------------------------------------- motion */
function initMotion() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* Hero scroll parallax (the intro itself is CSS). */
    const hero = $('[data-hero]');
    if (hero) {
      const img = $('.hero__figure img', hero);
      gsap.to(img, {
        yPercent: 5,
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
        aria: 'none',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          return gsap.fromTo(
            self.words,
            { opacity: 0.5 },
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

    /* Marquee speeds up with scroll velocity (animation looked up once, rate eased). */
    $$('.marquee__track').forEach((track) => {
      const anim = track.getAnimations()[0];
      if (!anim) return;
      const rate = { v: 1 };
      const setRate = gsap.quickTo(rate, 'v', { duration: 0.6, ease: 'power2', onUpdate: () => (anim.playbackRate = rate.v) });
      ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => setRate(1 + Math.min(Math.abs(self.getVelocity()) / 1200, 2.4)),
      });
    });
  });

  /* Desktop-only: the blended hero title drifts up on scroll. */
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
    const hero = $('[data-hero]');
    if (!hero) return;
    gsap.to($('.hero__type', hero), {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
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

export function initAnimations() {
  initMotion();
  clearTimeout(window.__motionFailsafe);
  // Re-measure once webfonts have settled so triggers are accurate.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
