// ============================================================
// THE NEURODIVERGENT BRAIN — Assessment Results Dashboard v2.1
// Full results rendering with radar chart, score cards, flags
// ============================================================

function renderNDAResults() {
  const r = ndaState.results;
  if (!r) return '<div class="text-center py-20 text-steel-blue">No results available. <button onclick="ndaReset()" class="underline">Start over</button></div>';

  const top5 = r.topProfiles.slice(0, 5);
  const primary = r.topProfiles[0];
  const secondary = r.topProfiles[1];

  return `
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-10" id="nda-results-root">

    <!-- Top action bar -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display font-bold text-2xl text-warm-white">Your Neurotype Profile</h2>
      <div class="flex gap-2">
        <button onclick="ndaReset()" class="px-4 py-2 text-sm rounded-lg border border-light-navy/50 text-steel-blue hover:text-warm-white transition-all">
          <i class="fas fa-redo mr-1"></i>Retake
        </button>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="bg-mid-navy/40 border border-light-navy/40 rounded-xl p-4 mb-5 text-xs text-steel-blue leading-relaxed">
      <span class="font-semibold text-warm-white">Important: </span>
      This assessment is a self-awareness and educational screening tool only. It is NOT a clinical diagnosis. These results reflect self-reported tendencies intended to support personal insight and professional conversations. Only a licensed psychologist, psychiatrist, or neuropsychologist can provide a formal evaluation.
    </div>

    ${renderValidityNotice(r)}
    ${renderStateLoadNotice(r)}

    <!-- Narrative summary -->
    <div class="bg-mid-navy/60 border rounded-2xl p-6 mb-6" style="border-color:${primary.bandColor}40">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${primary.bandColor}18">
          <i class="fas fa-file-alt text-sm" style="color:${primary.bandColor}"></i>
        </div>
        <h3 class="font-display font-semibold text-warm-white">Your Profile Summary</h3>
      </div>
      <p class="text-steel-blue leading-relaxed text-sm">${r.narrativeSummary}</p>
    </div>

    <!-- PRIMARY: Radar chart -->
    ${renderNDARadar(r)}

    <!-- Score band legend -->
    ${renderBandLegend()}

    <!-- Top profiles highlight -->
    ${renderTopProfilesHighlight(r, top5)}

    <!-- All neurotype cards -->
    ${renderNDAProfileCards(r)}

    <!-- Flags -->
    ${renderNDAFlags(r)}

    <!-- Domain bar chart -->
    ${renderDomainBars(r)}

    <!-- What to do next -->
    ${renderNextSteps()}

    <!-- Bottom action bar -->
    <div class="flex flex-wrap gap-3 justify-center mt-8 pt-6 border-t border-light-navy/30">
      <button onclick="ndaReset()" class="px-6 py-2.5 rounded-lg border border-light-navy/50 text-steel-blue text-sm hover:text-warm-white transition-all">
        <i class="fas fa-redo mr-2"></i>Retake Assessment
      </button>
      <button onclick="navigateTo('explorer')" class="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90" style="background:#a20927">
        <i class="fas fa-compass mr-2"></i>Explore Brain Pairs
      </button>
    </div>
  </section>`;
}

// ── VALIDITY NOTICE ───────────────────────────────────────────
function renderValidityNotice(r) {
  if (r.validityStatus === 'VALID') return '';
  if (r.validityStatus === 'CAUTION') return `
    <div class="rounded-xl p-4 mb-5 text-sm border-l-4" style="background:#FFFBEB18;border-color:#F59E0B">
      <p class="font-semibold text-warm-white mb-1"><i class="fas fa-exclamation-triangle mr-2" style="color:#F59E0B"></i>Response Consistency Notice</p>
      <p class="text-steel-blue/80">Our consistency checks detected some variation that may slightly reduce precision. Consider retaking in a quieter moment for greater accuracy.</p>
    </div>`;
  return `
    <div class="rounded-xl p-4 mb-5 text-sm border-l-4" style="background:#FFF7ED18;border-color:#EA580C">
      <p class="font-semibold text-warm-white mb-1"><i class="fas fa-exclamation-circle mr-2" style="color:#EA580C"></i>Response Consistency Alert</p>
      <p class="text-steel-blue/80">Some patterns suggest these results may not fully reflect your typical experience. We're showing your results, but encourage retaking when you have 20 uninterrupted minutes.${r.validityDetails.ACQ_FLAG ? ' Your responses showed unusually low variation, which may indicate questions weren\'t fully differentiated.' : ''}</p>
    </div>`;
}

