// ============================================================
// THE NEURODIVERGENT BRAIN — Conflict Intelligence Engine
// Per-pair: Conflict Dashboard, 5 Danger Moments, Repair Toolkit
// Compatibility axes for radar chart
// ============================================================

// ─── COMPATIBILITY AXES ─────────────────────────────────────
// Per-neurotype scores on 6 relational axes (0–10)
// Used for the compatibility radar chart in the explorer
const COMPAT_AXES = {
  neurotypical:   { emotional: 5, structure: 6, sensory: 5, communication: 6, recovery: 6, energy: 6 },
  'adhd-c':       { emotional: 9, structure: 2, sensory: 3, communication: 7, recovery: 8, energy: 9 },
  'adhd-i':       { emotional: 6, structure: 3, sensory: 3, communication: 4, recovery: 5, energy: 3 },
  overfocused:    { emotional: 7, structure: 9, sensory: 5, communication: 5, recovery: 2, energy: 5 },
  temporal:       { emotional: 10, structure: 4, sensory: 7, communication: 4, recovery: 3, energy: 7 },
  limbic:         { emotional: 7, structure: 5, sensory: 3, communication: 3, recovery: 4, energy: 2 },
  ringoffire:     { emotional: 10, structure: 3, sensory: 10, communication: 7, recovery: 3, energy: 9 },
  anxious:        { emotional: 8, structure: 7, sensory: 5, communication: 4, recovery: 3, energy: 4 },
  'adhd-dyslexia':{ emotional: 7, structure: 2, sensory: 3, communication: 5, recovery: 6, energy: 6 },
  dyslexia:       { emotional: 4, structure: 6, sensory: 3, communication: 5, recovery: 7, energy: 6 },
  'asd-1':        { emotional: 6, structure: 9, sensory: 8, communication: 4, recovery: 5, energy: 4 },
  'asd-2':        { emotional: 7, structure: 9, sensory: 9, communication: 3, recovery: 4, energy: 3 },
  'asd-3':        { emotional: 8, structure: 10, sensory: 10, communication: 2, recovery: 4, energy: 3 },
  audhd:          { emotional: 9, structure: 6, sensory: 9, communication: 5, recovery: 3, energy: 7 }
};
const COMPAT_AXIS_LABELS = ['Emotional Intensity','Structure Need','Sensory Load','Communication','Recovery Time','Energy Level'];

// ─── HELPER: compute compatibility overlap score (0–100) ────
function getCompatibilityScore(idA, idB) {
  const a = COMPAT_AXES[idA], b = COMPAT_AXES[idB];
  if (!a || !b) return 50;
  const keys = Object.keys(a);
  const diff = keys.reduce((sum, k) => sum + Math.abs(a[k] - b[k]), 0);
  const maxDiff = keys.length * 10;
  return Math.round(100 - (diff / maxDiff) * 100);
}

// ─── CONFLICT SEVERITY HELPER ───────────────────────────────
// Returns { level: 'high'|'medium'|'low', label, color, icon }
function conflictLevel(idA, idB, dimension) {
  const key = [idA, idB].sort().join('|');
  const data = DIMENSION_CONFLICT_MAP[key];
  if (data && data[dimension] !== undefined) {
    const lvl = data[dimension];
    if (lvl >= 3) return { level: 'high',   label: 'High Friction',         color: '#EF4444', icon: 'fa-fire' };
    if (lvl === 2) return { level: 'medium', label: 'Requires Negotiation',  color: '#F59E0B', icon: 'fa-triangle-exclamation' };
    if (lvl === 1) return { level: 'low',    label: 'Generally Compatible',  color: '#34D399', icon: 'fa-check-circle' };
    return             { level: 'harmony', label: 'Natural Complement',     color: '#22D3EE', icon: 'fa-puzzle-piece' };
  }
  // Fallback: derive from axis difference
  const a = COMPAT_AXES[idA], b = COMPAT_AXES[idB];
  const axisMap = { emotionalRegulation:'emotional', sensoryNeeds:'sensory', routineSpontaneity:'structure',
                    communicationStyle:'communication', energySocial:'energy', conflictStyle:'emotional' };
  const axis = axisMap[dimension];
  if (a && b && axis) {
    const diff = Math.abs(a[axis] - b[axis]);
    if (diff >= 6) return { level: 'high',   label: 'High Friction',        color: '#EF4444', icon: 'fa-fire' };
    if (diff >= 3) return { level: 'medium', label: 'Requires Negotiation', color: '#F59E0B', icon: 'fa-triangle-exclamation' };
    return           { level: 'low',    label: 'Generally Compatible',  color: '#34D399', icon: 'fa-check-circle' };
  }
  return { level: 'low', label: 'Generally Compatible', color: '#34D399', icon: 'fa-check-circle' };
}

// Per-pair, per-dimension friction score: 0=complement, 1=low, 2=medium, 3=high
const DIMENSION_CONFLICT_MAP = {
  'adhd-c|neurotypical': {
    coreWiring:3, attentionInConversation:3, emotionalRegulation:3, conflictStyle:3,
    sensoryNeeds:2, timePlanning:3, communicationStyle:2, energySocial:2,
    routineSpontaneity:3, decisionMaking:3, intimacyConnection:2, householdLogistics:3,
    maskingAuthenticity:1, triggerPoint:3, complement:0, needToUnderstand:1
  },
  'adhd-i|asd-1': {
    coreWiring:2, attentionInConversation:3, emotionalRegulation:2, conflictStyle:2,
    sensoryNeeds:3, timePlanning:2, communicationStyle:3, energySocial:1,
    routineSpontaneity:3, decisionMaking:2, intimacyConnection:2, householdLogistics:3,
    maskingAuthenticity:1, triggerPoint:2, complement:0, needToUnderstand:1
  },
  'adhd-c|asd-1': {
    coreWiring:3, attentionInConversation:3, emotionalRegulation:3, conflictStyle:3,
    sensoryNeeds:3, timePlanning:3, communicationStyle:3, energySocial:3,
    routineSpontaneity:3, decisionMaking:3, intimacyConnection:3, householdLogistics:3,
    maskingAuthenticity:2, triggerPoint:3, complement:0, needToUnderstand:1
  },
  'audhd|neurotypical': {
    coreWiring:3, attentionInConversation:3, emotionalRegulation:3, conflictStyle:3,
    sensoryNeeds:2, timePlanning:3, communicationStyle:3, energySocial:3,
    routineSpontaneity:3, decisionMaking:3, intimacyConnection:2, householdLogistics:2,
    maskingAuthenticity:1, triggerPoint:3, complement:0, needToUnderstand:1
  },
  'adhd-c|adhd-i': {
    coreWiring:2, attentionInConversation:2, emotionalRegulation:2, conflictStyle:3,
    sensoryNeeds:1, timePlanning:3, communicationStyle:2, energySocial:3,
    routineSpontaneity:2, decisionMaking:2, intimacyConnection:2, householdLogistics:3,
    maskingAuthenticity:1, triggerPoint:3, complement:0, needToUnderstand:1
  },
  'asd-1|audhd': {
    coreWiring:2, attentionInConversation:2, emotionalRegulation:2, conflictStyle:2,
    sensoryNeeds:2, timePlanning:2, communicationStyle:2, energySocial:1,
    routineSpontaneity:3, decisionMaking:2, intimacyConnection:1, householdLogistics:3,
    maskingAuthenticity:1, triggerPoint:2, complement:0, needToUnderstand:1
  },
  'adhd-c|audhd': {
    coreWiring:2, attentionInConversation:2, emotionalRegulation:2, conflictStyle:2,
    sensoryNeeds:2, timePlanning:2, communicationStyle:2, energySocial:2,
    routineSpontaneity:3, decisionMaking:2, intimacyConnection:2, householdLogistics:2,
    maskingAuthenticity:1, triggerPoint:2, complement:0, needToUnderstand:1
  },
  'limbic|neurotypical': {
    coreWiring:2, attentionInConversation:2, emotionalRegulation:3, conflictStyle:2,
    sensoryNeeds:1, timePlanning:2, communicationStyle:3, energySocial:3,
    routineSpontaneity:1, decisionMaking:2, intimacyConnection:3, householdLogistics:3,
    maskingAuthenticity:2, triggerPoint:3, complement:1, needToUnderstand:1
  },
  'ringoffire|neurotypical': {
    coreWiring:3, attentionInConversation:3, emotionalRegulation:3, conflictStyle:3,
    sensoryNeeds:3, timePlanning:2, communicationStyle:3, energySocial:3,
    routineSpontaneity:2, decisionMaking:3, intimacyConnection:3, householdLogistics:2,
    maskingAuthenticity:2, triggerPoint:3, complement:0, needToUnderstand:1
  },
  'temporal|neurotypical': {
    coreWiring:3, attentionInConversation:3, emotionalRegulation:3, conflictStyle:3,
    sensoryNeeds:2, timePlanning:2, communicationStyle:3, energySocial:2,
    routineSpontaneity:2, decisionMaking:3, intimacyConnection:3, householdLogistics:2,
    maskingAuthenticity:2, triggerPoint:3, complement:1, needToUnderstand:1
  },
  'anxious|neurotypical': {
    coreWiring:2, attentionInConversation:2, emotionalRegulation:2, conflictStyle:2,
    sensoryNeeds:1, timePlanning:2, communicationStyle:2, energySocial:2,
    routineSpontaneity:1, decisionMaking:2, intimacyConnection:2, householdLogistics:1,
    maskingAuthenticity:2, triggerPoint:2, complement:0, needToUnderstand:1
  },
  'overfocused|neurotypical': {
    coreWiring:2, attentionInConversation:2, emotionalRegulation:2, conflictStyle:3,
    sensoryNeeds:1, timePlanning:2, communicationStyle:2, energySocial:1,
    routineSpontaneity:2, decisionMaking:2, intimacyConnection:2, householdLogistics:1,
    maskingAuthenticity:1, triggerPoint:3, complement:1, needToUnderstand:1
  }
};

