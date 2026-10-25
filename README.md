# Ruchi Sharma — personal site (Astro, static, Cloudflare Pages)

Jesper-inspired editorial design: Big Shoulders Display + Poppins, dark default with light toggle, GSAP (ScrollTrigger + SplitText) motion, CSS cross-document view transitions. No smooth-scroll library, no UI framework.

## Develop
    npm install
    npm run dev        # http://localhost:4321
    npm run check      # TypeScript / Astro diagnostics
    npm run build      # static output in dist/

## Deploy to Cloudflare Pages
1. Push this folder to a Git repo, then in Cloudflare: Workers & Pages → Create → Pages → Connect to Git.
2. Build command `npm run build`, output directory `dist`, Node 22.
3. Add the domain `ruchisharma.com` under Custom domains.
4. Contact form (optional but recommended): Settings → Variables and Secrets:
   `RESEND_API_KEY` (secret), `CONTACT_FROM` (verified sender), `CONTACT_TO` (defaults to ruchigucci@gmail.com).
   `functions/api/contact.ts` is deployed automatically as a Pages Function. Without these the form shows a mailto fallback.
Or direct upload: `npm run build && npx wrangler pages deploy dist`.

## Content & photos
- All copy: `src/data/site.ts` (sourced from ruchisharma.com). Gallery: `src/data/gallery.ts`.
- Images: `src/assets/images/`. `hero-portrait.jpg` is an unaltered rectangular crop of the original Gerety jury image.
  To use new photography, replace that file (keep ~3:4 portrait, 1600px+ wide) — everything else adapts.

## Review before launch
- Press titles (The Morning, Branding in Asia) inferred from URL slugs.
- Captions for the Effie Pakistan and ADC images come from text printed on the images.
- "Thirty years" resume heading is derived from the 1995 start date.
- Email/phone are published as on the current site.
- Case-study links on /work/ point to the existing site's /portfolio/ pages.