// ── STATE LOAD NOTICE ─────────────────────────────────────────
function renderStateLoadNotice(r) {
  if (!r.flags.stateLoadHigh) return '';
  return `
    <div class="rounded-xl p-4 mb-5 text-sm border-l-4" style="background:#EFF6FF18;border-color:#3B82F6">
      <p class="font-semibold text-warm-white mb-1"><i class="fas fa-info-circle mr-2" style="color:#3B82F6"></i>High Current Stress Detected</p>
      <p class="text-steel-blue/80">You indicated that stress, burnout, or recent life disruption is significantly affecting you right now. This can temporarily amplify attention, mood, and sensory scores. Your results may partly reflect your current state rather than long-standing patterns. Consider retaking when circumstances stabilize.</p>
    </div>`;
}

// ── RADAR CHART ───────────────────────────────────────────────
function renderNDARadar(r) {
  const labels = RADAR_ORDER.map(id => PROFILE_META[id].radarLabel);
  const data   = RADAR_ORDER.map(id => r.finalScores[id] || 0);
  const colors = RADAR_ORDER.map(id => r.bandColors[id] || '#9CA3AF');
  const labelsJSON  = JSON.stringify(labels);
  const dataJSON    = JSON.stringify(data);
  const colorsJSON  = JSON.stringify(colors);

  return `
  <div class="bg-mid-navy/60 border border-light-navy/40 rounded-2xl p-6 mb-6">
    <h3 class="font-display font-semibold text-lg text-warm-white mb-1 text-center">Your Neurotype Fingerprint</h3>
    <p class="text-steel-blue/70 text-xs text-center mb-4 max-w-md mx-auto">This chart shows your relative pattern across all 14 neurotype profiles. Higher scores indicate stronger pattern alignment — not severity or impairment.</p>
    <div style="position:relative;width:100%;max-width:480px;margin:0 auto;">
      <canvas id="ndaRadarChart" aria-label="Neurotype fingerprint radar chart" role="img"></canvas>
    </div>
  </div>
  <script>
  (function waitForChart() {
    if (typeof Chart === 'undefined') { setTimeout(waitForChart, 80); return; }
    const canvas = document.getElementById('ndaRadarChart');
    if (!canvas) return;
    if (canvas._chartInst) { canvas._chartInst.destroy(); }
    const ctx = canvas.getContext('2d');
    canvas._chartInst = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ${labelsJSON},
        datasets: [{
          label: 'Your Profile',
          data: ${dataJSON},
          borderColor: '#a20927',
          borderWidth: 2.5,
          backgroundColor: 'rgba(162,9,39,0.13)',
          pointBackgroundColor: ${colorsJSON},
          pointBorderColor: '#1A2A3A',
          pointBorderWidth: 1.5,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        scales: {
          r: {
            min: 0,
            max: 100,
            beginAtZero: true,
            ticks: {
              stepSize: 25,
              display: true,
              font: { size: 9 },
              color: '#6B7280',
              backdropColor: 'transparent'
            },
            grid: { color: 'rgba(100,120,140,0.35)', lineWidth: 1 },
            angleLines: { color: 'rgba(100,120,140,0.3)', lineWidth: 1 },
            pointLabels: {
              font: { size: 10, family: "'Space Grotesk', system-ui, sans-serif", weight: '500' },
              color: '#A0B4C8',
              padding: 6
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1A2A3A',
            borderColor: '#243447',
            borderWidth: 1,
            titleColor: '#E8E6E1',
            bodyColor: '#A0B4C8',
            callbacks: {
              title: function(items) { return items[0].label; },
              label: function(item) {
                const s = item.raw;
                const band = s <= 20 ? 'Not Indicated' : s <= 40 ? 'Subclinical' : s <= 60 ? 'Moderate' : s <= 78 ? 'Elevated' : 'Very High';
                return ' Score: ' + s + ' — ' + band;
              }
            }
          }
        }
      }
    });
  })();
  </script>`;
}

// ── BAND LEGEND ───────────────────────────────────────────────
function renderBandLegend() {
  const bands = [
    { label: 'Not Indicated', range: '0–20',  color: '#9CA3AF' },
    { label: 'Subclinical',   range: '21–40', color: '#A8D5BA' },
    { label: 'Moderate',      range: '41–60', color: '#F4D06F' },
    { label: 'Elevated',      range: '61–78', color: '#E8834A' },
    { label: 'Very High',     range: '79–100',color: '#C0392B' }
  ];
  return `
  <div class="flex flex-wrap justify-center gap-3 mb-6">
    ${bands.map(b => `
      <div class="flex items-center gap-1.5">
        <div class="w-2.5 h-2.5 rounded-full" style="background:${b.color}"></div>
        <span class="text-xs text-steel-blue">${b.label} <span class="text-steel-blue/40">${b.range}</span></span>
      </div>`).join('')}
  </div>`;
}