// ─── MASTER CONFLICT DATA ────────────────────────────────────
// Keys are sorted pair IDs joined with '|'
const CONFLICT_DATA = {

  'adhd-c|neurotypical': {
    coreFriction: "The Neurotypical brain runs on consistency and plans ahead — the ADHD-Combined brain runs on impulse and lives in the moment. Every unilateral decision, every missed commitment, every chaotic burst of energy is experienced by the NT partner as a pattern of disrespect, even as the ADHD-C partner genuinely didn't see it coming.",
    neuroBridge: "ADHD-C's impulsivity is not a choice — it's dopamine-driven executive circuit failure. NT's frustration is not criticism — it's the survival response of a brain that needs predictability. Both are neurologically valid. The conflict dissolves when NT stops reading impulsivity as contempt, and ADHD-C stops reading structure as control.",
    dangerMoments: [
      { title: "The Unilateral Decision", scenario: "ADHD-C commits to something major — a social event, a purchase, a schedule change — without consulting their partner. NT discovers it after the fact.", why: "Dopamine pull toward novel opportunity overrides the prefrontal 'check with partner first' loop. The NT brain experiences this as exclusion and disrespect.", defuse: "ADHD-C uses the 24-hour rule for any decision above a set threshold. NT identifies three specific categories where consultation is non-negotiable and communicates them clearly." },
      { title: "The Invisible Mental Load Eruption", scenario: "NT partner finally explodes about carrying all the household logistics — bills, appointments, scheduling. ADHD-C is blindsided and defensive.", why: "ADHD-C's working memory failure makes the load genuinely invisible to them. NT's resentment has been building silently while the ADHD-C partner felt things were fine.", defuse: "Monthly explicit 'logistics review' where the task list is made visible, not implied. NT names the specific tasks; ADHD-C doesn't defend, just receives." },
      { title: "The Emotional Intensity Spike", scenario: "ADHD-C explodes in frustration — loud, fast, cutting. NT freezes or shuts down. ADHD-C recovers in minutes; NT is still processing hours later.", why: "ADHD-C's RSD and fast emotional processing vs. NT's slower, more linear emotional recovery. The asymmetry creates a cycle: ADHD-C feels the storm passed; NT is still in it.", defuse: "ADHD-C learns to flag the intensity: 'I'm having a big emotion right now — give me 10 minutes.' NT signals when they need time: 'I need to process before we continue.'" },
      { title: "The Plan Implosion", scenario: "NT spent significant time planning — a trip, a dinner, a project. ADHD-C impulsively suggests something entirely different on the day.", why: "Novel stimulus hijacks ADHD-C's attention. They may not remember the prior plan fully, or the new idea hit so hard it pushed everything else out.", defuse: "NT voice-flags when a plan required significant effort: 'This one matters to me — please don't change it.' ADHD-C creates a mental or physical flag for 'protected plans.'" },
      { title: "The 'Calm Down' Trigger", scenario: "NT says 'calm down,' 'relax,' or 'you're overreacting.' ADHD-C's RSD activates and the conflict escalates immediately.", why: "These phrases tell the ADHD-C brain that its emotional reality is invalid. RSD then floods the system — shame turns to rage.", defuse: "NT replaces invalidating language with grounding questions: 'Tell me what you need right now.' ADHD-C signals when they're flooded: 'RSD is online — give me space, not solutions.'" }
    ],
    repairToolkit: [
      { step: "The Pause Signal", forA: "NT: Say 'I need a moment before I respond' — and mean it. Don't use silence as punishment.", forB: "ADHD-C: Respect the pause. Don't escalate to fill the silence. Set a return time: 'I'll come back in 20 minutes.'" },
      { step: "The Logistics Board", forA: "NT: Write the mental load down — all of it. Make it visible on a shared board, not a complaint.", forB: "ADHD-C: Commit to reviewing the board daily. Pick two tasks per week that you own completely, with external reminders set." },
      { step: "The Repair Phrase", forA: "Both: Agree on one low-stakes repair phrase (e.g., 'brains colliding') that either partner can say to pause conflict without assigning blame.", forB: "When you hear the phrase, both stop, breathe, and set a time to return to the conversation calm." }
    ]
  },

  'adhd-i|asd-1': {
    coreFriction: "The ASD-1 brain builds meticulous systems and needs predictability to function. The ADHD-I brain, despite good intentions, drifts, forgets, and drops the exact systems the ASD partner depends on. This creates a repeating cycle: ASD partner's trust is violated, ADHD-I partner feels crushing shame, apology is given, system is rebuilt, and then broken again.",
    neuroBridge: "ADHD-I's working memory failure makes forgetting involuntary — it is neurologically no different from being unable to see colour. ASD-1's distress at broken systems is a genuine nervous system threat response, not perfectionism. When the ASD partner understands forgetting isn't abandonment, and the ADHD partner understands distress isn't control, the cycle can break.",
    dangerMoments: [
      { title: "The Forgotten Plan", scenario: "ADHD-I forgets an agreed-upon plan, appointment, or commitment. The ASD partner had organized their entire day around it.", why: "Working memory failure means the plan simply ceased to exist in ADHD-I's brain. The ASD partner's schedule is not flexible — the disruption triggers genuine distress.", defuse: "All agreements go into a shared digital system with automated reminders to both partners. Verbal agreements alone are insufficient and both partners know this." },
      { title: "The Shutdown vs. Disappearance Loop", scenario: "ASD partner needs to process slowly and goes quiet. ADHD-I reads the silence as rejection, becomes more anxious, and pursues. ASD shuts down further.", why: "ADHD-I's RSD interprets ASD's processing silence as withdrawal. ASD's nervous system escalates further when pushed. Both partners' needs are being activated simultaneously.", defuse: "ASD partner uses a signal word that means 'processing, not rejecting' — and commits to a return time. ADHD-I accepts the signal and stops pursuing." },
      { title: "The Environmental Mismatch War", scenario: "ADHD-I needs some background stimulation to stay present. ASD-1 needs quiet and controlled sensory input. They can't agree on how the shared space should feel.", why: "Both needs are neurological non-negotiables. Neither brain can simply override its sensory requirements through willpower.", defuse: "Designate specific zones: ASD-1 has a sensory-managed retreat. ADHD-I has a stimulation zone. Shared spaces are negotiated with explicit agreements reviewed monthly." },
      { title: "The Tangential Conversation", scenario: "ADHD-I jumps topics mid-conversation. ASD-1 is still processing the original point and loses the thread entirely.", why: "ADHD-I's brain makes rapid associative leaps — the new thought displaces the current one immediately. ASD-1 requires topic continuity to process effectively.", defuse: "ADHD-I flags topic changes: 'Jumping to something connected.' ASD-1 is allowed to redirect: 'Hold that thought — I haven't finished with the first one.'" },
      { title: "The Unspoken Rule Violation", scenario: "ADHD-I unknowingly violates an ASD-1 rule that was never verbalized. ASD partner is intensely distressed; ADHD partner has no idea what happened.", why: "ASD-1 often has implicit rules that feel so obvious they don't require stating. ADHD-I genuinely cannot encode rules that weren't externalized.", defuse: "ASD-1 writes explicit household rules and preferences in a shared document. ADHD-I commits to reading it and asking for clarification, not guessing." }
    ],
    repairToolkit: [
      { step: "The Written Agreement System", forA: "ASD-1: Create a 'household manual' with your preferences and non-negotiables written explicitly. Don't assume anything is 'obvious.'", forB: "ADHD-I: Read the manual. Reference it. Add your own needs. When you violate something, name it and add an external reminder to prevent recurrence." },
      { step: "The Processing Flag", forA: "ASD-1: Use a specific signal — a word, a gesture, a text message — that means 'I am processing, I will return, I am not rejecting you.' Commit to a return time.", forB: "ADHD-I: When you receive the signal, trust it. Occupy your mind elsewhere for the agreed period rather than pursuing." },
      { step: "The Compassion Translation Practice", forA: "Both partners practice translating behavior through neurology before responding. 'They forgot' becomes 'working memory failure.' 'They went cold' becomes 'nervous system protection.'", forB: "Make this a shared habit, not a one-sided accommodation." }
    ]
  },

  'adhd-c|asd-1': {
    coreFriction: "The highest-conflict pairing on the neurotype spectrum. ADHD-C's core need is stimulation, spontaneity, and external energy release. ASD-1's core need is predictability, sensory management, and depth over breadth. Every ADHD-C strength — the spontaneity, the energy, the impulsivity — is a direct attack on ASD-1's regulatory system. Every ASD-1 strength — the reliability, the depth, the precision — feels to ADHD-C like constraint and deadness.",
    neuroBridge: "The ADHD-C brain is not disrespecting ASD by being spontaneous — it is dysregulating. The ASD-1 brain is not controlling by needing predictability — it is surviving. The only path through is a shared agreement that both neuologies are real, both need accommodation, and the relationship requires active structural design — not just goodwill.",
    dangerMoments: [
      { title: "The Plan Implosion (Critical Version)", scenario: "ASD-1 has planned for a week around a specific event. ADHD-C impulsively cancels or changes it hours before, for something more interesting.", why: "ADHD-C dopamine capture. ASD-1 has built their entire nervous system schedule around this plan — the cancellation is a regulatory catastrophe, not an inconvenience.", defuse: "'Protected plans' are designated in advance and cannot be changed within 48 hours without serious reason. ADHD-C lists these as non-negotiables in their phone." },
      { title: "Sensory Assault", scenario: "ADHD-C brings loud friends over without warning, cranks music, fills the home with unpredictable energy. ASD-1 goes into shutdown.", why: "ADHD-C genuinely didn't think it through — the dopamine opportunity outran the forecast. ASD-1's sensory threshold is breached and shutdown is the nervous system's only exit.", defuse: "Any change to the home's sensory environment that involves other people requires minimum 24-hour notice. ASD-1 has one room that is always their regulated refuge." },
      { title: "The RSD-Shutdown Collision", scenario: "ASD-1 shuts down during conflict — goes silent, withdraws, becomes unresponsive. ADHD-C's RSD reads this as abandonment and escalates. ASD-1 shuts down further.", why: "ASD-1 shutdown is an autonomic safety response. ADHD-C escalation is RSD trying to re-establish connection. Both are survival states — but they mutually amplify.", defuse: "Both partners learn each other's shutdown/escalation signals. ASD-1 says 'shutdown, not rejection, return in [time].' ADHD-C is given a specific task or physical activity to do during the wait." },
      { title: "The Emotional Processing Delay", scenario: "ADHD-C has a big emotion right now and needs engagement. ASD-1's emotional processing delay means their feelings won't arrive for 12–48 hours.", why: "ADHD-C's fast emotional expression + ASD-1's delayed processing creates a chronological mismatch that looks like ASD-1 doesn't care.", defuse: "ADHD-C learns: 'My partner's silence now means they're processing, not absent. Their feelings will come.' ASD-1 learns to say: 'I feel something but can't name it yet. Give me time.'" },
      { title: "The 'Too Much' Moment", scenario: "ASD-1, overwhelmed by accumulated ADHD-C intensity, says 'you're too much' or visibly recoils. ADHD-C's RSD detonates.", why: "ASD-1's honest sensory/social truth lands as the deepest wound in the ADHD-C brain — confirmation of their greatest fear.", defuse: "ASD-1 replaces 'too much' with 'I'm at capacity and need 20 minutes.' ADHD-C learns that capacity-based withdrawal is about the ASD brain's regulatory system, not their worth." }
    ],
    repairToolkit: [
      { step: "The Advance Notice Agreement", forA: "ASD-1: Write a list of your top 5 sensory and scheduling non-negotiables. Share it. Review it quarterly.", forB: "ADHD-C: Commit to one specific advance-notice rule per category. Use phone alerts if memory is the barrier." },
      { step: "The Retreat and Return Protocol", forA: "ASD-1: Signal shutdown clearly with a specific word and a return time. Never exit without a time.", forB: "ADHD-C: Accept the signal. Do not pursue. Have a pre-agreed self-soothing activity ready (walk, music, physical task)." },
      { step: "Weekly Design Meeting", forA: "Both: Spend 15 minutes each Sunday previewing the week together. ADHD-C gets visibility on what's protected. ASD-1 gets to see where flex zones exist.", forB: "This single habit prevents more conflicts than almost any other intervention." }
    ]
  },

  'audhd|neurotypical': {
    coreFriction: "The NT partner is trying to build a consistent model of their AuDHD partner so they know how to help. The AuDHD partner genuinely cannot be modeled consistently — their two neurological systems produce different needs hour to hour. The NT partner's reasonable need for predictability is in direct conflict with the AuDHD partner's neurological impossibility of providing it.",
    neuroBridge: "NT must understand that the AuDHD partner's contradictions are not manipulation, mood, or immaturity — they are two separate neurological systems competing for control in the same brain. AuDHD must understand that NT's need for a consistent partner isn't rigid — it's human. Both needs are real. Flexibility must replace prediction as the relationship's operating system.",
    dangerMoments: [
      { title: "The 180° Need Reversal", scenario: "AuDHD requested a specific plan, NT made it happen, and now AuDHD is resistant to or overwhelmed by it.", why: "The ASD system was dominant when the plan was requested. By execution time, the ADHD system has taken over and the plan feels constraining or overstimulating.", defuse: "NT stops taking plan changes personally — they are neurological, not personal. AuDHD flags: 'My brain shifted — can we modify, not cancel?' They preserve NT's effort while acknowledging the shift." },
      { title: "The Burnout Collapse", scenario: "AuDHD has been masking both ADHD and ASD traits in public all week. They come home and collapse — withdrawn, irritable, or shutdown. NT feels they've done something wrong.", why: "Double-masking depletes AuDHD at a rate NT cannot see. The collapse is a safety valve. NT's absence of fault is total — but the collapse lands on them anyway.", defuse: "AuDHD names the depletion state early: 'I'm in mask-collapse, not relationship-conflict.' NT learns the depletion signals (eyes glazed, one-word responses) and responds with space, not questions." },
      { title: "The Communication Mode Switch", scenario: "Yesterday they were highly verbal and analytical. Today they're one-word answers or non-responsive. NT doesn't know which partner they're talking to.", why: "ADHD-dominant days produce verbal, tangential, fast communication. ASD-dominant days produce quiet, literal, minimal communication. Both are real states.", defuse: "AuDHD develops a simple morning signal — even an emoji — indicating dominant brain mode today. NT adjusts communication approach accordingly without requiring explanation." },
      { title: "The Meltdown Nobody Saw Coming", scenario: "Everything seemed fine. Then a minor trigger — a change in plans, a sensory irritant, a perceived social slight — produces a full emotional collapse.", why: "AuDHD's emotional regulation is the sum of ADHD's RSD volatility plus ASD's interoception gaps. The load was already full; the trigger was the last drop.", defuse: "Both partners track 'load indicators' — sleep quality, social exposure that week, sensory burden. When the load is high, both treat minor provocations as high-risk and add buffer time." },
      { title: "The 'Which One Are You?' Frustration", scenario: "NT expresses frustration: 'I never know which version of you I'm getting.' AuDHD hears their core identity rejected.", why: "NT is expressing a valid relational need for consistency. AuDHD hears 'you are fundamentally broken and unlovable.' Both are valid, and both feel devastated.", defuse: "NT reframes: 'I'm learning your patterns — help me understand today's brain.' AuDHD reframes: 'Both versions of me are valid — here's how to read today.'" }
    ],
    repairToolkit: [
      { step: "The Morning Brain Check-In", forA: "AuDHD: Each morning, send a simple signal: 'ASD brain today' or 'ADHD brain today' or 'war zone.' This is not oversharing — it's a navigation tool.", forB: "NT: Receive it without judgment. Adjust your communication and expectations for the day accordingly." },
      { step: "The Unmasking Contract", forA: "AuDHD: Tell your partner explicitly what unmasking looks like for you (rocking, stimming, silence, bluntness). Ask them to treat these as healthy, not concerning.", forB: "NT: When you see unmasking behaviors, resist the urge to fix or comment. Treat them as a good sign — your partner feels safe." },
      { step: "The Depletion Protocol", forA: "Both: Agree that 'I'm depleted' is a complete sentence that requires no further explanation and triggers a specific response (quiet, space, simple food).", forB: "NT takes no social action during depletion events. AuDHD does not make relationship decisions during depletion events." }
    ]
  },

  'adhd-c|adhd-i': {
    coreFriction: "Two ADHD brains sharing a life, but neither compensates for the other's deficits — both deficit domains are present simultaneously with no neurotypical counterweight. The executive function vacuum is real: nobody naturally maintains systems, nobody reliably holds the schedule, and RSD meets RSD with explosive results.",
    neuroBridge: "The gift of this pairing is radical, non-judgment mutual understanding. The danger is compounded executive dysfunction. The path forward isn't trying to be neurotypical — it's building external systems that do what neither brain can reliably do internally.",
    dangerMoments: [
      { title: "The RSD Collision", scenario: "ADHD-C makes an impulsive comment that lands hard. ADHD-I's RSD triggers withdrawal. ADHD-C reads the withdrawal as rejection and RSD activates with anger.", why: "RSD in ADHD-C produces explosive externalized response. RSD in ADHD-I produces implosive withdrawal. These are mutually amplifying — anger chases silence which activates more anger.", defuse: "Shared RSD language: 'My RSD is activated' stops the cycle by naming the neurology. Both partners commit to a 20-minute pause when these words are spoken." },
      { title: "The Executive Function Vacuum Crisis", scenario: "A major administrative task (taxes, insurance, medical bill) has been avoided by both partners until it becomes a crisis.", why: "Neither brain naturally initiates the task. Both experience the same task initiation paralysis. Shame compounds when both recognize the shared failure.", defuse: "High-stakes tasks are assigned to an external service (accountant, assistant) or have an accountability partner outside the relationship. Remove the task from the relationship dynamic entirely." },
      { title: "The Energy Mismatch Day", scenario: "ADHD-C is in a high-energy phase and wants engagement. ADHD-I is depleted and needs withdrawal. ADHD-C interprets ADHD-I's quiet as rejection.", why: "ADHD-C's social energy is currently high; ADHD-I's is depleted. The same RSD vulnerability in both brains creates asymmetric needs at asymmetric moments.", defuse: "ADHD-I uses a specific phrase: 'I need quiet, not distance.' ADHD-C has a solo activity ready that doesn't require the relationship's energy." },
      { title: "The Simultaneous Time Blindness Disaster", scenario: "Both partners lose track of time on separate tasks. Nothing happens. Dinner isn't made, the appointment is missed, the bill isn't paid.", why: "Time blindness is shared — no one was anchoring to external time. The compounded effect is total schedule collapse.", defuse: "Shared external timers, automated reminders, and scheduled 'sync moments' through the day that both receive. The system replaces both partners' time awareness." },
      { title: "The Shame Spiral Feed", scenario: "ADHD-C expresses frustration about the household state. ADHD-I hears 'you're a failure' and withdraws further. ADHD-C escalates feeling unheard. Both spiral.", why: "Both brains carry the 'lazy/worthless' shame narrative. When it's activated by a partner who shares the condition, it stings uniquely — because the partner 'should understand.'", defuse: "Establish a rule: neither partner uses productivity-shaming language. Replace 'Why didn't you...' with 'Can we figure out together why this keeps not happening?'" }
    ],
    repairToolkit: [
      { step: "The Shared External System", forA: "Both: Invest in automation. Autopay everything possible. Use shared task apps with reminders. Consider a weekly housekeeper if affordable. The system is the solution, not willpower.", forB: "Review the system monthly, not when things fail. Proactive maintenance prevents crisis." },
      { step: "The RSD Pause Protocol", forA: "Both: Agree the phrase 'RSD online' stops any conversation immediately. No exceptions. The conversation resumes after a minimum 20-minute break.", forB: "Neither partner interprets the pause as abandonment. Use body doubling — be in the same space doing separate things — during the pause." },
      { step: "The Strength Division", forA: "ADHD-C: Own the tasks that benefit from urgency, spontaneity, and high energy (shopping trips, social planning, crisis response).", forB: "ADHD-I: Own the tasks that benefit from deep focus once initiated (research, creative projects, detailed analysis). Neither is 'carrying more' — different strengths, different domains." }
    ]
  },

  'asd-1|audhd': {
    coreFriction: "The ASD-1 partner understands their own autistic needs perfectly — and is confused by an AuDHD partner who shares those needs but repeatedly overrides them with ADHD impulses. The AuDHD partner experiences their own system-violation as exhausting and shameful. The ASD-1 partner experiences it as their partner 'choosing' chaos over the shared systems they built together.",
    neuroBridge: "The AuDHD partner is not choosing to break the system — the ADHD system is overriding the autistic system in real time. The ASD-1 partner must understand that the AuDHD brain fights itself daily. The AuDHD partner must communicate when the ADHD system is dominant so the ASD-1 partner can adjust expectations proactively rather than being blindsided.",
    dangerMoments: [
      { title: "The System Breach", scenario: "AuDHD and ASD-1 built a routine together. AuDHD impulsively breaks it, citing 'something came up.' ASD-1's regulatory system destabilizes.", why: "AuDHD's ADHD system captured a novel opportunity and overrode the autistic routine-protection instinct. ASD-1 had no warning and their scaffolding collapsed.", defuse: "AuDHD flags in advance when the ADHD system is pulling: 'My ADHD is pushing me toward X — can we modify the plan rather than abandon it?'" },
      { title: "The Sensory Negotiation Breakdown", scenario: "AuDHD is in a sensory-seeking ADHD phase. ASD-1 is in a sensory-protection autistic phase. The shared space becomes a sensory battlefield.", why: "Both brains have legitimate, neurologically-driven sensory needs that directly contradict each other at this moment.", defuse: "Default to the ASD-1 partner's sensory needs in shared spaces. AuDHD has a dedicated sensory-seeking zone where ADHD stimulation needs can be met without impacting the shared environment." },
      { title: "The Processing Speed Collision", scenario: "AuDHD is in fast ADHD mode. ASD-1 needs extended processing time. AuDHD keeps adding new information before ASD-1 has processed the previous point.", why: "ADHD-rapid processing meets ASD-deliberate processing. AuDHD doesn't realize they've overloaded ASD-1's processing capacity.", defuse: "ASD-1 uses a hand signal or specific word to indicate 'overloaded — pause.' AuDHD commits to honoring the signal without interpretation (not rejection, just capacity)." },
      { title: "The Inconsistent Self", scenario: "ASD-1 observes AuDHD being consistent one week and chaotic the next. ASD-1 cannot build a reliable model of the relationship and becomes anxious.", why: "AuDHD's dominant system shifts with sleep, sensory load, stress, and hormones. The inconsistency is neurological, not intentional.", defuse: "AuDHD maintains a simple daily log (even just emojis) so ASD-1 can see patterns over time and build a more accurate model of the relationship's variability." },
      { title: "The 'You Should Know Better' Accusation", scenario: "ASD-1 says 'you know how I need things — why do you keep doing this?' AuDHD feels condemned for something they couldn't control.", why: "ASD-1 correctly knows what they need. AuDHD correctly knows what ASD-1 needs. The ADHD system overrode that knowledge in the moment. Awareness doesn't equal control.", defuse: "ASD-1 replaces accusation with curiosity: 'Which brain was driving when this happened?' AuDHD commits to explaining the ADHD override rather than just apologizing." }
    ],
    repairToolkit: [
      { step: "The Brain Mode Log", forA: "AuDHD: Maintain a simple daily signal (morning text, emoji, whiteboard note) indicating dominant mode: ASD-heavy, ADHD-heavy, or balanced. This is the single most useful preventive tool.", forB: "ASD-1: Use the signal to adjust expectations for that day. On ADHD-heavy days, treat system variations as probable rather than exceptional." },
      { step: "The Flexible Anchor System", forA: "Both: Design routines with rigid 'anchor' points (meals, sleep, one weekly ritual) and flexible 'open' zones between them.", forB: "ASD-1 gets the anchors as non-negotiables. AuDHD gets the open zones as ADHD territory. Explicit boundary, no guessing." },
      { step: "The Autistic Alliance Reset", forA: "Both: When ADHD chaos has damaged the autistic side of the relationship, return to shared autistic ground — a special interest activity, sensory co-regulation, honest direct communication.", forB: "This is the relationship's 'home base.' Always accessible, always safe." }
    ]
  },

  'limbic|neurotypical': {
    coreFriction: "The NT partner wants an engaged, reciprocal partner. The Limbic ADD partner has a neurological baseline of low mood and low energy that makes engagement genuinely costly. The NT partner's reasonable expectation of mutual enthusiasm is structurally impossible to consistently meet, while the Limbic partner's need for patience is structurally difficult for the NT partner to sustain indefinitely.",
    neuroBridge: "Limbic ADD's low mood is not depression, not passive aggression, and not a reflection of feelings toward the NT partner. It is a neurological default state driven by chronic limbic system overactivity. The NT partner's frustration is not rejection of the Limbic partner — it is the cost of carrying more of the relational energy. Both are neurologically valid. Both deserve acknowledgment.",
    dangerMoments: [
      { title: "The Enthusiasm Gap", scenario: "NT partner is excited about something — a trip, an achievement, a plan. Limbic partner responds flatly or minimally. NT feels unseen.", why: "Limbic ADD's neurological baseline suppresses joy responses. The flatness is not indifference — it is a brain that requires significant activation to access enthusiasm.", defuse: "Limbic partner learns to verbalize internal state: 'I feel more inside than I can show right now — I am genuinely glad for you.' NT learns to receive the verbalization as the real response." },
      { title: "The 'Are You Even Trying?' Eruption", scenario: "NT partner expresses that the Limbic partner doesn't seem to be trying — with the relationship, with household tasks, with life. Limbic partner feels condemned.", why: "NT cannot see the internal effort. What looks like inaction is often maximum capacity. The accusation of 'not trying' confirms the Limbic partner's deepest shame.", defuse: "NT replaces 'you're not trying' with 'I'm carrying more than I can sustain — what can we adjust?' Limbic partner commits to making effort visible rather than invisible." },
      { title: "The Social Cancellation Cycle", scenario: "Limbic partner agrees to social plans and then cancels close to the time, repeatedly. NT partner loses social connections because of unreliable partner availability.", why: "Limbic partner's energy depletes unpredictably. Commitments made on better days cannot always be honored on worse days.", defuse: "Agree on a small number of 'protected' social commitments that cannot be cancelled. All other plans carry explicit understanding of possible cancellation with minimum notice." },
      { title: "The Energy Resentment Build", scenario: "NT partner has been carrying both household and relational energy for months. They snap, list everything they've done, and the Limbic partner collapses in shame.", why: "Both are describing real experiences that were never named as they were accumulating. The shame-avalanche makes it harder for the Limbic partner to function, which increases the NT burden.", defuse: "Monthly explicit check-in: 'How is the load balance? What needs adjusting?' Name it before it becomes resentment." },
      { title: "The 'Cheer Up' Trap", scenario: "NT partner tries to fix Limbic partner's mood — suggestions, encouragement, positivity. Limbic partner withdraws further.", why: "Attempts to 'fix' neurological low mood feel invalidating. They communicate that the Limbic partner's reality is wrong and should be replaced.", defuse: "NT learns the difference between 'fixing' and 'being with.' Ask: 'Do you need space, company, or practical help?' Accept the answer." }
    ],
    repairToolkit: [
      { step: "The Visibility Protocol", forA: "Limbic partner: Each day, name one thing you did — no matter how small. This makes invisible effort visible and counters the NT partner's understandable perception of inaction.", forB: "NT: Acknowledge what was named without adding 'but.' Visibility without judgment is the goal." },
      { step: "The Capacity Check", forA: "Both: Weekly check-in on energy balance. Scale of 1–10 for each partner. When Limbic is below 4, NT doesn't add requests. When NT is above 7 in load, both problem-solve together.", forB: "This prevents the silent accumulation that causes eruptions." },
      { step: "The 'Being With' Practice", forA: "NT: When Limbic is in a low period, practice presence without agenda. Sit together without requiring conversation or engagement.", forB: "Limbic: Acknowledge the gift of this presence explicitly — even just 'thank you for sitting with me.'" }
    ]
  },

  'ringoffire|neurotypical': {
    coreFriction: "Ring of Fire's entire cortex is hyperactivated simultaneously — everything is louder, brighter, faster, and more intense than anyone around them. The NT partner lives in a moderate sensory world and cannot understand why their partner is overwhelmed by a stimulus that registered as background noise. The Ring of Fire partner cannot understand why the NT partner isn't overwhelmed — the input is objectively the same.",
    neuroBridge: "Ring of Fire's hypersensitivity is real — brain imaging shows global cortical overactivation. The NT partner isn't 'not listening' when they say 'it's fine' — their sensory system genuinely processed it differently. The conflict dissolves when NT accepts that their partner's sensory reality is not exaggeration, and Ring of Fire accepts that NT's comparative calm is not invalidation.",
    dangerMoments: [
      { title: "The Sensory Overload Explosion", scenario: "Ring of Fire is already at sensory capacity. NT adds one more stimulus — a question, background TV, a touch. Ring of Fire erupts.", why: "Cumulative sensory load — not the single trigger — is what caused the explosion. The NT partner correctly identifies the trigger as 'nothing' while the Ring of Fire partner is overwhelmed by the accumulated total.", defuse: "Both partners track 'load indicators' together. On high-load days, NT adds zero new stimuli without checking first." },
      { title: "The Emotional Flooding Loop", scenario: "Ring of Fire cycles from joy to rage to devastation in a short window. NT partner cannot calibrate their response fast enough and either under-reacts or over-reacts.", why: "Ring of Fire's rapid emotional cycling is neurological — global cortical overactivation produces emotions at full amplitude with no dimmer switch.", defuse: "NT stops trying to match Ring of Fire's emotional state and instead provides stable, calm presence. Ring of Fire names the cycle: 'I'm cycling — not your problem to fix.'" },
      { title: "The 'You're Too Sensitive' Moment", scenario: "NT says Ring of Fire is overreacting to something objectively minor. Ring of Fire feels profoundly invalidated.", why: "NT is using their own sensory baseline as the reference point for 'objectively minor.' For Ring of Fire, the stimulus was not minor — it was at full amplitude.", defuse: "NT replaces objective judgments ('that's nothing') with curious ones ('help me understand how that landed for you'). Ring of Fire learns to provide context: 'I'm already at 8/10 today.'" },
      { title: "The Intensity Overwhelm", scenario: "Ring of Fire's passionate communication intensity — speed, volume, emotional charge — overwhelms NT partner who shuts down or withdraws.", why: "NT's nervous system has a moderate sensory threshold. Ring of Fire communicates at a level that exceeds it. NT's shutdown is self-protective.", defuse: "Ring of Fire develops signals for 'high intensity mode' so NT can prepare. NT has explicit permission to say 'I need lower volume' without this being rejected as rejection." },
      { title: "The Self-Medication Pattern", scenario: "Ring of Fire begins using alcohol, cannabis, or other substances to dampen the sensory fire. NT partner becomes alarmed and the substance use becomes a relationship conflict.", why: "Ring of Fire's global hyperactivation is genuinely painful. Self-medication is a logical — if dangerous — response to unmanaged neurological pain.", defuse: "This is a clinical signal. Professional treatment for Ring of Fire type is essential. NT frames the conversation around neurological pain management, not behavioral criticism." }
    ],
    repairToolkit: [
      { step: "The Load Tracker", forA: "Ring of Fire: Use a simple daily 1–10 sensory load number. Share it. On days above 7, both partners operate on a 'high alert' protocol: no new demands, reduced stimulation, simple meals.", forB: "NT: Check in before adding any request on high-load days. 'What's your number today?' is a valid question." },
      { step: "The Sanctuary Agreement", forA: "Both: Designate one room or space in the home as Ring of Fire's sensory sanctuary. NT agrees to never disrupt this space's sensory environment.", forB: "Ring of Fire uses the sanctuary proactively — before overflow, not after explosion." },
      { step: "The Intensity Signal", forA: "Ring of Fire: Learn to flag communication intensity: 'I'm going to be very intense right now — are you resourced for this?' This gives NT a choice.", forB: "NT: When not resourced, say so clearly and set a time to return. Ring of Fire: Accept the delay without reading it as rejection." }
    ]
  },

  'temporal|neurotypical': {
    coreFriction: "The NT partner is in a relationship with someone whose temporal lobe can, without warning, generate explosive rage, paranoid misperceptions, or deeply disturbing intrusive thoughts. The NT partner cannot prevent the storms, cannot predict them, and cannot fix them. This creates a state of hypervigilance that erodes the NT partner's own wellbeing. The Temporal Lobe partner is often the most ashamed person in the room — horrified by their own behavior.",
    neuroBridge: "Temporal Lobe ADD's explosive episodes are electrical storms in a specific brain region — neurologically no different from a seizure in terms of voluntary control. The NT partner is not in a relationship with a violent or cruel person — they are in a relationship with someone whose temporal lobe occasionally hijacks their character. Professional treatment is non-negotiable for this pairing to survive.",
    dangerMoments: [
      { title: "The Unprovoked Rage Episode", scenario: "A minor frustration — a misplaced item, a misheard word — triggers explosive, disproportionate rage. NT partner is terrified and confused.", why: "Temporal lobe hypoperfusion means the threat-detection and rage circuitry fires with minimal provocation. The episode is neurological, not characterological.", defuse: "When stable, both partners create an agreed protocol: NT signals perceived storm approach, Temporal Lobe partner exits the space before escalation. Physical separation during episodes is the only effective de-escalation." },
      { title: "The Memory Gap Dispute", scenario: "Temporal Lobe partner remembers an event differently from how NT partner experienced it. Both are certain they're right. NT feels gaslighted.", why: "Temporal lobe dysfunction genuinely distorts memory encoding. Perceptual distortions during episodes mean the Temporal Lobe partner's 'memory' may reflect what their brain perceived rather than what happened.", defuse: "Both partners agree: 'Our memories may not match and neither of us is lying.' Keep factual records of key events without accusatory framing." },
      { title: "The Paranoid Misread", scenario: "Temporal Lobe partner becomes convinced NT partner is angry, contemptuous, or planning to leave — with no basis. Confronts NT with accusations.", why: "Temporal lobe activation distorts social perception. A neutral facial expression may be read as contempt. This is perceptual, not intentional.", defuse: "NT provides explicit verbal reassurance without defensiveness: 'I am not angry — here is what I'm feeling.' Temporal Lobe partner learns to ask before concluding: 'I'm perceiving hostility — is that real?'" },
      { title: "The Dark Thought Disclosure", scenario: "Temporal Lobe partner discloses violent, morbid, or self-destructive intrusive thoughts. NT partner is alarmed and doesn't know how to respond.", why: "Temporal lobe overactivity generates intrusive thought content that is ego-dystonic — disturbing to the person themselves. Disclosure is often a cry for help, not a threat.", defuse: "NT responds with calm acknowledgment rather than alarm: 'Thank you for telling me. Are you safe right now?' Both agree on a mental health professional to contact if the thoughts escalate." },
      { title: "The Aftermath Shame Spiral", scenario: "After an episode, Temporal Lobe partner is flooded with shame and self-condemnation. NT partner, still recovering from the episode, tries to reassure but can't reach them.", why: "Post-episode shame is intense and neurologically driven. NT's residual shock and the Temporal Lobe partner's shame create a mutual unavailability at exactly the moment both need connection.", defuse: "Agree on a post-episode protocol: both partners take 24 hours before discussing what happened. NT's safety is checked first. Temporal Lobe partner's shame is acknowledged before discussion begins." }
    ],
    repairToolkit: [
      { step: "The Safety-First Agreement", forA: "Both: Physical safety is non-negotiable. Agree in advance: if an episode escalates past a certain point, NT leaves the space temporarily. This is not abandonment — it is protection for both partners.", forB: "Temporal Lobe partner actively agrees to this protocol during a calm period so it isn't experienced as punishment during a storm." },
      { step: "The Treatment Non-Negotiable", forA: "NT: This pairing cannot sustain long-term without professional treatment for the temporal lobe component. Anticonvulsants, mood stabilization, and SPECT-informed care are available and effective.", forB: "Temporal Lobe: Accepting treatment is an act of love. 'I want to give you a version of me that isn't at war with itself.'" },
      { step: "The 24-Hour Rule", forA: "Both: No relationship decisions — about conflict, the relationship, or the future — are made within 24 hours of an episode.", forB: "The episode is not a referendum on the relationship. It is weather. Let it pass before deciding anything." }
    ]
  },

  'anxious|neurotypical': {
    coreFriction: "The Anxious ADD partner is running a continuous worst-case-scenario simulation in the background of every moment. The NT partner, whose threat-detection system is calibrated normally, cannot understand why their partner is worried about a situation that carries no real risk. The NT partner's reassurance provides temporary relief and then must be repeated — creating a loop that exhausts the NT partner while never actually solving the anxiety.",
    neuroBridge: "Anxious ADD's chronic anxiety is driven by overactive basal ganglia — the brain's idle-speed control is permanently turned too high. No amount of logic, evidence, or reassurance from a partner can override this neurological state. The NT partner's reassurance isn't failing because it isn't sufficient — it's failing because it's addressing a hardware problem with a software solution.",
    dangerMoments: [
      { title: "The Reassurance Treadmill", scenario: "NT partner reassures Anxious ADD about the same fear repeatedly. Anxious partner returns to the same fear hours later. NT partner feels their reassurance is being rejected.", why: "Reassurance provides temporary relief to an anxiety system that reactivates neurologically rather than logically. NT's reassurance is genuinely helpful in the moment — it just can't be a substitute for treatment.", defuse: "NT learns 'one reassurance per topic per day' as a sustainable limit. Anxious partner learns to identify when they're seeking reassurance vs. when they need genuine information." },
      { title: "The Avoidance Impasse", scenario: "Anxious partner avoids a necessary task (medical appointment, difficult conversation, administrative task). NT partner becomes frustrated by the mounting consequence.", why: "Avoidance is the anxiety system's most powerful defense. The anxiety of approaching the task exceeds the anxiety of the consequence — at least in the short term.", defuse: "NT stops pressuring and starts scaffolding: 'I'll make the appointment and sit with you while you call.' External support reduces the anxiety threshold enough to begin." },
      { title: "The Catastrophic Interpretation", scenario: "NT partner is quiet or seems distracted. Anxious partner concludes the relationship is in crisis and begins seeking reassurance.", why: "Basal ganglia overactivity generates threat in neutral stimuli. NT's normal quietness is scanned for danger and flagged as a potential threat.", defuse: "NT learns to proactively name neutral states: 'I'm just tired — we're completely fine.' Anxious partner learns to ask before concluding: 'I'm reading you as upset — is that accurate?'" },
      { title: "The Last-Minute Cancellation", scenario: "Anxious partner cancels a social commitment at the last minute due to anxiety. NT partner is embarrassed, frustrated, or left socially stranded.", why: "Anticipatory anxiety compounds up to the event. The actual anxiety of attending exceeds the anticipated discomfort of cancelling at the last moment.", defuse: "Both build 'anxiety ramps' into social commitments — exposure-based scaffolding that makes attendance easier. NT partner checks anxiety level 48 hours before, not 2 hours before." },
      { title: "The Worst-Case Projection Loop", scenario: "Anxious partner expresses every catastrophic scenario about a shared decision. NT partner feels they cannot make any decision without triggering a spiral.", why: "Anxious brain's basal ganglia generate worst-case projections automatically and rapidly. The partner is sharing their neurological weather report, not making a request for reality.", defuse: "NT learns to receive anxiety projections without trying to disprove each one: 'I hear that you're worried. What would help you feel safe enough to move forward?'" }
    ],
    repairToolkit: [
      { step: "The Reassurance Boundary", forA: "Both: Agree on a 'one reassurance per topic' rule. NT gives genuine, thoughtful reassurance once. Subsequent requests are redirected: 'I've shared my honest reassurance — this feels like anxiety cycling rather than a new question.'", forB: "Anxious partner: Learn to recognize reassurance-seeking vs. information-seeking. A therapist trained in CBT or ACT can help build this distinction." },
      { step: "The Anxiety Translation", forA: "NT: When you receive an anxiety spiral, resist the urge to fix the content. Instead, name the state: 'It sounds like anxiety is loud right now. What does your body need?'", forB: "Anxious partner: Practice naming anxiety as a neurological state rather than a fact: 'Anxiety is telling me X — I notice that.' This separates the state from the conclusion." },
      { step: "The Treatment Conversation", forA: "NT: Frame treatment as a shared investment: 'I want to help your nervous system get the support it needs — and I think there are tools that would work better than anything I can provide.'", forB: "Anxious partner: Therapy, neurofeedback, and carefully managed medication can genuinely reduce basal ganglia overactivity. Treatment is not admitting defeat — it's upgrading the system." }
    ]
  },

  'overfocused|neurotypical': {
    coreFriction: "The Over-Focused ADD partner's anterior cingulate won't release — arguments, grudges, worries, and positions get locked in an involuntary loop. The NT partner has moved on. The Over-Focused partner is still running the same cycle from three days ago. NT experiences this as stubbornness or obsession. Over-Focused experiences NT's 'moving on' as abandonment of an unresolved issue.",
    neuroBridge: "Over-Focused ADD's inability to 'let it go' is as involuntary as ADHD-I's inability to start. The anterior cingulate is genuinely stuck. NT's ability to move past a conflict is not dismissiveness — it is normal cognitive flexibility. The Over-Focused partner isn't choosing to hold grudges. The NT partner isn't choosing to be insensitive. Two different neurological release mechanisms are in conflict.",
    dangerMoments: [
      { title: "The Circular Argument", scenario: "Conflict reaches a logical resolution. Both partners agree. Over-Focused partner returns to the same point again in a different conversation.", why: "Anterior cingulate hasn't released the issue — the brain doesn't register 'resolved' even when the logic says it is. The loop continues involuntarily.", defuse: "NT partner learns to name the loop: 'I think we've resolved this point — are we okay to close it?' Over-Focused learns to use explicit closure rituals: 'I'm marking this as resolved' even if the loop persists internally." },
      { title: "The Grudge Resurrection", scenario: "A conflict from months ago resurfaces in a current disagreement. NT partner is blindsided. Over-Focused partner never truly put it down.", why: "Without neurological release, past conflicts remain active in the anterior cingulate and can be retriggered by related stimuli.", defuse: "Both partners agree: 'previously resolved issues cannot be used as evidence in new conflicts.' Over-Focused partner redirects themselves: 'That's an old loop — this is a new conversation.'" },
      { title: "The Rigid Position Lock", scenario: "Over-Focused partner takes a position and cannot shift it even when presented with compelling counter-evidence. NT partner feels they're arguing against a wall.", why: "Anterior cingulate overactivity makes position-shifting neurologically effortful — the brain physically resists changing direction mid-conflict.", defuse: "Give the Over-Focused partner explicit time to shift — not pressure mid-conversation. 'Let's both take 24 hours to think about this' allows the anterior cingulate to process without the threat of immediate change." },
      { title: "The Routine Enforcement Crisis", scenario: "NT partner changes a household routine without consulting Over-Focused partner. Over-Focused partner becomes disproportionately distressed and insists on reverting.", why: "Routine serves as an external regulation system for the Over-Focused brain. Routine changes feel threatening, not inconvenient.", defuse: "Any routine changes go through a brief consultation: 'I'm thinking of changing X — can we talk about how to do it?' The process, not just the outcome, matters." },
      { title: "The 'Just Let It Go' Trigger", scenario: "NT partner says 'can you just let it go?' Over-Focused partner experiences this as a profound misunderstanding of their actual experience.", why: "This phrase tells the Over-Focused brain that its involuntary neurological state is a character choice. The shame and frustration of being told to do something impossible is intense.", defuse: "NT replaces 'let it go' with 'what would help your brain release this?' This acknowledges the neurological reality and invites collaborative problem-solving." }
    ],
    repairToolkit: [
      { step: "The Explicit Closure Ritual", forA: "Both: At the end of any resolved conflict, create an explicit closure ritual — a specific phrase, a handshake, writing it in a journal. The ritual gives the anterior cingulate a signal that it can stop processing.", forB: "Over-Focused partner: If the loop restarts, return to the closure ritual as a reminder. 'We closed this. I'm marking it closed again.'" },
      { step: "The 24-Hour Position Rule", forA: "Both: For any significant disagreement, no final position is taken for 24 hours. Both partners state their current thinking and agree to reconvene.", forB: "This removes the anterior cingulate's need to 'win now' by building in processing time. The Over-Focused brain can shift positions more easily when not under immediate pressure." },
      { step: "The Serotonin Support", forA: "NT: Understand that this brain type responds dramatically to serotonin support — exercise, diet, and specific supplements or medication can significantly reduce cognitive rigidity.", forB: "Over-Focused partner: Treating the underlying neurology is the most effective long-term intervention. Behavioral strategies help, but they operate on top of a neurological state that can be addressed directly." }
    ]
  }
};

