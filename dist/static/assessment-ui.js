// ============================================================
// THE NEURODIVERGENT BRAIN — Assessment UI Controller v2.1
// Screen-by-screen SPA flow for the NDA assessment
// ============================================================

// ── STATE ─────────────────────────────────────────────────────
let ndaState = {
  screen: 'welcome',    // welcome | context | assessment | processing | results
  screenIndex: 0,       // 0-based index into NDA_SCREENS
  responses: {},        // { Q1: 2, Q2: 3, V1: 1, MR1: 0, ... }
  context: {},          // context question responses
  startTime: null,
  results: null
};

const NDA_STORAGE_KEY = 'nda_v2_state';
const NDA_TOTAL_SCREENS = NDA_SCREENS.length; // 14 domain screens

// ── INITIALIZE / RESUME ───────────────────────────────────────
function ndaInit() {
  const saved = sessionStorage.getItem(NDA_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.responses && Object.keys(parsed.responses).length > 0) {
        return 'resume'; // signal to show resume modal
      }
    } catch(e) {}
  }
  return 'fresh';
}

function ndaSave() {
  sessionStorage.setItem(NDA_STORAGE_KEY, JSON.stringify({
    screen: ndaState.screen,
    screenIndex: ndaState.screenIndex,
    responses: ndaState.responses,
    context: ndaState.context,
    startTime: ndaState.startTime
  }));
}

function ndaLoadSaved() {
  const saved = sessionStorage.getItem(NDA_STORAGE_KEY);
  if (!saved) return false;
  try {
    const parsed = JSON.parse(saved);
    ndaState = { ...ndaState, ...parsed, results: null };
    return true;
  } catch(e) { return false; }
}

function ndaReset() {
  sessionStorage.removeItem(NDA_STORAGE_KEY);
  ndaState = { screen: 'welcome', screenIndex: 0, responses: {}, context: {}, startTime: null, results: null };
  document.getElementById('app').innerHTML = renderAssessmentV2();
}

// ── MAIN RENDER DISPATCHER ────────────────────────────────────
function renderAssessmentV2() {
  switch (ndaState.screen) {
    case 'welcome':    return renderNDAWelcome();
    case 'context':    return renderNDAContext();
    case 'assessment': return renderNDAScreen();
    case 'processing': return renderNDAProcessing();
    case 'results':    return renderNDAResults();
    default:           return renderNDAWelcome();
  }
}