// ── TOP PROFILES HIGHLIGHT ────────────────────────────────────
function renderTopProfilesHighlight(r, top5) {
  return `
  <div class="mb-6">
    <h3 class="font-display font-semibold text-base text-warm-white mb-3">Your Top Profiles</h3>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      ${top5.filter(p => p.score > 20).slice(0, 3).map((p, i) => {
        const nt = NEUROTYPES[p.ntId];
        const tierLabels = { 1: 'Established', 2: 'Moderate Evidence', 3: 'Exploratory' };
        return `
        <div class="relative bg-mid-navy/60 border rounded-xl p-4 overflow-hidden ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}" style="border-color:${p.bandColor}50">
          <div class="absolute inset-0 opacity-5 bg-gradient-to-br" style="background:${p.bandColor}"></div>
          <div class="relative">
            ${nt ? `<img src="${nt.icon}" alt="${nt.name}" class="w-10 h-10 rounded-lg object-cover mb-3 border-2" style="border-color:${p.bandColor}50">` : ''}
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-display font-semibold text-sm text-warm-white leading-tight flex-1 mr-2">${p.name}</h4>
              <div class="text-xl font-bold flex-shrink-0" style="color:${p.bandColor}">${p.score}</div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background:${p.bandColor}20;color:${p.bandColor}">${p.band}</span>
              <span class="text-xs text-steel-blue/60">${p.confidenceLabel}</span>
            </div>
            <div class="mt-2 flex items-center gap-1.5">
              <span class="text-xs text-steel-blue/40">Tier ${p.tier} —</span>
              <span class="text-xs" style="color:${p.tier === 1 ? '#A8D5BA' : p.tier === 2 ? '#F4D06F' : '#9CA3AF'}">${tierLabels[p.tier]}</span>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

// ── ALL NEUROTYPE DETAIL CARDS ────────────────────────────────
function renderNDAProfileCards(r) {
  const groups = ['ADHD Spectrum', 'Reading & Language', 'Autism Spectrum', 'Combined Profile'];
  const sorted = r.topProfiles;

  let html = '<div class="mb-6"><h3 class="font-display font-semibold text-base text-warm-white mb-3">All Profiles — Full Detail</h3>';

  groups.forEach(group => {
    const groupProfiles = sorted.filter(p => PROFILE_META[p.id].group === group);
    if (!groupProfiles.length) return;

    html += `
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <div class="h-px flex-1 bg-light-navy/30"></div>
        <span class="text-xs font-semibold text-steel-blue/60 uppercase tracking-wider px-2">${group}</span>
        <div class="h-px flex-1 bg-light-navy/30"></div>
      </div>
      <div class="space-y-2">
        ${groupProfiles.map((p, idx) => {
          const meta = PROFILE_META[p.id];
          const desc = NDA_DESCRIPTIONS[p.id];
          const isExpanded = idx === 0 && group === 'ADHD Spectrum' || p.score >= 60;
          const tierBadge = p.tier === 1 
            ? `<span class="text-xs px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-400 border border-emerald-700/30">Clinically Established</span>`
            : p.tier === 2 
            ? `<span class="text-xs px-2 py-0.5 rounded-full bg-yellow-900/40 text-yellow-400 border border-yellow-700/30">Moderate Evidence</span>`
            : `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-700/40 text-gray-400 border border-gray-600/30">Exploratory Pattern</span>`;

          return `
          <div class="border border-light-navy/30 rounded-xl overflow-hidden">
            <button onclick="this.closest('.border').querySelector('.nda-card-body').classList.toggle('hidden')" 
              class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-light-navy/10 transition-all">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-medium text-sm text-warm-white">${p.name}</span>
                  ${tierBadge}
                </div>
              </div>
              <!-- Score pill -->
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background:${p.bandColor}25;color:${p.bandColor}">${p.score}</span>
                <span class="text-xs text-steel-blue/50 hidden sm:block">${p.band}</span>
                <i class="fas fa-chevron-down text-steel-blue/40 text-xs"></i>
              </div>
            </button>
            <div class="nda-card-body ${isExpanded ? '' : 'hidden'} px-4 pb-4 border-t border-light-navy/20">
              <!-- Score bar -->
              <div class="mt-3 mb-4">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-steel-blue/60">Profile Score</span>
                  <span class="font-semibold" style="color:${p.bandColor}">${p.score} / 100 — ${p.band}</span>
                </div>
                <div class="h-2 bg-light-navy/40 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all" style="width:${p.score}%;background:${p.bandColor}"></div>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs text-steel-blue/50">Confidence:</span>
                  <span class="text-xs font-medium text-steel-blue">${p.confidence}/100 — ${p.confidenceLabel}</span>
                </div>
              </div>
              <!-- Description -->
              ${desc ? `
                <p class="text-steel-blue/80 text-xs leading-relaxed">${desc.description}</p>
                ${desc.caveat ? `<div class="mt-3 px-3 py-2 rounded-lg bg-yellow-900/20 border border-yellow-700/20 text-xs text-yellow-200/80"><i class="fas fa-exclamation-triangle mr-1 text-yellow-500"></i><strong>Exploratory Caveat:</strong> This pattern cluster originates from clinical brain-imaging research. It is not independently classified in the DSM-5-TR. Use as a starting point for professional conversation.</div>` : ''}
              ` : `<p class="text-steel-blue/60 text-xs">Visit the Profile Library for detailed information about this neurotype.</p>`}
              <!-- Link to full profile -->
              ${NEUROTYPES[meta.ntId] ? `
                <button onclick="navigateTo('profiles','${meta.ntId}')" class="mt-3 text-xs text-electric-teal hover:underline">
                  <i class="fas fa-arrow-right mr-1"></i>View full ${meta.name} profile →
                </button>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });

  html += '</div>';
  return html;
}

// ── FLAGS SECTION ─────────────────────────────────────────────
function renderNDAFlags(r) {
  const { flags } = r;
  const activeFlags = [];

  if (flags.temporalMedicalFlag) activeFlags.push({
    color: '#F59E0B', icon: 'fa-stethoscope', title: 'Medical Review Recommended',
    body: 'Your responses show a pattern in the Memory & Cognitive domain that sometimes reflects neurological factors such as head injury, seizure disorder, or migraine. If you have such a history alongside attention difficulties, this warrants a conversation with a physician or neurologist.'
  });
  if (flags.medicalReviewFlag && !flags.temporalMedicalFlag) activeFlags.push({
    color: '#F59E0B', icon: 'fa-stethoscope', title: 'Medical Background Noted',
    body: 'You endorsed several medical-history items that may indicate neurological factors worth discussing with a medical professional. This is informational, not an alarm.'
  });
  if (flags.maskingHigh) activeFlags.push({
    color: '#3B82F6', icon: 'fa-mask', title: 'High Masking Detected',
    body: 'Your responses suggest significant masking — consciously suppressing your natural tendencies to appear neurotypical. High masking can cause self-report tools to underestimate your profile. Our scoring has partially adjusted for this, but formal assessment by a masking-aware clinician may provide a clearer picture.'
  });
  if (flags.devHistoryStrong) activeFlags.push({
    color: '#A8D5BA', icon: 'fa-history', title: 'Strong Developmental History',
    body: 'Your developmental history responses suggest these patterns have been present since childhood across multiple settings. This is clinically significant — long-standing, pervasive patterns are more likely to reflect genuine neurodevelopmental differences.'
  });
  if (flags.stateLoadHigh) activeFlags.push({
    color: '#3B82F6', icon: 'fa-clock', title: 'High Current State Load',
    body: 'Current stress, burnout, or life disruption appears to be significantly affecting you. Some elevated scores may partly reflect temporary amplification. Consider retaking when circumstances stabilize.'
  });
  if (flags.v8ClinicalConcern) activeFlags.push({
    color: '#F59E0B', icon: 'fa-exclamation-circle', title: 'Memory Gaps Endorsed',
    body: 'You endorsed an experience involving significant memory gaps or time loss. Please discuss this with a medical or mental health professional regardless of your other results.'
  });
  if (flags.readingConfound && r.readingConfoundNote) activeFlags.push({
    color: '#3B82F6', icon: 'fa-language', title: 'Reading/Language Context Note',
    body: r.readingConfoundNote
  });

  if (!activeFlags.length) return '';

  return `
  <div class="mb-6">
    <h3 class="font-display font-semibold text-base text-warm-white mb-3">
      <i class="fas fa-flag text-sm mr-2" style="color:#F59E0B"></i>Important Notes From Your Results
    </h3>
    <div class="space-y-3">
      ${activeFlags.map(f => `
        <div class="rounded-xl p-4 border-l-4 text-sm" style="background:${f.color}10;border-color:${f.color}">
          <p class="font-semibold text-warm-white mb-1"><i class="fas ${f.icon} mr-2" style="color:${f.color}"></i>${f.title}</p>
          <p class="text-steel-blue/80">${f.body}</p>
        </div>`).join('')}
    </div>
  </div>`;
}

// ── DOMAIN BAR CHART ─────────────────────────────────────────
function renderDomainBars(r) {
  const domOrder = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
  const norm = r.domainNorm;

  return `
  <div class="bg-mid-navy/40 border border-light-navy/30 rounded-2xl p-5 mb-6">
    <h3 class="font-display font-semibold text-base text-warm-white mb-1">Underlying Trait Dimensions</h3>
    <p class="text-steel-blue/60 text-xs mb-5">Your normalized scores across the 14 domains that drive the neurotype model</p>
    <div class="space-y-2.5">
      ${domOrder.map(d => {
        const info = NDA_DOMAIN_NAMES[d];
        const val = Math.round(norm[d] || 0);
        const band = val <= 20 ? '#9CA3AF' : val <= 40 ? '#A8D5BA' : val <= 60 ? '#F4D06F' : val <= 78 ? '#E8834A' : '#C0392B';
        return `
        <div>
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="flex items-center gap-1.5 text-steel-blue">
              <i class="fas ${info.icon} text-xs" style="color:${info.color}"></i>
              ${info.name}
            </span>
            <span class="font-semibold" style="color:${band}">${val}</span>
          </div>
          <div class="h-2 bg-light-navy/40 rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all" style="width:${val}%;background:${band}"></div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

// ── NEXT STEPS ────────────────────────────────────────────────
function renderNextSteps() {
  return `
  <div class="mb-6">
    <h3 class="font-display font-semibold text-base text-warm-white mb-3">What To Do Next</h3>
    <div class="grid sm:grid-cols-3 gap-4">
      <div class="bg-mid-navy/40 border border-light-navy/30 rounded-xl p-4">
        <div class="w-10 h-10 rounded-xl bg-electric-teal/10 flex items-center justify-center mb-3">
          <i class="fas fa-book text-electric-teal"></i>
        </div>
        <h4 class="font-display font-semibold text-sm text-warm-white mb-2">Learn More</h4>
        <p class="text-steel-blue/70 text-xs mb-3">Explore trusted resources before deciding on evaluation.</p>
        <div class="space-y-1.5 text-xs">
          <a href="https://chadd.org" target="_blank" class="flex items-center gap-1 text-electric-teal hover:underline"><i class="fas fa-external-link-alt text-xs"></i>CHADD (ADHD)</a>
          <a href="https://autisticadvocacy.org" target="_blank" class="flex items-center gap-1 text-electric-teal hover:underline"><i class="fas fa-external-link-alt text-xs"></i>ASAN (Autism)</a>
          <a href="https://dyslexiaida.org" target="_blank" class="flex items-center gap-1 text-electric-teal hover:underline"><i class="fas fa-external-link-alt text-xs"></i>IDA (Dyslexia)</a>
        </div>
      </div>
      <div class="bg-mid-navy/40 border border-light-navy/30 rounded-xl p-4">
        <div class="w-10 h-10 rounded-xl bg-muted-purple/10 flex items-center justify-center mb-3">
          <i class="fas fa-user-md text-muted-purple"></i>
        </div>
        <h4 class="font-display font-semibold text-sm text-warm-white mb-2">Find a Professional</h4>
        <p class="text-steel-blue/70 text-xs mb-3">Ask for a comprehensive neuropsychological evaluation.</p>
        <div class="space-y-1 text-xs text-steel-blue/70">
          <p>ADHD: Psychologist or psychiatrist</p>
          <p>Autism: Multidisciplinary team</p>
          <p>Dyslexia: Educational psychologist</p>
        </div>
      </div>
      <div class="bg-mid-navy/40 border border-light-navy/30 rounded-xl p-4">
        <div class="w-10 h-10 rounded-xl bg-warm-amber/10 flex items-center justify-center mb-3">
          <i class="fas fa-compass text-warm-amber"></i>
        </div>
        <h4 class="font-display font-semibold text-sm text-warm-white mb-2">Explore Profiles</h4>
        <p class="text-steel-blue/70 text-xs mb-3">Deep-dive into your top neurotype profiles on this site.</p>
        <button onclick="navigateTo('profiles')" class="text-xs text-electric-teal hover:underline">
          <i class="fas fa-arrow-right mr-1"></i>Go to Profile Library →
        </button>
      </div>
    </div>
  </div>`;
}