// ─── DYNAMIC CONFLICT DATA GENERATOR ─────────────────────────
// Generates conflict panel for any pair not in the explicit database
function getDynamicConflictData(idA, idB) {
  const a = NEUROTYPES[idA], b = NEUROTYPES[idB];
  const fpA = NEUROTYPE_FINGERPRINTS[idA], fpB = NEUROTYPE_FINGERPRINTS[idB];

  const emotDiff = Math.abs(fpA.emotionalIntensity - fpB.emotionalIntensity);
  const senseDiff = Math.abs(fpA.sensorySensitivity - fpB.sensorySensitivity);
  const execDiff  = Math.abs(fpA.executiveLoad - fpB.executiveLoad);
  const maskDiff  = Math.abs(fpA.maskingDemand - fpB.maskingDemand);

  const topConflict = [
    { diff: emotDiff, domain: 'Emotional Intensity', desc: `${a.name} and ${b.name} experience emotions at significantly different intensities. This creates mismatches in how conflict is expressed, how recovery is timed, and how much emotional bandwidth each partner needs from the other.` },
    { diff: senseDiff, domain: 'Sensory Environment', desc: `These two brains have meaningfully different sensory thresholds. Environments that feel comfortable to one partner may feel inadequate or overwhelming to the other, creating ongoing friction around shared spaces.` },
    { diff: execDiff, domain: 'Executive Function Load', desc: `The difference in executive function demands means one partner is working significantly harder to manage daily tasks. This creates an invisible load imbalance that, if unacknowledged, builds into resentment.` },
    { diff: maskDiff, domain: 'Masking and Authenticity', desc: `One brain may be masking significantly more than the other. When a partner unmasks at home, it can be jarring for the partner who masks less. Unmasking is safety-seeking, not instability.` }
  ].sort((x, y) => y.diff - x.diff).slice(0, 2);

  return {
    coreFriction: `When ${a.name} meets ${b.name}, the primary friction zone is ${topConflict[0].domain.toLowerCase()}. ${topConflict[0].desc} Secondary friction emerges around ${topConflict[1].domain.toLowerCase()}: ${topConflict[1].desc}`,
    neuroBridge: `Both brains are doing exactly what their neurology requires. The path forward is naming these differences explicitly — not as problems to fix, but as different operating systems that need compatible software. Understanding the neurological source of each friction point transforms blame into accommodation.`,
    dangerMoments: [
      { title: `The ${topConflict[0].domain} Collision`, scenario: `The difference in ${topConflict[0].domain.toLowerCase()} between these two brains becomes most visible under stress or in shared daily routines.`, why: topConflict[0].desc, defuse: `Name the difference explicitly before it becomes a conflict. Build agreements around this specific friction zone before it becomes crisis.` },
      { title: 'The Invisible Load Problem', scenario: `One partner is working significantly harder on invisible cognitive tasks while the other may be unaware of the disparity.`, why: `Different neurotypes have different baseline cognitive costs for the same tasks. Equity requires accounting for neurological load, not just visible output.`, defuse: `Make the invisible load visible. Each partner describes the cognitive cost of their tasks — not as complaint, but as information.` },
      { title: 'The Communication Style Gap', scenario: `These brains process and communicate information differently. What feels clear to one partner may feel overwhelming, indirect, or incomplete to the other.`, why: `Neurotype differences create genuinely different communication architectures. Neither style is wrong — they're simply built for different defaults.`, defuse: `Develop a shared communication lexicon: agree on phrases that flag information needs ('I need the full picture' vs. 'give me the one-sentence version').` }
    ],
    repairToolkit: [
      { step: 'Name the Neurology', forA: `${a.name}: When conflict arises, pause and name the neurological dynamic: 'I think our brains are colliding on [specific difference].'`, forB: `${b.name}: Receive the naming as information, not accusation. Add your own neurological perspective to the frame.` },
      { step: 'Build the Manual Together', forA: `Both: Write a brief 'user guide' for your own brain — covering your top 3 needs, your top 3 triggers, and what helps you repair after conflict.`, forB: `Exchange manuals and reference them, especially during friction. Update them every 6 months.` }
    ]
  };
}

// ─── PRIMARY INTERFACE FUNCTION ──────────────────────────────
function getConflictData(idA, idB) {
  const key = [idA, idB].sort().join('|');
  return CONFLICT_DATA[key] || getDynamicConflictData(idA, idB);
}