// ── SCREEN 1: WELCOME ─────────────────────────────────────────
function renderNDAWelcome() {
  const status = ndaInit();
  const resumeBanner = status === 'resume' ? `
    <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
      <i class="fas fa-bookmark text-blue-400 mt-0.5 flex-shrink-0"></i>
      <div>
        <p class="text-warm-white text-sm font-semibold mb-1">Welcome back! You have an assessment in progress.</p>
        <div class="flex gap-3 mt-2">
          <button onclick="ndaResume()" class="px-4 py-2 bg-electric-teal text-deep-navy text-sm font-semibold rounded-lg hover:bg-electric-teal/90 transition-all">Resume</button>
          <button onclick="ndaReset()" class="px-4 py-2 border border-light-navy/60 text-steel-blue text-sm rounded-lg hover:text-warm-white transition-all">Start Over</button>
        </div>
      </div>
    </div>` : '';

  return `
  <section class="max-w-2xl mx-auto px-4 sm:px-6 py-12">
    ${resumeBanner}
    
    <!-- Hero -->
    <div class="text-center mb-8">
      <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a20927]/20 to-purple-900/20 flex items-center justify-center mx-auto mb-6 border border-[#a20927]/20">
        <i class="fas fa-compass text-3xl" style="color:#a20927"></i>
      </div>
      <h2 class="font-display font-bold text-3xl md:text-4xl text-warm-white mb-3">Neurotype Discovery Assessment</h2>
      <p class="text-steel-blue text-lg italic">Understand how your brain works</p>
      <div class="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-mid-navy/60 border border-light-navy/50">
        <i class="fas fa-clock text-xs text-steel-blue"></i>
        <span class="text-steel-blue text-sm">20–26 minutes · 152 questions</span>
      </div>
    </div>

    <!-- Purpose -->
    <p class="text-steel-blue leading-relaxed mb-6 text-center max-w-xl mx-auto">
      This assessment maps your self-reported tendencies across attention, sensory processing, social communication, and other domains to produce a personalized neurotype profile. It is not a diagnosis — it's a starting point for self-understanding and professional conversation.
    </p>

    <!-- Domain preview -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      ${[
        { icon: 'fa-eye',           label: 'Attention',      color: '#F59E0B' },
        { icon: 'fa-bolt',          label: 'Energy',         color: '#F97316' },
        { icon: 'fa-users',         label: 'Social',         color: '#8B5CF6' },
        { icon: 'fa-brain',         label: 'Impulse',        color: '#E11D48' },
        { icon: 'fa-tasks',         label: 'Executive',      color: '#7C3AED' },
        { icon: 'fa-heart',         label: 'Mood',           color: '#4338CA' },
        { icon: 'fa-hand-sparkles', label: 'Sensory',        color: '#EC4899' },
        { icon: 'fa-book-open',     label: 'Reading',        color: '#A78BFA' }
      ].map(d => `
        <div class="bg-mid-navy/40 border border-light-navy/30 rounded-xl p-3 text-center">
          <i class="fas ${d.icon} text-lg mb-1.5" style="color:${d.color}"></i>
          <p class="text-steel-blue text-xs">${d.label}</p>
        </div>`).join('')}
    </div>

    <!-- Disclaimer -->
    <div class="bg-mid-navy/40 border border-light-navy/40 rounded-xl p-5 mb-6 text-sm text-steel-blue leading-relaxed">
      <p class="font-semibold text-warm-white mb-2 flex items-center gap-2"><i class="fas fa-shield-alt" style="color:#a20927"></i> Important Notice</p>
      This assessment is a self-awareness and educational screening tool only. It is <strong class="text-warm-white">NOT a clinical diagnosis</strong> and should not be interpreted as one. These results reflect self-reported tendencies and are intended to support personal insight and facilitate conversations with qualified professionals. Only a licensed psychologist, psychiatrist, or neuropsychologist can provide a formal evaluation and diagnosis. Please do not use these results as a substitute for professional care.
    </div>

    <!-- Privacy -->
    <p class="text-steel-blue/60 text-xs text-center mb-6">
      <i class="fas fa-lock mr-1"></i>Your responses are processed locally in your browser. No personally identifiable data is stored.
    </p>

    <!-- Context toggle -->
    <div class="mb-6">
      <button onclick="document.getElementById('contextToggle').classList.toggle('hidden')" class="w-full flex items-center justify-between px-4 py-3 bg-mid-navy/40 border border-light-navy/40 rounded-xl text-steel-blue hover:text-warm-white transition-all text-sm">
        <span><i class="fas fa-sliders-h mr-2"></i>Customize your experience (optional)</span>
        <i class="fas fa-chevron-down text-xs"></i>
      </button>
      <div id="contextToggle" class="hidden mt-3 bg-mid-navy/30 border border-light-navy/30 rounded-xl p-5">
        ${renderContextForm()}
      </div>
    </div>

    <!-- CTA -->
    <button onclick="ndaBegin()" class="w-full py-4 rounded-xl font-display font-semibold text-lg text-white transition-all hover:opacity-90 hover:scale-[1.01] transform" style="background:#a20927">
      <i class="fas fa-arrow-right mr-2"></i>Begin Assessment
    </button>
  </section>`;
}

// ── CONTEXT FORM ──────────────────────────────────────────────
function renderContextForm() {
  return NDA_CONTEXT_QUESTIONS.map(q => {
    if (q.type === 'toggle') {
      return `
        <div class="flex items-start justify-between gap-4 py-3 border-b border-light-navy/20 last:border-0">
          <div>
            <p class="text-sm text-warm-white">${q.label}</p>
            ${q.helperText ? `<p class="text-xs text-steel-blue/70 mt-0.5">${q.helperText}</p>` : ''}
          </div>
          <button onclick="ndaToggleContext('${q.id}')" id="ctx_${q.id}" class="flex-shrink-0 w-12 h-6 rounded-full border border-light-navy/50 bg-light-navy/30 relative transition-all ${ndaState.context[q.id] ? 'bg-[#a20927]/30 border-[#a20927]/50' : ''}">
            <span class="absolute top-0.5 w-5 h-5 rounded-full transition-all ${ndaState.context[q.id] ? 'right-0.5 bg-[#a20927]' : 'left-0.5 bg-steel-blue/50'}"></span>
          </button>
        </div>`;
    }
    if (q.type === 'select') {
      const opts = q.options.map(o => {
        const val = typeof o === 'object' ? o.value : o;
        const lbl = typeof o === 'object' ? o.label : o;
        const sel = ndaState.context[q.id] == val;
        return `<option value="${val}" ${sel ? 'selected' : ''}>${lbl}</option>`;
      }).join('');
      return `
        <div class="py-3 border-b border-light-navy/20 last:border-0">
          <label class="text-sm text-warm-white block mb-1">${q.label}</label>
          ${q.helperText ? `<p class="text-xs text-steel-blue/70 mb-2">${q.helperText}</p>` : ''}
          <select onchange="ndaState.context['${q.id}'] = this.value" class="w-full bg-deep-navy border border-light-navy/50 rounded-lg px-3 py-2 text-sm text-steel-blue focus:outline-none focus:border-[#a20927]/50">
            <option value="">Select...</option>${opts}
          </select>
        </div>`;
    }
    return '';
  }).join('');
}

