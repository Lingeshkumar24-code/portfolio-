/* ==========================================================================
   MAIN.JS — rendering + interactions
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  if (isTouch) document.body.classList.add("touch");

  /* ----------------------------------------------------------------------
     RENDER: data.js -> DOM
     ---------------------------------------------------------------------- */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function renderStats() {
    const grid = document.getElementById("statsGrid");
    if (!grid) return;
    STATS.forEach((s) => {
      const item = el("div", "stat-item");
      item.setAttribute("data-reveal", "");
      const val = el("div", "stat-value");
      val.dataset.isNumber = s.isNumber ? "1" : "0";
      val.dataset.target = s.value;
      val.dataset.suffix = s.suffix || "";
      val.textContent = s.isNumber ? "0" + (s.suffix || "") : s.value;
      item.appendChild(val);
      item.appendChild(el("div", "stat-label", s.label));
      grid.appendChild(item);
    });
  }

  function renderEducation() {
    const wrap = document.getElementById("educationTimeline");
    if (!wrap) return;
    EDUCATION.forEach((e) => {
      const item = el("div", "timeline-item");
      item.setAttribute("data-reveal", "");
      item.appendChild(el("div", "timeline-degree", e.degree));
      item.appendChild(el("div", "timeline-place", e.place));
      item.appendChild(el("div", "timeline-meta", e.meta));
      wrap.appendChild(item);
    });
  }

  function renderLeoPipeline() {
    const wrap = document.getElementById("leoPipeline");
    if (!wrap) return;
    LEO_PIPELINE.forEach((step, i) => {
      const s = el("span", "leo-step", step);
      s.dataset.index = i;
      wrap.appendChild(s);
      if (i < LEO_PIPELINE.length - 1) {
        wrap.appendChild(el("span", "leo-connector"));
      }
    });
  }

  function renderLeoFeatures() {
    const wrap = document.getElementById("leoFeatures");
    if (!wrap) return;
    LEO_FEATURES.forEach((f) => {
      const card = el("div", "leo-feature-card");
      card.setAttribute("data-reveal", "");
      card.appendChild(el("div", "leo-feature-tag", f.tag));
      card.appendChild(el("div", "leo-feature-title", f.title));
      card.appendChild(el("p", "leo-feature-desc", f.desc));
      const steps = el("div", "leo-feature-steps");
      f.steps.forEach((s) => steps.appendChild(el("span", null, s)));
      card.appendChild(steps);
      wrap.appendChild(card);
    });
  }

  function renderLeoModels() {
    const provWrap = document.getElementById("leoProviders");
    if (provWrap) {
      LEO_PROVIDERS.forEach((p) => provWrap.appendChild(el("span", "leo-provider-chip", p)));
    }
    const wrap = document.getElementById("leoModels");
    if (!wrap) return;
    LEO_MODELS.forEach((m) => {
      const card = el("div", "leo-model-card");
      card.setAttribute("data-reveal", "");
      card.appendChild(el("div", "leo-model-role", m.role));
      card.appendChild(el("div", "leo-model-name", m.model));
      card.appendChild(el("div", "leo-model-via", "via " + m.via));
      wrap.appendChild(card);
    });
  }

  function renderLeoFinetune() {
    const wrap = document.getElementById("leoFinetune");
    if (!wrap) return;
    LEO_FINETUNE_PIPELINE.forEach((step, i) => {
      wrap.appendChild(el("span", "leo-step", step));
      if (i < LEO_FINETUNE_PIPELINE.length - 1) wrap.appendChild(el("span", "leo-connector"));
    });
  }

  function renderLeoTech() {
    const wrap = document.getElementById("leoTechConstellation");
    if (!wrap) return;
    LEO_TECH.forEach((t) => wrap.appendChild(el("span", "tech-chip", t)));
  }

  function metaBlock(title, bodyHtml) {
    const block = el("div", "project-meta-block");
    block.appendChild(el("h4", null, title));
    block.appendChild(bodyHtml);
    return block;
  }

  function chipRow(items) {
    const row = el("div", "chip-row");
    items.forEach((i) => row.appendChild(el("span", null, i)));
    return row;
  }

  function renderProjects() {
    const wrap = document.getElementById("projectsList");
    if (!wrap) return;
    PROJECTS.forEach((p) => {
      const card = el("article", "project-case");
      card.setAttribute("data-reveal", "");

      const left = el("div", "project-num", p.num);
      card.appendChild(left);

      const right = el("div", "project-body");
      right.appendChild(el("h3", "project-title", p.title));
      right.appendChild(el("p", "project-subtitle", p.subtitle));
      right.appendChild(el("p", "project-desc", p.desc));

      const grid = el("div", "project-meta-grid");

      if (p.problem) grid.appendChild(metaBlock("The Problem", el("p", null, p.problem)));
      if (p.approach) grid.appendChild(metaBlock("The Approach", el("p", null, p.approach)));
      if (p.architecture) grid.appendChild(metaBlock("Architecture", chipRow(p.architecture)));
      if (p.ml) {
        const mlWrap = el("div");
        p.ml.forEach((m) => {
          const line = el("p", null, `<strong style="color:var(--gold-bright); font-weight:500;">${m.name}</strong> — ${m.use}`);
          mlWrap.appendChild(line);
        });
        grid.appendChild(metaBlock("Machine Learning", mlWrap));
      }
      if (p.rag) grid.appendChild(metaBlock("RAG", chipRow(p.rag)));
      if (p.features) grid.appendChild(metaBlock("Key Features", chipRow(p.features)));
      if (p.endpoints) grid.appendChild(metaBlock("API Endpoints", chipRow(p.endpoints)));
      if (p.languages) grid.appendChild(metaBlock("Languages Supported", chipRow(p.languages)));
      if (p.codeMixedExamples) grid.appendChild(metaBlock("Code-mixed Examples", chipRow(p.codeMixedExamples)));
      if (p.environment) grid.appendChild(metaBlock("Environment", chipRow(p.environment)));
      if (p.algorithms) grid.appendChild(metaBlock("Algorithms", chipRow(p.algorithms)));
      if (p.evaluation) grid.appendChild(metaBlock("Evaluation", chipRow(p.evaluation)));
      if (p.core) grid.appendChild(metaBlock("Core Model", chipRow(p.core)));
      if (p.tech) grid.appendChild(metaBlock("Tech Stack", chipRow(p.tech)));

      right.appendChild(grid);

      if (p.status) {
        const statusWrap = el("div", "project-status-row");
        p.status.forEach((s) => {
          const pill = el("span", "status-pill" + (s.state === "Implemented" ? " implemented" : ""), `${s.part}: ${s.state}`);
          statusWrap.appendChild(pill);
        });
        right.appendChild(metaBlock("Implementation Status", statusWrap));
      }

      if (p.disclaimer) right.appendChild(el("p", "project-disclaimer", p.disclaimer));

      const actions = el("div", "project-actions");
      const gh = el("a", "btn btn-gold magnetic", "VIEW ON GITHUB");
      gh.href = p.github;
      gh.target = "_blank";
      gh.rel = "noopener";
      gh.dataset.cursor = "GITHUB";
      actions.appendChild(gh);
      if (p.demo) {
        const demo = el("a", "btn btn-ghost magnetic", "LIVE DEMO");
        demo.href = p.demo;
        demo.target = "_blank";
        demo.rel = "noopener";
        actions.appendChild(demo);
      }
      right.appendChild(actions);

      card.appendChild(right);
      wrap.appendChild(card);
    });
  }

  function renderSkills() {
    const wrap = document.getElementById("skillsCategories");
    if (wrap) {
      SKILL_CATEGORIES.forEach((cat) => {
        const block = el("div", "skills-cat");
        block.setAttribute("data-reveal", "");
        block.appendChild(el("h3", null, cat.title));
        block.appendChild(chipRow(cat.items));
        wrap.appendChild(block);
      });
    }

    const cWrap = document.getElementById("skillConstellation");
    if (cWrap) {
      const radius = window.innerWidth < 640 ? 0 : 170;
      const cx = 50, cy = 50; // percentage based
      const n = SKILL_CONSTELLATION.length;
      SKILL_CONSTELLATION.forEach((s, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const node = el("div", "constellation-node", s.tag);
        node.tabIndex = 0;
        if (radius > 0) {
          const x = 50 + (radius / 3.2) * Math.cos(angle);
          const y = 50 + (radius / 3.2) * Math.sin(angle);
          node.style.left = x + "%";
          node.style.top = y + "%";
        }
        const tip = el("span", "constellation-tooltip", s.related);
        node.appendChild(tip);
        cWrap.appendChild(node);
      });
    }
  }

  function renderCerts() {
    const wrap = document.getElementById("certRow");
    if (!wrap) return;
    CERTIFICATIONS.forEach((c) => {
      const card = el("div", "cert-card");
      card.setAttribute("data-reveal", "");
      card.appendChild(el("div", "cert-issuer", c.issuer));
      card.appendChild(el("div", "cert-title", c.title));
      wrap.appendChild(card);
    });
  }

  function renderTerminal() {
    const body = document.getElementById("terminalBody");
    if (!body) return;
    let html = `<div><span class="prompt">$</span> whoami</div><div class="dim">lingeshkumar24-code</div><br/>`;
    html += `<div><span class="prompt">$</span> ls projects/</div>`;
    GITHUB_REPOS.forEach((r) => {
      html += `<div><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a></div>`;
    });
    html += `<br/><div><span class="prompt">$</span> <span class="terminal-cursor">&nbsp;</span></div>`;
    body.innerHTML = html;
  }

  renderStats();
  renderEducation();
  renderLeoPipeline();
  renderLeoFeatures();
  renderLeoModels();
  renderLeoFinetune();
  renderLeoTech();
  renderProjects();
  renderSkills();
  renderCerts();
  renderTerminal();

  /* ----------------------------------------------------------------------
     AVATAR / INTRO VIDEO FALLBACKS
     ---------------------------------------------------------------------- */
  const heroAvatarImg = document.getElementById("heroAvatarImg");
  if (heroAvatarImg) {
    const markLoaded = () => {
      if (heroAvatarImg.naturalWidth > 0) heroAvatarImg.classList.add("loaded");
    };
    heroAvatarImg.addEventListener("load", markLoaded);
    heroAvatarImg.addEventListener("error", () => heroAvatarImg.classList.remove("loaded"));
    // the image may have already finished loading (cache, or a fast local file)
    // before this listener was attached, in which case "load" never fires again
    if (heroAvatarImg.complete) markLoaded();
  }

  const introVideo = document.getElementById("introVideo");
  const introPlaceholder = document.getElementById("introPlaceholder");
  const introSoundBtn = document.getElementById("introSound");
  let introHasRealVideo = false;

  function markVideoReady() {
    if (introHasRealVideo) return;
    if (introVideo.readyState >= 2 && introVideo.videoWidth > 0 && !reduceMotion) {
      introHasRealVideo = true;
      introPlaceholder.style.display = "none";
      introVideo.muted = true;
      // don't play yet — wait until the preloader hands off so the visitor
      // sees the video from frame 0, not however many seconds it preloaded for
      if (introSoundBtn) introSoundBtn.classList.add("show");
    }
  }

  if (introVideo) {
    introVideo.addEventListener("error", () => {
      introPlaceholder.style.display = "flex";
    });
    introVideo.addEventListener("loadeddata", markVideoReady);
    // a small local file can finish loading before this listener even attaches,
    // in which case "loadeddata" has already fired and won't fire again — so
    // check the element's current state directly too.
    if (introVideo.readyState >= 2) markVideoReady();
    // give the real file a brief moment to resolve; otherwise fall back to the placeholder
    setTimeout(() => {
      markVideoReady();
      if (!introVideo.videoWidth || reduceMotion) introPlaceholder.style.display = "flex";
    }, 700);
  }

  const selfIntroBtn = document.getElementById("selfIntroBtn");
  if (selfIntroBtn) {
    selfIntroBtn.addEventListener("click", () => {
      introOverlay.classList.remove("hide");
      if (introVideo && introHasRealVideo) {
        introVideo.currentTime = 0;
        introVideo.muted = false; // direct click = real user gesture, safe to play with sound
        introVideo.play().catch(() => {
          // some browsers may still refuse unmuted autoplay in edge cases — fall back to muted
          introVideo.muted = true;
          introVideo.play().catch(() => {});
        });
        if (introSoundBtn) {
          const unmuted = !introVideo.muted;
          introSoundBtn.classList.toggle("unmuted", unmuted);
          introSoundBtn.setAttribute("aria-pressed", unmuted ? "true" : "false");
          introSoundBtn.innerHTML = unmuted
            ? '<span class="intro-sound-icon">&#128266;</span> SOUND ON'
            : '<span class="intro-sound-icon">&#128263;</span> TAP FOR SOUND';
        }
      }
    });
  }

  if (introSoundBtn) {
    introSoundBtn.addEventListener("click", () => {
      const nowMuted = !introVideo.muted ? true : false;
      introVideo.muted = !introVideo.muted;
      introVideo.play().catch(() => {});
      const unmuted = !introVideo.muted;
      introSoundBtn.classList.toggle("unmuted", unmuted);
      introSoundBtn.setAttribute("aria-pressed", unmuted ? "true" : "false");
      introSoundBtn.innerHTML = unmuted
        ? '<span class="intro-sound-icon">&#128266;</span> SOUND ON'
        : '<span class="intro-sound-icon">&#128263;</span> TAP FOR SOUND';
    });
  }

  /* ----------------------------------------------------------------------
     PRELOADER — particle sphere -> starfield -> wordmark formation
     ---------------------------------------------------------------------- */
  const preloader = document.getElementById("preloader");
  const introOverlay = document.getElementById("introOverlay");
  const skipPreloaderBtn = document.getElementById("skipPreloader");
  const lineFill = document.getElementById("preloaderLineFill");

  function dismissIntro() {
    introOverlay.classList.add("hide");
    if (introVideo) introVideo.pause();
    // elements hidden via visibility:hidden don't reliably fire mouseleave,
    // so make sure the custom cursor doesn't stay stuck in its "hovering" state
    const ring = document.getElementById("cursorRing");
    const label = document.getElementById("cursorLabel");
    if (ring) ring.classList.remove("hovering");
    if (label) label.textContent = "";
  }
  document.getElementById("skipIntro").addEventListener("click", dismissIntro);
  // if the visitor engages with the real video (taps for sound), don't auto-cut it off
  if (introVideo) {
    introVideo.addEventListener("ended", dismissIntro);
  }

  function hidePreloaderAndStartIntro() {
    if (preloader.classList.contains("hide")) return;
    preloader.classList.add("hide");
    // sequence: once the preloader fades, hand off to the avatar intro.
    const handoff = reduceMotion ? 300 : 500;
    setTimeout(() => {
      if (introHasRealVideo) {
        // real video: start fresh from frame 0 and let it play itself out;
        // "ended" dismisses it, this is just a safety net in case that never fires
        introVideo.currentTime = 0;
        introVideo.play().catch(() => {});
        setTimeout(dismissIntro, 16000);
      } else {
        // no video yet: give the placeholder a brief, deliberate moment, then move on
        setTimeout(dismissIntro, reduceMotion ? 200 : 3100);
      }
    }, handoff);
  }

  // returning visitors within the same session get the fast path
  const seenIntro = (() => {
    try { return sessionStorage.getItem("lkm_intro_seen") === "1"; }
    catch (e) { return false; }
  })();

  const canvas = document.getElementById("preloaderCanvas");
  const supportsCanvas = !!(canvas && canvas.getContext);

  if (reduceMotion || !supportsCanvas || seenIntro) {
    preloader.classList.add("no-canvas");
    skipPreloaderBtn.style.display = "none";
    window.addEventListener("load", () => {
      setTimeout(hidePreloaderAndStartIntro, reduceMotion || seenIntro ? 250 : 1600);
    });
  } else {
    runPreloaderParticles();
  }

  try { sessionStorage.setItem("lkm_intro_seen", "1"); } catch (e) {}

  skipPreloaderBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hidePreloaderAndStartIntro();
  });
  preloader.addEventListener("click", hidePreloaderAndStartIntro);

  function runPreloaderParticles() {
    const ctx = canvas.getContext("2d");
    let w, h, dpr = Math.min(devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }
    resize();
    window.addEventListener("resize", resize);

    // --- sample target points for the wordmark from offscreen text ---
    function sampleText(lines, fontSize, gap) {
      const off = document.createElement("canvas");
      off.width = w; off.height = h;
      const octx = off.getContext("2d");
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `700 ${fontSize}px 'Space Grotesk', sans-serif`;
      const lineHeight = fontSize * 1.15;
      const totalH = lineHeight * (lines.length - 1);
      lines.forEach((line, i) => {
        octx.fillText(line, w / 2, h / 2 - totalH / 2 + i * lineHeight);
      });
      const data = octx.getImageData(0, 0, w, h).data;
      const pts = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (y * w + x) * 4 + 3;
          if (data[idx] > 128) pts.push({ x, y });
        }
      }
      return pts;
    }

    const fontSize = Math.min(w, h * 2.4) * (window.innerWidth < 640 ? 0.1 : 0.075);
    const gap = Math.max(3, Math.floor(dpr * (window.innerWidth < 640 ? 3 : 2.4)));
    const targets = sampleText(["LINGESH", "KUMAR M"], fontSize, gap);

    const COUNT = Math.min(targets.length, window.innerWidth < 640 ? 900 : 1800);
    // shuffle targets, take a subset so density stays performant
    for (let i = targets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [targets[i], targets[j]] = [targets[j], targets[i]];
    }
    const picked = targets.slice(0, COUNT);

    const cx = w / 2, cy = h / 2;
    const particles = picked.map(() => {
      const r = Math.sqrt(Math.random()) * Math.min(w, h) * 0.07;
      const a = Math.random() * Math.PI * 2;
      return {
        sphereX: cx + Math.cos(a) * r,
        sphereY: cy + Math.sin(a) * r,
        scatterX: Math.random() * w,
        scatterY: Math.random() * h,
        size: (Math.random() * 1.6 + 0.6) * dpr,
        gold: Math.random() < 0.3,
        tw: Math.random() * Math.PI * 2,
      };
    });
    particles.forEach((p, i) => {
      p.targetX = picked[i].x;
      p.targetY = picked[i].y;
      p.x = p.sphereX; p.y = p.sphereY;
    });

    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    const T_SPHERE_HOLD = 550;
    const T_DISPERSE = 650;
    const T_CONVERGE = 950;
    const T_HOLD = 550;
    const T_TOTAL = T_SPHERE_HOLD + T_DISPERSE + T_CONVERGE + T_HOLD;

    const start = performance.now();
    let rafId;

    function frame(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w, h);

      let phaseA = 1, phaseB = 0; // phaseA: sphere->scatter progress, phaseB: scatter->text progress
      if (elapsed < T_SPHERE_HOLD) {
        phaseA = 0; phaseB = 0;
      } else if (elapsed < T_SPHERE_HOLD + T_DISPERSE) {
        phaseA = ease((elapsed - T_SPHERE_HOLD) / T_DISPERSE);
        phaseB = 0;
      } else if (elapsed < T_SPHERE_HOLD + T_DISPERSE + T_CONVERGE) {
        phaseA = 1;
        phaseB = ease((elapsed - T_SPHERE_HOLD - T_DISPERSE) / T_CONVERGE);
      } else {
        phaseA = 1; phaseB = 1;
      }

      particles.forEach((p) => {
        const midX = p.sphereX + (p.scatterX - p.sphereX) * phaseA;
        const midY = p.sphereY + (p.scatterY - p.sphereY) * phaseA;
        p.x = midX + (p.targetX - midX) * phaseB;
        p.y = midY + (p.targetY - midY) * phaseB;

        p.tw += 0.04;
        const twinkle = phaseB > 0.9 ? 0.75 + Math.sin(p.tw) * 0.25 : 1;
        const alpha = (0.4 + Math.random() * 0.3) * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(212,175,55,${alpha})` : `rgba(245,245,245,${alpha})`;
        ctx.fill();
      });

      if (lineFill) lineFill.style.width = Math.min(100, (elapsed / T_TOTAL) * 100) + "%";

      if (elapsed < T_TOTAL) {
        rafId = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(rafId);
        setTimeout(hidePreloaderAndStartIntro, 250);
      }
    }
    rafId = requestAnimationFrame(frame);
    skipPreloaderBtn.classList.add("show");
  }

  /* ----------------------------------------------------------------------
     CUSTOM CURSOR
     ---------------------------------------------------------------------- */
  if (!isTouch) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const label = document.getElementById("cursorLabel");
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll("a, button, .magnetic, [data-cursor]").forEach((node) => {
      node.addEventListener("mouseenter", () => {
        ring.classList.add("hovering");
        label.textContent = node.dataset.cursor || "";
      });
      node.addEventListener("mouseleave", () => {
        ring.classList.remove("hovering");
        label.textContent = "";
      });
    });

    /* magnetic buttons */
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - r.left - r.width / 2;
        const relY = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ----------------------------------------------------------------------
     NAV
     ---------------------------------------------------------------------- */
  const nav = document.getElementById("siteNav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    updateScrollProgress();
  }, { passive: true });

  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  navToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

  /* ----------------------------------------------------------------------
     SCROLL-SPY — highlight the current section's nav link
     ---------------------------------------------------------------------- */
  (function scrollSpy() {
    const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
    if (!navLinks.length) return;
    const map = new Map();
    navLinks.forEach((a) => {
      const id = a.getAttribute("href").replace("#", "");
      const target = document.getElementById(id);
      if (target) map.set(target, a);
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    map.forEach((_, section) => spy.observe(section));
  })();

  /* ----------------------------------------------------------------------
     SCROLL PROGRESS
     ---------------------------------------------------------------------- */
  const progressBar = document.getElementById("scrollProgressBar");
  function updateScrollProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + "%";
  }

  /* ----------------------------------------------------------------------
     REVEAL ON SCROLL (IntersectionObserver — lightweight, no GSAP dependency)
     ---------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll("[data-reveal], .hero-headline .line, .contact-headline .line");
  revealTargets.forEach((t) => t.setAttribute("data-reveal", ""));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll("[data-reveal]").forEach((t) => io.observe(t));

  /* ----------------------------------------------------------------------
     LEO PIPELINE SEQUENTIAL HIGHLIGHT ON SCROLL
     ---------------------------------------------------------------------- */
  const leoSteps = document.querySelectorAll("#leoPipeline .leo-step");
  if (leoSteps.length) {
    const stepIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.index, 10);
          setTimeout(() => entry.target.classList.add("active"), idx * 70);
        }
      });
    }, { threshold: 0.4 });
    leoSteps.forEach((s) => stepIO.observe(s));
  }

  /* ----------------------------------------------------------------------
     COUNTERS
     ---------------------------------------------------------------------- */
  const counterEls = document.querySelectorAll(".stat-value[data-is-number='1']");
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = parseFloat(node.dataset.target);
      const suffix = node.dataset.suffix || "";
      const duration = reduceMotion ? 1 : 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const val = (target * p).toFixed(target % 1 !== 0 ? 2 : 0);
        node.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(node);
    });
  }, { threshold: 0.6 });
  counterEls.forEach((c) => counterIO.observe(c));

  /* ----------------------------------------------------------------------
     GSAP SCROLLTRIGGER — hero parallax + section pin accents (progressive enhancement)
     ---------------------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-content", {
      yPercent: -14,
      opacity: 0.4,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero-avatar", {
      yPercent: -8,
      scale: 0.96,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("#heroCanvas", {
      opacity: 0.15,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  /* ----------------------------------------------------------------------
     PARTICLE SPHERE — shared pseudo-3D point-cloud renderer
     Used for both the hero's persistent AI-core and the LEO orb, so the
     site has one consistent, signature 3D motif instead of two different
     effects. Pure canvas 2D (rotation matrices + simple perspective),
     no WebGL — stays light on mobile.
     ---------------------------------------------------------------------- */
  function fibonacciSphere(count) {
    // evenly distributes `count` points on a unit sphere
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push({
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
      });
    }
    return pts;
  }

  function createParticleSphere(canvas, opts) {
    if (!canvas) return null;
    const o = Object.assign({
      pointCount: 260,
      radiusRatio: 0.26,
      centerXRatio: 0.5,
      centerYRatio: 0.5,
      idleSpeed: 0.0022,
      goldRatio: 0.45,
      focal: 2.4,
      scrollReactive: false,
      mouseReactive: false,
      autoStart: true,
      maxDpr: 2,
    }, opts || {});

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, o.maxDpr);
    const small = window.innerWidth < 640;
    const pointCount = small ? Math.round(o.pointCount * 0.6) : o.pointCount;
    const sphere = fibonacciSphere(pointCount).map((p) => ({
      ...p,
      gold: Math.random() < o.goldRatio,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let w, h, visible = false, started = false, raf;
    let rotY = Math.random() * Math.PI;
    let rotX = 0.35;
    let scrollOffset = 0;
    let targetTiltX = 0, targetTiltY = 0, tiltX = 0, tiltY = 0;

    function resize() {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    }
    resize();
    window.addEventListener("resize", resize);

    if (o.scrollReactive) {
      window.addEventListener("scroll", () => {
        scrollOffset = window.scrollY * 0.0012;
      }, { passive: true });
    }

    if (o.mouseReactive && !isTouch) {
      const hostEl = o.mouseHost || canvas;
      hostEl.addEventListener("mousemove", (e) => {
        const r = hostEl.getBoundingClientRect();
        targetTiltY = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
        targetTiltX = ((e.clientY - r.top) / r.height - 0.5) * -0.6;
      });
      hostEl.addEventListener("mouseleave", () => { targetTiltX = 0; targetTiltY = 0; });
    }

    function drawOnce() {
      ctx.clearRect(0, 0, w, h);
      renderFrame();
    }

    function renderFrame() {
      const cx = w * o.centerXRatio, cy = h * o.centerYRatio;
      const R = Math.min(w, h) * o.radiusRatio;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const projected = sphere.map((p) => {
        // rotate around Y
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y;
        // rotate around X
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        const scale = o.focal / (o.focal + z2);
        return {
          x: cx + x * R * scale,
          y: cy + y2 * R * scale,
          scale,
          z: z2,
          gold: p.gold,
          twinkle: p.twinkle,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const depth = (p.z + 1) / 2; // 0 (back) .. 1 (front)
        const alpha = 0.15 + depth * 0.65;
        const size = (0.6 + depth * 1.6) * dpr;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(212,175,55,${alpha})`
          : `rgba(245,245,245,${alpha * 0.9})`;
        ctx.fill();
      });

      // soft core glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.1);
      grad.addColorStop(0, "rgba(212,175,55,0.10)");
      grad.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }

    function tick() {
      if (!visible) { raf = requestAnimationFrame(tick); return; }
      ctx.clearRect(0, 0, w, h);

      if (!reduceMotion) {
        rotY += o.idleSpeed + scrollOffset * 0.02;
        tiltX += (targetTiltX - tiltX) * 0.06;
        tiltY += (targetTiltY - tiltY) * 0.06;
        rotX = 0.35 + tiltX;
        rotY += tiltY * 0.002;
      }
      renderFrame();

      if (!reduceMotion) raf = requestAnimationFrame(tick);
    }

    function start() {
      if (started) return;
      started = true;
      if (reduceMotion) { drawOnce(); return; }
      tick();
    }

    if (o.autoStart) start();

    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
    }, { threshold: 0.15 }).observe(canvas);

    return { start, canvas };
  }

  /* ----------------------------------------------------------------------
     HERO — persistent AI-core sphere, reacts to scroll + cursor
     ---------------------------------------------------------------------- */
  createParticleSphere(document.getElementById("heroCanvas"), {
    pointCount: 340,
    radiusRatio: window.innerWidth < 1000 ? 0.24 : 0.3,
    centerXRatio: window.innerWidth < 1000 ? 0.5 : 0.72,
    centerYRatio: window.innerWidth < 1000 ? 0.28 : 0.5,
    idleSpeed: 0.0016,
    goldRatio: 0.5,
    scrollReactive: true,
    mouseReactive: true,
    mouseHost: document.querySelector(".hero"),
  });

  /* ----------------------------------------------------------------------
     LEO ORB — same motif, denser + more gold, auto-rotating
     ---------------------------------------------------------------------- */
  createParticleSphere(document.getElementById("leoOrb"), {
    pointCount: 300,
    radiusRatio: 0.34,
    idleSpeed: 0.004,
    goldRatio: 0.65,
    scrollReactive: false,
    mouseReactive: false,
    autoStart: false,
  });

  /* ----------------------------------------------------------------------
     CONTACT ORB — closing bookend, mirrors the hero
     ---------------------------------------------------------------------- */
  createParticleSphere(document.getElementById("contactOrb"), {
    pointCount: 280,
    radiusRatio: 0.32,
    idleSpeed: 0.0018,
    goldRatio: 0.5,
    scrollReactive: false,
    mouseReactive: true,
    mouseHost: document.querySelector(".contact"),
    autoStart: false,
  });

})();
