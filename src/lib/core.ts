/**
 * Critical, dependency-free behaviour: theme, header, menu, contact form.
 * Runs immediately and ships no animation library. The GSAP layer (anim.ts)
 * is imported lazily, once the browser is idle or the visitor first interacts.
 */
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

declare global {
  interface Window {
    __motionFailsafe?: ReturnType<typeof setTimeout>;
  }
}

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
  const menu = $('[data-menu]');
  if (header) {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle('is-solid', y > 40);
      if (!menu?.classList.contains('is-open')) header.classList.toggle('is-hidden', y > last && y > 420);
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
  }
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
  let open = false;

  const set = (v: boolean, restoreFocus = true) => {
    open = v;
    btn.setAttribute('aria-expanded', String(v));
    if (label) label.textContent = v ? 'Close' : 'Menu';
    root.style.overflow = v ? 'hidden' : '';
    menu.classList.toggle('is-open', v);
    if (v) menu.removeAttribute('inert');
    else menu.setAttribute('inert', '');
    $('[data-header]')?.classList.remove('is-hidden');
    if (!v && restoreFocus) btn.focus({ preventScroll: true });
  };

  btn.addEventListener('click', () => set(!open));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) set(false);
  });
  $$('[data-menu-item]', menu).forEach((a) => a.addEventListener('click', () => open && set(false, false)));
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && open) set(false, false);
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

/* ------------------------------------------- lazy animation layer (GSAP) */
function loadAnimations() {
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    events.forEach((ev) => window.removeEventListener(ev, start));
    import('./anim')
      .then((m) => m.initAnimations())
      .catch((err) => {
        console.error('Animation layer failed; content left visible.', err);
        root.classList.add('no-anim');
      });
  };
  const events = ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'] as const;
  events.forEach((ev) => window.addEventListener(ev, start, { once: true, passive: true }));
  // Otherwise as soon as the main thread is quiet (capped so below-the-fold reveals are never late).
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 900 });
  else setTimeout(start, 400);
}

function boot() {
  initTheme();
  initHeader();
  initMenu();
  initForm();
  loadAnimations();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

export {};
