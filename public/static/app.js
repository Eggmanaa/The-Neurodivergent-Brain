// ============================================================
// THE NEURODIVERGENT BRAIN — Main Application Controller
// SPA Navigation, Rendering, State Management
// Updated: 14 neurotype profiles with grouped tabs
// ============================================================

let currentSection = 'home';
let currentProfile = 'neurotypical';
let assessmentState = { currentQ: 0, answers: {}, completed: false, results: null, started: false };
let explorerState = { brainA: null, brainB: null, view: 'narrative' };

// ==================== NAVIGATION ====================
function navigateTo(section, sub) {
  currentSection = section;
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('text-electric-teal', el.dataset.section === section);
    el.classList.toggle('text-steel-blue', el.dataset.section !== section);
  });
  const app = document.getElementById('app');
  switch(section) {
    case 'home': app.innerHTML = renderHome(); break;
    case 'profiles': currentProfile = sub || currentProfile || 'neurotypical'; app.innerHTML = renderProfiles(); break;
    case 'assessment': app.innerHTML = renderAssessment(); break;
    case 'explorer': app.innerHTML = renderExplorer(); break;
    case 'about': app.innerHTML = renderAbout(); break;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

// ==================== HOME PAGE ====================
function renderHome() {
  return `
  <div class="particles-bg"></div>
  <section class="hero-bg min-h-[85vh] flex items-center justify-center px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="font-display font-bold text-5xl md:text-7xl text-warm-white mb-6 leading-tight">
        The Neurodivergent<br><span class="bg-gradient-to-r from-electric-teal via-muted-purple to-warm-amber bg-clip-text text-transparent">Brain</span>
      </h1>
      <p class="font-accent text-xl md:text-2xl text-steel-blue mb-4 italic">
        "Every brain is wired differently. Understanding yours changes everything."
      </p>
      <p class="text-steel-blue/80 text-lg max-w-2xl mx-auto mb-10">
        Research-informed profiles of how different brains work — including DSM-5 classifications and Dr. Daniel Amen's 7 ADD subtypes. Not a diagnosis — a starting point for understanding.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <button onclick="navigateTo('profiles')" class="px-8 py-3 bg-electric-teal text-deep-navy font-display font-semibold rounded-lg hover:bg-electric-teal/90 transition-all transform hover:scale-105">
          <i class="fas fa-brain mr-2"></i>Explore Neurotypes
        </button>
        <button onclick="navigateTo('assessment')" class="px-8 py-3 border-2 border-electric-teal text-electric-teal font-display font-semibold rounded-lg hover:bg-electric-teal/10 transition-all transform hover:scale-105">
          <i class="fas fa-search mr-2"></i>Discover Your Brain
        </button>
      </div>
    </div>
  </section>

  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <h2 class="font-display font-bold text-3xl md:text-4xl text-center text-warm-white mb-4">Explore</h2>
    <p class="text-steel-blue text-center mb-12 max-w-xl mx-auto">Three tools to help you understand neurodivergent brains — yours, and the ones you live and work with.</p>
    <div class="grid md:grid-cols-3 gap-8">
      <div onclick="navigateTo('profiles')" class="profile-card rounded-2xl p-8 cursor-pointer group">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-electric-teal/20 to-muted-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <i class="fas fa-fingerprint text-2xl text-electric-teal"></i>
        </div>
        <h3 class="font-display font-semibold text-xl text-warm-white mb-3">The Neurotypes</h3>
        <p class="text-steel-blue text-sm leading-relaxed">14 research-informed profiles covering Neurotypical, 7 ADD subtypes (Dr. Amen), Dyslexia, Autism Levels 1–3, and AuDHD. Each profile includes clinical dimensions from prevalence to hidden strengths.</p>
        <div class="flex flex-wrap gap-1.5 mt-4">
          ${NEUROTYPE_ORDER.map(id => `<span class="w-3 h-3 rounded-full" style="background:${NEUROTYPES[id].color}"></span>`).join('')}
        </div>
      </div>
      <div onclick="navigateTo('assessment')" class="profile-card rounded-2xl p-8 cursor-pointer group">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-warm-amber/20 to-soft-coral/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <i class="fas fa-compass text-2xl text-warm-amber"></i>
        </div>
        <h3 class="font-display font-semibold text-xl text-warm-white mb-3">Discover Your Brain</h3>
        <p class="text-steel-blue text-sm leading-relaxed">A 60-question self-assessment across 6 domains — now scoring against all 14 neurotype profiles. Not a diagnosis — a research-informed reflection tool.</p>
        <div class="mt-4 text-xs text-steel-blue/60">
          <i class="fas fa-lock mr-1"></i> Privacy-first: all data stays in your browser
        </div>
      </div>
      <div onclick="navigateTo('explorer')" class="profile-card rounded-2xl p-8 cursor-pointer group">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-muted-purple/20 to-soft-coral/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <i class="fas fa-handshake text-2xl text-muted-purple"></i>
        </div>
        <h3 class="font-display font-semibold text-xl text-warm-white mb-3">Brain Pair Explorer</h3>
        <p class="text-steel-blue text-sm leading-relaxed">Select two brain types and see how they interact in relationships. Discover harmony points, friction zones, communication bridges, and what each brain needs the other to know.</p>
      </div>
    </div>
  </section>

  <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="bg-mid-navy/50 border border-light-navy/50 rounded-2xl p-8 md:p-12 text-center">
      <i class="fas fa-exclamation-triangle text-warm-amber text-3xl mb-4"></i>
      <h3 class="font-display font-semibold text-xl text-warm-white mb-3">Important Disclaimer</h3>
      <p class="text-steel-blue leading-relaxed max-w-2xl mx-auto">
        This website is an <strong class="text-warm-white">educational tool</strong>, not a clinical assessment. 
        The profiles and self-screening tool are informed by peer-reviewed research and Dr. Daniel Amen's SPECT imaging research but are not a substitute 
        for professional evaluation. If you recognize yourself in these profiles, consider seeking a qualified 
        clinician who specializes in adult neurodevelopmental assessment.
      </p>
    </div>
  </section>`;
}

// ==================== NEUROTYPE PROFILES ====================
function renderProfiles() {
  const nt = NEUROTYPES[currentProfile];
  return `
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2 class="font-display font-bold text-3xl md:text-4xl text-warm-white mb-2">The Neurotypes</h2>
    <p class="text-steel-blue mb-6">Research-informed profiles of how different brains work in adults.</p>
    
    <!-- Grouped Neurotype Tabs -->
    <div class="mb-8 space-y-3">
      ${Object.entries(NEUROTYPE_GROUPS).map(([group, ids]) => `
        <div>
          <div class="text-xs text-steel-blue/60 uppercase tracking-wider font-medium mb-1.5 pl-1">${group}</div>
          <div class="neurotype-tabs-scroll">
            <div class="flex gap-1.5 pb-1 min-w-max">
              ${ids.map(id => {
                const n = NEUROTYPES[id];
                const shortName = n.name.replace('ADHD — ','').replace('ASD — ','').replace(' ADD','');
                return `<button onclick="selectProfile('${id}')" class="neurotype-tab flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${currentProfile === id ? 'active bg-light-navy/60 text-warm-white ring-1' : 'text-steel-blue hover:text-warm-white hover:bg-light-navy/30'}" style="${currentProfile === id ? 'ring-color:'+n.color+';border-bottom: 2px solid '+n.color : ''}">
                  <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${n.color}"></span>
                  <span>${shortName}</span>
                </button>`;
              }).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Profile Content -->
    <div class="section-enter">
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start gap-6 mb-10">
        <img src="${nt.icon}" alt="${nt.name}" class="neurotype-icon-lg flex-shrink-0" style="border-color:${nt.color}">
        <div>
          <h3 class="font-display font-bold text-2xl md:text-3xl text-warm-white mb-2">${nt.name}</h3>
          <p class="font-accent italic text-lg text-steel-blue leading-relaxed mb-4">${nt.tagline}</p>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style="background:${nt.color}20;color:${nt.color}">
            <i class="fas fa-chart-bar"></i>
            <span>Prevalence: ${nt.prevalence.split('.')[0]}.</span>
          </div>
        </div>
      </div>

      ${nt.amenType ? `
      <!-- Amen Brain Type -->
      <div class="bg-gradient-to-r from-mid-navy/60 to-light-navy/30 border border-light-navy/50 rounded-2xl p-6 mb-8">
        <h4 class="font-display font-semibold text-lg text-warm-white mb-3"><i class="fas fa-brain mr-2" style="color:${nt.color}"></i>Brain Imaging (Dr. Amen's SPECT Research)</h4>
        <p class="text-steel-blue leading-relaxed text-sm">${nt.amenType}</p>
      </div>` : ''}

      <!-- Core Challenge Highlight -->
      <div class="bg-mid-navy/60 border-l-4 rounded-r-xl p-6 mb-8" style="border-color:${nt.color}">
        <h4 class="font-display font-semibold text-lg text-warm-white mb-2"><i class="fas fa-bullseye mr-2" style="color:${nt.color}"></i>Core Challenge</h4>
        <p class="text-steel-blue leading-relaxed">${nt.coreChallenge}</p>
      </div>

      <!-- What They Need to Hear -->
      <div class="bg-gradient-to-r from-mid-navy/60 to-light-navy/30 border border-light-navy/50 rounded-2xl p-6 mb-8">
        <h4 class="font-display font-semibold text-lg text-warm-white mb-3"><i class="fas fa-comment-dots mr-2" style="color:${nt.color}"></i>What This Brain Needs to Hear</h4>
        <p class="quote-text text-warm-white/90 text-lg leading-relaxed">${nt.needToHear}</p>
      </div>

      <!-- Greatest Hidden Strength -->
      <div class="bg-mid-navy/40 border border-light-navy/30 rounded-2xl p-6 mb-8">
        <h4 class="font-display font-semibold text-lg text-warm-white mb-2"><i class="fas fa-star mr-2 text-warm-amber"></i>Greatest Hidden Strength</h4>
        <p class="text-steel-blue leading-relaxed">${nt.strength}</p>
      </div>

      <!-- All Dimensions -->
      <h4 class="font-display font-semibold text-xl text-warm-white mb-6">Detailed Profile</h4>
      <div class="grid md:grid-cols-2 gap-4">
        ${Object.entries(DIMENSION_LABELS).map(([key, dim]) => {
          if (key === 'coreChallenge' || key === 'strength' || key === 'amenType') return '';
          const val = nt[key];
          if (!val) return '';
          return `
          <div class="dimension-card">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas ${dim.icon} text-sm" style="color:${nt.color}"></i>
              <h5 class="font-display font-medium text-warm-white text-sm">${dim.label}</h5>
            </div>
            <p class="text-steel-blue text-sm leading-relaxed">${val}</p>
          </div>`;
        }).join('')}
      </div>
    </div>
  </section>`;
}

function selectProfile(id) {
  currentProfile = id;
  document.getElementById('app').innerHTML = renderProfiles();
}

// ==================== ASSESSMENT ====================
function renderAssessment() {
  if (assessmentState.completed && assessmentState.results) return renderAssessmentResults();
  
  // Check for saved state
  const saved = localStorage.getItem('ndb_assessment');
  if (saved && !assessmentState.answers[1]) {
    try {
      const parsed = JSON.parse(saved);
      assessmentState = { ...assessmentState, ...parsed };
    } catch(e) {}
  }

  const q = ASSESSMENT_QUESTIONS[assessmentState.currentQ];
  const domain = DOMAIN_LABELS[q.domain];
  const progress = ((assessmentState.currentQ) / ASSESSMENT_QUESTIONS.length) * 100;
  const answered = Object.keys(assessmentState.answers).length;

  if (!assessmentState.started && assessmentState.currentQ === 0 && answered === 0) {
    return renderAssessmentIntro();
  }

  return `
  <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display font-bold text-2xl text-warm-white">Discover Your Brain</h2>
      <button onclick="resetAssessment()" class="text-steel-blue hover:text-warm-white text-sm"><i class="fas fa-redo mr-1"></i>Start Over</button>
    </div>

    <!-- Progress -->
    <div class="mb-8">
      <div class="flex justify-between text-xs text-steel-blue mb-2">
        <span>${domain.name}</span>
        <span>${assessmentState.currentQ + 1} of ${ASSESSMENT_QUESTIONS.length}</span>
      </div>
      <div class="h-2 bg-light-navy rounded-full overflow-hidden">
        <div class="progress-bar h-full" style="width:${progress}%"></div>
      </div>
      <div class="flex justify-between mt-2">
        ${Object.entries(DOMAIN_LABELS).map(([k, d]) => {
          const domainQs = ASSESSMENT_QUESTIONS.filter(qu => qu.domain === k);
          const domainAnswered = domainQs.filter(qu => assessmentState.answers[qu.id] !== undefined).length;
          const isActive = q.domain === k;
          return `<div class="flex flex-col items-center gap-1">
            <i class="fas ${d.icon} text-xs ${isActive ? 'text-electric-teal' : (domainAnswered === domainQs.length ? 'text-soft-green' : 'text-steel-blue/40')}"></i>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Question -->
    <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-8 mb-6 section-enter">
      <div class="flex items-center gap-2 mb-4">
        <i class="fas ${domain.icon}" style="color:${domain.color}"></i>
        <span class="text-xs font-medium uppercase tracking-wider" style="color:${domain.color}">${domain.name}</span>
      </div>
      <p class="font-display text-xl text-warm-white leading-relaxed mb-8">${q.text}</p>
      <div class="grid grid-cols-5 gap-2 md:gap-3">
        ${LIKERT_OPTIONS.map(opt => `
          <button onclick="answerQuestion(${q.id}, ${opt.value})" class="likert-btn rounded-xl p-3 md:p-4 text-center ${assessmentState.answers[q.id] === opt.value ? 'selected' : ''}">
            <div class="font-display font-bold text-lg md:text-xl mb-1">${opt.value}</div>
            <div class="text-xs text-steel-blue">${opt.label}</div>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <button onclick="prevQuestion()" class="px-6 py-2.5 rounded-lg text-sm font-medium text-steel-blue hover:text-warm-white hover:bg-light-navy/50 transition-all ${assessmentState.currentQ === 0 ? 'invisible' : ''}">
        <i class="fas fa-arrow-left mr-2"></i>Previous
      </button>
      ${assessmentState.currentQ === ASSESSMENT_QUESTIONS.length - 1 ? 
        `<button onclick="finishAssessment()" class="px-8 py-2.5 bg-electric-teal text-deep-navy font-display font-semibold rounded-lg hover:bg-electric-teal/90 transition-all ${answered < 60 ? 'opacity-50' : ''}" ${answered < 55 ? 'disabled' : ''}>
          <i class="fas fa-chart-radar mr-2"></i>See Results
        </button>` :
        `<button onclick="nextQuestion()" class="px-6 py-2.5 rounded-lg text-sm font-medium text-electric-teal hover:bg-electric-teal/10 transition-all">
          Next<i class="fas fa-arrow-right ml-2"></i>
        </button>`
      }
    </div>
  </section>`;
}

function renderAssessmentIntro() {
  return `
  <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <div class="w-20 h-20 rounded-full bg-gradient-to-br from-electric-teal/20 to-muted-purple/20 flex items-center justify-center mx-auto mb-6">
        <i class="fas fa-compass text-3xl text-electric-teal"></i>
      </div>
      <h2 class="font-display font-bold text-3xl md:text-4xl text-warm-white mb-4">Discover Your Brain</h2>
      <p class="text-steel-blue text-lg max-w-xl mx-auto">A 60-question self-reflection tool across 6 cognitive domains. Scoring against 14 neurotype profiles — including Dr. Amen's 7 ADD subtypes. Understand your brain profile — not as a diagnosis, but as a starting point.</p>
    </div>

    <div class="grid md:grid-cols-3 gap-4 mb-10">
      ${Object.entries(DOMAIN_LABELS).map(([k, d]) => `
        <div class="bg-mid-navy/40 border border-light-navy/30 rounded-xl p-4 text-center">
          <i class="fas ${d.icon} text-xl mb-2" style="color:${d.color}"></i>
          <h4 class="font-display font-medium text-warm-white text-sm">${d.name}</h4>
          <p class="text-steel-blue/60 text-xs mt-1">10 questions</p>
        </div>
      `).join('')}
    </div>

    <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6 mb-8">
      <h4 class="font-display font-semibold text-warm-white mb-3"><i class="fas fa-shield-alt text-electric-teal mr-2"></i>Your Privacy</h4>
      <p class="text-steel-blue text-sm leading-relaxed">All responses stay in your browser using localStorage. Nothing is sent to any server. You can clear your data at any time.</p>
    </div>

    <div class="bg-warm-amber/10 border border-warm-amber/20 rounded-2xl p-6 mb-8">
      <h4 class="font-display font-semibold text-warm-amber mb-3"><i class="fas fa-exclamation-triangle mr-2"></i>Important</h4>
      <p class="text-steel-blue text-sm leading-relaxed">This is an educational self-reflection tool, not a clinical instrument. Results suggest patterns worth exploring with a professional — they do not constitute a diagnosis.</p>
    </div>

    <div class="text-center">
      <button onclick="startAssessment()" class="px-10 py-4 bg-electric-teal text-deep-navy font-display font-bold text-lg rounded-xl hover:bg-electric-teal/90 transition-all transform hover:scale-105">
        Begin Assessment <i class="fas fa-arrow-right ml-2"></i>
      </button>
      <p class="text-steel-blue/50 text-xs mt-3">Takes approximately 10–15 minutes</p>
    </div>
  </section>`;
}

function startAssessment() {
  assessmentState = { currentQ: 0, answers: {}, completed: false, results: null, started: true };
  document.getElementById('app').innerHTML = renderAssessment();
}

function answerQuestion(qId, value) {
  assessmentState.answers[qId] = value;
  localStorage.setItem('ndb_assessment', JSON.stringify({ answers: assessmentState.answers, currentQ: assessmentState.currentQ }));
  setTimeout(() => {
    if (assessmentState.currentQ < ASSESSMENT_QUESTIONS.length - 1) {
      assessmentState.currentQ++;
      document.getElementById('app').innerHTML = renderAssessment();
    } else {
      document.getElementById('app').innerHTML = renderAssessment();
    }
  }, 200);
}

function nextQuestion() {
  if (assessmentState.currentQ < ASSESSMENT_QUESTIONS.length - 1) {
    assessmentState.currentQ++;
    document.getElementById('app').innerHTML = renderAssessment();
  }
}

function prevQuestion() {
  if (assessmentState.currentQ > 0) {
    assessmentState.currentQ--;
    document.getElementById('app').innerHTML = renderAssessment();
  }
}

function resetAssessment() {
  assessmentState = { currentQ: 0, answers: {}, completed: false, results: null, started: false };
  localStorage.removeItem('ndb_assessment');
  document.getElementById('app').innerHTML = renderAssessment();
}

function finishAssessment() {
  const results = calculateAssessmentResults(assessmentState.answers);
  assessmentState.completed = true;
  assessmentState.results = results;
  document.getElementById('app').innerHTML = renderAssessmentResults();
}

function renderAssessmentResults() {
  const r = assessmentState.results;
  const top3 = r.sorted.slice(0, 3);
  
  return `
  <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display font-bold text-2xl text-warm-white">Your Brain Profile</h2>
      <button onclick="resetAssessment()" class="text-steel-blue hover:text-warm-white text-sm"><i class="fas fa-redo mr-1"></i>Retake</button>
    </div>

    <!-- Radar Chart -->
    <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6 mb-8">
      <h3 class="font-display font-semibold text-lg text-warm-white mb-4 text-center">Brain Profile Spectrum</h3>
      <div class="radar-container">
        <canvas id="radarChart" width="500" height="500"></canvas>
      </div>
    </div>

    <!-- Top Results -->
    <div class="mb-8">
      <h3 class="font-display font-semibold text-lg text-warm-white mb-4">Your Strongest Alignments</h3>
      <div class="space-y-4">
        ${top3.map((t, i) => `
          <div class="bg-mid-navy/60 border border-light-navy/50 rounded-xl p-5 flex items-center gap-4">
            <div class="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-deep-navy font-display font-bold text-lg" style="background:${t.color}">
              ${i + 1}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-display font-semibold text-warm-white">${t.name}</h4>
                <span class="font-display font-bold text-lg" style="color:${t.color}">${t.score}%</span>
              </div>
              <div class="h-2 bg-light-navy rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000" style="width:${t.score}%;background:${t.color}"></div>
              </div>
              <p class="text-steel-blue text-xs mt-2">${NEUROTYPES[t.id].tagline}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- All Scores -->
    <div class="bg-mid-navy/40 border border-light-navy/30 rounded-2xl p-6 mb-8">
      <h3 class="font-display font-semibold text-warm-white mb-4">All Profile Scores</h3>
      <div class="space-y-3">
        ${r.sorted.map(t => `
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${t.color}"></span>
            <span class="text-sm text-steel-blue w-44 flex-shrink-0">${t.name}</span>
            <div class="flex-1 h-2 bg-light-navy rounded-full overflow-hidden">
              <div class="h-full rounded-full" style="width:${t.score}%;background:${t.color}"></div>
            </div>
            <span class="text-sm font-medium w-12 text-right" style="color:${t.color}">${t.score}%</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Interpretation -->
    <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6 mb-8">
      <h3 class="font-display font-semibold text-warm-white mb-4"><i class="fas fa-info-circle text-electric-teal mr-2"></i>Understanding Your Results</h3>
      <div class="space-y-3 text-steel-blue text-sm leading-relaxed">
        <p>Your results show trait alignment across a spectrum — this is not a binary label. Most people show traits across multiple profiles.</p>
        <p>Your strongest alignment with <strong class="text-warm-white">${top3[0].name}</strong> (${top3[0].score}%) suggests you may relate most to this brain profile's patterns.</p>
        ${top3[1].score > 30 ? `<p>Your secondary alignment with <strong class="text-warm-white">${top3[1].name}</strong> (${top3[1].score}%) suggests overlap with these traits as well.</p>` : ''}
        <p class="text-warm-amber/80"><i class="fas fa-exclamation-triangle mr-1"></i> Remember: This is an educational reflection tool, not a clinical assessment. Consider exploring these patterns with a qualified professional.</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-wrap gap-4 justify-center">
      <button onclick="navigateTo('profiles','${top3[0].id}')" class="px-6 py-3 bg-electric-teal text-deep-navy font-display font-semibold rounded-lg hover:bg-electric-teal/90 transition-all">
        <i class="fas fa-brain mr-2"></i>Read ${top3[0].name} Profile
      </button>
      <button onclick="navigateTo('explorer')" class="px-6 py-3 border-2 border-muted-purple text-muted-purple font-display font-semibold rounded-lg hover:bg-muted-purple/10 transition-all">
        <i class="fas fa-handshake mr-2"></i>Explore Brain Pairs
      </button>
    </div>
  </section>`;
}

// ==================== BRAIN PAIR EXPLORER ====================
function renderExplorer() {
  return `
  <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2 class="font-display font-bold text-3xl md:text-4xl text-warm-white mb-2">Brain Pair Explorer</h2>
    <p class="text-steel-blue mb-8">Select two brain types to explore how they interact in long-term relationships.</p>

    <!-- Brain Selection -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <div>
        <h3 class="font-display font-semibold text-warm-white mb-3"><span class="text-electric-teal">Brain A</span> — Select a neurotype</h3>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          ${NEUROTYPE_ORDER.map(id => {
            const n = NEUROTYPES[id];
            const shortName = n.name.replace('ADHD — ','').replace('ASD — ','').replace(' ADD','');
            return `<button onclick="selectBrainA('${id}')" class="brain-selector rounded-xl p-2 text-center bg-mid-navy/60 border border-light-navy/50 ${explorerState.brainA === id ? 'selected' : ''}" style="${explorerState.brainA === id ? 'border-color:'+n.color+';box-shadow:0 0 0 2px '+n.color+'40' : ''}">
              <img src="${n.icon}" alt="${n.name}" class="w-8 h-8 rounded-full mx-auto mb-1 border-2" style="border-color:${n.color}">
              <span class="text-[10px] leading-tight font-medium block" style="color:${explorerState.brainA === id ? n.color : '#A0B4C8'}">${shortName}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
      <div>
        <h3 class="font-display font-semibold text-warm-white mb-3"><span class="text-muted-purple">Brain B</span> — Select a neurotype</h3>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          ${NEUROTYPE_ORDER.map(id => {
            const n = NEUROTYPES[id];
            const shortName = n.name.replace('ADHD — ','').replace('ASD — ','').replace(' ADD','');
            return `<button onclick="selectBrainB('${id}')" class="brain-selector rounded-xl p-2 text-center bg-mid-navy/60 border border-light-navy/50 ${explorerState.brainB === id ? 'selected' : ''}" style="${explorerState.brainB === id ? 'border-color:'+n.color+';box-shadow:0 0 0 2px '+n.color+'40' : ''}">
              <img src="${n.icon}" alt="${n.name}" class="w-8 h-8 rounded-full mx-auto mb-1 border-2" style="border-color:${n.color}">
              <span class="text-[10px] leading-tight font-medium block" style="color:${explorerState.brainB === id ? n.color : '#A0B4C8'}">${shortName}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </div>

    ${explorerState.brainA && explorerState.brainB ? `
      <!-- View Toggle -->
      <div class="flex justify-center mb-6">
        <div class="view-toggle">
          <button onclick="setExplorerView('narrative')" class="view-toggle-btn ${explorerState.view === 'narrative' ? 'active' : ''}">
            <i class="fas fa-scroll mr-1.5"></i>Relationship Narrative
          </button>
          <button onclick="setExplorerView('table')" class="view-toggle-btn ${explorerState.view === 'table' ? 'active' : ''}">
            <i class="fas fa-table mr-1.5"></i>Side-by-Side Comparison
          </button>
        </div>
      </div>
      ${explorerState.view === 'narrative' ? renderPairingReport() : renderComparisonTable()}
    ` : `
      <div class="text-center py-16 bg-mid-navy/30 border border-light-navy/30 rounded-2xl">
        <i class="fas fa-brain text-4xl text-steel-blue/30 mb-4"></i>
        <p class="text-steel-blue">Select two brain types above to see their relationship dynamics.</p>
      </div>
    `}
  </section>`;
}

function selectBrainA(id) { explorerState.brainA = id; document.getElementById('app').innerHTML = renderExplorer(); }
function selectBrainB(id) { explorerState.brainB = id; document.getElementById('app').innerHTML = renderExplorer(); }
function setExplorerView(view) { explorerState.view = view; document.getElementById('app').innerHTML = renderExplorer(); }

function renderComparisonTable() {
  const table = generateComparisonTable(explorerState.brainA, explorerState.brainB);
  if (!table) return '<p class="text-steel-blue">Unable to generate comparison table.</p>';
  
  const a = table.brainA;
  const b = table.brainB;

  return `
    <div class="section-enter">
      <!-- Header -->
      <div class="bg-gradient-to-r from-mid-navy to-light-navy/50 border border-light-navy/50 rounded-2xl p-6 md:p-8 mb-8">
        <div class="flex items-center justify-center gap-6 mb-4">
          <div class="text-center">
            <img src="${a.icon}" alt="${a.name}" class="w-16 h-16 rounded-full mx-auto border-3" style="border-color:${a.color}">
            <span class="text-sm font-medium mt-2 block" style="color:${a.color}">${a.name}</span>
          </div>
          <div class="text-electric-teal text-2xl"><i class="fas fa-arrows-left-right"></i></div>
          <div class="text-center">
            <img src="${b.icon}" alt="${b.name}" class="w-16 h-16 rounded-full mx-auto border-3" style="border-color:${b.color}">
            <span class="text-sm font-medium mt-2 block" style="color:${b.color}">${b.name}</span>
          </div>
        </div>
        <h3 class="font-display font-bold text-xl text-warm-white text-center mb-3">How These Brains Experience the World Differently</h3>
        <p class="text-steel-blue text-center text-sm leading-relaxed max-w-2xl mx-auto">A dimension-by-dimension comparison of how each brain shows up in relationships \u2014 where they collide, where they complement, and what each needs the other to understand.</p>
      </div>

      <!-- Comparison Table -->
      <div class="comparison-table-container">
        <table class="comparison-table" style="--brain-a-color:${a.color};--brain-b-color:${b.color}">
          <thead>
            <tr>
              <th class="text-steel-blue/60"><i class="fas fa-layer-group mr-1.5"></i>Dimension</th>
              <th>
                <div class="col-header-brain" style="color:${a.color}">
                  <img src="${a.icon}" alt="" style="border-color:${a.color}">
                  <span>${a.name}</span>
                </div>
              </th>
              <th>
                <div class="col-header-brain" style="color:${b.color}">
                  <img src="${b.icon}" alt="" style="border-color:${b.color}">
                  <span>${b.name}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            ${table.rows.map(row => `
              <tr>
                <td>
                  <div class="dim-icon-cell">
                    <i class="fas ${row.icon}" style="color:${row.color}"></i>
                    <div class="dim-label-text">${row.label}</div>
                  </div>
                </td>
                <td data-brain-a="${a.name}" style="--brain-a-color:${a.color}">${row.brainA}</td>
                <td data-brain-b="${b.name}" style="--brain-b-color:${b.color}">${row.brainB}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Disclaimer -->
      <div class="bg-warm-amber/10 border border-warm-amber/20 rounded-2xl p-5 mt-8">
        <p class="text-steel-blue text-xs leading-relaxed"><i class="fas fa-exclamation-triangle text-warm-amber mr-2"></i>This comparison is an educational tool for understanding neurological differences in relationships. Every individual is unique \u2014 these profiles describe patterns, not people. Always consult qualified professionals for clinical guidance.</p>
      </div>
    </div>`;
}

function renderPairingReport() {
  const report = generatePairingReport(explorerState.brainA, explorerState.brainB);
  if (!report) return '<p class="text-steel-blue">Unable to generate report.</p>';
  
  const a = report.brainA;
  const b = report.brainB;

  return `
    <div class="section-enter">
      <!-- Header -->
      <div class="bg-gradient-to-r from-mid-navy to-light-navy/50 border border-light-navy/50 rounded-2xl p-6 md:p-8 mb-8">
        <div class="flex items-center justify-center gap-6 mb-4">
          <div class="text-center">
            <img src="${a.icon}" alt="${a.name}" class="w-16 h-16 rounded-full mx-auto border-3" style="border-color:${a.color}">
            <span class="text-sm font-medium mt-2 block" style="color:${a.color}">${a.name}</span>
          </div>
          <div class="text-electric-teal text-2xl"><i class="fas fa-exchange-alt"></i></div>
          <div class="text-center">
            <img src="${b.icon}" alt="${b.name}" class="w-16 h-16 rounded-full mx-auto border-3" style="border-color:${b.color}">
            <span class="text-sm font-medium mt-2 block" style="color:${b.color}">${b.name}</span>
          </div>
        </div>
        <h3 class="font-display font-bold text-xl text-warm-white text-center mb-3">When ${a.name} Meets ${b.name}</h3>
        <p class="text-steel-blue text-center leading-relaxed max-w-2xl mx-auto">${report.overview}</p>
      </div>

      <!-- Areas of Harmony -->
      <div class="mb-8">
        <h4 class="font-display font-semibold text-lg text-soft-green mb-4"><i class="fas fa-heart mr-2"></i>Where You Connect</h4>
        <div class="space-y-4">
          ${report.harmony.map(h => `
            <div class="pairing-section harmony">
              <h5 class="font-display font-medium text-warm-white mb-2">${h.title}</h5>
              <p class="text-steel-blue text-sm leading-relaxed">${h.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Areas of Friction -->
      <div class="mb-8">
        <h4 class="font-display font-semibold text-lg text-soft-coral mb-4"><i class="fas fa-bolt mr-2"></i>Where You Collide</h4>
        <div class="space-y-4">
          ${report.friction.map(f => `
            <div class="pairing-section friction">
              <h5 class="font-display font-medium text-warm-white mb-2">${f.title}</h5>
              <p class="text-steel-blue text-sm leading-relaxed mb-3">${f.desc}</p>
              ${f.fromA ? `
              <div class="grid md:grid-cols-2 gap-3 mt-3">
                <div class="bg-deep-navy/50 rounded-lg p-3">
                  <span class="text-xs font-medium block mb-1" style="color:${a.color}">${a.name} feels:</span>
                  <p class="quote-text text-warm-white/80 text-sm">"${f.fromA}"</p>
                </div>
                <div class="bg-deep-navy/50 rounded-lg p-3">
                  <span class="text-xs font-medium block mb-1" style="color:${b.color}">${b.name} feels:</span>
                  <p class="quote-text text-warm-white/80 text-sm">"${f.fromB}"</p>
                </div>
              </div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Communication Bridges -->
      <div class="mb-8">
        <h4 class="font-display font-semibold text-lg text-warm-amber mb-4"><i class="fas fa-bridge mr-2"></i>Communication Bridges</h4>
        <div class="space-y-4">
          ${report.bridges.map(br => `
            <div class="pairing-section bridge">
              <h5 class="font-display font-medium text-warm-white mb-2">${br.title}</h5>
              <p class="text-steel-blue text-sm leading-relaxed">${br.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Environment Design -->
      <div class="mb-8">
        <h4 class="font-display font-semibold text-lg text-electric-teal mb-4"><i class="fas fa-home mr-2"></i>Environment Design</h4>
        <div class="bg-mid-navy/40 border border-light-navy/30 rounded-xl p-5">
          <p class="text-steel-blue text-sm leading-relaxed">${report.envDesign}</p>
        </div>
      </div>

      <!-- What Each Brain Needs the Other to Know -->
      <div class="mb-8">
        <h4 class="font-display font-semibold text-lg text-muted-purple mb-4"><i class="fas fa-envelope-open-text mr-2"></i>What Each Brain Needs the Other to Know</h4>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-mid-navy/60 border rounded-xl p-5" style="border-color:${a.color}40">
            <div class="flex items-center gap-2 mb-3">
              <img src="${a.icon}" alt="" class="w-8 h-8 rounded-full border-2" style="border-color:${a.color}">
              <span class="font-display font-medium text-sm" style="color:${a.color}">From the ${a.name} brain:</span>
            </div>
            <p class="quote-text text-warm-white/80 text-sm leading-relaxed">${report.needToKnowA}</p>
          </div>
          <div class="bg-mid-navy/60 border rounded-xl p-5" style="border-color:${b.color}40">
            <div class="flex items-center gap-2 mb-3">
              <img src="${b.icon}" alt="" class="w-8 h-8 rounded-full border-2" style="border-color:${b.color}">
              <span class="font-display font-medium text-sm" style="color:${b.color}">From the ${b.name} brain:</span>
            </div>
            <p class="quote-text text-warm-white/80 text-sm leading-relaxed">${report.needToKnowB}</p>
          </div>
        </div>
      </div>
    </div>`;
}

// ==================== ABOUT PAGE ====================
function renderAbout() {
  return `
  <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="font-display font-bold text-3xl md:text-4xl text-warm-white mb-6">About This Project</h2>
    
    <div class="space-y-6 text-steel-blue leading-relaxed">
      <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6">
        <h3 class="font-display font-semibold text-warm-white mb-3"><i class="fas fa-bullseye text-electric-teal mr-2"></i>Purpose</h3>
        <p>The Neurodivergent Brain is an educational resource designed to help adults understand neurodivergent brain profiles. It draws from peer-reviewed clinical research and Dr. Daniel Amen's SPECT imaging work to present complex neuroscience in accessible, identity-affirming language.</p>
      </div>

      <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6">
        <h3 class="font-display font-semibold text-warm-white mb-3"><i class="fas fa-book text-muted-purple mr-2"></i>Research Sources</h3>
        <ul class="space-y-2 text-sm">
          <li><i class="fas fa-check text-electric-teal mr-2"></i>PMC/NIH peer-reviewed literature</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>DSM-5-TR (Diagnostic and Statistical Manual)</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>American Psychological Association (APA)</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>Dr. Daniel Amen — SPECT imaging, 7 ADD subtypes</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>Barkley, R.A. (2015) — ADHD executive function research</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>Willcutt et al. (2012) — ADHD/Dyslexia comorbidity</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>Monotropism theory (Murray, Lesser & Lawson)</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>CAT-Q Camouflaging framework (Hull et al.)</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>RAADS-R adult autism assessment (Ritvo et al.)</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>Rong et al. (2021) — AuDHD neurological distinctness</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>Interoception & Alexithymia research (Murphy et al.)</li>
          <li><i class="fas fa-check text-electric-teal mr-2"></i>Autistic Burnout research (Raymaker et al., 2020)</li>
        </ul>
      </div>

      <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6">
        <h3 class="font-display font-semibold text-warm-white mb-3"><i class="fas fa-brain text-warm-amber mr-2"></i>About Dr. Amen's 7 ADD Types</h3>
        <p class="mb-3">Dr. Daniel Amen identified 7 distinct types of ADD based on SPECT (Single Photon Emission Computed Tomography) brain imaging, which measures blood flow and metabolic activity in the brain. Unlike the DSM-5's behavioral observation model, Amen's approach identifies neurophysiological subtypes that explain why the same medication doesn't work for all ADHD presentations.</p>
        <p class="text-sm text-steel-blue/80">Note: While Amen's 7-type model is clinically influential, it is not universally endorsed by all professional organizations. The APA and some neuro-ethicists argue SPECT lacks diagnostic specificity. This site presents the model as one valuable lens alongside DSM-5 classifications.</p>
      </div>

      <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6">
        <h3 class="font-display font-semibold text-warm-white mb-3"><i class="fas fa-shield-alt text-soft-green mr-2"></i>Privacy</h3>
        <p>This site is privacy-first. Assessment responses are stored locally in your browser (localStorage) and are never transmitted to any server. No tracking, no analytics, no data collection.</p>
      </div>

      <div class="bg-mid-navy/60 border border-light-navy/50 rounded-2xl p-6">
        <h3 class="font-display font-semibold text-warm-white mb-3"><i class="fas fa-heart text-soft-coral mr-2"></i>Philosophy</h3>
        <p>This project takes a <strong class="text-warm-white">neurodiversity-affirming</strong> approach. Neurodivergence is not a deficit to be corrected but a difference to be understood. Every brain on this page has genuine strengths and genuine challenges. Our goal is to illuminate both with compassion and clinical accuracy.</p>
      </div>

      <div class="bg-warm-amber/10 border border-warm-amber/20 rounded-2xl p-6">
        <h3 class="font-display font-semibold text-warm-amber mb-3"><i class="fas fa-exclamation-triangle mr-2"></i>Clinical Disclaimer</h3>
        <p>This website is an educational tool. It is not a clinical assessment and cannot provide a diagnosis. The self-screening tool is designed to facilitate self-reflection and conversation with qualified professionals — not to replace professional evaluation.</p>
      </div>
    </div>
  </section>`;
}

// ==================== CHART RENDERING ====================
function renderRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas || !assessmentState.results) return;
  
  const r = assessmentState.results;
  const labels = NEUROTYPE_ORDER.map(id => {
    let name = NEUROTYPES[id].name;
    return name.replace('ADHD — ','').replace('ASD — ','').replace(' ADD','');
  });
  const data = NEUROTYPE_ORDER.map(id => r.normalized[id]);
  const colors = NEUROTYPE_ORDER.map(id => NEUROTYPES[id].color);

  new Chart(canvas, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Your Profile',
        data,
        backgroundColor: 'rgba(100, 223, 223, 0.15)',
        borderColor: '#64DFDF',
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: colors,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { 
            stepSize: 25, 
            color: '#A0B4C8',
            backdropColor: 'transparent',
            font: { size: 9 }
          },
          grid: { color: 'rgba(160, 180, 200, 0.15)' },
          angleLines: { color: 'rgba(160, 180, 200, 0.15)' },
          pointLabels: { 
            color: '#E8E6E1', 
            font: { size: 9, family: 'Space Grotesk' }
          }
        }
      }
    }
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});

// Watch for chart canvas to appear and render
const observer = new MutationObserver(() => {
  if (document.getElementById('radarChart')) {
    setTimeout(renderRadarChart, 100);
  }
});
observer.observe(document.body, { childList: true, subtree: true });
