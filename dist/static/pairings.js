// ============================================================
// THE NEURODIVERGENT BRAIN — Brain Pair Explorer Data v2
// Enhanced: Conflict Dashboard, 5 Most Dangerous Moments,
// Repair Toolkit, Compatibility Fingerprint, and rich
// relational dynamics for all neurotype pairings.
// ============================================================

function generatePairingReport(brainA, brainB) {
  const a = NEUROTYPES[brainA];
  const b = NEUROTYPES[brainB];
  if (!a || !b) return null;

  const key = [brainA, brainB].sort().join('|');
  const specific = PAIRING_DATA[key];

  if (specific) return { ...specific, brainA: a, brainB: b };

  // Generate dynamic pairing based on profile traits
  return generateDynamicPairing(a, b);
}

function generateDynamicPairing(a, b) {
  const harmony = [];
  const friction = [];
  const bridges = [];

  const aTraits = getTraitProfile(a.id);
  const bTraits = getTraitProfile(b.id);

  // Find harmony
  if (aTraits.masking && bTraits.masking) harmony.push({ title: 'Shared Understanding of Masking', desc: `Both ${a.name} and ${b.name} brains understand the exhaustion of presenting a "normal" face to the world. This shared experience creates a deep, unspoken bond — neither has to explain why they collapse at the end of the day.` });
  if (aTraits.intensity && bTraits.intensity) harmony.push({ title: 'Emotional Depth', desc: `Both brains experience emotions with intensity. While this can be overwhelming, it also means both partners are capable of deep, passionate connection and genuine empathy when they understand each other's patterns.` });
  if (aTraits.creative && bTraits.creative) harmony.push({ title: 'Creative Synergy', desc: `Both brains bring creative problem-solving to the relationship. ${a.name} and ${b.name} can brainstorm together in ways that feel electric — building on each other's unconventional ideas.` });
  if (!harmony.length) harmony.push({ title: 'Complementary Perspectives', desc: `${a.name} and ${b.name} bring fundamentally different cognitive approaches. What one brain sees clearly, the other may miss — and vice versa. This creates a partnership that covers more ground than either brain alone.` });

  // Find friction
  if (aTraits.needsRoutine !== bTraits.needsRoutine) friction.push({ title: 'Routine vs. Spontaneity', desc: `One brain craves predictability while the other seeks novelty. This creates a fundamental tension around scheduling, planning, and daily life that requires conscious negotiation.`, fromA: `I need to know what's coming. Surprises aren't fun for me — they're destabilizing.`, fromB: `I need variety and flexibility. Rigid schedules make me feel trapped and suffocated.` });
  if (aTraits.processing !== bTraits.processing) friction.push({ title: 'Processing Speed Mismatch', desc: `These brains process information at different speeds and in different ways. One may need time to think; the other may think out loud. This creates misunderstandings around "why can't you just decide?" or "why won't you let me finish thinking?"`, fromA: `When I go quiet, I'm not ignoring you — I'm processing. Please give me space to think.`, fromB: `When I talk things through, I'm not expecting you to solve it — I'm thinking out loud.` });
  if (aTraits.sensoryNeeds !== bTraits.sensoryNeeds) friction.push({ title: 'Sensory Environment Conflict', desc: `These brains have different sensory needs. Volume, lighting, temperature, and physical space preferences may clash. One person's comfort zone is the other's discomfort zone.`, fromA: `The environment isn't a preference — it's a need. When it's wrong, I can't function.`, fromB: `I'm not being difficult — my brain genuinely needs different sensory input to feel okay.` });
  if (aTraits.rigidity && bTraits.rigidity) friction.push({ title: 'Double Rigidity Lock', desc: `Both brains have difficulty with cognitive flexibility. When disagreements arise, neither can easily "give" — creating standoffs that escalate not from malice but from neurological inflexibility.`, fromA: `I can't just 'let it go' — my brain won't release this position until it feels resolved.`, fromB: `I hear you, but my brain is also locked. We need a structured process to find middle ground.` });
  if (aTraits.moodVolatility || bTraits.moodVolatility) {
    if (aTraits.moodVolatility !== bTraits.moodVolatility) friction.push({ title: 'Mood Volatility vs. Stability', desc: `One brain experiences rapid, intense mood shifts while the other operates on a more predictable emotional baseline. The volatile partner feels misunderstood; the stable partner feels destabilized.`, fromA: `My moods are not a choice. They sweep through me like weather — real but temporary.`, fromB: `I want to support you, but the unpredictability makes it hard to know which version of 'us' I'm walking into.` });
  }
  if (aTraits.anxietyDriven || bTraits.anxietyDriven) {
    if (aTraits.anxietyDriven !== bTraits.anxietyDriven) friction.push({ title: 'Anxiety-Driven Avoidance', desc: `One brain's anxiety creates avoidance patterns — declining invitations, delaying decisions, avoiding conflict. The other partner may interpret this as disinterest rather than fear.`, fromA: `When I avoid things, it's not because I don't care — it's because the fear is louder than the motivation.`, fromB: `I need to understand that your hesitation is anxiety, not rejection. Help me see the difference.` });
  }
  if (!friction.length) friction.push({ title: 'Shared Blind Spots', desc: `When two similar brains pair together, the areas both struggle with can become amplified. Neither partner compensates for the other's challenges, which means both need to actively build external support systems.`, fromA: `We understand each other deeply, but we also share the same blind spots.`, fromB: `We need to build systems together because neither of us naturally covers the other's gaps.` });

  // Bridges
  bridges.push({ title: 'Name the Neurology', desc: `When conflict arises, pause and ask: "Is this a brain difference or a values difference?" Neurological differences require accommodation. Values differences require conversation. Both are valid, but the approach is fundamentally different.` });
  bridges.push({ title: 'Create a Shared Manual', desc: `Each partner writes a "User Guide to My Brain" — covering energy patterns, sensory needs, communication preferences, and shutdown triggers. Exchange manuals and revisit them regularly.` });
  bridges.push({ title: 'Build Repair Rituals', desc: `Every brain pair will have friction. What matters is the repair. Agree on a low-stakes phrase like "I think our brains are colliding right now" that pauses conflict without assigning blame.` });

  // Dynamic conflict dashboard
  const conflictDashboard = generateDynamicConflictDashboard(a, b, aTraits, bTraits);

  // Dynamic fingerprint
  const fingerprint = generateDynamicFingerprint(a.id, b.id);

  return {
    brainA: a, brainB: b,
    overview: `When a ${a.name} brain meets a ${b.name} brain, the dynamic is shaped by fundamentally different neurological architectures. Understanding these differences transforms frustration into compassion and conflict into connection.`,
    harmony, friction, bridges,
    conflictDashboard,
    fingerprint,
    envDesign: `Create shared spaces with flexibility: zones for quiet focus and zones for stimulation. Use visual systems (shared calendars, whiteboards) rather than relying on verbal agreements that one brain may not retain. Designate a "reset space" each partner can retreat to without it meaning rejection.`,
    needToKnowA: `"My brain isn't choosing to frustrate you. The things that seem easy for you — ${getStruggleDescription(a.id)} — are genuinely hard for my neurology. When you see me struggling, I need patience, not advice."`,
    needToKnowB: `"My brain isn't choosing to frustrate you. The things that seem easy for you — ${getStruggleDescription(b.id)} — are genuinely hard for my neurology. When you see me struggling, I need patience, not advice."`
  };
}

