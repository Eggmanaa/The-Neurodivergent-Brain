// ============================================================
// THE NEURODIVERGENT BRAIN — Brain Pair Explorer Data
// Relationship dynamics for all neurotype pairings
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
  
  // Analyze shared traits
  const aTraits = getTraitProfile(a.id);
  const bTraits = getTraitProfile(b.id);
  
  // Find harmony
  if (aTraits.masking && bTraits.masking) harmony.push({ title: 'Shared Understanding of Masking', desc: `Both ${a.name} and ${b.name} brains understand the exhaustion of presenting a "normal" face to the world. This shared experience creates a deep, unspoken bond — neither has to explain why they collapse at the end of the day.` });
  if (aTraits.intensity && bTraits.intensity) harmony.push({ title: 'Emotional Depth', desc: `Both brains experience emotions with intensity. While this can be overwhelming, it also means both partners are capable of deep, passionate connection and genuine empathy when they understand each other's patterns.` });
  if (aTraits.creative && bTraits.creative) harmony.push({ title: 'Creative Synergy', desc: `Both brains bring creative problem-solving to the relationship. ${a.name} and ${b.name} can brainstorm together in ways that feel electric — building on each other's unconventional ideas.` });
  if (!harmony.length) harmony.push({ title: 'Complementary Perspectives', desc: `${a.name} and ${b.name} bring fundamentally different cognitive approaches. What one brain sees clearly, the other may miss — and vice versa. This creates a partnership that covers more ground than either brain alone.` });
  
  // Find friction
  if (aTraits.needsRoutine !== bTraits.needsRoutine) friction.push({ title: 'Routine vs. Spontaneity', desc: `One brain craves predictability while the other seeks novelty. This creates a fundamental tension around scheduling, planning, and daily life that requires conscious negotiation.`, fromA: `"I need to know what's coming. Surprises aren't fun for me — they're destabilizing."`, fromB: `"I need variety and flexibility. Rigid schedules make me feel trapped and suffocated."` });
  if (aTraits.processing !== bTraits.processing) friction.push({ title: 'Processing Speed Mismatch', desc: `These brains process information at different speeds and in different ways. One may need time to think; the other may think out loud. This creates misunderstandings around "why can't you just decide?" or "why won't you let me finish thinking?"`, fromA: `"When I go quiet, I'm not ignoring you — I'm processing. Please give me space to think."`, fromB: `"When I talk things through, I'm not expecting you to solve it — I'm thinking out loud."` });
  if (aTraits.sensoryNeeds !== bTraits.sensoryNeeds) friction.push({ title: 'Sensory Environment Conflict', desc: `These brains have different sensory needs. Volume, lighting, temperature, and physical space preferences may clash. One person's comfort zone is the other's discomfort zone.`, fromA: `"The environment isn't a preference — it's a need. When it's wrong, I can't function."`, fromB: `"I'm not being difficult — my brain genuinely needs different sensory input to feel okay."` });
  if (!friction.length) friction.push({ title: 'Shared Blind Spots', desc: `When two similar brains pair together, the areas both struggle with can become amplified. Neither partner compensates for the other's challenges, which means both need to actively build external support systems.`, fromA: `"We understand each other deeply, but we also share the same blind spots."`, fromB: `"We need to build systems together because neither of us naturally covers the other's gaps."` });
  
  // Bridges
  bridges.push({ title: 'Name the Neurology', desc: `When conflict arises, pause and ask: "Is this a brain difference or a values difference?" Neurological differences require accommodation. Values differences require conversation. Both are valid, but the approach is fundamentally different.` });
  bridges.push({ title: 'Create a Shared Manual', desc: `Each partner writes a "User Guide to My Brain" — covering energy patterns, sensory needs, communication preferences, and shutdown triggers. Exchange manuals and revisit them regularly.` });
  bridges.push({ title: 'Build Repair Rituals', desc: `Every brain pair will have friction. What matters is the repair. Agree on a low-stakes phrase like "I think our brains are colliding right now" that pauses conflict without assigning blame.` });
  
  return {
    brainA: a, brainB: b,
    overview: `When a ${a.name} brain meets a ${b.name} brain, the dynamic is shaped by fundamentally different neurological architectures. Understanding these differences transforms frustration into compassion and conflict into connection.`,
    harmony, friction, bridges,
    envDesign: `Create shared spaces with flexibility: zones for quiet focus and zones for stimulation. Use visual systems (shared calendars, whiteboards) rather than relying on verbal agreements that one brain may not retain. Designate a "reset space" each partner can retreat to without it meaning rejection.`,
    needToKnowA: `"My brain isn't choosing to frustrate you. The things that seem easy for you — ${a.id.includes('adhd') ? 'focusing on boring tasks, being on time, remembering details' : a.id.includes('asd') ? 'reading social cues, handling surprises, filtering sensory input' : 'processing text quickly, avoiding errors in reading'} — are genuinely hard for my neurology. When you see me struggling, I need patience, not advice."`,
    needToKnowB: `"My brain isn't choosing to frustrate you. The things that seem easy for you — ${b.id.includes('adhd') ? 'focusing on boring tasks, being on time, remembering details' : b.id.includes('asd') ? 'reading social cues, handling surprises, filtering sensory input' : 'maintaining consistent routines, processing text, filtering noise'} — are genuinely hard for my neurology. When you see me struggling, I need patience, not advice."`
  };
}

