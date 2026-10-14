/* M.V.P. Accelerator, 15-minute demo (Oct 14, 2026).
   One participant (Jordan, an Athleader) and their manager (a Player-Coach) across a season, shown on the real course
   screens. The course runs in frames from the same site in its review view (open navigation); the demo preloads a
   sample learner (name, Starting Line ratings, five words, Lesson 6 ratings) so the season reads as one story, and
   resets it every time the page opens. Chapter cards join the stops. Timings follow the run of show agreed with
   Melissa and Shari: promise 1, discover 2, condition 3, M.V.P. 2, 90-day plan 2, Pros 1, reinforce 2, measure 2. */
(() => {
  'use strict';
  const CFG = window.DEMO_CONFIG;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- the course modules the demo opens ---------------- */
  const MODS = {
    a0: { track: 'ath', dir: 'M0_Getting_Started', n: 0 }, a1: { track: 'ath', dir: 'M1_Lesson_1', n: 1 },
    a3: { track: 'ath', dir: 'M3_Lesson_3', n: 3 }, a5: { track: 'ath', dir: 'M5_Lesson_5', n: 5 },
    a6: { track: 'ath', dir: 'M6_Lesson_6', n: 6 }, p1: { track: 'pc', dir: 'M1_Lesson_1', n: 1 }
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
  // step kinds: card (a chapter card drawn here), course (a live course screen: module + screen id), pdf (a document page)
  const STOPS = (window.DEMO_STOPS || []).map(s => Object.assign({}, s, { steps: s.steps.map(x => x.pdf === 'SCORECARD' ? Object.assign({}, x, { pdf: SCORECARD }) : x) }));
  const FLAT = []; STOPS.forEach((st, si) => st.steps.forEach((x, k) => FLAT.push(Object.assign({ si, k }, x))));

  /* ---------------- chapter cards (1280 x 720) ---------------- */
  const CARDS = {
    title: () => `<div class="card"><div class="bg" style="background-image:url(assets/stage.jpg)"></div><div class="veil"></div><div class="in">
      <p class="eyebrow">A 15-minute look inside</p><h1>Conditioned to lead when it counts</h1>
      <p class="lead">The M.V.P. Accelerator, powered by Athleadership Arena. One leader and their manager, through a full season.</p>
      <div class="meta"><span>Prepared for <b style="color:#F1E2BC;font-size:20px;margin-left:6px">Avanos</b></span></div></div></div>`,
    season: () => `<div class="card imgcard"><img src="assets/season.png" alt="The season, start to finish: Getting Started and six lessons, both tracks side by side"></div>`,
    squad: () => `<div class="card chapter"><div class="bg" style="background-image:url(assets/faces.jpg)"></div><div class="veil"></div><div class="in">
      <p class="eyebrow">Beyond the screen</p><h2>Squad Meetups</h2>
      <p class="lead">Real-time practice in a real-world setting. High stakes, low risk, on the business situations and personal challenges your leaders actually face.</p>
      <div class="trio"><div><b>Practice</b><span>Run the moments from the course with peers, out loud.</span></div>
      <div><b>Reflection and feedback</b><span>Hear how a response lands, and adjust it.</span></div>
      <div><b>Accountability</b><span>A squad that knows your goals for the season.</span></div></div>
      <span class="tag">Alongside the course</span></div></div>`,
    cohort: () => `<div class="card"><div class="in" style="justify-content:flex-start;padding-top:56px">
      <span class="illus">Illustrative sample · not real data</span>
      <p class="eyebrow">Across a cohort</p><h2 style="font-size:34px">Where the group is growing, pillar by pillar</h2>
      <div class="cohort">${cohortSvg()}<div class="legend">
        <span><i style="background:#5D6B7E"></i>Pre-assessment</span><span><i style="background:#C9A45C"></i>Pulse Check, mid-season</span><span><i style="background:#2E9E6E"></i>Post-assessment</span>
        <span style="margin-top:10px;font-size:14px;color:#9AA6B6">Average self-rating, 1 to 5. Matched by learner ID across the pre-assessment, Pulse Checks and post-assessment. Self-reported.</span></div></div></div></div>`,
    question: () => `<div class="card"><div class="bg" style="background-image:url(assets/ai_celebration_team.jpg)"></div><div class="veil"></div><div class="in">
      <div class="qmark">“</div><p class="question">If your leaders could make measurable progress in one critical growth area over the next 90 days, which area would matter most to your organization?</p></div></div>`,
    end: () => `<div class="card"><div class="bg" style="background-image:url(assets/stage.jpg)"></div><div class="veil"></div><div class="in">
      <p class="eyebrow">Thank you</p><h1>Conditioned to lead when it counts</h1>
      <p class="lead">M.V.P. Accelerator, powered by Athleadership Arena.</p>
      <div class="meta"><img src="assets/lockup.png" alt="M.V.P. Accelerator, powered by Athleadership Arena" style="height:64px"></div></div></div>`
  };
  function cohortSvg() {
    const P = ['Agility', 'Resilience', 'Alignment', 'Wellbeing'], D = [[2.9, 3.4, 3.9], [3.1, 3.5, 4.0], [2.7, 3.3, 3.8], [2.6, 3.0, 3.5]];
    const C = ['#5D6B7E', '#C9A45C', '#2E9E6E'], W = 760, H = 430, L = 50, B = 380, T = 30, y = v => B - (v - 1) / 4 * (B - T);
    let g = '';
    for (let v = 1; v <= 5; v++) g += `<line x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(255,255,255,.12)"/><text x="${L - 14}" y="${y(v) + 5}" fill="#9AA6B6" font-size="15" text-anchor="end">${v}</text>`;
    const gw = (W - L) / 4;
    D.forEach((row, i) => {
      row.forEach((v, j) => { const x = L + i * gw + 30 + j * 46; g += `<rect x="${x}" y="${y(v)}" width="40" height="${B - y(v)}" rx="5" fill="${C[j]}"/><text x="${x + 20}" y="${y(v) - 8}" fill="#fff" font-size="14" font-weight="700" text-anchor="middle">${v.toFixed(1)}</text>`; });
      g += `<text x="${L + i * gw + 99}" y="${B + 30}" fill="#F1E2BC" font-size="17" font-weight="700" text-anchor="middle">${P[i]}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Illustrative chart: average Core 4 self-ratings rise from pre-assessment to mid-season Pulse Check to post-assessment in all four pillars">${g}</svg>`;
  }

  /* ---------------- frames: one per module, kept once loaded ---------------- */
  const frames = {}, framesEl = $('#frames'), cardHost = $('#cardHost'), loading = $('#loading');
  let narration = false;
  function frame(k) {
    if (frames[k]) return frames[k];
    const f = document.createElement('iframe');
    f.title = 'Course screen'; f.setAttribute('allow', 'autoplay; fullscreen');
    const ready = new Promise(res => {
      f.addEventListener('load', () => {
        const t0 = Date.now();
        const wait = () => {
          let cw = null; try { cw = f.contentWindow; } catch (e) { }
          if (cw && cw.__player) { prep(cw); res(cw); } else if (Date.now() - t0 < 15000) setTimeout(wait, 120); else res(null);
        };
        wait();
      });
    });
    f.src = modUrl(k);
    framesEl.appendChild(f);
    return (frames[k] = { el: f, ready });
  }
  function prep(cw) {
    const d = cw.document;
    const b = d.querySelector('#modal:not([hidden]) #modalActions button:last-child'); if (b) b.click();
    const sb = d.querySelector('#sidebar'); if (sb && !sb.classList.contains('collapsed')) { const m = d.querySelector('#btnMenu'); if (m) m.click(); }
    const vo = d.querySelector('#vo'); if (vo) vo.muted = !narration;
    // a presenter clicker sends PageDown/PageUp; pass them up so the demo moves even when the course has the focus
    d.addEventListener('keydown', e => { if (['PageDown', 'PageUp'].includes(e.key) && !e.target.closest('input,textarea,select')) { e.preventDefault(); key(e); } });
  }
  function quiet(cw) { try { cw.document.querySelectorAll('video,audio').forEach(m => { if (!m.paused) m.pause(); }); } catch (e) { } }

  /* ---------------- PDF page (the Scorecard) ---------------- */
  let pdfDoc = null, pdfPage = 1;
  async function pdfCard(src, label) {
    cardHost.innerHTML = `<div class="card pdfcard"><div class="cap">${esc(label)}</div><div class="pg"><canvas id="pdfc" aria-label="${esc(label)}, page"></canvas></div>
      <div class="pnav"><button id="pp" aria-label="Previous page">‹</button><span id="pn"></span><button id="pnx" aria-label="Next page">›</button></div></div>`;
    fit();
    const lib = window.pdfjsLib;
    if (!lib) { $('#pn').textContent = 'The page viewer didn’t load.'; return; }
    lib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';
    try { if (!pdfDoc) pdfDoc = await lib.getDocument({ url: src }).promise; } catch (e) { $('#pn').textContent = 'The Scorecard didn’t load.'; return; }
    const draw = async () => {
      const p = await pdfDoc.getPage(pdfPage), box = $('.pg', cardHost).getBoundingClientRect(), v1 = p.getViewport({ scale: 1 });
      const sc = Math.min(box.width / v1.width, box.height / v1.height) * Math.min(window.devicePixelRatio || 1, 2) * 1.6;
      const vp = p.getViewport({ scale: sc }), c = $('#pdfc'), fitS = Math.min(box.width / v1.width, box.height / v1.height);
      c.width = vp.width; c.height = vp.height;
      c.style.width = Math.floor(v1.width * fitS) + 'px'; c.style.height = Math.floor(v1.height * fitS) + 'px';
      await p.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      $('#pn').textContent = `Page ${pdfPage} of ${pdfDoc.numPages}`;
    };
    $('#pp').addEventListener('click', () => { if (pdfPage > 1) { pdfPage--; draw(); } });
    $('#pnx').addEventListener('click', () => { if (pdfPage < pdfDoc.numPages) { pdfPage++; draw(); } });
    draw();
  }

  /* ---------------- showing a step ---------------- */
  let cur = -1, shownFrame = null, t0 = null, stopT0 = null;
  function fit() { const c = $('.card', cardHost); if (c) c.style.transform = `scale(${$('#stage').clientWidth / 1280})`; }
  async function show(i) {
    if (i < 0 || i >= FLAT.length) return;
    const prev = FLAT[cur], x = FLAT[i]; cur = i;
    if (!t0 && i > 0) t0 = Date.now();
    if (!prev || prev.si !== x.si) stopT0 = Date.now();
    paintChrome();
    if (shownFrame && (!x.course || shownFrame !== frames[x.course])) { shownFrame.ready.then(quiet); shownFrame.el.classList.remove('on'); shownFrame = null; }
    if (x.card || x.pdf) {
      if (x.pdf) await pdfCard(x.pdf, x.label); else { cardHost.innerHTML = CARDS[x.card](); fit(); }
      cardHost.classList.add('on'); loading.hidden = true;
    } else {
      const fr = frame(x.course);
      loading.hidden = false;
      const cw = await fr.ready;
      if (cur !== i) return;
      cardHost.classList.remove('on'); cardHost.innerHTML = '';
      fr.el.classList.add('on'); shownFrame = fr; loading.hidden = true;
      if (cw) {
        const P = cw.__player, idx = P.S.findIndex(s => s.id === x.screen);
        quiet(cw);
        if (idx >= 0 && P.st().pos !== idx) P.go(idx);
        const vo = cw.document.querySelector('#vo'); if (vo) vo.muted = !narration;
        // with the narration off, the presenter talks over the screen: show all of it at once instead of cue by cue
        if (!narration && P.revealAll) setTimeout(() => { try { P.revealAll(); } catch (e) { } }, 350);
      } else loading.hidden = true;
    }
    preload(i + 1); preload(i + 2);
  }
  function preload(i) { const x = FLAT[i]; if (x && x.course) frame(x.course); }

  /* ---------------- chrome: outline, dots, notes, clock ---------------- */
  const stopsEl = $('#stops');
  stopsEl.innerHTML = STOPS.map((s, i) => i === 0 || i === STOPS.length - 1 ? '' : `<li tabindex="0" data-i="${i}" title="${esc(s.title)}"><b>${i}</b><span>${esc(s.title)}</span></li>`).join('');
  stopsEl.addEventListener('click', e => { const li = e.target.closest('li'); if (li) show(FLAT.findIndex(f => f.si === +li.dataset.i)); });
  stopsEl.addEventListener('keydown', e => { if (e.key === 'Enter') { const li = e.target.closest('li'); if (li) show(FLAT.findIndex(f => f.si === +li.dataset.i)); } });
  function paintChrome() {
    const x = FLAT[cur], st = STOPS[x.si];
    stopsEl.querySelectorAll('li').forEach(li => { const n = +li.dataset.i; li.classList.toggle('on', n === x.si); li.classList.toggle('done', n < x.si); });
    $('#stopName').textContent = `${x.si > 0 && x.si < STOPS.length - 1 ? x.si + '. ' : ''}${st.title} · ${x.label}`;
    $('#dots').innerHTML = st.steps.length > 1 ? st.steps.map((s, k) => `<i class="${k === x.k ? 'on' : ''}"></i>`).join('') : '';
    $('#back').disabled = cur === 0;
    const nx = FLAT[cur + 1]; $('#next').disabled = !nx; $('#nextLbl').textContent = nx ? 'Next: ' + nx.label : 'End';
    $('#notesText').textContent = x.say || ''; $('#notesDo').textContent = x.do || '';
    $('#notesTime').textContent = st.min ? `Plan: ${st.min} min` : '';
  }
  const mmss = ms => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  setInterval(() => {
    if (!t0) return;
    const el = Date.now() - t0, c = $('#clock'); c.innerHTML = `${mmss(el)} <small>/ 15:00</small>`; c.classList.toggle('over', el > 15 * 60000);
    const st = STOPS[FLAT[cur].si]; if (st.min && stopT0) $('#notesTime').textContent = `Plan: ${st.min} min · this stop ${mmss(Date.now() - stopT0)}`;
  }, 500);

  /* ---------------- controls ---------------- */
  const go = d => show(cur + d);
  $('#next').addEventListener('click', () => go(1));
  $('#back').addEventListener('click', () => go(-1));
  const notes = $('#notes'), bN = $('#btnNotes');
  const toggleNotes = () => { notes.hidden = !notes.hidden; bN.setAttribute('aria-pressed', !notes.hidden); };
  bN.addEventListener('click', toggleNotes);
  const bM = $('#btnNarr');
  const toggleNarr = () => {
    narration = !narration; bM.setAttribute('aria-pressed', narration); bM.textContent = narration ? 'Narration on' : 'Narration off';
    Object.values(frames).forEach(f => f.ready.then(cw => { if (cw) { const vo = cw.document.querySelector('#vo'); if (vo) vo.muted = !narration; } }));
  };
  bM.addEventListener('click', toggleNarr);
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
  }
  document.addEventListener('keydown', key);
  window.addEventListener('resize', fit);

  seed();
  show(0);
  window.__demo = { show, FLAT, frames, get cur() { return cur; } };
})();