function generateDynamicConflictDashboard(a, b, aTraits, bTraits) {
  const dangerousMoments = [];
  const repairToolkit = [];

  if (aTraits.needsRoutine !== bTraits.needsRoutine) {
    dangerousMoments.push({ icon: 'fa-calendar-xmark', title: 'The Unexpected Plan Change', desc: `One partner changes or cancels plans last-minute. The routine-dependent brain enters crisis mode; the flexible brain is baffled by the reaction.` });
  }
  if (aTraits.moodVolatility || bTraits.moodVolatility) {
    dangerousMoments.push({ icon: 'fa-volcano', title: 'The Emotional Storm', desc: `One brain's mood episode hits without warning. The other partner doesn't know whether to engage, retreat, or problem-solve — and any choice feels wrong.` });
  }
  if (aTraits.processing !== bTraits.processing) {
    dangerousMoments.push({ icon: 'fa-comments', title: 'The Conversation at Different Speeds', desc: `One brain needs to process out loud and immediately; the other needs silence to think first. Both interpret the mismatch as disrespect.` });
  }
  if (aTraits.rigidity || bTraits.rigidity) {
    dangerousMoments.push({ icon: 'fa-lock', title: 'The Locked-In Argument', desc: `A disagreement that should be minor becomes a standoff. One or both brains can't release the loop — the argument circles for hours without resolution.` });
  }
  if (aTraits.anxietyDriven || bTraits.anxietyDriven) {
    dangerousMoments.push({ icon: 'fa-person-running', title: 'The Avoidance Disappearance', desc: `One partner goes quiet, avoids topics, or withdraws from making plans. The other reads it as disinterest or rejection rather than anxiety.` });
  }
  // Always add this one
  dangerousMoments.push({ icon: 'fa-battery-empty', title: 'Hitting the Wall Simultaneously', desc: `Both partners reach depletion at the same time — neither can co-regulate the other. Without a repair protocol, the collision escalates into a relationship rupture.` });

  // Standard repair toolkit
  repairToolkit.push({ icon: 'fa-pause', title: 'The 10-Minute Pause Rule', desc: `When a conversation escalates, either partner can call a 10-minute pause by saying "I need to regulate." This is not stonewalling — it's a neurological time-out. Agree to return to the topic within 30 minutes.`, color: '#22D3EE' });
  repairToolkit.push({ icon: 'fa-brain', title: 'Translate the Behavior', desc: `Before reacting, ask: "What neurological event might be behind this behavior?" Forgetting = working memory failure. Withdrawal = overwhelm. Rigidity = activation. Naming the neurology de-escalates blame.`, color: '#8B5CF6' });
  repairToolkit.push({ icon: 'fa-clipboard-list', title: 'The Shared User Guide', desc: `Each partner writes their personal "brain manual" — energy rhythms, top 3 triggers, sensory needs, what helps most when overwhelmed. Review together monthly. This is preventive, not reactive.`, color: '#F59E0B' });
  repairToolkit.push({ icon: 'fa-handshake', title: 'Repair Phrase Ritual', desc: `Agree on a low-stakes phrase that signals "our brains are in collision right now" — without blame. Something like "I think our wiring is tangling." This phrase pauses the fight and reframes it as a shared neurological event.`, color: '#34D399' });

  const conflictSynthesis = `${a.name} and ${b.name} are most likely to collide around ${
    aTraits.needsRoutine !== bTraits.needsRoutine ? 'structure vs. flexibility, ' : ''
  }${
    aTraits.processing !== bTraits.processing ? 'processing speed and communication timing, ' : ''
  }${
    aTraits.sensoryNeeds !== bTraits.sensoryNeeds ? 'sensory environment needs, ' : ''
  }and the invisible expectations each brain brings to daily life. The core conflict is rarely the surface argument — it's the neurological incompatibility underneath it.`;

  return {
    conflictSynthesis: conflictSynthesis.replace(/, $/, '.'),
    dangerousMoments: dangerousMoments.slice(0, 5),
    repairToolkit
  };
}

function generateDynamicFingerprint(idA, idB) {
  const scores = {
    conflictRisk: 0,
    routineCompatibility: 0,
    sensoryCompatibility: 0,
    communicationEase: 0,
    emotionalSync: 0,
    recoverySpeed: 0
  };

  const aT = getTraitProfile(idA);
  const bT = getTraitProfile(idB);

  // Conflict Risk (higher = more risk)
  let risk = 30;
  if (aT.needsRoutine !== bT.needsRoutine) risk += 20;
  if (aT.sensoryNeeds !== bT.sensoryNeeds) risk += 15;
  if (aT.moodVolatility || bT.moodVolatility) risk += 15;
  if (aT.rigidity && bT.rigidity) risk += 20;
  scores.conflictRisk = Math.min(risk, 95);

  // Routine Compatibility (higher = more compatible)
  scores.routineCompatibility = (aT.needsRoutine === bT.needsRoutine) ? 80 : 35;
  if (aT.needsRoutine && bT.needsRoutine) scores.routineCompatibility = 90;

  // Sensory Compatibility
  const sensorySame = aT.sensoryNeeds === bT.sensoryNeeds;
  scores.sensoryCompatibility = sensorySame ? 85 : 40;

  // Communication Ease
  let commEase = 60;
  if (aT.processing === bT.processing) commEase += 20;
  if (aT.masking && bT.masking) commEase += 10; // both understand masking
  if (aT.rigidity || bT.rigidity) commEase -= 15;
  scores.communicationEase = Math.max(Math.min(commEase, 95), 20);

  // Emotional Sync
  let emoSync = 55;
  if (aT.intensity === bT.intensity) emoSync += 20;
  if (aT.moodVolatility && bT.moodVolatility) emoSync -= 20;
  if (aT.anxietyDriven && bT.anxietyDriven) emoSync -= 10;
  scores.emotionalSync = Math.max(Math.min(emoSync, 90), 20);

  // Recovery Speed (how quickly they can repair after conflict)
  let recovery = 60;
  if (aT.rigidity || bT.rigidity) recovery -= 20;
  if (aT.moodVolatility || bT.moodVolatility) recovery -= 15;
  if (aT.masking && bT.masking) recovery += 10; // both understand each other
  scores.recoverySpeed = Math.max(Math.min(recovery, 90), 15);

  return scores;
}

function getTraitProfile(id) {
  const traits = {
    masking: ['adhd-i', 'adhd-dyslexia', 'asd-1', 'asd-2', 'audhd', 'anxious', 'limbic'].includes(id),
    intensity: ['adhd-c', 'adhd-i', 'asd-1', 'audhd', 'ringoffire', 'temporal'].includes(id),
    creative: ['adhd-c', 'adhd-i', 'adhd-dyslexia', 'audhd', 'dyslexia', 'ringoffire'].includes(id),
    needsRoutine: ['asd-1', 'asd-2', 'asd-3', 'neurotypical', 'overfocused'].includes(id),
    processing: (() => {
      if (['adhd-c', 'adhd-i', 'adhd-dyslexia', 'audhd', 'ringoffire'].includes(id)) return 'fast-impulsive';
      if (['asd-1', 'asd-2', 'asd-3'].includes(id)) return 'slow-deliberate';
      if (id === 'dyslexia') return 'slow-accurate';
      if (id === 'overfocused') return 'rigid-locked';
      if (id === 'temporal') return 'volatile-unpredictable';
      if (id === 'limbic') return 'low-energy-drift';
      if (id === 'anxious') return 'worry-fragmented';
      return 'balanced';
    })(),
    sensoryNeeds: (() => {
      if (['asd-1', 'asd-2', 'asd-3', 'audhd', 'ringoffire'].includes(id)) return 'high';
      if (['adhd-c', 'adhd-dyslexia'].includes(id)) return 'seeking';
      if (id === 'temporal') return 'volatile';
      if (id === 'anxious') return 'vigilant';
      return 'moderate';
    })(),
    rigidity: ['overfocused', 'asd-1', 'asd-2', 'asd-3'].includes(id),
    moodVolatility: ['temporal', 'ringoffire', 'limbic'].includes(id),
    anxietyDriven: ['anxious', 'limbic'].includes(id)
  };
  return traits;
}

function getStruggleDescription(id) {
  switch(id) {
    case 'adhd-c': return 'focusing on boring tasks, being on time, controlling impulses';
    case 'adhd-i': return 'starting tasks, sustaining attention, remembering details';
    case 'overfocused': return 'letting go of thoughts, shifting gears, adapting to change';
    case 'temporal': return 'controlling emotional explosions, processing auditory information, stabilizing mood';
    case 'limbic': return 'finding motivation, sustaining energy, seeing past the fog of low mood';
    case 'ringoffire': return 'filtering sensory input, moderating emotional intensity, slowing racing thoughts';
    case 'anxious': return 'starting tasks without fear, quieting worry, performing under evaluation';
    case 'adhd-dyslexia': return 'sustaining attention AND processing text accurately at the same time';
    case 'dyslexia': return 'processing text quickly, avoiding reading errors, spelling';
    case 'asd-1': return 'reading social cues, handling surprises, filtering sensory input';
    case 'asd-2': return 'communicating needs, managing sensory overload, adapting to change';
    case 'asd-3': return 'expressing myself through speech, managing sensory environments, coping with routine changes';
    case 'audhd': return 'managing two conflicting neurological systems — needing routine AND novelty simultaneously';
    default: return 'maintaining consistent routines, processing text, filtering noise';
  }
}

// ============================================================
// PRIORITY PAIRING DATA — curated with full Conflict Dashboard
// ============================================================

