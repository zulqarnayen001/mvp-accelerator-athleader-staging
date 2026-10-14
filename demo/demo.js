/* M.V.P. Accelerator, 15-minute demo (v2, Oct 14, 2026).
   One participant (Jordan, an Athleader) and their manager (a Player-Coach) across a season, shown on the real course
   screens. The course runs in frames from the same site in its review view (open navigation). Inside each frame the
   demo hides the course's own bars, menu and controls and lets the slide fill the frame, so the room sees one set of
   controls; it stops any narration or video that isn't on the screen in front of the room. A sample learner (name,
   Starting Line ratings, five words, Lesson 6 ratings, their why) is preloaded and reset every time the page opens.
   The stops are in stops.js. */
(() => {
  'use strict';
  const CFG = window.DEMO_CONFIG;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- the course modules the demo opens ---------------- */
  const MODS = {
    a0: { track: 'ath', dir: 'M0_Getting_Started', n: 0, lens: 'Jordan · Athleader · Getting Started' },
    a1: { track: 'ath', dir: 'M1_Lesson_1', n: 1, lens: 'Jordan · Athleader · Lesson 1' },
    a3: { track: 'ath', dir: 'M3_Lesson_3', n: 3, lens: 'Jordan · Athleader · Lesson 3' },
    a5: { track: 'ath', dir: 'M5_Lesson_5', n: 5, lens: 'Jordan · Athleader · Lesson 5' },
    a6: { track: 'ath', dir: 'M6_Lesson_6', n: 6, lens: 'Jordan · Athleader · Lesson 6' },
    p1: { track: 'pc', dir: 'M1_Lesson_1', n: 1, lens: 'Jordan’s manager · Player-Coach · Lesson 1' }
  };
  const TRACKNAME = { ath: 'athleader', pc: 'playercoach' };
  const modUrl = k => CFG[MODS[k].track] + MODS[k].dir + '/' + encodeURIComponent(CFG.view);
  const SCORECARD = CFG.ath + 'M1_Lesson_1/resources/90-Day_Way_Core_4_Scorecard_Example.pdf';

  /* ---------------- the demo learner, reset on every load ---------------- */
  const WHO = { id: 'DEMO-0001', first: 'Jordan', last: 'Lee' };
  const BASE = { Agility: 2, Resilience: 3, Alignment: 2, Wellbeing: 2 };     // Lesson 1, Your Starting Line
  const TODAY = { Agility: 4, Resilience: 4, Alignment: 4, Wellbeing: 3 };    // Lesson 6, Then and Now
  const WHY = 'My team takes its cue from me. When I stay steady under pressure, they do too, and I want to be home for dinner while we hit our numbers.';
  function seed() {
    try {
      Object.keys(localStorage).filter(k => /^mvp_accelerator_(athleader|playercoach)_v5_/.test(k) && /_review$/.test(k)).forEach(k => localStorage.removeItem(k));
      ['athleader', 'playercoach'].forEach(t => localStorage.setItem(`mvp_accelerator_${t}_v5_carry_review`,
        JSON.stringify({ fivewords: 'Slow down. See it. Choose.', base: BASE, answers: {}, drills: {}, patterns: {}, gates: { pre: true } })));
      Object.values(MODS).forEach(m => {
        const st = { learner: WHO, vol: 0.9, cc: false };   // captions off: the presenter is talking
        if (m.track === 'ath' && m.n === 6) { st.today = TODAY; st.why = WHY; }
        localStorage.setItem(`mvp_accelerator_${TRACKNAME[m.track]}_v5_m${m.n}_review`, JSON.stringify(st));
      });
    } catch (e) { /* storage blocked: the course screens still open, without the sample learner */ }
  }

  /* ---------------- the stops ---------------- */
  const STOPS = (window.DEMO_STOPS || []).map(s => Object.assign({}, s, { steps: s.steps.map(x => x.pdf === 'SCORECARD' ? Object.assign({}, x, { pdf: SCORECARD }) : x) }));
  const FLAT = []; STOPS.forEach((st, si) => st.steps.forEach((x, k) => FLAT.push(Object.assign({ si, k }, x))));
  const TOTAL = STOPS.reduce((a, s) => a + s.min, 0);

  /* ---------------- chapter cards (1280 x 720) ---------------- */
  const SEASON = [
    ['GS', 'Getting started', 'About 20 min', null, null],
    ['1', 'Lesson 1', 'About 35 min', 'Suit Up & Enter the Arena', 'Suit Up: Your Leadership M.V.P.'],
    ['2', 'Lesson 2', 'About 40 min', 'Pre-Season Conditioning', 'The Leader’s Scouting Report'],
    ['3', 'Lesson 3', 'About 40 min', 'Game Plan: Define Your M.V.P.', 'The 90-Day Way Game Plan'],
    ['4', 'Lesson 4', 'About 40 min', 'Activate Your M.V.P.', 'Activate Your M.V.P. Under Pressure'],
    ['5', 'Lesson 5', 'About 40 min', 'Lead the 90-Day Way', 'Play the Season: Sustainable Performance'],
    ['6', 'Lesson 6', 'About 40 min', 'Final Whistle & Victory Lap', 'The Victory Lap and the Next Season']
  ];
  function seasonCard() {
    const D = i => `style="--d:${(0.35 + i * 0.12).toFixed(2)}s"`;
    const stops = SEASON.map((s, i) => `<div class="stop pop${s[0] === 'GS' ? ' gs' : ''}" ${D(i)}><span class="dot">${s[0]}</span><b>${s[1]}</b><small>${s[2]}</small></div>`).join('');
    const nw = t => esc(t).replace(/90-Day/g, '<span class="nw">90-Day</span>');
    const ath = SEASON.slice(1).map((s, i) => `<div class="cell ath rise" ${D(i + 1.5)}><span>${nw(s[3])}</span></div>`).join('');
    const pc = SEASON.slice(1).map((s, i) => `<div class="cell pc rise" ${D(i + 2)}><span>${nw(s[4])}</span></div>`).join('');
    const meas = ['Pre-assessment', 'Pulse Check', 'Pulse Check', 'Pulse Check', 'Pulse Check', 'Pulse Check', 'Pulse Check, post-assessment'].map((t, i) => `<div class="meas rise" style="--d:${(1.9 + i * 0.05).toFixed(2)}s">${t}</div>`).join('');
    return `<div class="card season"><div class="in">
      <p class="eyebrow rise" style="--d:.05s">The season</p><h2 class="rise" style="--d:.15s">One season, two tracks</h2>
      <p class="sub rise" style="--d:.25s">Getting Started, then six lessons, taken in order. One core rep at work after every lesson.</p>
      <div class="sgrid" id="sgrid">
        <div></div>${stops}
        <div class="lab ath rise" style="--d:.9s">Athleader</div><div class="cell gs rise" style="--d:1s"><b>Both tracks</b>Welcome, the sponsor’s message, a weekly hour, the pre-assessment</div>${ath}
        <div class="lab pc rise" style="--d:1.05s">Player-Coach</div>${pc}
        <div class="lab rise" style="--d:1.4s">Together</div><div></div><div class="meet rise" style="--d:1.5s">The Starting Line</div><div class="between rise" style="--d:1.6s">each on their own track, coached by the other</div><div class="meet rise" style="--d:1.7s">The 180</div>
        <div class="lab rise" style="--d:1.85s">Measured</div>${meas}
        <div class="lab rise" style="--d:2.1s">At work</div><div></div><div class="rep rise" style="--d:2.2s"><b>After every lesson:</b> one core rep at work, in the Playbook and on the 90-Day Way Scorecard</div>
      </div></div></div>`;
  }
  const CARDS = {
    title: () => `<div class="card"><div class="bg" style="background-image:url(assets/stage.jpg)"></div><div class="veil"></div><div class="in">
      <p class="eyebrow rise" style="--d:.15s">A 15-minute look inside</p><h1 class="rise" style="--d:.3s">Conditioned to lead when it counts</h1>
      <p class="lead rise" style="--d:.55s">The M.V.P. Accelerator, powered by Athleadership Arena. One leader and their manager, through a full season.</p>
      <div class="meta rise" style="--d:.8s">Prepared for <b>Avanos</b></div></div></div>`,
    // the cold open: the course's own animated opener, then the line it stands for
    opener: () => `<div class="card hook opener"><video class="ov" src="assets/opener.mp4" playsinline preload="auto"></video>
      <div class="bg" style="background-image:url(assets/hook.jpg)"></div><div class="veil"></div><div class="in">
      <p class="eyebrow rise" style="--d:.1s">Why conditioning</p><div class="rule grow" style="--d:.25s"></div>
      <p class="big rise" style="--d:.35s">Under pressure, leaders don’t rise to what they know. <em>They fall back on what they’ve practiced.</em></p>
      <p class="lead rise" style="--d:1.1s">So we condition leaders the way athletes train: real moments, deliberate reps and progress you can measure.</p></div></div>`,
    season: seasonCard,
    r180: () => `<div class="card r180"><div class="in">
      <p class="eyebrow rise" style="--d:.05s">End of the season</p><h2 class="rise" style="--d:.15s">The 180: two views of one season</h2>
      <div class="pair">
        <figure class="side ath rise" style="--d:.4s"><div class="ph" style="background-image:url(assets/r180_ath.jpg)"></div>
          <figcaption><span class="who"><i></i>Jordan · Athleader</span><b>Your view of your Player-Coach</b><span>Their view of your growth, and yours</span></figcaption></figure>
        <div class="hub pop" style="--d:.95s"><svg viewBox="0 0 120 120" aria-hidden="true"><path class="arc a1" d="M22 52 A40 40 0 0 1 98 52"/><path class="arc a2" d="M98 68 A40 40 0 0 1 22 68"/><path class="tip" d="M92 42 L99 54 L106 43"/><path class="tip" d="M28 78 L21 66 L14 77"/></svg><span>180</span></div>
        <figure class="side pc rise" style="--d:.6s"><div class="ph" style="background-image:url(assets/r180_pc.jpg)"></div>
          <figcaption><span class="who"><i></i>Jordan’s manager · Player-Coach</span><b>Your view of your Athleader</b><span>Your view of their growth, and theirs of you</span></figcaption></figure>
      </div>
      <p class="fine rise" style="--d:1.25s">Just before it, each retakes the assessment from the start of the season. A Growth Guide comes with the results.</p></div></div>`,
    squad: () => `<div class="card"><div class="bg" style="background-image:url(assets/faces.jpg)"></div><div class="veil"></div><div class="in">
      <p class="eyebrow rise" style="--d:.1s">Beyond the screen</p><h2 class="rise" style="--d:.2s">Squad Meetups</h2>
      <p class="lead rise" style="--d:.35s">Real-time practice in a real-world setting. High stakes, low risk, on the business situations and personal challenges your leaders actually face.</p>
      <div class="trio"><div class="rise" style="--d:.6s"><b>Practice</b><span>Run the moments from the course with peers, out loud.</span></div>
      <div class="rise" style="--d:.75s"><b>Reflection and feedback</b><span>Hear how a response lands, then adjust it.</span></div>
      <div class="rise" style="--d:.9s"><b>Accountability</b><span>A squad that knows your goals for the season.</span></div></div>
      <span class="tag rise" style="--d:1.1s">Alongside the course</span></div></div>`,
    cohort: () => `<div class="card cohortcard"><div class="in">
      <span class="illus">Illustrative sample · not real data</span>
      <p class="eyebrow rise" style="--d:.1s">Across a cohort</p><h2 class="rise" style="--d:.2s;font-size:36px">Where the group is growing, pillar by pillar</h2>
      <div class="cohort">${cohortSvg()}<div class="legend">
        <span><i style="background:#5D6B7E"></i>Pre-assessment</span><span><i style="background:#C9A45C"></i>Pulse Check, mid-season</span><span><i style="background:#2E9E6E"></i>Post-assessment</span>
        <span style="margin-top:10px;font-size:14px;color:#8E9AAB">Average self-rating, 1 to 5, matched by learner ID. Self-reported.</span></div></div></div></div>`,
    recap: () => `<div class="card"><div class="in">
      <p class="eyebrow rise" style="--d:.1s">In fifteen minutes</p><h2 class="rise" style="--d:.2s">What you just saw</h2>
      <div class="trio">
        <div class="rise" style="--d:.45s"><span class="n">1</span><b>How your leaders experience it</b><span>A season of real moments, decisions and drills, with their own M.V.P. and a 90-day plan.</span></div>
        <div class="rise" style="--d:.65s"><span class="n">2</span><b>How it sticks</b><span>A core rep at work after every lesson, a manager coaching the same season, a squad of peers.</span></div>
        <div class="rise" style="--d:.85s"><span class="n">3</span><b>How you see progress</b><span>A starting line, a Pulse Check every lesson, then and now, and a view across the cohort.</span></div></div></div></div>`,
    question: () => `<div class="card"><div class="bg" style="background-image:url(assets/ai_celebration_team.jpg)"></div><div class="veil"></div><div class="in">
      <div class="qmark rise" style="--d:.1s">“</div><p class="question rise" style="--d:.3s">If your leaders could make measurable progress in one critical growth area over the next 90 days, which area would matter most to your organization?</p></div></div>`,
    end: () => `<div class="card"><div class="bg" style="background-image:url(assets/stage.jpg)"></div><div class="veil"></div><div class="in">
      <p class="eyebrow rise" style="--d:.1s">Thank you</p><h1 class="rise" style="--d:.25s">Conditioned to lead when it counts</h1>
      <p class="lead rise" style="--d:.45s">M.V.P. Accelerator, powered by Athleadership Arena.</p>
      <div class="meta rise" style="--d:.65s"><img src="assets/lockup_white.png" alt="M.V.P. Accelerator, powered by Athleadership Arena" style="height:58px"></div></div></div>`
  };
  function cohortSvg() {
    const P = ['Agility', 'Resilience', 'Alignment', 'Wellbeing'], D = [[2.9, 3.4, 3.9], [3.1, 3.5, 4.0], [2.7, 3.3, 3.8], [2.6, 3.0, 3.5]];
    const C = ['#5D6B7E', '#C9A45C', '#2E9E6E'], W = 760, H = 430, L = 50, B = 380, T = 30, y = v => B - (v - 1) / 4 * (B - T);
    let g = '';
    for (let v = 1; v <= 5; v++) g += `<line x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(255,255,255,.1)"/><text x="${L - 14}" y="${y(v) + 5}" fill="#8E9AAB" font-size="15" text-anchor="end">${v}</text>`;
    const gw = (W - L) / 4;
    D.forEach((row, i) => {
      row.forEach((v, j) => { const x = L + i * gw + 30 + j * 46, dl = (0.5 + j * 0.35 + i * 0.08).toFixed(2); g += `<rect class="bar-g" style="--d:${dl}s" x="${x}" y="${y(v)}" width="40" height="${B - y(v)}" rx="5" fill="${C[j]}"/><text class="lbl-g" style="--d:${(+dl + 0.45).toFixed(2)}s" x="${x + 20}" y="${y(v) - 8}" fill="#fff" font-size="14" font-weight="700" text-anchor="middle">${v.toFixed(1)}</text>`; });
      g += `<text x="${L + i * gw + 99}" y="${B + 30}" fill="#F1E2BC" font-size="17" font-weight="700" text-anchor="middle">${P[i]}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Illustrative chart: average Core 4 self-ratings rise from pre-assessment to mid-season Pulse Check to post-assessment in all four pillars">${g}</svg>`;
  }
  // the gold line through the season's stops, measured once the card is laid out
  function seasonTrack() {
    const g = $('#sgrid', cardHost); if (!g) return;
    const dots = g.querySelectorAll('.stop .dot'); if (dots.length < 2) return;
    const gr = g.getBoundingClientRect(), sc = gr.width / g.offsetWidth || 1;
    const a = dots[0].getBoundingClientRect(), b = dots[dots.length - 1].getBoundingClientRect();
    const t = document.createElement('div'); t.className = 'track draw';
    t.style.left = ((a.left + a.width / 2 - gr.left) / sc) + 'px'; t.style.width = ((b.left - a.left) / sc) + 'px';
    t.style.top = ((a.top + a.height / 2 - gr.top) / sc - 1) + 'px';
    g.appendChild(t);
  }

  /* ---------------- frames: one per module, kept once loaded ---------------- */
  const frames = {}, framesEl = $('#frames'), cardHost = $('#cardHost'), loading = $('#loading'), lens = $('#lens');
  let narration = false, activeKey = null;
  const FRAME_CSS = `.topbar,.bottombar,.sidebar,.transcript,.cc-bar,.skip,.zoom-sizer,.gate-msg{display:none!important}
    .player{min-height:0!important}.stage-wrap{background:#0C1A2C!important}.stage{box-shadow:none!important}`;
  function frame(k) {
    if (frames[k]) return frames[k];
    const f = document.createElement('iframe');
    f.title = 'Course screen'; f.setAttribute('allow', 'autoplay; fullscreen'); f.tabIndex = -1;
    const ready = new Promise(res => {
      f.addEventListener('load', () => {
        const t0 = Date.now();
        const wait = () => {
          let cw = null; try { cw = f.contentWindow; } catch (e) { }
          if (cw && cw.__player) { prep(k, cw); res(cw); } else if (Date.now() - t0 < 15000) setTimeout(wait, 100); else res(null);
        };
        wait();
      });
    });
    f.src = modUrl(k);
    framesEl.appendChild(f);
    return (frames[k] = { el: f, ready, key: k });
  }
  function prep(k, cw) {
    const d = cw.document;
    const s = d.createElement('style'); s.textContent = FRAME_CSS; d.head.appendChild(s);
    const b = d.querySelector('#modal:not([hidden]) #modalActions button:last-child'); if (b) b.click();
    // the slide fills the frame: no room is kept for the hidden bars
    const stage = d.getElementById('stage'), wrap = d.getElementById('stageWrap');
    const refit = () => { if (!stage || !wrap) return; const sc = Math.min(wrap.clientWidth / 1280, wrap.clientHeight / 720); stage.style.transformOrigin = ''; stage.style.left = ''; stage.style.top = ''; stage.style.transform = `translate(-50%,-50%) scale(${sc})`; };
    cw.addEventListener('resize', () => setTimeout(refit, 0)); cw.dispatchEvent(new Event('resize')); setTimeout(refit, 60);
    // one voice at a time: nothing plays in a frame that isn't on screen, and the narration only when it's switched on
    d.addEventListener('play', e => { const m = e.target; if (activeKey !== k || (m.id === 'vo' && !narration)) { try { m.pause(); } catch (x) { } } }, true);
    const vo = d.querySelector('#vo'); if (vo) { vo.muted = !narration; if (!narration) vo.pause(); }
    // a presenter clicker or the arrow keys move the demo even when the course has the focus
    cw.addEventListener('keydown', e => {
      if (e.target.closest && e.target.closest('input,textarea,select,[contenteditable]')) return;
      if (e.key === ' ' && e.target.closest && e.target.closest('button,a,[role=button],label')) return;
      if (['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', ' ', 'Home', 'n', 'N', 'f', 'F', 'm', 'M'].includes(e.key)) { e.preventDefault(); e.stopImmediatePropagation(); key(e); }
    }, true);
    d.addEventListener('mousemove', wake, { passive: true });
  }
  function quiet(cw) { try { cw.document.querySelectorAll('video,audio').forEach(m => { if (!m.paused) m.pause(); }); } catch (e) { } }

  /* ---------------- the Scorecard (a document page) ---------------- */
  let pdfDoc = null, pdfPage = 1;
  async function pdfCard(src, label, start) {
    if (start && !pdfCard.started) { pdfPage = start; pdfCard.started = true; }
    cardHost.innerHTML = `<div class="card pdfcard"><div class="cap">${esc(label)}</div><div class="pg"><canvas id="pdfc" aria-label="${esc(label)}"></canvas></div>
      <div class="pnav"><button id="pp" aria-label="Previous page">‹</button><span id="pn">Loading…</span><button id="pnx" aria-label="Next page">›</button></div></div>`;
    fit();
    const lib = window.pdfjsLib;
    if (!lib) { $('#pn').textContent = 'The page viewer didn’t load.'; return; }
    lib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';
    try {
      if (!pdfDoc) {
        const r = await fetch(src); if (!r.ok) throw new Error(r.status);
        pdfDoc = await lib.getDocument({ data: new Uint8Array(await r.arrayBuffer()), disableRange: true, disableStream: true }).promise;
      }
    } catch (e) { $('#pn').textContent = 'The Scorecard didn’t load.'; return; }
    const draw = async () => {
      const p = await pdfDoc.getPage(pdfPage), box = $('.pg', cardHost).getBoundingClientRect(), v1 = p.getViewport({ scale: 1 });
      const fitS = Math.min(box.width / v1.width, box.height / v1.height), sc = fitS * Math.min(window.devicePixelRatio || 1, 2) * 1.6;
      const vp = p.getViewport({ scale: sc }), c = $('#pdfc');
      c.width = vp.width; c.height = vp.height;
      c.style.width = Math.floor(v1.width * fitS) + 'px'; c.style.height = Math.floor(v1.height * fitS) + 'px';
      await p.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      $('#pn').textContent = `Page ${pdfPage} of ${pdfDoc.numPages}`;
    };
    $('#pp').addEventListener('click', () => { if (pdfPage > 1) { pdfPage--; draw(); } });
    $('#pnx').addEventListener('click', () => { if (pdfPage < pdfDoc.numPages) { pdfPage++; draw(); } });
    await draw();
  }

  // the opener plays once with sound (the presenter's click allows it), then settles into the line it stands for
  function coldOpen() {
    const c = $('.opener', cardHost), v = c && $('video', c);
    if (!c) return;
    const done = () => c.classList.add('done');
    if (!v) return done();
    v.addEventListener('ended', done, { once: true });
    v.addEventListener('error', done, { once: true });
    const p = v.play(); if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(done); });
    setTimeout(() => { if (!c.classList.contains('done') && v.paused && v.currentTime === 0) done(); }, 1500);
  }
  // a chapter title as each stop begins: in, a moment, out
  const chapterEl = document.createElement('div'); chapterEl.className = 'chapter-toast'; $('#stage').appendChild(chapterEl);
  let chapterT = null;
  function chapter(si) {
    const st = STOPS[si]; if (!st.short) return;
    const n = STOPS.slice(0, si + 1).filter(s => s.short).length;
    chapterEl.innerHTML = `<span>${String(n).padStart(2, '0')}</span>${esc(st.title)}`;
    chapterEl.classList.remove('show'); void chapterEl.offsetWidth; chapterEl.classList.add('show');
    clearTimeout(chapterT); chapterT = setTimeout(() => chapterEl.classList.remove('show'), 2600);
  }

  /* ---------------- showing a step ---------------- */
  let cur = -1, shownFrame = null, t0 = null, stopT0 = null, loadTimer = null;
  function fit() { const c = $('.card', cardHost); if (c) c.style.transform = `scale(${$('#stage').clientWidth / 1280})`; }
  async function show(i) {
    if (i < 0 || i >= FLAT.length) return;
    const prev = FLAT[cur], x = FLAT[i]; cur = i;
    if (!t0 && i > 0) t0 = Date.now();
    const newStop = !prev || prev.si !== x.si;
    if (newStop) stopT0 = Date.now();
    paintChrome();
    if (newStop && (!prev || x.si > prev.si)) chapter(x.si);
    clearTimeout(loadTimer); loading.hidden = true;
    if (x.card || x.pdf) {
      activeKey = null;
      if (shownFrame) { shownFrame.ready.then(quiet); shownFrame.el.classList.remove('on'); shownFrame = null; }
      lens.hidden = true;
      if (x.pdf) await pdfCard(x.pdf, x.label, x.page);
      else { cardHost.innerHTML = CARDS[x.card](); fit(); if (x.card === 'season') requestAnimationFrame(seasonTrack); if (x.card === 'opener') coldOpen(); }
      cardHost.classList.add('on');
    } else {
      const fr = frame(x.course);
      activeKey = x.course;
      cardHost.querySelectorAll('video,audio').forEach(m => { try { m.pause(); } catch (e) { } });
      if (shownFrame && shownFrame !== fr) { shownFrame.ready.then(quiet); shownFrame.el.classList.remove('on'); }
      loadTimer = setTimeout(() => { loading.hidden = false; }, 250);
      const cw = await fr.ready;
      clearTimeout(loadTimer); loading.hidden = true;
      if (cur !== i) return;
      if (cw) {
        const P = cw.__player, idx = P.S.findIndex(s => s.id === x.screen);
        quiet(cw);
        if (idx >= 0 && P.st().pos !== idx) P.go(idx);
        const vo = cw.document.querySelector('#vo'); if (vo) { vo.muted = !narration; if (!narration) vo.pause(); }
        // with the narration off, the presenter talks over the screen: show all of it at once, not cue by cue
        if (!narration && P.revealAll) setTimeout(() => { try { P.revealAll(); } catch (e) { } }, 300);
      }
      fr.el.classList.add('on'); shownFrame = fr;
      cardHost.classList.remove('on'); cardHost.querySelectorAll('video,audio').forEach(m => { try { m.pause(); } catch (e) { } });
      lens.className = 'lens' + (MODS[x.course].track === 'pc' ? ' pc' : ''); lens.innerHTML = `<i></i>${esc(MODS[x.course].lens)}<span class="mini" aria-hidden="true">${[0, 1, 2, 3, 4, 5, 6].map(j => `<b class="${j < MODS[x.course].n ? 'past' : j === MODS[x.course].n ? 'now' : ''}"></b>`).join('')}</span>`; lens.hidden = false;
    }
    preload(i + 1); preload(i + 2);
  }
  function preload(i) { const x = FLAT[i]; if (x && x.course) frame(x.course); }

  /* ---------------- chrome: outline, dots, notes, clock ---------------- */
  const stopsEl = $('#stops');
  stopsEl.innerHTML = STOPS.map((s, i) => s.short ? `<li tabindex="0" data-i="${i}">${esc(s.short)}</li>` : '').join('');
  const jump = li => { if (li) show(FLAT.findIndex(f => f.si === +li.dataset.i)); };
  stopsEl.addEventListener('click', e => jump(e.target.closest('li')));
  stopsEl.addEventListener('keydown', e => { if (e.key === 'Enter') jump(e.target.closest('li')); });
  function paintChrome() {
    const x = FLAT[cur], st = STOPS[x.si];
    stopsEl.querySelectorAll('li').forEach(li => { const n = +li.dataset.i; li.classList.toggle('on', n === x.si); li.classList.toggle('done', n < x.si); });
    $('#stopName').innerHTML = st.short ? `<b>${esc(st.title)}</b> · ${esc(x.label)}` : `<b>${esc(x.label)}</b>`;
    $('#dots').innerHTML = st.steps.length > 1 ? st.steps.map((s, k) => `<i class="${k === x.k ? 'on' : ''}"></i>`).join('') : '';
    $('#back').disabled = cur === 0;
    const nx = FLAT[cur + 1]; $('#next').disabled = !nx; $('#nextLbl').textContent = cur === 0 ? 'Start' : (nx ? 'Next' : 'End');
    $('#notesTitle').textContent = x.label; $('#notesText').textContent = x.say || ''; $('#notesDo').textContent = x.do || '';
    tick();
  }
  const mmss = ms => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  function tick() {
    const x = FLAT[cur]; if (!x) return; const st = STOPS[x.si];
    const parts = [];
    if (st.min && stopT0) parts.push(`This stop ${mmss(Date.now() - stopT0)} of ${st.min} min`);
    if (t0) parts.push(`Total ${mmss(Date.now() - t0)} / ${TOTAL}:00`);
    $('#notesTime').textContent = parts.join(' · ');
  }
  setInterval(tick, 1000);

  /* ---------------- full screen: the bars step aside until the mouse moves ---------------- */
  let idleT = null;
  function wake() { document.body.classList.remove('idle'); clearTimeout(idleT); if (document.fullscreenElement) idleT = setTimeout(() => { if (notes.hidden) document.body.classList.add('idle'); }, 2500); }
  document.addEventListener('mousemove', wake, { passive: true });
  document.addEventListener('fullscreenchange', () => { document.body.classList.toggle('fs', !!document.fullscreenElement); setTimeout(() => { fit(); Object.values(frames).forEach(f => f.ready.then(cw => { if (cw) cw.dispatchEvent(new Event('resize')); })); }, 120); wake(); });

  /* ---------------- controls ---------------- */
  const go = d => show(cur + d);
  $('#next').addEventListener('click', () => go(1));
  $('#back').addEventListener('click', () => go(-1));
  const notes = $('#notes'), bN = $('#btnNotes');
  const toggleNotes = () => { notes.hidden = !notes.hidden; bN.setAttribute('aria-pressed', !notes.hidden); wake(); };
  bN.addEventListener('click', toggleNotes);
  const toggleNarr = () => {
    narration = !narration;
    $('.notes-keys').textContent = `Right arrow or clicker: next · Left: back · F: full screen · M: course narration (${narration ? 'on' : 'off'})`;
    Object.values(frames).forEach(f => f.ready.then(cw => { if (!cw) return; const vo = cw.document.querySelector('#vo'); if (vo) { vo.muted = !narration; if (!narration) vo.pause(); } }));
  };
  const full = () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(() => { }); };
  $('#btnFull').addEventListener('click', full);
  function key(e) {
    if (e.target && e.target.closest && e.target.closest('input,textarea,select')) return;
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); }
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
    else if (e.key === 'n' || e.key === 'N') toggleNotes();
    else if (e.key === 'm' || e.key === 'M') toggleNarr();
    else if (e.key === 'f' || e.key === 'F') full();
    else if (e.key === 'Home') show(0);
    wake();
  }
  document.addEventListener('keydown', key);
  window.addEventListener('resize', () => { fit(); if (FLAT[cur] && FLAT[cur].pdf) pdfCard(FLAT[cur].pdf, FLAT[cur].label); });

  seed();
  show(0);
  window.__demo = { show, FLAT, frames, get cur() { return cur; } };
})();