function ndaToggleContext(id) {
  ndaState.context[id] = !ndaState.context[id];
  const btn = document.getElementById(`ctx_${id}`);
  if (btn) {
    btn.className = `flex-shrink-0 w-12 h-6 rounded-full border relative transition-all ${ndaState.context[id] ? 'bg-[#a20927]/30 border-[#a20927]/50' : 'border-light-navy/50 bg-light-navy/30'}`;
    const span = btn.querySelector('span');
    if (span) span.className = `absolute top-0.5 w-5 h-5 rounded-full transition-all ${ndaState.context[id] ? 'right-0.5 bg-[#a20927]' : 'left-0.5 bg-steel-blue/50'}`;
  }
}

// ── BEGIN / RESUME ────────────────────────────────────────────
function ndaBegin() {
  ndaState.screen = 'assessment';
  ndaState.screenIndex = 0;
  ndaState.startTime = Date.now();
  ndaState.responses._startTime = ndaState.startTime;
  ndaSave();
  document.getElementById('app').innerHTML = renderNDAScreen();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ndaResume() {
  ndaLoadSaved();
  ndaState.screen = 'assessment';
  document.getElementById('app').innerHTML = renderNDAScreen();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── BUILD SCREEN QUESTIONS (with validity items inserted) ─────
function buildScreenItems(screenDef) {
  if (screenDef.sections) {
    // DOM_L+M combined screen — flatten
    const all = [];
    screenDef.sections.forEach(sec => sec.questions.forEach(q => all.push(q)));
    return { items: all, hasSections: true, sections: screenDef.sections };
  }

  const items = [...screenDef.questions];
  if (screenDef.validityItems) {
    screenDef.validityItems.forEach(vi => {
      items.splice(vi.insertAfterIndex + 1, 0, { id: vi.id, text: vi.text, isValidity: true });
    });
  }
  return { items, hasSections: false };
}

// ── CALCULATE PROGRESS ────────────────────────────────────────
function ndaGetProgress() {
  const totalAnswerable = NDA_SCREENS.reduce((sum, s) => {
    if (s.sections) {
      return sum + s.sections.reduce((ss, sec) => ss + sec.questions.length, 0);
    }
    return sum + s.questions.length + (s.validityItems ? s.validityItems.length : 0);
  }, 0);
  const answered = Object.keys(ndaState.responses).filter(k => k.startsWith('Q') || k.startsWith('V') || k.startsWith('MR')).length;
  return { answered, total: totalAnswerable, pct: Math.round((ndaState.screenIndex / NDA_SCREENS.length) * 100) };
}

// ── SCREEN RENDER ─────────────────────────────────────────────
function renderNDAScreen() {
  const screen = NDA_SCREENS[ndaState.screenIndex];
  if (!screen) return renderNDAProcessing();

  const { items, hasSections, sections } = buildScreenItems(screen);
  const { pct } = ndaGetProgress();
  const isBinary = screen.isBinary || false;
  const isLast = ndaState.screenIndex === NDA_SCREENS.length - 1;

  // Check if all items on this screen are answered
  const allAnswered = items.every(item => ndaState.responses[item.id] !== undefined);

  return `
  <section class="max-w-2xl mx-auto px-4 sm:px-6 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <button onclick="ndaGoBack()" class="flex items-center gap-2 text-steel-blue hover:text-warm-white text-sm transition-all ${ndaState.screenIndex === 0 ? 'invisible' : ''}">
        <i class="fas fa-arrow-left text-xs"></i>Back
      </button>
      <button onclick="ndaReset()" class="text-steel-blue/50 hover:text-steel-blue text-xs transition-all">Start Over</button>
    </div>

    <!-- Progress bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center text-xs text-steel-blue mb-2">
        <span class="font-medium" style="color:${screen.color}">${screen.title}</span>
        <span>Section ${ndaState.screenIndex + 1} of ${NDA_TOTAL_SCREENS}</span>
      </div>
      <div class="h-1.5 bg-light-navy/40 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all duration-500" style="width:${pct}%;background:#a20927"></div>
      </div>
      <!-- Domain dots -->
      <div class="flex justify-between mt-2 px-0.5">
        ${NDA_SCREENS.map((s, i) => {
          const isActive = i === ndaState.screenIndex;
          const isDone = i < ndaState.screenIndex;
          return `<div class="w-2 h-2 rounded-full transition-all ${isActive ? '' : isDone ? 'opacity-80' : 'opacity-25'}" style="background:${isActive ? s.color : isDone ? '#A8D5BA' : '#374151'}"></div>`;
        }).join('')}
      </div>
    </div>

    <!-- Section header -->
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${screen.color}18;border:1px solid ${screen.color}30">
        <i class="fas ${screen.icon} text-sm" style="color:${screen.color}"></i>
      </div>
      <div>
        <h2 class="font-display font-bold text-xl text-warm-white">${screen.title}</h2>
        <p class="text-steel-blue text-xs">${screen.contextNote}</p>
      </div>
    </div>

    ${isBinary ? renderBinaryQuestions(screen, items) : (hasSections ? renderSectionedQuestions(sections) : renderLikertQuestions(items, screen))}

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t border-light-navy/30">
      <button onclick="ndaGoBack()" class="px-5 py-2.5 rounded-lg text-sm font-medium text-steel-blue hover:text-warm-white hover:bg-light-navy/40 transition-all ${ndaState.screenIndex === 0 ? 'invisible' : ''}">
        <i class="fas fa-arrow-left mr-2"></i>Previous
      </button>
      <button onclick="${isLast ? 'ndaFinish()' : 'ndaNextScreen()'}" 
        class="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all ${allAnswered ? 'hover:opacity-90 hover:scale-[1.02] transform' : 'opacity-40 cursor-not-allowed'}"
        style="background:#a20927"
        ${allAnswered ? '' : 'disabled'}>
        ${isLast ? '<i class="fas fa-chart-radar mr-2"></i>See My Results' : 'Continue<i class="fas fa-arrow-right ml-2"></i>'}
      </button>
    </div>

    <!-- Answer progress indicator -->
    <div class="text-center mt-4">
      ${(() => {
        const answered = items.filter(item => ndaState.responses[item.id] !== undefined).length;
        const remaining = items.length - answered;
        return remaining > 0 
          ? `<p class="text-steel-blue/50 text-xs">${remaining} question${remaining !== 1 ? 's' : ''} remaining on this page</p>`
          : `<p class="text-xs" style="color:#A8D5BA"><i class="fas fa-check mr-1"></i>All questions answered — continue when ready</p>`;
      })()}
    </div>
  </section>`;
}

// ── LIKERT QUESTION RENDERER ──────────────────────────────────
function renderLikertQuestions(items, screen) {
  return items.map((item, idx) => {
    const answered = ndaState.responses[item.id] !== undefined;
    const val = ndaState.responses[item.id];
    return `
    <div class="mb-6 pb-6 border-b border-light-navy/20 last:border-0 section-enter" style="animation-delay:${idx * 30}ms">
      <div class="flex items-start gap-2 mb-4">
        <span class="text-xs text-steel-blue/50 mt-1 flex-shrink-0 w-5">${idx + 1}.</span>
        <p class="text-warm-white text-base leading-relaxed">${item.text}${item.isInverse ? ' <span class="text-xs text-steel-blue/40 ml-1" title="Reverse-scored item">[↔]</span>' : ''}</p>
      </div>
      <div class="grid grid-cols-5 gap-1.5 ml-7">
        ${NDA_LIKERT.map(opt => `
          <button onclick="ndaAnswer('${item.id}', ${opt.value})" 
            class="flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg border transition-all hover:scale-[1.02] transform ${val === opt.value ? 'border-[#a20927] text-white' : 'border-light-navy/40 text-steel-blue hover:border-light-navy/80 hover:text-warm-white'}"
            style="${val === opt.value ? 'background:#a2092722;' : ''}"
            aria-label="${opt.label}" aria-pressed="${val === opt.value}">
            <span class="font-bold text-sm ${val === opt.value ? 'text-white' : ''}">${opt.value}</span>
            <span class="text-xs leading-tight text-center">${opt.shortLabel}</span>
          </button>`).join('')}
      </div>
      <!-- Scale labels -->
      <div class="flex justify-between ml-7 mt-1.5 text-xs text-steel-blue/40">
        <span>Never</span><span>Almost Always</span>
      </div>
    </div>`;
  }).join('');
}

// ── SECTIONED QUESTION RENDERER (DOM_L+M) ─────────────────────
function renderSectionedQuestions(sections) {
  return sections.map(sec => `
    <div class="mb-6">
      <h3 class="font-display font-semibold text-sm text-steel-blue uppercase tracking-wider mb-4 flex items-center gap-2">
        <div class="h-px flex-1 bg-light-navy/30"></div>${sec.sectionTitle}<div class="h-px flex-1 bg-light-navy/30"></div>
      </h3>
      ${sec.questions.map((item, idx) => {
        const val = ndaState.responses[item.id];
        return `
        <div class="mb-5 pb-5 border-b border-light-navy/15 last:border-0">
          <div class="flex items-start gap-2 mb-3">
            <span class="text-xs text-steel-blue/50 mt-1 flex-shrink-0 w-5">${idx + 1}.</span>
            <p class="text-warm-white text-sm leading-relaxed">${item.text}${item.isInverse ? ' <span class="text-xs text-steel-blue/40">[↔]</span>' : ''}</p>
          </div>
          <div class="grid grid-cols-5 gap-1 ml-7">
            ${NDA_LIKERT.map(opt => `
              <button onclick="ndaAnswer('${item.id}', ${opt.value})" 
                class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg border transition-all ${val === opt.value ? 'border-[#a20927] text-white' : 'border-light-navy/40 text-steel-blue hover:border-light-navy/80'}"
                style="${val === opt.value ? 'background:#a2092722;' : ''}">
                <span class="font-bold text-xs">${opt.value}</span>
                <span class="text-xs">${opt.shortLabel}</span>
              </button>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>`).join('');
}

// ── BINARY QUESTION RENDERER (Medical Review) ─────────────────
function renderBinaryQuestions(screen, items) {
  return `
    <div class="space-y-4">
      ${items.map((item, idx) => {
        const val = ndaState.responses[item.id];
        return `
        <div class="bg-mid-navy/40 border border-light-navy/30 rounded-xl p-4">
          <p class="text-warm-white text-sm leading-relaxed mb-4">
            <span class="text-steel-blue/50 text-xs mr-2">${idx + 1}.</span>${item.text}
          </p>
          <div class="flex gap-3">
            <button onclick="ndaAnswer('${item.id}', 0)" 
              class="flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all ${val === 0 ? 'border-[#A8D5BA] text-[#A8D5BA] bg-[#A8D5BA]/10' : 'border-light-navy/40 text-steel-blue hover:border-light-navy/80'}"
              aria-pressed="${val === 0}">No</button>
            <button onclick="ndaAnswer('${item.id}', 1)" 
              class="flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all ${val === 1 ? 'border-[#a20927] text-[#a20927] bg-[#a20927]/10' : 'border-light-navy/40 text-steel-blue hover:border-light-navy/80'}"
              aria-pressed="${val === 1}">Yes</button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

// ── ANSWER HANDLER ────────────────────────────────────────────
function ndaAnswer(itemId, value) {
  ndaState.responses[itemId] = value;
  ndaSave();

  // Re-render the screen to update UI and check if all answered
  const screen = NDA_SCREENS[ndaState.screenIndex];
  const { items } = buildScreenItems(screen);
  const allAnswered = items.every(item => ndaState.responses[item.id] !== undefined);

  // Update just the next button state and the remaining counter
  const nextBtn = document.querySelector('button[onclick="ndaNextScreen()"], button[onclick="ndaFinish()"]');
  if (nextBtn) {
    if (allAnswered) {
      nextBtn.disabled = false;
      nextBtn.className = nextBtn.className.replace('opacity-40 cursor-not-allowed', 'hover:opacity-90 hover:scale-[1.02] transform');
    }
  }

  // Update the answer count text
  const answered = items.filter(item => ndaState.responses[item.id] !== undefined).length;
  const remaining = items.length - answered;
  const counter = document.querySelector('.text-center.mt-4 p');
  if (counter) {
    if (remaining > 0) {
      counter.innerHTML = `${remaining} question${remaining !== 1 ? 's' : ''} remaining on this page`;
      counter.className = 'text-steel-blue/50 text-xs';
    } else {
      counter.innerHTML = `<i class="fas fa-check mr-1"></i>All questions answered — continue when ready`;
      counter.style.color = '#A8D5BA';
      counter.className = 'text-xs';
    }
  }

  // Update the specific button visuals
  const allBtns = document.querySelectorAll(`button[onclick*="ndaAnswer('${itemId}'"]`);
  allBtns.forEach(btn => {
    const btnVal = parseInt(btn.getAttribute('onclick').match(/ndaAnswer\('.*?', (\d+)\)/)?.[1]);
    const isSelected = btnVal === value;
    if (isSelected) {
      btn.className = btn.className.replace('border-light-navy/40 text-steel-blue hover:border-light-navy/80 hover:text-warm-white', 'border-[#a20927] text-white');
      btn.style.background = '#a2092722';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.className = btn.className.replace('border-[#a20927] text-white', 'border-light-navy/40 text-steel-blue hover:border-light-navy/80 hover:text-warm-white');
      btn.style.background = '';
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // For binary (MR) items, also update Yes/No button styles
  const yesNoContainer = document.querySelector(`button[onclick="ndaAnswer('${itemId}', 1)"]`);
  if (yesNoContainer) {
    const noBtn = document.querySelector(`button[onclick="ndaAnswer('${itemId}', 0)"]`);
    const yesBtn = document.querySelector(`button[onclick="ndaAnswer('${itemId}', 1)"]`);
    if (noBtn) {
      if (value === 0) {
        noBtn.className = 'flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all border-[#A8D5BA] text-[#A8D5BA] bg-[#A8D5BA]/10';
      } else {
        noBtn.className = 'flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all border-light-navy/40 text-steel-blue hover:border-light-navy/80';
      }
    }
    if (yesBtn) {
      if (value === 1) {
        yesBtn.className = 'flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all border-[#a20927] text-[#a20927] bg-[#a20927]/10';
      } else {
        yesBtn.className = 'flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all border-light-navy/40 text-steel-blue hover:border-light-navy/80';
      }
    }
  }
}

// ── NAVIGATION ────────────────────────────────────────────────
function ndaNextScreen() {
  const screen = NDA_SCREENS[ndaState.screenIndex];
  const { items } = buildScreenItems(screen);
  const allAnswered = items.every(item => ndaState.responses[item.id] !== undefined);
  if (!allAnswered) return;

  ndaState.screenIndex++;
  ndaSave();
  document.getElementById('app').innerHTML = renderNDAScreen();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ndaGoBack() {
  if (ndaState.screenIndex > 0) {
    ndaState.screenIndex--;
    ndaSave();
    document.getElementById('app').innerHTML = renderNDAScreen();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function ndaFinish() {
  const screen = NDA_SCREENS[ndaState.screenIndex];
  const { items } = buildScreenItems(screen);
  const allAnswered = items.every(item => ndaState.responses[item.id] !== undefined);
  if (!allAnswered) return;

  ndaState.responses._endTime = Date.now();
  ndaState.screen = 'processing';
  document.getElementById('app').innerHTML = renderNDAProcessing();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Run scoring after cosmetic delay
  setTimeout(() => {
    ndaState.results = calculateNDAResults(ndaState.responses, ndaState.context);
    ndaState.screen = 'results';
    ndaSave();
    document.getElementById('app').innerHTML = renderNDAResults();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 3500);
}

// ── PROCESSING SCREEN ─────────────────────────────────────────
function renderNDAProcessing() {
  return `
  <section class="max-w-xl mx-auto px-4 py-24 text-center">
    <div class="relative w-24 h-24 mx-auto mb-8">
      <div class="absolute inset-0 rounded-full border-4 border-[#a20927]/20 animate-ping"></div>
      <div class="absolute inset-2 rounded-full border-4 border-[#a20927]/40 animate-ping" style="animation-delay:0.3s"></div>
      <div class="absolute inset-4 rounded-full border-4 border-[#a20927]/60 animate-pulse"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <i class="fas fa-brain text-2xl" style="color:#a20927"></i>
      </div>
    </div>
    <h2 class="font-display font-bold text-2xl text-warm-white mb-3">Mapping your neurotype profile...</h2>
    <p class="text-steel-blue text-sm">Analyzing 14 neurotype models against your responses</p>
  </section>`;
}