const PAIRING_DATA = {
  'adhd-c|neurotypical': {
    overview: "When a Neurotypical brain meets an ADHD-Combined brain, the world's most common misunderstanding unfolds: one brain experiences life as a steady, navigable stream while the other experiences it as a series of rapids. The Neurotypical partner often becomes the 'anchor' — providing stability but sometimes feeling dragged into chaos. The ADHD-C partner often feels both grateful and resentful — needing the anchor but chafing against the implicit message that their natural state is 'too much.'",
    harmony: [
      { title: 'Complementary Energy Systems', desc: "The ADHD-C brain brings spontaneity, creative energy, and crisis competence. The Neurotypical brain brings consistency, follow-through, and environmental stability. When working in harmony, this pairing covers an extraordinary range of life's demands." },
      { title: 'Adventure + Stability', desc: "The ADHD-C partner pulls the relationship toward new experiences, while the Neurotypical partner ensures the foundation remains solid. Together, they build a life that is both exciting and sustainable." },
      { title: 'Mutual Growth', desc: "The Neurotypical partner learns to embrace spontaneity and emotional intensity. The ADHD-C partner learns that structure is not a cage but a launch pad. Both expand their capacity." }
    ],
    friction: [
      { title: 'The Mental Load Imbalance', desc: "The Neurotypical partner often absorbs the household's executive function burden — bills, appointments, maintenance, planning. Over time, this creates resentment ('I'm not your parent') and shame ('I'm failing at adulting').", fromA: "I feel like I'm managing two lives. I love you, but I'm exhausted by carrying the logistics alone.", fromB: "I see you carrying everything, and the shame of not being able to help consistently is crushing. I'm not choosing this." },
      { title: 'Impulsivity vs. Planning', desc: "ADHD-C's impulsive decisions (purchases, commitments, schedule changes) collide with the Neurotypical brain's expectation of consultation and planning.", fromA: "I need to be included in decisions that affect us both. Surprises feel like disrespect.", fromB: "The idea hit and I acted — by the time I could have consulted you, the window felt closed. My brain doesn't pause naturally." },
      { title: 'Emotional Intensity Mismatch', desc: "ADHD-C emotions are fast, intense, and visible. The Neurotypical partner may feel overwhelmed by the volatility, while the ADHD-C partner may feel judged for their emotional range.", fromA: "When your emotions spike, I don't know if it's a crisis or a passing wave. I freeze because I can't calibrate.", fromB: "My emotions are real even when they're fast. I need you to take them seriously even if they pass quickly." }
    ],
    conflictDashboard: {
      conflictSynthesis: "This pairing's deepest fault line is the invisible burden of executive function. The Neurotypical partner absorbs organizational tasks that the ADHD-C brain cannot sustain — and the resentment that builds is rarely spoken directly, making it the most dangerous slow-burn conflict in this pairing.",
      dangerousMoments: [
        { icon: 'fa-credit-card', title: 'The Discovered Bill or Missed Deadline', desc: "An overdue bill, an unfiled form, or a forgotten appointment surfaces. The NT partner feels their trust was violated; the ADHD-C partner floods with shame and defensiveness. The real injury — unspoken resentment about who carries the load — erupts through this trigger." },
        { icon: 'fa-bolt', title: 'The Impulsive Big Decision', desc: "ADHD-C announces a major purchase, commitment, or plan change without consultation. NT experiences this as a fundamental disrespect of the partnership. ADHD-C experiences the NT's reaction as controlling. Both interpretations are wrong — and both feel entirely true." },
        { icon: 'fa-fire', title: 'The Emotional Explosion and Its Aftermath', desc: "ADHD-C has a fast, loud emotional reaction. NT freezes or withdraws. ADHD-C's RSD activates in response to the withdrawal. What started as a minor irritation becomes a relationship rupture, often because both partners are responding to each other's neurological patterns rather than the original issue." },
        { icon: 'fa-calendar-xmark', title: 'The Last-Minute Plan Change', desc: "ADHD-C impulsively cancels or changes plans — social, household, or logistical. NT had built expectations around the plan. The invalidation of the NT's planning effort is experienced as a statement about the relationship's priorities." },
        { icon: 'fa-moon', title: 'The End-of-Day Crash', desc: "ADHD-C has spent all day masking, pushing through, and performing. They come home and go flat — unavailable, irritable, or checked out. NT interprets this as the relationship getting the leftovers. ADHD-C is doing the only thing their depleted brain can do: survive." }
      ],
      repairToolkit: [
        { icon: 'fa-robot', title: 'Automate the Executive Function', desc: "Remove contested household tasks from the relationship entirely. Autopay all bills. Hire help for cleaning if possible. Use a shared digital command center (Notion, Google Calendar, shared reminders). The system manages logistics; the relationship manages the partnership.", color: '#22D3EE' },
        { icon: 'fa-clock-rotate-left', title: 'The 24-Hour Decision Rule', desc: "Any decision above an agreed threshold (financial, logistical, social) gets a mandatory 24-hour hold. ADHD-C agrees to this not as a restriction but as a protection tool for the relationship. 'My brain moves fast. This rule protects us from my impulses.'", color: '#F59E0B' },
        { icon: 'fa-cloud-rain', title: 'Emotional Weather Reports', desc: "ADHD-C learns to narrate their emotional state: 'I'm having a big emotion right now but I'm okay — I just need to ride it out.' NT learns to witness without fixing or withdrawing. This one sentence prevents most escalation cycles.", color: '#8B5CF6' },
        { icon: 'fa-scale-balanced', title: 'Monthly Appreciation + Load Audit', desc: "Once a month: ADHD-C explicitly names three things the NT partner carries. NT explicitly names three things the ADHD-C brain does well. Then review the task split and adjust. This ritual prevents invisible resentment from becoming explosive.", color: '#34D399' }
      ]
    },
    fingerprint: { conflictRisk: 72, routineCompatibility: 38, sensoryCompatibility: 55, communicationEase: 48, emotionalSync: 42, recoverySpeed: 65 },
    bridges: [
      { title: 'Externalize the Executive Function', desc: "Use shared digital tools (calendars, reminders, project boards) instead of relying on the Neurotypical partner as the sole organizer. The system manages the logistics; the relationship stays a partnership, not a parent-child dynamic." },
      { title: 'The 24-Hour Rule for Big Decisions', desc: "Agree that any decision above a set threshold (financial, scheduling, commitment) gets a 24-hour pause. This isn't a restriction on the ADHD-C brain — it's a pressure valve that protects the relationship." },
      { title: 'Emotional Weather Reports', desc: "The ADHD-C partner learns to narrate: 'I'm having a big emotion right now but I'm okay — I just need to ride it out.' The Neurotypical partner learns to witness without fixing." }
    ],
    envDesign: "Create a home with designated 'launch pads' (keys, wallet, essentials always in one place), a shared visual command center (whiteboard or digital dashboard), and explicit agreements about household task division that accounts for ADHD-C energy patterns (batch tasks, body-doubling for maintenance).",
    needToKnowA: "\"I know my brain can feel like a tornado in your carefully organized life. I want you to know: I see every time you catch what I dropped. I see the invisible labor. And the reason I don't always say thank you isn't because I don't notice — it's because acknowledging it means confronting how much I need help, and that shame is its own storm.\"",
    needToKnowB: "\"I love your energy and your ideas and your passion. And sometimes I'm so tired from holding the structure together that I can't enjoy them. I don't want to be your manager — I want to be your partner. Help me build systems so I can stop carrying the mental load and start sharing the adventure.\""
  },

  'adhd-i|asd-1': {
    overview: "This is one of the most commonly mismatched pairings — and one of the most potentially beautiful. The ADHD-Inattentive brain drifts in a sea of ideas and possibilities; the ASD Level 1 brain builds precise, structured harbors. The ADHD-I partner is drawn to the ASD partner's depth and reliability; the ASD partner is drawn to the ADHD-I partner's warmth and creative flexibility. The conflict arises when drift meets rigidity.",
    harmony: [
      { title: 'Depth Meets Breadth', desc: "ADHD-I brings associative, divergent thinking — connecting ideas across domains. ASD Level 1 brings systematic, deep expertise. Together, they can solve problems that neither brain would crack alone." },
      { title: 'Complementary Social Styles', desc: "Both brains are socially quiet by nature. Neither pressures the other into excessive socializing. They can build a home life around meaningful 1-on-1 connection rather than performative social calendars." },
      { title: 'Mutual Respect for Inner Worlds', desc: "Both partners have rich inner lives. The ADHD-I brain's daydream world and the ASD brain's special interest world can coexist respectfully — each understanding that inner engagement is not withdrawal." }
    ],
    friction: [
      { title: 'The Drift vs. The System', desc: "ADHD-I's executive dysfunction creates chaos (missed appointments, forgotten tasks, unfinished projects) that directly disrupts ASD's need for environmental predictability and routine.", fromA: "When you forget what we planned or leave things half-done, it feels like you don't value our shared system. My stability depends on predictability.", fromB: "I'm not choosing to forget. My brain drops things, and the shame I feel when your face falls is the worst part of my day." },
      { title: 'Communication Timing', desc: "The ASD brain processes deliberately and may need time to formulate responses. The ADHD-I brain may interpret silence as disinterest or rejection. Conversely, the ADHD-I brain's tangential communication style may frustrate the ASD brain's need for logical structure.", fromA: "When I'm quiet, I'm processing — not ignoring you. Give me time and I'll give you a thoughtful response.", fromB: "My thoughts don't come in order. When I jump between topics, I'm not being disrespectful — my brain is connecting dots in real-time." },
      { title: 'Sensory Environment', desc: "The ASD brain may need specific environmental conditions (quiet, dim, controlled). The ADHD-I brain may need background stimulation or novelty to stay engaged. Finding a shared environment that serves both is the core design challenge.", fromA: "I need the environment to be predictable and calm. Sensory disruption isn't annoying — it's disabling.", fromB: "I need some level of stimulation or I drift. Total silence makes my brain louder, not quieter." }
    ],
    conflictDashboard: {
      conflictSynthesis: "The core tension is between ADHD-I's executive dysfunction and ASD-1's deep need for predictability. Every forgotten commitment, incomplete task, or missed appointment lands as a violation of the ASD partner's cognitive scaffolding — even when the ADHD-I partner cares deeply. This gap between intention and neurological capacity is where the relationship's most painful ruptures occur.",
      dangerousMoments: [
        { icon: 'fa-ghost', title: 'The Forgotten Commitment', desc: "ADHD-I forgets a plan they both agreed to. ASD-1 had built their day around it. For ASD-1, this isn't inconvenient — it destabilizes their entire cognitive structure. For ADHD-I, the shame is crushing. Neither brain knows how to repair what feels like a fundamental incompatibility." },
        { icon: 'fa-arrows-spin', title: 'The Tangential Conversation', desc: "ADHD-I jumps topics mid-sentence, following an internal logic ASD-1 cannot see. ASD-1 tries to follow the logic, loses the thread, and asks for clarification. ADHD-I has already moved on. Both feel like the other isn't trying." },
        { icon: 'fa-hand-paper', title: 'ASD-1 Processing Silence Misread as Rejection', desc: "ASD-1 goes quiet to process an emotional moment — this is their way of giving the question the weight it deserves. ADHD-I reads the silence as emotional withdrawal and activates RSD, creating urgency and emotional pressure that further freezes ASD-1." },
        { icon: 'fa-volume-high', title: 'Sensory Environment Standoff', desc: "ADHD-I puts on background music or TV to regulate. ASD-1's sensory system reads it as an intrusion. ASD-1 asks for quiet. ADHD-I feels controlled. The resulting negotiation feels like a fight about who gets to exist comfortably in their own home." },
        { icon: 'fa-infinity', title: 'The Unfinished Project Zone', desc: "ADHD-I leaves multiple projects half-done around the shared space. ASD-1's need for completed states and environmental predictability makes each unfinished item a persistent source of low-grade distress — a background static they can't turn off." }
      ],
      repairToolkit: [
        { icon: 'fa-file-lines', title: 'Written Agreements for All Commitments', desc: "Use a shared digital system (Google Calendar, Notion) for all plans. The moment a plan is made, it gets logged — both partners confirm in writing. This removes reliance on ADHD-I working memory and gives ASD-1 visible evidence of the commitment.", color: '#2DD4BF' },
        { icon: 'fa-timer', title: 'The Processing Window Agreement', desc: "ASD-1 tells ADHD-I: 'I need 15 minutes to process before I can respond.' ADHD-I agrees not to interpret silence as rejection during this window. In return, ASD-1 commits to returning within the agreed time.", color: '#F59E0B' },
        { icon: 'fa-headphones', title: 'Designated Sensory Zones', desc: "Map the shared space into zones: ASD-1's sensory-safe zone (minimal input, no background noise), ADHD-I's stimulation zone (music, movement, visual input). Shared spaces have negotiated defaults agreed in advance.", color: '#8B5CF6' },
        { icon: 'fa-heart-pulse', title: 'The Compassion Translation Practice', desc: "Before reacting to a frustrating behavior, pause and translate: 'They forgot' = 'their working memory failed.' 'They're rigid' = 'their predictability system is activated.' This translation practice interrupts the cycle where neurological failure becomes personal injury.", color: '#34D399' }
      ]
    },
    fingerprint: { conflictRisk: 65, routineCompatibility: 42, sensoryCompatibility: 48, communicationEase: 45, emotionalSync: 52, recoverySpeed: 55 },
    bridges: [
      { title: 'Written Agreements', desc: "The ASD brain's love of explicit systems and the ADHD-I brain's need for external scaffolding converge here. Write down household agreements, routines, and expectations. Review monthly." },
      { title: 'Parallel Time', desc: "Spend time in the same room doing different things. The ASD partner pursues a special interest while the ADHD-I partner works on a creative project. Presence without demand builds intimacy without social exhaustion." },
      { title: 'The Compassion Translation', desc: "When frustrated, translate the behavior through neurology before reacting. 'They forgot' becomes 'their working memory failed.' 'They're being rigid' becomes 'their need for predictability is activated.'" }
    ],
    envDesign: "Create a home with clearly defined zones: a sensory-managed zone for the ASD partner (predictable lighting, minimal visual clutter), and a stimulation zone for the ADHD-I partner (music, creative workspace). Shared spaces should be organized with systems that are simple enough for the ADHD-I brain to maintain and structured enough for the ASD brain to trust.",
    needToKnowA: "\"I know my need for routine can feel like control to you. It isn't. It's survival. When the environment is predictable, I can be present with you. When it's chaotic, all my energy goes to coping and there's nothing left for connection. Help me build the structure, and I'll have so much more to give you.\"",
    needToKnowB: "\"I know my forgetfulness feels like I don't care. The truth is the opposite — I care so much that the shame of letting you down is sometimes what paralyzes me further. I need systems, not lectures. I need patience, not performance tracking. And I need you to see that my brain's chaos contains a creativity that I want to share with you.\""
  },

  'adhd-c|asd-1': {
    overview: "Fire meets precision. The ADHD-Combined brain charges forward with impulsive energy, ideas, and action — while the ASD Level 1 brain builds meticulous systems and craves predictable depth. This pairing has extraordinary potential when both brains are understood, but can become deeply painful when the ADHD-C partner feels caged and the ASD partner feels destabilized. It is among the highest-conflict neurodivergent pairings — and among the most transformative when navigated with skill.",
    harmony: [
      { title: 'The Activator + The Architect', desc: "ADHD-C generates ideas and momentum. ASD Level 1 provides structure and follow-through. When this cycle works, they accomplish things together that neither could alone." },
      { title: 'Loyalty and Passion', desc: "Both brains are capable of intense commitment. The ADHD-C brain's passionate enthusiasm combined with the ASD brain's deep reliability creates a foundation of fierce mutual devotion." },
      { title: 'Direct Communication', desc: "Neither brain excels at subtle social games. The ADHD-C brain is blunt by impulsivity; the ASD brain is direct by nature. This can create refreshing honesty once both learn to receive it." }
    ],
    friction: [
      { title: 'Chaos vs. Order', desc: "ADHD-C's impulsive actions (sudden plans, spontaneous decisions, chaotic energy) directly assault ASD's need for predictability. This is the #1 conflict in this pairing.", fromA: "When you change plans without warning, my entire system collapses. It's not about the plan — it's about my ability to cope.", fromB: "When everything has to be planned in advance, I feel suffocated. Spontaneity is how my brain breathes." },
      { title: 'Energy Regulation', desc: "ADHD-C's high-energy bursts can be overwhelming for the ASD partner's sensory system. The noise, the pace, the intensity — what energizes one brain exhausts the other.", fromA: "Your energy is beautiful but sometimes it's physically too much. I need you to read my cues — or ask.", fromB: "When you withdraw because I'm 'too much,' it feels like rejection. I need to know it's about your battery, not my worth." },
      { title: 'Emotional Processing Collision', desc: "ADHD-C's emotions are fast and loud. ASD's emotions are delayed and internal. When ADHD-C needs immediate emotional engagement, the ASD partner may freeze — which triggers RSD in the ADHD-C partner.", fromA: "I can't match your emotional pace. My feelings come hours later. Please don't assume I don't care.", fromB: "When I'm flooded with emotion and you go blank, it feels like you've left me alone in the fire." }
    ],
    conflictDashboard: {
      conflictSynthesis: "This pairing has the highest raw conflict potential of any ADHD-ASD combination because ADHD-C's core regulation strategy (spontaneity, impulsivity, high stimulation) is the exact opposite of ASD-1's core regulation strategy (predictability, reduced stimulation, controlled structure). Every act of ADHD-C self-regulation inadvertently dysregulates ASD-1, and vice versa.",
      dangerousMoments: [
        { icon: 'fa-calendar-xmark', title: 'The Shattered Routine', desc: "ADHD-C makes a spontaneous plan change — a new idea, a better option, a forgotten commitment. For ASD-1, the plan wasn't just a plan — it was the scaffolding holding their entire day together. The collapse is total, and the ADHD-C partner cannot understand why a 'small' change caused a 'big' reaction." },
        { icon: 'fa-volume-xmark', title: 'The Sensory Overload Shutdown', desc: "ADHD-C's energy level, noise, and stimulation tips ASD-1 into sensory overload. ASD-1 shuts down — goes quiet, withdraws, becomes unresponsive. ADHD-C activates RSD ('they hate me'). ASD-1 can't explain — they're in survival mode. ADHD-C escalates trying to get a response. ASD-1 goes deeper into shutdown." },
        { icon: 'fa-comments', title: 'The Emotional Timing Mismatch', desc: "ADHD-C is flooded with emotion RIGHT NOW and needs immediate engagement. ASD-1 is still processing the event from two hours ago. ASD-1's silence in the face of ADHD-C's urgency is experienced as abandonment. ADHD-C's urgency during ASD-1's processing time is experienced as an attack." },
        { icon: 'fa-house-crack', title: 'The Broken Environmental Agreement', desc: "They negotiated a shared environmental baseline. ADHD-C broke it — put on loud music, moved things, stayed up late making noise. ASD-1's sensory regulation depends on the agreement holding. When it breaks, the sense of betrayal is disproportionate to the act but proportionate to the neurological cost." },
        { icon: 'fa-person-dots-from-line', title: 'Interpreting Directness as Attack', desc: "ASD-1 states something factually and directly. ADHD-C's RSD receives it as criticism or rejection. ADHD-C responds with emotional intensity. ASD-1 is confused — they were just stating information. ASD-1's literal response ('I was just saying...') reads to ADHD-C as dismissal. The loop escalates." }
      ],
      repairToolkit: [
        { icon: 'fa-bell', title: 'Advance Notice Protocol', desc: "ADHD-C commits to giving minimum advance notice for ANY schedule change — even 30 minutes helps ASD-1 adapt. ASD-1 builds designated 'flex windows' into the weekly schedule where spontaneity is explicitly welcomed. The structure has breathing room; the spontaneity has guardrails.", color: '#F97316' },
        { icon: 'fa-battery-half', title: 'The Energy Number System', desc: "Both partners share an energy/sensory load number (1-5) at transition points: returning home, before meals, before evenings. 'I'm a 4 right now' signals pre-shutdown. 'I'm a 1' signals space needed. This removes the interpretive burden from both brains.", color: '#2DD4BF' },
        { icon: 'fa-hourglass-half', title: 'Structured Conflict Protocol', desc: "ADHD-C names the emotion immediately ('I'm hurt, I need to talk'). Both take a timed 30-minute pause. They reconvene at an agreed time with a structured format: one speaker at a time, specific issue only, no historic grievances. ADHD-C gets to be heard; ASD-1 gets processing time.", color: '#8B5CF6' },
        { icon: 'fa-puzzle-piece', title: 'Zones Map Agreement', desc: "Create a visual map of the shared home with designated zones: ADHD-C's stimulation zone (music, creative energy, mess permitted) and ASD-1's sanctuary zone (sensory-regulated, predictable). Shared spaces have negotiated sensory agreements reviewed monthly.", color: '#34D399' }
      ]
    },
    fingerprint: { conflictRisk: 85, routineCompatibility: 25, sensoryCompatibility: 28, communicationEase: 40, emotionalSync: 35, recoverySpeed: 52 },
    bridges: [
      { title: 'Advance Notice Protocol', desc: "ADHD-C agrees to give minimum advance notice for schedule changes (even 30 minutes helps). ASD agrees to build 'flex zones' into the weekly schedule where spontaneity is welcomed." },
      { title: 'Energy Check-Ins', desc: "Use a simple 1-5 scale for energy levels. Share numbers at key transition points. This removes the burden of reading cues and gives both brains actionable data." },
      { title: 'Separate Processing, Shared Resolution', desc: "When conflict occurs, ADHD-C names the emotion immediately ('I'm hurt'). ASD takes processing time. They reconvene at an agreed time to resolve. Both needs are honored." }
    ],
    envDesign: "The home needs both stimulation zones and sanctuary zones. The ADHD-C partner needs an area where they can be loud, messy, and creative without impacting the ASD partner's regulated space. Shared spaces should have negotiated sensory agreements (lighting, sound levels, temperature) reviewed regularly.",
    needToKnowA: "\"My need for predictability isn't about controlling you. When the world is unpredictable, my nervous system goes into survival mode and everything becomes harder — thinking, feeling, connecting. When you give me even a little warning, you give me the chance to be present with you instead of just coping.\"",
    needToKnowB: "\"My energy isn't an attack on your peace. It's how my brain works — I think by doing, I feel by expressing, I connect by engaging. When you need space, tell me clearly and I'll respect it. But please don't just shut down — the silence is louder than anything I could ever say.\""
  },

  'audhd|neurotypical': {
    overview: "Perhaps the most bewildering pairing from the Neurotypical partner's perspective. The AuDHD brain is a paradox — craving routine one hour and spontaneity the next, deeply analytical then emotionally flooded, desperately social then suddenly withdrawn. The Neurotypical partner often feels like they're living with two different people because, neurologically, they almost are.",
    harmony: [
      { title: 'Depth + Accessibility', desc: "The AuDHD brain brings extraordinary analytical depth AND creative spontaneity. The Neurotypical partner provides consistent, accessible emotional support and environmental stability." },
      { title: 'The Fascination Factor', desc: "Life with an AuDHD partner is never boring. Their intense interests, creative connections, and unique perspective on the world can be genuinely fascinating for the Neurotypical partner who learns to appreciate the complexity." },
      { title: 'Growth Through Challenge', desc: "The Neurotypical partner who engages genuinely with neurodiversity develops cognitive empathy, patience, and flexibility that transforms all their relationships." }
    ],
    friction: [
      { title: 'The Contradiction Problem', desc: "The AuDHD brain asks for routine then breaks it. Asks for quiet then seeks stimulation. Initiates connection then withdraws. The Neurotypical partner can't build a consistent response strategy because the target keeps moving.", fromA: "I can't predict what you need because it changes so rapidly. I feel like I'm always getting it wrong.", fromB: "I can't predict what I need either. My two systems fight each other, and the exhaustion of that internal war is why I sometimes snap or shut down." },
      { title: 'Double Masking Burnout', desc: "The AuDHD partner expends enormous energy masking both ADHD and ASD traits in public. By the time they come home, there's nothing left. The Neurotypical partner gets the unmasked version — which can be messy, withdrawn, or volatile.", fromA: "I know you're exhausted, but I feel like I only ever get the leftovers of your energy.", fromB: "Home is the only place I can stop performing. If I can't be unmasked here, I have nowhere safe." },
      { title: 'Communication Whiplash', desc: "Some days the AuDHD partner communicates in ADHD mode (rapid, tangential, emotional). Other days in ASD mode (precise, literal, logical). The Neurotypical partner can't find the 'real' communication style because both are real.", fromA: "Which version of this conversation are we having? I need to know the rules of engagement.", fromB: "I don't know which brain is driving today either. But both are me. Please don't ask me to be consistent when my neurology isn't." }
    ],
    conflictDashboard: {
      conflictSynthesis: "The NT partner's deepest frustration is not any single behavior but the inability to build a consistent map of their partner. The AuDHD brain's contradictions aren't inconsistency — they're two neurological systems alternating control. Understanding this reframes the core conflict from 'who IS this person?' to 'which system is driving right now?'",
      dangerousMoments: [
        { icon: 'fa-question', title: 'The Unpredictable Need', desc: "NT asks 'what do you need right now?' and the AuDHD partner genuinely doesn't know — or gives an answer that changes 30 minutes later. NT experiences this as evasiveness or manipulation. AuDHD is experiencing a real-time war between two neurological systems with no clear winner." },
        { icon: 'fa-battery-empty', title: 'The Double-Masking Collapse', desc: "AuDHD comes home from a full day of double-masking. NT has had a normal day and is ready to connect. AuDHD has nothing to give. NT experiences the withdrawal personally. AuDHD needs to unmask and collapse without it becoming a relationship negotiation." },
        { icon: 'fa-shuffle', title: 'The System That Got Built and Broken', desc: "AuDHD carefully designed a household system that meets their ASD need for structure. Their ADHD brain then dismantled it. NT watched the system work for two weeks and now watches it fail. The pattern — build, violate, rebuild — is exhausting for both partners." },
        { icon: 'fa-bolt-lightning', title: 'The Sensory Overload Explosion', desc: "AuDHD reaches sensory threshold without visible warning signs. NT says or does something that, in isolation, would be completely neutral. AuDHD reacts with intensity disproportionate to the event. NT feels attacked for something they didn't do. AuDHD has already moved past it. NT hasn't." },
        { icon: 'fa-user-slash', title: 'The Social Event Withdrawal', desc: "AuDHD enthusiastically commits to a social event in ADHD mode. The day arrives and ASD needs kick in — sensory load, social energy cost, environmental unpredictability. AuDHD cancels or barely survives. NT feels abandoned and embarrassed. AuDHD feels guilty but neurologically unable to explain." }
      ],
      repairToolkit: [
        { icon: 'fa-compass', title: 'The Daily Brain Check-In', desc: "Each morning, AuDHD uses a simple framing: 'I'm in structure mode today' or 'I'm in adventure mode today.' NT uses this signal to calibrate the day's expectations and interactions. This one question reduces daily friction by 60%.", color: '#EC4899' },
        { icon: 'fa-house-heart', title: 'The Safe Collapse Protocol', desc: "Explicitly agree: when AuDHD comes home depleted, they have 30-60 minutes of zero-demand time before any relational engagement. NT uses this time for their own decompression. Neither interpretation of this time is rejection — it's neurological re-entry.", color: '#22D3EE' },
        { icon: 'fa-book-open', title: 'Learn AuDHD Together', desc: "Read about AuDHD together. Watch talks, listen to first-person accounts. When NT understands the neurological paradox structurally, the contradictions stop feeling like personality and start feeling like neurology. This reframe is protective.", color: '#F59E0B' },
        { icon: 'fa-arrows-rotate', title: 'The Repair Sequence', desc: "When an AuDHD overload event harms the NT partner: (1) AuDHD acknowledges the impact as soon as they can access language. (2) NT accepts the acknowledgment without demanding immediate explanation. (3) They debrief within 24 hours about what happened neurologically, not morally.", color: '#8B5CF6' }
      ]
    },
    fingerprint: { conflictRisk: 78, routineCompatibility: 32, sensoryCompatibility: 45, communicationEase: 38, emotionalSync: 44, recoverySpeed: 55 },
    bridges: [
      { title: 'The Daily Check-In', desc: "Start each day with a brief check: 'Which brain is louder today — the one that needs structure or the one that needs novelty?' This simple question gives both partners a roadmap for the day." },
      { title: 'The Safe Collapse Protocol', desc: "Agree that unmasking at home is not optional — it's essential. Create explicit agreements about what unmasking looks like and how the Neurotypical partner can support without absorbing." },
      { title: 'Educate Together', desc: "Read about AuDHD together. When both partners understand the neurological basis, the Neurotypical partner stops personalizing the contradictions and the AuDHD partner stops apologizing for existing." }
    ],
    envDesign: "The home needs to be a regulation hub. Designate a sensory-safe retreat space. Use visual schedules that are flexible (moveable cards/magnets rather than fixed lists). Build in 'buffer zones' in the daily schedule — unstructured time that can go either way depending on what the AuDHD brain needs that day.",
    needToKnowA: "\"I know I'm confusing. I confuse myself. But the contradictions you see aren't indecisiveness — they're two neurological systems fighting for control. When I ask for routine and then break it, both needs were real. I need you to hold space for my complexity without trying to simplify me.\"",
    needToKnowB: "\"Living with you is the most challenging and rewarding thing I've ever done. I don't always get it right. But I want you to know that when I feel frustrated, it's never because I wish you were different — it's because I wish I could make the world easier for you. Show me how to help, and I'll never stop trying.\""
  },

  'adhd-c|adhd-i': {
    overview: "Two ADHD brains, two different expressions. The Combined partner is the wave — energy, action, impulse. The Inattentive partner is the deep current — still on the surface but churning underneath. They understand each other's time blindness, executive dysfunction, and emotional intensity in ways no Neurotypical partner ever could. But they also share the same blind spots — and nobody is compensating for the executive function gaps.",
    harmony: [
      { title: 'Deep Mutual Understanding', desc: "Both partners know what it's like to forget, to struggle with motivation, to feel shame about 'basic' tasks. This shared understanding creates a foundation of compassion that neurotype-discordant couples must build consciously." },
      { title: 'Creative Power', desc: "Two divergent thinkers together generate extraordinary creative energy. Brainstorming sessions between ADHD-C and ADHD-I can be genuinely magical — the Combined brain sparks ideas while the Inattentive brain weaves them into deeper patterns." },
      { title: 'Flexibility and Forgiveness', desc: "Neither partner expects neurotypical consistency. There's an implicit grace for forgotten texts, missed deadlines, and chaotic spaces. The relationship can breathe." }
    ],
    friction: [
      { title: 'The Executive Function Vacuum', desc: "Nobody is the 'responsible one.' Bills get missed by both. Appointments are forgotten by both. The household can descend into compounding chaos because neither brain naturally maintains systems.", fromA: "I need you to sometimes be the one who remembers. I'm tired of being the impulsive one who also has to be the organized one.", fromB: "I can barely manage myself — managing us feels impossible. The shame of knowing we both need help and neither can provide it is suffocating." },
      { title: 'Energy Mismatch', desc: "ADHD-C's external energy can overwhelm ADHD-I's internal processing. The Combined partner may interpret the Inattentive partner's quiet as disinterest; the Inattentive partner may experience the Combined partner's intensity as intrusive.", fromA: "I need engagement, reaction, energy back. Your silence feels like a wall.", fromB: "Your energy is beautiful but sometimes it floods my system. I need quiet to find my own thoughts." },
      { title: 'RSD Collision', desc: "Both brains experience Rejection Sensitive Dysphoria — but ADHD-C expresses it as anger while ADHD-I expresses it as withdrawal. When one partner triggers the other's RSD, the conflict escalates: anger meets silence meets more anger meets deeper withdrawal.", fromA: "When you shut down, my brain reads it as rejection and I get loud trying to get you back.", fromB: "When you get intense, my brain reads it as attack and I disappear trying to protect myself." }
    ],
    conflictDashboard: {
      conflictSynthesis: "This pairing's central danger isn't a clash of neurological opposites — it's the amplification of shared deficits. With no partner naturally compensating for executive dysfunction, the household and relationship can fall into a chaotic decline that neither partner has the neurological tools to reverse alone. The RSD collision is the other fault line: anger meeting silence creates a loop that's almost impossible to break from inside.",
      dangerousMoments: [
        { icon: 'fa-exclamation-triangle', title: 'The Compounding Crisis', desc: "An overdue bill surfaces — then another. Two forgotten appointments in the same week. A household task that neither started. The crises don't happen one at a time; they arrive in clusters because neither brain caught them at the prevention stage. Blame escalates because there's no 'competent' partner to point at." },
        { icon: 'fa-fire-flame-curved', title: 'The RSD Explosion-Withdrawal Cycle', desc: "ADHD-C makes a sharp comment. ADHD-I withdraws. ADHD-C's RSD activates and escalates. ADHD-I goes deeper into shutdown. ADHD-C's attempts to get a response become louder and more dysregulated. Both are now in full neurological crisis — and both feel completely alone inside it." },
        { icon: 'fa-volume-high', title: 'The Stimulation Collision', desc: "ADHD-C needs high external stimulation to regulate. ADHD-I needs quiet internal space to find their thoughts. In a shared living space, these needs directly conflict. One partner's regulation strategy is the other's dysregulation trigger." },
        { icon: 'fa-bed', title: 'The Simultaneous Crash', desc: "Both brains hit depletion at the same time — often after high-demand social or work periods. Neither can co-regulate the other. The house falls apart, emotional needs go unmet, and both feel abandoned by their partner's simultaneous unavailability." },
        { icon: 'fa-clock', title: 'Dual Time Blindness in Planning', desc: "Both partners agree to something and neither tracks it. Both forgot. The discovery that both dropped the ball simultaneously can trigger blame-shifting — each trying to locate the 'responsible' party for a failure that was structurally inevitable." }
      ],
      repairToolkit: [
        { icon: 'fa-cogs', title: 'External Systems Over Willpower', desc: "Accept as a permanent architectural truth: neither brain will reliably remember. Build automation for everything possible — autopay, recurring reminders, subscription services, scheduled cleaning. The goal is removing executive function requirements from the relationship entirely.", color: '#F97316' },
        { icon: 'fa-hand-stop', title: 'Name the RSD', desc: "Both partners learn this phrase: 'I think my RSD is activated right now.' This single sentence can pause the anger-withdrawal cycle by naming the neurological event rather than blaming the person. Practice it in calm moments so it's accessible in crisis.", color: '#EF4444' },
        { icon: 'fa-arrows-alt-h', title: 'Energy Negotiation Agreements', desc: "Explicit agreements about transition needs: 'I need 30 minutes of quiet after work' (ADHD-I). 'I need 15 minutes of connection when I get home' (ADHD-C). Sequence the needs: connection first for 15 minutes, then quiet time. Both needs honored; order negotiated in advance.", color: '#8B5CF6' },
        { icon: 'fa-people-group', title: 'External Support System', desc: "This pairing often needs a third leg: a therapist, a financial advisor, a personal organizer, or an accountability group. Neither partner should be the other's primary executive function support. Build the external scaffolding and let the relationship be about connection.", color: '#34D399' }
      ]
    },
    fingerprint: { conflictRisk: 68, routineCompatibility: 45, sensoryCompatibility: 55, communicationEase: 52, emotionalSync: 60, recoverySpeed: 58 },
    bridges: [
      { title: 'External Systems, Not Internal Willpower', desc: "Accept that neither brain will consistently 'remember.' Build external systems (autopay, shared calendars, cleaning services if possible) that remove executive function from the relationship equation." },
      { title: 'Name the RSD', desc: "Create shared language: 'I think my RSD is activated right now.' This single sentence can pause the anger-withdrawal cycle by naming the neurology instead of blaming the partner." },
      { title: 'Energy Negotiations', desc: "Build explicit agreements: 'I need 30 minutes of quiet after I get home' (ADHD-I) and 'I need 15 minutes of connection before you disappear' (ADHD-C). Sequence matters." }
    ],
    envDesign: "This household needs MORE external structure than most, not less. Invest in automation (smart home, autopay, subscription services). Use body-doubling for household tasks — doing chores at the same time in the same space. Build a 'launch pad' system at the front door for essentials.",
    needToKnowA: "\"I know my energy can be a lot. And I know that when I need you to engage and you can't, it's not rejection — it's depletion. I'll try to read your signals better. But I need you to know that my intensity isn't anger at you — it's just how my brain processes everything.\"",
    needToKnowB: "\"I know my quiet can feel like abandonment. It isn't. It's my brain trying to find itself in the noise. When I go still, I'm not leaving you — I'm trying to come back to myself so I can come back to you. Give me time, and I'll always return.\""
  },

  'asd-1|audhd': {
    overview: "This pairing carries a unique intimacy — the AuDHD partner lives with the ASD brain the ASD-1 partner knows well, PLUS the ADHD brain that adds chaos to familiar terrain. The ASD-1 partner may see themselves reflected in their AuDHD partner's autistic traits while being bewildered by the ADHD overlay. The AuDHD partner may envy the ASD-1 partner's internal consistency.",
    harmony: [
      { title: 'Shared Autistic Understanding', desc: "Both brains share the autistic experience — sensory sensitivity, need for depth, social communication challenges. The AuDHD partner doesn't have to explain these; the ASD-1 partner already lives them." },
      { title: 'Special Interest Bonding', desc: "Shared or complementary special interests can create profound connection. These aren't casual hobbies — they're identity-level passions that both brains take seriously." },
      { title: 'Honest Communication', desc: "Both brains value direct, literal communication. The neurotypical social games that exhaust both partners are absent in this relationship." }
    ],
    friction: [
      { title: 'Predictability vs. Impulse', desc: "The ASD-1 brain builds systems and expects them to hold. The AuDHD brain builds systems (ASD side) and then breaks them (ADHD side). For the ASD-1 partner, watching their partner violate their own system is uniquely frustrating.", fromA: "You built this system. You said you needed it. Why are you ignoring it?", fromB: "I did need it. And I still do. But my ADHD brain overrode it, and I'm as frustrated as you are." },
      { title: 'Sensory Negotiations', desc: "Both brains have strong sensory needs, but the AuDHD brain's sensory profile oscillates (seeking vs. avoiding). The ASD-1 brain's sensory profile is more consistent. Finding stable environmental agreements is harder.", fromA: "Yesterday you needed silence. Today you're playing music at full volume. I can't keep adjusting.", fromB: "My sensory needs change with my ADHD-ASD balance on any given day. I know it's inconsistent. I wish I could control it." },
      { title: 'Processing Collisions', desc: "ASD-1 processes slowly and deliberately. AuDHD alternates between rapid ADHD processing and slow ASD processing. The speed mismatch creates conversational friction.", fromA: "I need you to slow down and let me finish processing before you change the topic.", fromB: "My brain just jumped — I didn't choose to change topics, my attention was captured. Pull me back gently." }
    ],
    conflictDashboard: {
      conflictSynthesis: "This pairing's deepest conflict emerges from a heartbreaking paradox: ASD-1 sees themselves in their AuDHD partner — the special interests, the sensory needs, the direct communication — and then experiences the ADHD overlay as a betrayal of that shared identity. The AuDHD partner violates the very systems ASD-1 thought they both needed.",
      dangerousMoments: [
        { icon: 'fa-list-check', title: 'The Violated System', desc: "AuDHD violated a household system they themselves designed. ASD-1 isn't just frustrated by the disruption — they're confused by the apparent self-contradiction. 'You BUILT this. You NEED this.' The answer — that the ADHD brain overrode the ASD brain — requires more neurology than most conversations have space for." },
        { icon: 'fa-wave-square', title: 'The Oscillating Sensory Profile', desc: "ASD-1 built their home environment around what AuDHD said they needed. Those needs changed with ADHD-ASD balance oscillation. ASD-1 cannot build a stable sensory environment because the target moves. This creates resentment that feels unjust to both partners." },
        { icon: 'fa-arrows-spin', title: 'The Speed-Switch Conversation', desc: "AuDHD shifts from ASD-mode (slow, literal, deliberate) to ADHD-mode (fast, associative, tangential) mid-conversation. ASD-1 was operating under the first set of conversational rules and is now left behind. The miscommunication feels like whiplash." },
        { icon: 'fa-equals', title: 'The False Equivalence Trap', desc: "Both partners' autism makes them both feel like the other 'should understand.' ASD-1 expects AuDHD to be more like them because of the shared autistic identity. AuDHD can't meet that expectation because the ADHD system won't cooperate. The assumption of sameness creates a higher bar for disappointment." },
        { icon: 'fa-brain', title: 'Simultaneous Meltdown and Overload', desc: "Both partners have depleted their regulation capacity at the same time. Neither can co-regulate. AuDHD may need contradiction (quiet AND stimulation). ASD-1 needs their established regulation routine. The collision of two dysregulated autistic brains is intense and prolonged." }
      ],
      repairToolkit: [
        { icon: 'fa-shield', title: 'The Autistic Alliance Repair', desc: "When ADHD overlay creates chaos, explicitly return to the autistic common ground: 'Let's talk autism-to-autism for a minute.' Shared sensory strategies, mutual special interests, and direct communication are the bedrock. Return to this foundation when the ADHD creates distance.", color: '#2DD4BF' },
        { icon: 'fa-sliders', title: 'Flexible Systems Architecture', desc: "Build household systems with ASD-1 precision but AuDHD-aware flexibility. Write guidelines, not rules. 'We aim for X' rather than 'X must happen.' This gives ASD-1 predictability and AuDHD grace for the days ADHD wins.", color: '#F59E0B' },
        { icon: 'fa-graduation-cap', title: 'ADHD Translation for the ASD-1 Partner', desc: "ASD-1 benefits enormously from understanding ADHD-specific neurology as separate from autism. The AuDHD partner's system-breaking is not autistic rigidity failing — it's ADHD executive dysfunction overriding autistic planning. This translation transforms moral judgment into neurological description.", color: '#8B5CF6' },
        { icon: 'fa-volume-down', title: 'Sensory Daily Check-In', desc: "Each morning: AuDHD reports their sensory mode for the day ('I'm in seeking mode' or 'I'm in avoiding mode'). ASD-1 uses this to set environmental defaults. Adjustments happen through quick signals, not negotiations. The oscillation becomes predictable even when the content varies.", color: '#34D399' }
      ]
    },
    fingerprint: { conflictRisk: 62, routineCompatibility: 55, sensoryCompatibility: 48, communicationEase: 60, emotionalSync: 65, recoverySpeed: 52 },
    bridges: [
      { title: 'The Autistic Alliance', desc: "Lead with what you share. When the ADHD overlay creates chaos, return to autistic common ground — shared sensory strategies, mutual special interests, honest communication." },
      { title: 'Flexible Systems', desc: "Build systems that are structured enough for the ASD-1 partner but flexible enough for the AuDHD partner's variability. Think 'guidelines' rather than 'rules.'" },
      { title: 'ADHD Translation', desc: "The ASD-1 partner benefits from learning ADHD-specific neurology. Understanding that their partner's system-breaking is neurological — not disrespectful — transforms the emotional response." }
    ],
    envDesign: "A sensory-aware home with adjustable elements: dimmable lights, noise machines with variable settings, multiple texture options for shared spaces. Create a flexible routine that has consistent anchors (meals, sleep) but variable middle sections.",
    needToKnowA: "\"I know you understand my autistic brain — and that makes the ADHD parts even more confusing for you. I want you to know: when I break our systems, I'm not rejecting what we built. I'm fighting an internal battle between two brains, and sometimes the ADHD wins. I need your patience, not your disappointment.\"",
    needToKnowB: "\"I see so much of myself in you — and that makes the differences feel bigger than they are. When your ADHD disrupts our shared systems, I need a moment to recalibrate before I can respond with compassion instead of rigidity. Give me that moment, and I'll meet you where you are.\""
  },

  'adhd-dyslexia|neurotypical': {
    overview: "The Neurotypical partner often has no idea how hard their ADHD-I/Dyslexia partner is working just to get through a normal day. The dual invisible conditions create a person who appears smart and capable (they are) but mysteriously drops balls, avoids paperwork, and seems inconsistent. The Neurotypical partner may cycle between 'they're so brilliant' and 'why can't they just...' — never realizing both observations reflect the same brain.",
    harmony: [
      { title: 'Verbal Brilliance + Written Stability', desc: "The ADHD-I/Dyslexia partner shines in verbal, creative, and big-picture domains. The Neurotypical partner naturally handles text-based tasks. Together, they cover the full communication spectrum." },
      { title: 'Pattern Recognition Partnership', desc: "The ADHD-I/Dyslexia brain sees patterns across domains that the Neurotypical brain misses. When the Neurotypical partner learns to trust these insights — even when they can't be easily articulated — they gain a powerful strategic advantage." }
    ],
    friction: [
      { title: 'The Paperwork Problem', desc: "Bills, forms, insurance, school communications — all require both sustained attention AND literacy. The ADHD-I/Dyslexia partner avoids them not from laziness but from dual executive overload. The Neurotypical partner absorbs the burden.", fromA: "I don't understand why you can give a brilliant presentation but can't fill out a simple form.", fromB: "The form requires every skill my brain lacks simultaneously. It's not simple for me — it's my worst nightmare in paper form." },
      { title: 'The Shame Spiral', desc: "The ADHD-I/Dyslexia partner carries dual shame — 'lazy' (ADHD) and 'stupid' (Dyslexia). The Neurotypical partner may inadvertently trigger both by expressing frustration about dropped tasks.", fromA: "I'm not trying to make you feel bad. I just need help with the logistics of our life.", fromB: "I know. But every time we have this conversation, I hear 'you're not enough' — even when you're not saying it." }
    ],
    conflictDashboard: {
      conflictSynthesis: "The core invisible conflict: the NT partner is carrying two categories of cognitive labor (text-heavy tasks AND executive function tasks) without knowing why. The ADHD-Dyslexia partner is drowning in dual shame without tools to explain it. The fight is never really about the missed form — it's about the accumulated weight of neurological difference neither partner fully understands.",
      dangerousMoments: [
        { icon: 'fa-file-slash', title: 'The Discovered Paperwork Avoidance', desc: "NT discovers an important form, bill, or document that has been avoided for weeks. NT experiences it as irresponsibility. ADHD-Dyslexia partner experiences the discovery as exposure of their deepest shame. The shame floods into defensiveness, and NT reads the defensiveness as confirmation of the irresponsibility." },
        { icon: 'fa-lightbulb', title: 'The Brilliant/Failing Paradox Trigger', desc: "NT has just watched their partner give a brilliant verbal performance — meeting, presentation, storytelling. Hours later, the same partner can't fill out a basic form. NT's frustration ('you just...') activates the Dyslexia shame ('I'm stupid') and the ADHD shame ('I'm lazy') simultaneously. The response is shutdown." },
        { icon: 'fa-arrows-split-up-and-left', title: 'The Inconsistent Follow-Through', desc: "ADHD-Dyslexia partner commits to a task with genuine intention. Working memory drops it within hours. NT checks in and discovers it hasn't started. The cycle of commitment → forgetting → discovery → shame → defensiveness → resentment repeats." },
        { icon: 'fa-book-open', title: 'Public Reading Situations', desc: "A restaurant menu, a sign, a document at a shared event. NT reads effortlessly; ADHD-Dyslexia partner struggles visibly. If NT shows impatience, the shame is immediate and consuming. If they help too visibly, the partner feels infantilized. There's no perfect action — only degrees of exposure." },
        { icon: 'fa-scale-unbalanced-flip', title: 'The Fairness Conversation', desc: "NT initiates a conversation about equitable task distribution. Every valid point they make activates both ADHD shame (executive dysfunction) and Dyslexia shame (literacy avoidance). Partner shuts down or becomes intensely defensive. NT experiences this as confirmation of unfairness rather than as a shame response." }
      ],
      repairToolkit: [
        { icon: 'fa-split', title: 'Divide Tasks by Cognitive Fit, Not Fairness', desc: "Explicitly redistribute all household tasks by cognitive fit, not arbitrary equality. NT takes all text-heavy administrative tasks. ADHD-Dyslexia partner takes all verbal, creative, and strategic domains. Reframe: this isn't accommodation — it's efficiency. Both partners working in their zones.", color: '#22D3EE' },
        { icon: 'fa-microphone', title: 'Voice-First Home Infrastructure', desc: "Replace text-based systems with voice-based systems wherever possible: voice reminders, speech-to-text apps, verbal calendar check-ins instead of written task lists. This removes the dual literacy-attention bottleneck from daily household management.", color: '#F59E0B' },
        { icon: 'fa-heart', title: 'The Shame Signal Protocol', desc: "ADHD-Dyslexia partner learns to say 'I'm in shame right now' when activated. NT agrees that this signal pauses the content conversation immediately — no continuing to make the point, even if it's valid. Shame cannot be reasoned with. It can only be witnessed and held.", color: '#FB7185' },
        { icon: 'fa-tools', title: 'Normalize Assistive Technology as Shared Tools', desc: "Make assistive technology a household feature, not a personal accommodation: text-to-speech on all shared devices, AI writing assistants, voice-controlled smart home. When NT uses the same tools, the stigma disappears and the partner's access needs become invisible.", color: '#8B5CF6' }
      ]
    },
    fingerprint: { conflictRisk: 55, routineCompatibility: 58, sensoryCompatibility: 65, communicationEase: 50, emotionalSync: 52, recoverySpeed: 62 },
    bridges: [
      { title: 'Divide by Strength', desc: "Explicitly divide tasks by cognitive fit. The Neurotypical partner handles text-heavy administrative tasks. The ADHD-I/Dyslexia partner handles verbal, creative, and strategic domains. This isn't accommodation — it's efficiency." },
      { title: 'Assistive Technology as Partnership Tool', desc: "Text-to-speech, speech-to-text, and AI writing tools aren't crutches — they're access tools. The Neurotypical partner who embraces these tools helps their partner function at full capacity." }
    ],
    envDesign: "Minimize paper-based systems. Use digital tools with voice input. Create a home 'communication hub' that is visual (whiteboard, magnetic calendar) rather than text-heavy. Audio reminders instead of written lists.",
    needToKnowA: "\"I am carrying two invisible conditions that make every text-based task in our life feel like climbing a mountain in the dark. I don't avoid paperwork because I don't care — I avoid it because it activates every deficit I have simultaneously. When you help without judgment, you give me the greatest gift possible.\"",
    needToKnowB: "\"I can see how hard you work and I want to make it easier. I don't always know how. But I want you to know: when I pick up the tasks you can't face, it's not resentment — it's love. Just let me know when the shame gets loud, and I'll remind you how brilliant you really are.\""
  },

  'dyslexia|neurotypical': {
    overview: "This pairing is often the smoothest of the neurodivergent-neurotypical combinations because Dyslexia (without ADHD) leaves executive function, attention, social skills, and emotional regulation largely intact. The friction is specific and manageable — centered on literacy-related tasks and the Neurotypical partner's potential underestimation of the cognitive cost of reading and writing.",
    harmony: [
      { title: 'Complementary Intelligence', desc: "The Dyslexic brain brings spatial reasoning, narrative thinking, and entrepreneurial pattern recognition. The Neurotypical brain brings efficient text processing. Together, they have access to both verbal and visual intelligence systems." },
      { title: 'Reliable Partnership', desc: "Unlike ADHD pairings, the Dyslexic partner's executive functions are intact. They can share household management, maintain routines, and follow through on commitments. The relationship burden is more equitably distributed." },
      { title: 'Emotional Stability', desc: "The Dyslexic partner's emotional regulation is generally typical. Shame exists but is localized to literacy rather than global. This allows for relatively straightforward emotional communication." }
    ],
    friction: [
      { title: 'Literacy Task Avoidance', desc: "Specific avoidance of reading-heavy tasks (menus, contracts, forms) may seem quirky until it creates practical problems. The Neurotypical partner may not realize the cognitive cost involved.", fromA: "It's just a menu — why do you need me to read it to you?", fromB: "Reading a menu in a dimly lit restaurant while people wait requires every ounce of my decoding energy. It's not 'just' anything." }
    ],
    conflictDashboard: {
      conflictSynthesis: "This pairing's conflicts are narrow but deep. The Neurotypical partner's primary error is the assumption that Dyslexia is an inconvenience rather than a genuine cognitive access barrier. The Dyslexic partner's primary burden is the shame that makes asking for help feel like admitting defeat.",
      dangerousMoments: [
        { icon: 'fa-eye', title: 'The Public Literacy Exposure', desc: "Signing a document, reading a menu, navigating an unfamiliar written environment in public. The NT partner's impatience — even a fraction of a second's hesitation — is registered immediately by the Dyslexic partner as evidence of their deficit. The shame is disproportionately large compared to the momentary inconvenience." },
        { icon: 'fa-file-signature', title: 'The Important Document Avoidance', desc: "A contract, lease, insurance document, or tax form needs to be read and completed. The Dyslexic partner has been avoiding it for weeks. NT discovers it. The avoidance was neurological; the discovery feels like moral failure. Both partners are now in incompatible emotional spaces." },
        { icon: 'fa-comment-slash', title: 'The Minimizing Response', desc: "NT says 'it's not that bad' or 'lots of people struggle with spelling.' These are attempts at comfort but are received as invalidation — minimizing a genuine neural difference as a minor inconvenience. The Dyslexic partner stops sharing." },
        { icon: 'fa-graduation-cap', title: 'Career and Education Friction', desc: "The Dyslexic partner's career or educational path is constrained by literacy demands. NT struggles to understand why someone so intelligent 'can't just' handle certain professional contexts. This misunderstanding can create long-running resentment about life choices." },
        { icon: 'fa-child', title: 'Children and Homework', desc: "When children need reading help or encounter their own literacy struggles, the Dyslexic parent's shame history can be triggered. They may withdraw from homework support to avoid exposure. NT may read this as disengagement from parenting." }
      ],
      repairToolkit: [
        { icon: 'fa-headphones', title: 'Normalize Assistive Tools as Household Defaults', desc: "Audiobooks become the default mode for reading-heavy content. Voice controls are the default for smart devices. Text-to-speech is installed on all shared devices. These aren't accommodations — they're household features. When NT uses them too, the shame context disappears.", color: '#22D3EE' },
        { icon: 'fa-hand-holding-heart', title: 'Learn the Shame Signature', desc: "NT learns to recognize when their Dyslexic partner is entering shame territory: avoidance, deflection, humor, or sudden disengagement. These are signals to shift from frustration to curiosity — 'is this hard for you?' rather than 'why haven't you done this?'", color: '#F59E0B' },
        { icon: 'fa-trophy', title: 'Actively Celebrate Dyslexic Strengths', desc: "NT makes a practice of naming the Dyslexic partner's spatial, narrative, and entrepreneurial strengths out loud and regularly. This reframes the relationship's implicit narrative from 'you need help with words' to 'you see things I can't see.'", color: '#34D399' },
        { icon: 'fa-split', title: 'Task Division by Access, Not Fairness', desc: "All literacy-heavy household tasks go to the NT partner. All spatial, verbal, creative, and large-picture tasks go to the Dyslexic partner. Not equal — fair. Both partners get to work in their access zone.", color: '#8B5CF6' }
      ]
    },
    fingerprint: { conflictRisk: 35, routineCompatibility: 75, sensoryCompatibility: 78, communicationEase: 72, emotionalSync: 70, recoverySpeed: 80 },
    bridges: [
      { title: 'Normalize Assistive Tools', desc: "Audiobooks, text-to-speech, speech-to-text — these are access tools, not cheating. The Neurotypical partner who normalizes them removes shame from the equation." },
      { title: 'Celebrate the Strengths', desc: "The Dyslexic brain's spatial and narrative thinking is a genuine cognitive gift. The Neurotypical partner who actively seeks and celebrates these strengths builds their partner's identity beyond the deficit." }
    ],
    envDesign: "A home that minimizes unnecessary literacy demands. Voice-activated systems, visual organization, and audio-based communication tools. The reading load should be distributed based on cognitive fit, not assumed equality.",
    needToKnowA: "\"Reading is hard for me in a way that's difficult to explain to someone for whom it's automatic. When I ask you to read something, it's not laziness — it's access. When you help without judgment, you make our life work.\"",
    needToKnowB: "\"I sometimes forget that what's effortless for me costs you real energy. I want to be more aware of when I'm asking you to do something that's genuinely hard for your brain. Help me see it, and I'll always adjust.\""
  }
};