function getTraitProfile(id) {
  const traits = {
    masking: ['adhd-i', 'adhd-dyslexia', 'asd-1', 'asd-2', 'audhd'].includes(id),
    intensity: ['adhd-c', 'adhd-i', 'asd-1', 'audhd'].includes(id),
    creative: ['adhd-c', 'adhd-i', 'adhd-dyslexia', 'audhd', 'dyslexia'].includes(id),
    needsRoutine: ['asd-1', 'asd-2', 'asd-3', 'neurotypical'].includes(id),
    processing: id.includes('adhd') || id === 'audhd' ? 'fast-impulsive' : (id.includes('asd') ? 'slow-deliberate' : (id === 'dyslexia' ? 'slow-accurate' : 'balanced')),
    sensoryNeeds: ['asd-1', 'asd-2', 'asd-3', 'audhd'].includes(id) ? 'high' : (['adhd-c', 'adhd-dyslexia'].includes(id) ? 'seeking' : 'moderate')
  };
  return traits;
}

// Priority pairing data with rich content
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
    overview: "Fire meets precision. The ADHD-Combined brain charges forward with impulsive energy, ideas, and action — while the ASD Level 1 brain builds meticulous systems and craves predictable depth. This pairing has extraordinary potential when both brains are understood, but can become deeply painful when the ADHD-C partner feels caged and the ASD partner feels destabilized.",
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
    bridges: [
      { title: 'Normalize Assistive Tools', desc: "Audiobooks, text-to-speech, speech-to-text — these are access tools, not cheating. The Neurotypical partner who normalizes them removes shame from the equation." },
      { title: 'Celebrate the Strengths', desc: "The Dyslexic brain's spatial and narrative thinking is a genuine cognitive gift. The Neurotypical partner who actively seeks and celebrates these strengths builds their partner's identity beyond the deficit." }
    ],
    envDesign: "A home that minimizes unnecessary literacy demands. Voice-activated systems, visual organization, and audio-based communication tools. The reading load should be distributed based on cognitive fit, not assumed equality.",
    needToKnowA: "\"Reading is hard for me in a way that's difficult to explain to someone for whom it's automatic. When I ask you to read something, it's not laziness — it's access. When you help without judgment, you make our life work.\"",
    needToKnowB: "\"I sometimes forget that what's effortless for me costs you real energy. I want to be more aware of when I'm asking you to do something that's genuinely hard for your brain. Help me see it, and I'll always adjust.\""
  }
};

// Add remaining pairings as generated (these will use the dynamic generator)
// The above specific pairings cover the highest-traffic combinations
