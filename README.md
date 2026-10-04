# Lingesh Kumar M — Portfolio

A premium, dark, black-and-gold portfolio site for Lingesh Kumar M (Generative AI & Machine Learning Developer), built as a single self-contained static site — no build step, no framework install required.

## Run it

Just open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then deploy the folder as-is to GitHub Pages, Netlify, Vercel (static), or any static host.

## Structure

```
index.html          → all markup / sections
css/style.css        → design system (black + gold tokens, layout, animations)
js/data.js           → ALL content lives here: projects, LEO 2.0 features, certs, skills, education
js/main.js           → rendering + interactions (cursor, nav, reveals, canvases, GSAP)
public/images/       → avatar.png / avatar.webp (your portrait)
public/videos/       → put lingesh-intro.mp4 here
public/resume/       → put Lingesh-Kumar-M-Resume.pdf here
```

## The 3D particle sphere — now a running motif, not just the intro

The same point-cloud sphere from the opening animation now lives on as a real rotating 3D object (via `createParticleSphere()` in `js/main.js`):

- **Hero** — sits behind the avatar, auto-rotating, and reacts to you: scroll and it spins further and fades as you move into About; on desktop, moving your cursor tilts it slightly (disabled on touch devices).
- **LEO 2.0** — the same renderer, denser and more gold-weighted, auto-rotating as its "AI core."

It's a shared helper, not two different effects, so the whole site reads as one consistent idea rather than a one-off loading gimmick. It's plain canvas 2D (rotation matrices + simple perspective projection, no WebGL), so it stays light: point count auto-reduces under 640px, it pauses via `IntersectionObserver` whenever its canvas scrolls off-screen, and `prefers-reduced-motion` gets a single static frame instead of a spin.

## Opening animation

The preloader samples your name as text, then animates particles through three stages — gathered sphere → dispersed starfield → reformed into "LINGESH / KUMAR M" in dust-like gold-and-white particles — inspired by the reference you shared. It's pure `<canvas>` 2D (no WebGL/Three.js needed), so it stays light and fast.

- Click anywhere on it, or hit **SKIP**, to jump straight to the site.
- Returning visitors (same browser tab session) get a fast, simple fade instead of the full sequence.
- `prefers-reduced-motion` skips straight to a quick fade-in, no particle motion.
- To change the name it spells out, or the timing of each stage, edit the `runPreloaderParticles()` function in `js/main.js` (the `T_SPHERE_HOLD` / `T_DISPERSE` / `T_CONVERGE` / `T_HOLD` constants control stage duration in milliseconds).

## Avatar photo, intro video, and resume — all live

- `public/images/avatar.png` (+ `avatar.webp`, served first via `<picture>` for a ~9x smaller download) — your transparent cutout portrait. It's rendered with `object-fit: contain` and a gold `drop-shadow` that follows the silhouette itself, not a rectangular box, so it reads as floating over the particle sphere rather than sitting in a photo frame. A bottom mask fade blends its hard cutout edge into the dark background.
- `public/videos/lingesh-intro.mp4` — your intro video, re-encoded for the web (720×1280 h264/aac, faststart) down to under 1MB from the original ~25MB with no visible quality loss. It plays muted-autoplay on load (browser policy), with a **TAP FOR SOUND** button in the top-right corner; it dismisses itself into the hero the moment it finishes, and **SKIP INTRO** always works too.
- `public/resume/Lingesh-Kumar-M-Resume.pdf` — your real resume. Every "View Resume" / "Download Resume" / "Download CV" control already points here.

To swap any of these later, just overwrite the file at the same path — no code or layout changes needed. If an asset ever goes missing or fails to load, the site falls back gracefully (gold monogram for the avatar, a "coming soon" card for the video).

## Self Intro button

Below the hero avatar is a pulsing gold **SELF INTRO** pill button — designed to beg to be clicked. Tapping it reopens the intro video and plays it **with sound immediately** (a direct click is a genuine user gesture, so the browser allows unmuted autoplay, unlike the silent autoplay on first page load). It reuses the same video element and overlay, so there's no extra asset or duplicate markup — see `#selfIntroBtn` in `js/main.js`.
4. **Open Graph image** (optional) — add `public/images/og-cover.jpg` for link-preview cards, and update `canonical`/`og:url` in `index.html` once you have a domain.

## Editing content

Everything text-based — projects, LEO 2.0 capabilities, model stack, certifications, skills, education, stats — lives in `js/data.js` as plain arrays/objects. Edit that file; the page re-renders itself from it, so you never need to touch the HTML to add a project or certification.

## GitHub links

All project cards, the LEO 2.0 CTA, the GitHub terminal section and the footer link directly to the real repositories under `github.com/Lingeshkumar24-code`. Repo names are centralized in the `GITHUB_REPOS` array and each project's `github` field in `js/data.js`, so a rename on GitHub only needs updating in one place.

## Notes on accuracy

Per the brief, nothing here invents metrics, completed features, or live demos that don't exist:
- The QLoRA/PEFT fine-tuning work for LEO 2.0 is labeled **Experimental / In development**.
- BhashaVoice AI's implementation-status pills distinguish what's implemented from what currently falls back.
- LAN calling is labeled explicitly as LAN/browser (WebRTC), not mobile PSTN calling.
- The only live demo linked is InterviewIQ AI's actual Render deployment.

## Performance & accessibility

- No 3D/WebGL dependency — the hero particle field and LEO orb are lightweight `<canvas>` 2D animations that pause automatically when off-screen.
- Respects `prefers-reduced-motion`.
- Custom cursor and magnetic buttons are disabled automatically on touch devices.
- Semantic headings, visible focus states, skip-to-content link, alt text on meaningful images.

## Tech

Vanilla HTML/CSS/JS + GSAP & ScrollTrigger (loaded from cdnjs) for scroll-linked parallax. No build tooling required. If you later want to migrate to Next.js/React/Three.js for heavier 3D, the content in `js/data.js` is already structured so it can be dropped straight into React components.
