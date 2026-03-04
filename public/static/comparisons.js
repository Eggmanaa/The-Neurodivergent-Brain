// ============================================================
// THE NEURODIVERGENT BRAIN — Comparison Table Engine v2
// Generates rich side-by-side comparison tables for any
// pairing of 14 neurotype profiles across 16 relational
// dimensions. Now includes per-dimension conflict/complement
// analysis and relational dynamics.
// ============================================================

const COMPARISON_DIMENSIONS = [
  { key: 'coreWiring', label: 'Core Wiring', icon: 'fa-microchip', color: '#64DFDF',
    desc: 'How each brain fundamentally processes the world' },
  { key: 'attentionInConversation', label: 'Attention in Conversation', icon: 'fa-comments', color: '#FBBF24',
    desc: 'How each brain shows up when the other is talking' },
  { key: 'emotionalRegulation', label: 'Emotional Regulation', icon: 'fa-heart', color: '#FB7185',
    desc: 'How each brain handles emotional intensity' },
  { key: 'conflictStyle', label: 'Conflict Style', icon: 'fa-bolt', color: '#EF4444',
    desc: 'What happens when they disagree' },
  { key: 'sensoryNeeds', label: 'Sensory Environment Needs', icon: 'fa-hand-sparkles', color: '#A78BFA',
    desc: 'What each brain needs the physical space to feel like' },
  { key: 'timePlanning', label: 'Time & Planning', icon: 'fa-clock', color: '#F59E0B',
    desc: 'How each brain relates to schedules and the future' },
  { key: 'communicationStyle', label: 'Communication Style', icon: 'fa-microphone', color: '#2DD4BF',
    desc: 'How each brain naturally expresses and receives' },
  { key: 'energySocial', label: 'Energy & Social Battery', icon: 'fa-battery-half', color: '#34D399',
    desc: 'How each brain charges and depletes' },
  { key: 'routineSpontaneity', label: 'Routine vs. Spontaneity', icon: 'fa-random', color: '#F97316',
    desc: 'How each brain relates to structure and novelty' },
  { key: 'decisionMaking', label: 'Decision-Making', icon: 'fa-scale-balanced', color: '#818CF8',
    desc: 'How each brain arrives at choices' },
  { key: 'intimacyConnection', label: 'Intimacy & Connection', icon: 'fa-hand-holding-heart', color: '#EC4899',
    desc: 'How each brain gives and receives love' },
  { key: 'householdLogistics', label: 'Household & Logistics', icon: 'fa-house-chimney', color: '#8B9DAF',
    desc: 'Who carries what and how tasks are shared' },
  { key: 'maskingAuthenticity', label: 'Masking & Authenticity', icon: 'fa-masks-theater', color: '#7C3AED',
    desc: 'What each brain hides and what it costs' },
  { key: 'triggerPoint', label: 'What Triggers Me About You', icon: 'fa-fire', color: '#DC2626',
    desc: 'The specific neurological friction point each brain feels' },
  { key: 'complement', label: 'How We Complement Each Other', icon: 'fa-puzzle-piece', color: '#22D3EE',
    desc: 'Where the pairing genuinely shines' },
  { key: 'needToUnderstand', label: 'What I Need You to Understand', icon: 'fa-envelope-open-text', color: '#E11D48',
    desc: 'The one thing each brain needs the other to truly get' }
];

// ============================================================
// RELATIONAL TRAIT DATABASE
// Each neurotype has a profile of how it shows up in
// relationship across all 16 comparison dimensions.
// Written in clinical-empathetic tone with narrative depth.
// ============================================================

const RELATIONAL_PROFILES = {
  neurotypical: {
    coreWiring: "Processes the world through a balanced, predictable cognitive system. Attention, executive function, emotional regulation, and sensory processing all operate within the range that social institutions were designed for. This brain doesn't require extraordinary effort to navigate a typical day \u2014 and may not realize that other brains do.",
    attentionInConversation: "Listens with consistent, flexible attention. Can track multi-thread conversations, hold the other person's point while formulating a response, and sustain engagement across varying topics. Registers nonverbal cues intuitively \u2014 tone shifts, pauses, facial expressions \u2014 and adjusts in real-time.",
    emotionalRegulation: "Emotional responses are proportional to the stimulus and recover within expected timeframes. Can name and modulate feelings. Under stress, may become irritable or withdrawn, but rarely experiences emotional flooding that derails function for extended periods.",
    conflictStyle: "Approaches disagreements expecting a linear process: identify the problem, discuss it, resolve it, move forward. May become frustrated when the other person can't follow this sequence. Tends to under-estimate the neurological cost of conflict for neurodivergent partners.",
    sensoryNeeds: "Sensory processing is calibrated within a moderate range. Background noise, standard lighting, typical temperatures are processed without distress. Can adapt to sensory environments flexibly. May not understand why sensory details that are invisible to them are overwhelming for their partner.",
    timePlanning: "Time perception is generally accurate. Can estimate task duration, plan ahead, and maintain awareness of upcoming commitments. Uses calendars and reminders as organizational aids, not survival tools. Expects the same temporal reliability from a partner.",
    communicationStyle: "Communicates using implicit social scripts with relative ease. Reads and produces nonverbal cues intuitively. Assumes shared conversational norms \u2014 turn-taking, inference, subtext. May not realize these norms are neurologically loaded for a neurodivergent partner.",
    energySocial: "Social energy expenditure is moderate and recovery is straightforward. Can shift between solo time and social engagement without major recalibration. Draws energy from a mix of social and solitary activities in relatively predictable patterns.",
    routineSpontaneity: "Comfortable with moderate structure and moderate flexibility. Can adapt to routine changes without significant distress. Doesn't require rigid predictability but also doesn't crave constant novelty. Expects a partner to be similarly flexible.",
    decisionMaking: "Arrives at decisions through a blend of analysis and intuition within expected timeframes. Can weigh options, tolerate ambiguity briefly, and commit. May become impatient with partners who need significantly more \u2014 or significantly less \u2014 processing time.",
    intimacyConnection: "Expresses and receives love through culturally typical channels \u2014 verbal affirmation, physical touch, quality time, acts of service. Reads romantic cues intuitively. Connection feels natural when reciprocated in familiar patterns.",
    householdLogistics: "Can share household management through standard planning and negotiation. Routine tasks (bills, cleaning, cooking) are manageable with ordinary effort. Expects equitable distribution and may resent carrying disproportionate load without understanding the neurological basis.",
    maskingAuthenticity: "Minimal cognitive masking required. The environment was designed for this brain, so 'being yourself' and 'fitting in' are largely the same thing. May not recognize the concept of masking \u2014 and therefore may not see the invisible effort their partner expends daily.",
    triggerPoint: "Gets triggered when their partner's neurological patterns look like character flaws \u2014 interpreting executive dysfunction as laziness, sensory needs as drama, or emotional intensity as manipulation. The trigger is the gap between what they see and what's actually happening inside their partner's brain.",
    complement: "Brings consistency, environmental stability, and institutional fluency to the relationship. Can handle the logistics that many neurodivergent brains find crushing. Serves as an emotional anchor and social translator when their partner's neurology creates gaps.",
    needToUnderstand: "\"My brain wasn't built to work this hard at basic things. When I'm struggling with something you find easy, it's not a choice or a character flaw \u2014 it's my neurology. I need you to trust that I'm trying, even when it doesn't look like effort to you.\""
  },

  'adhd-c': {
    coreWiring: "A brain driven by dopamine deficiency in the prefrontal cortex. Everything is filtered through a stimulation threshold \u2014 if it's novel, urgent, or interesting, the brain activates brilliantly. If it's routine, the brain literally powers down. Impulsivity and hyperactivity are not behavioral choices but neurological events.",
    attentionInConversation: "Listens in bursts. Highly attentive when engaged, then suddenly lost when interest dips. Interrupts \u2014 not from rudeness but because the thought will vanish if not spoken immediately. May finish a partner's sentences or jump ahead in the conversation. Genuinely believes they're being helpful.",
    emotionalRegulation: "Emotions are fast, intense, and externally visible. Frustration escalates quickly; joy is infectious. Rejection Sensitive Dysphoria (RSD) manifests as reactive outbursts. Emotional resets are fast \u2014 the storm passes quickly \u2014 but the partner may still be reeling from the intensity.",
    conflictStyle: "Engages immediately and intensely. May say things in the heat of the moment that don't reflect considered belief. Escalates fast, de-escalates fast. Wants resolution NOW. Cannot tolerate extended silent treatment or delayed processing \u2014 the unresolved tension is neurologically unbearable.",
    sensoryNeeds: "Under-responsive with a high stimulation threshold. Needs more input to feel alive \u2014 louder music, more activity, physical movement. Silence and stillness feel uncomfortable, not peaceful. Fidgets, paces, and seeks sensation as regulation, not distraction.",
    timePlanning: "Lives in 'now' and 'not now.' Chronic lateness driven by impulsive additions to the schedule. Genuinely cannot estimate task duration. A 'quick errand' absorbs two hours. Urgency is the only reliable activation signal \u2014 deadlines must be imminent to register.",
    communicationStyle: "Fast, tangential, enthusiastic. Thinks out loud. Conversation jumps between topics as the brain makes rapid-fire associations. Blunt by impulsivity \u2014 says what's on their mind before the filter can engage. Communication is energetic and warm but can overwhelm slower processors.",
    energySocial: "Energized by social engagement, novelty, and high-stimulation environments. Crashes hard after the stimulation ends. Energy is volatile \u2014 explosive bursts followed by complete depletion. Social battery charges quickly in dynamic settings but drains in passive or low-stimulation contexts.",
    routineSpontaneity: "Craves spontaneity and novelty. Routine feels like suffocation. Will break a plan impulsively because a better option appeared. Doesn't mean to be unreliable \u2014 the dopamine pull toward novelty is neurologically overpowering. Structure works only when it feels like a game, not a cage.",
    decisionMaking: "Decides fast, often impulsively. Acts on the first compelling idea. May commit to plans, purchases, or life changes without consulting a partner \u2014 not from disrespect but from the neurological urgency of the moment. Regret may follow, but the decision was already made.",
    intimacyConnection: "Expresses love through grand gestures, intense attention, and passionate engagement \u2014 when activated. Connection is deep during hyperfocus on the relationship but may appear inconsistent when attention shifts to a new stimulus. Partners may feel adored one day and invisible the next.",
    householdLogistics: "All-or-nothing. Impulsively starts massive household projects (reorganizing the entire garage at midnight) then loses steam halfway through. Routine maintenance (bills, dishes, laundry) is chronically neglected. The household runs on crisis-response rather than prevention.",
    maskingAuthenticity: "Moderate masking. Hyperactive-impulsive traits are the hardest to hide. Channels them into overwork, pressured humor, or 'high-energy personality.' At home, the mask drops \u2014 partner sees both the unfiltered energy and the crash that follows masking all day.",
    triggerPoint: "Gets triggered by a partner's rigidity, need for extended planning, or delayed emotional responses. Silence after conflict feels like rejection. Being told to 'calm down' or 'slow down' activates RSD because it implies the core self is too much.",
    complement: "Brings spontaneous energy, creative problem-solving, and extraordinary crisis competence. When the situation is genuinely urgent, this brain becomes the calmest, fastest, most effective person in the room. Makes life an adventure and brings infectious enthusiasm to shared experiences.",
    needToUnderstand: "\"My energy isn't an attack on your peace \u2014 it's how my brain works. I think by doing, feel by expressing, connect by engaging. When I'm impulsive, it's not disrespect \u2014 it's my brain moving faster than my filter. I need you to see past the chaos to the care underneath.\""
  },

  'adhd-i': {
    coreWiring: "A brain with the same dopamine deficiency as ADHD-Combined but without the hyperactive motor \u2014 all the struggle, none of the visible symptoms. The world sees a quiet, thoughtful person while inside, the brain is fighting to stay present in every conversation, every task, every moment. Energy is spent entirely on maintaining attention.",
    attentionInConversation: "Appears to be listening but frequently drifts. Can lose the thread mid-sentence \u2014 not the partner's sentence, their own. Zones out during routine exchanges but becomes intensely focused when the topic genuinely interests them. The variability makes the partner question whether they're valued.",
    emotionalRegulation: "Internalized dysregulation. Shame, anxiety, and self-blame dominate. Rejection Sensitive Dysphoria manifests as withdrawal, avoidance, and self-punishment rather than outbursts. Doesn't explode \u2014 implodes. A partner may not see the pain because it's all directed inward.",
    conflictStyle: "Withdraws. Shuts down. Goes quiet \u2014 not as a strategy but because the brain cannot process conflict and emotion simultaneously. May agree to anything just to end the conversation, then fail to follow through because the agreement was a survival response, not a committed decision.",
    sensoryNeeds: "Under-responsive, slow to register input. Needs stimulation through mental novelty \u2014 daydreaming, creative ideation, internal fantasy worlds. Poor interoception means they may not notice hunger, fatigue, or physical discomfort until it's extreme.",
    timePlanning: "Classic time blindness. Genuinely cannot estimate how long tasks will take. A 'quick five-minute task' absorbs an hour. Future commitments feel abstract and unreal until they become imminent emergencies. The partner becomes the external clock.",
    communicationStyle: "Slow, reflective, and often indirect. Needs processing time before responding. May trail off mid-thought because the internal thread diverged. Rich internal world but difficulty translating it into real-time speech. Written communication may actually be stronger than verbal.",
    energySocial: "Low baseline energy. Social engagement is draining rather than energizing. Needs significant alone time to recover. Partner may feel rejected by the withdrawal, not realizing it's a recharging necessity, not an emotional statement.",
    routineSpontaneity: "Theoretically values routine but chronically fails to maintain it. Knows structure would help but can't self-generate it. Spontaneity feels overwhelming rather than exciting. Needs externally imposed structure that doesn't feel controlling.",
    decisionMaking: "Paralyzed by decisions. Overthinks options, gets stuck in analysis loops, and delays commitment. May appear indecisive but is actually overwhelmed by the cognitive load of weighing possibilities. Needs decisions narrowed to 2\u20133 concrete options.",
    intimacyConnection: "Deeply loving but shows it in quiet, inconsistent ways. Forgets birthdays and anniversaries not from lack of caring but from working memory failure. Connection is strongest in calm, low-demand, one-on-one settings. Grand gestures are rare; steady presence is the love language.",
    householdLogistics: "Doom piles and drift. Laundry, dishes, and mail accumulate in purgatory zones. Routine maintenance is neglected because executive function is entirely spent at work. The partner often absorbs the household burden, creating resentment.",
    maskingAuthenticity: "Profound, identity-level masking. Simulates neurotypical executive function all day at work. Appears 'fine' professionally; partner sees the collapse at home. The person their colleagues know and the person their partner knows can seem like two different people.",
    triggerPoint: "Gets triggered by a partner's expectations of consistent follow-through, being told they're 'not trying hard enough,' or having their silence interpreted as not caring. The deepest wound is being seen as lazy when they're actually depleted from invisible effort.",
    complement: "Brings depth, creativity, intuitive leaps, and extraordinary calm during genuine crises. The ADHD-I brain lives in cognitive chaos daily, so when external chaos arrives, they're the most practiced person in the room. Their divergent thinking sees solutions linear thinkers miss entirely.",
    needToUnderstand: "\"My silence isn't absence \u2014 it's my brain trying to find itself. When I drift, I'm not choosing to leave you. When I forget, I'm not saying you don't matter. Everything you can see me doing costs more energy than you know. I need patience, not performance tracking.\""
  },

  overfocused: {
    coreWiring: "A brain with an overactive anterior cingulate gyrus \u2014 the gear-shifting mechanism is stuck. Once locked onto a thought, feeling, or position, the brain cannot release it voluntarily. This creates cognitive rigidity that looks like stubbornness but is neurological perseveration. Combined with prefrontal underactivity, the dual deficit creates a brain that gets stuck AND can't pull itself out.",
    attentionInConversation: "Intensely focused \u2014 sometimes too focused. Locks onto a single point and won't let it go. May circle back to the same topic repeatedly, unable to move on even when the partner has. Misses conversational shifts because the brain is still processing the previous point.",
    emotionalRegulation: "Emotions get stuck in loops. Worry becomes obsessive rumination. Anger becomes grudge-holding. Hurt becomes a wound that reopens with every reminder. The brain replays emotional events on an involuntary loop, making 'letting go' neurologically impossible without external intervention.",
    conflictStyle: "Locks in and escalates through repetition. Returns to the same argument point because the brain cannot generate alternative perspectives mid-conflict. May appear obstinate or controlling but is genuinely unable to shift gears. Conflict feels unresolvable because the brain can't find an exit from the loop.",
    sensoryNeeds: "Moderate baseline with fixation patterns. May become intensely bothered by specific sensory details \u2014 a dripping faucet, a crooked picture, a repeated sound \u2014 and be unable to release attention from them. The fixation is involuntary and can dominate awareness.",
    timePlanning: "Over-plans. Creates elaborate schedules and becomes distressed when they're disrupted. Time feels rigid and compartmentalized. Transitions between activities are difficult \u2014 the brain wants to finish what it's doing completely before switching, regardless of external demands.",
    communicationStyle: "Precise, persistent, and repetitive. Makes the same point multiple ways because the brain doesn't register that the listener already understood. May appear argumentative when actually just stuck. Needs explicit acknowledgment ('I hear you and I understand your point') before the loop can release.",
    energySocial: "Socially selective. Prefers deep, predictable relationships over broad social networks. New social situations require significant cognitive effort because each person represents unpredictable variables the brain must track. Drains quickly in unfamiliar social territory.",
    routineSpontaneity: "Profoundly routine-dependent. Relies on established patterns for emotional regulation. Spontaneous changes feel threatening, not exciting. Needs advance notice for any schedule deviation \u2014 not as a preference but as a genuine coping requirement.",
    decisionMaking: "Slow and rigid. Once a position is taken, changing it is neurologically effortful. May appear stubborn about preferences (restaurants, routes, methods) because shifting requires the anterior cingulate to unclench \u2014 which it resists. Decisions become permanent positions.",
    intimacyConnection: "Loyal, devoted, and deeply attentive within established patterns. Shows love through consistency and dedication. Struggles when a partner's needs change because adapting the love language requires the same gear-shifting the brain finds so difficult.",
    householdLogistics: "Highly organized within their own system. May insist on specific methods for household tasks and become distressed when the partner does them differently. 'Their way' isn't preference \u2014 it's the only way the brain can release the task as 'done.'",
    maskingAuthenticity: "Masks rigidity as 'having high standards' or 'being detail-oriented.' May not recognize the obsessive quality of their focus because the brain experiences it as thoroughness. Partners see the rigidity before the person themselves does.",
    triggerPoint: "Gets triggered by a partner who changes plans without warning, dismisses their concerns as 'overthinking,' or tries to rush them past a point they're still processing. Being told to 'just let it go' is the most invalidating phrase possible \u2014 the brain literally cannot comply.",
    complement: "Brings extraordinary follow-through, reliability, and depth of commitment. When this brain commits, it commits completely. Provides the kind of unwavering consistency and attention to detail that makes a partner feel truly seen and prioritized over time.",
    needToUnderstand: "\"When I repeat myself, I'm not trying to control you \u2014 my brain hasn't finished processing yet. When I resist change, I'm not being difficult \u2014 my cognitive gear-shift is stuck. I need you to acknowledge what I'm saying explicitly, so my brain can release the loop and move forward with you.\""
  },

  temporal: {
    coreWiring: "A brain with temporal lobe abnormalities that create unpredictable emotional and cognitive storms. Memory instability, rage episodes, and perceptual distortions emerge from a temporal region that fires erratically. The person may experience dark thoughts, paranoia, or sudden aggression that feels alien to their own character. This is the most volatile of Dr. Amen's subtypes.",
    attentionInConversation: "Highly variable and mood-dependent. May be deeply present one moment and irritably disengaged the next. Auditory processing issues mean they may mishear or misinterpret what was said, leading to conflict based on a conversation that didn't actually happen the way both parties remember it.",
    emotionalRegulation: "Explosive and unpredictable. Rage can emerge from nowhere with minimal provocation. Dark thoughts, paranoia, and emotional storms sweep through without warning. The person often feels hijacked by their own brain \u2014 they didn't choose the rage; it chose them.",
    conflictStyle: "Escalates rapidly to high intensity. May say deeply hurtful things during emotional storms that they genuinely don't fully remember afterward. Conflict can become unsafe. After the storm, may experience confusion, shame, and fear of their own reactions.",
    sensoryNeeds: "Volatile and unpredictable. Sensory tolerance fluctuates with temporal lobe activity. A sound that was fine yesterday may trigger rage today. Light sensitivity, auditory processing difficulties, and headaches are common. The partner cannot predict which sensory inputs will trigger a storm.",
    timePlanning: "Memory instability disrupts temporal continuity. May remember events differently than they happened \u2014 not lying, but experiencing genuine perceptual distortions. Planning is difficult because the brain cannot reliably project stability into the future.",
    communicationStyle: "Intense and mood-colored. Communication shifts dramatically with brain state \u2014 warm and insightful when stable, cutting and volatile when the temporal lobe flares. Partners learn to read the subtle signs of an approaching storm. May use language with unusual intensity or precision during episodes.",
    energySocial: "Unpredictable energy cycles. May be socially engaging one day and completely withdrawn the next. Social interactions carry risk because the brain may misread intent or escalate a minor social friction into a perceived threat. Energy management requires constant self-monitoring.",
    routineSpontaneity: "Needs routine for stability but may impulsively break it during mood episodes. The contradiction is exhausting for partners \u2014 the structure they build together can be demolished in a single episode, then the person may not understand why the partner is upset.",
    decisionMaking: "Mood-state dependent. Decisions made during stable periods are often sound. Decisions made during episodes can be impulsive, aggressive, or paranoid. The partner must learn to distinguish between the stable self's decisions and the episode self's decisions.",
    intimacyConnection: "When stable, capable of extraordinary depth, insight, and passionate connection. During episodes, intimacy becomes a minefield. The partner may walk on eggshells, never knowing which version of the relationship they'll encounter. This instability erodes trust over time.",
    householdLogistics: "Inconsistent. May take on tasks enthusiastically during good periods and completely abandon them during episodes. The partner often develops a parallel management system to catch what falls during storms.",
    maskingAuthenticity: "Masks the severity of internal storms. May appear 'moody' to the outside world while experiencing terrifying perceptual distortions or violent intrusive thoughts internally. The gap between what the partner sees and what they're actually experiencing is vast.",
    triggerPoint: "Gets triggered by anything that threatens safety or control \u2014 unexpected noise, perceived disrespect, feeling cornered. The trigger may be invisible to the partner. What triggers rage today may not tomorrow. The unpredictability itself becomes the partner's primary stressor.",
    complement: "When stable, brings extraordinary perceptual intensity, creative fire, and emotional depth that few other brains can match. Sees and feels the world with a vividness that makes life richer. Their insight during calm periods can be remarkably penetrating.",
    needToUnderstand: "\"The storms scare me more than they scare you. When I rage or say hurtful things, that's my temporal lobe hijacking my character \u2014 it is not who I am. I need you to hold the line between my brain's episodes and my actual self. And I need professional help to stabilize this \u2014 your love alone can't fix neurology.\""
  },

  limbic: {
    coreWiring: "A brain with chronic overactivity in the deep limbic system \u2014 the emotional core. This creates a persistent low-grade depression that colors everything: perception, motivation, energy, and connection. The brain's negativity bias is always on, filtering experience through a lens of inadequacy, hopelessness, and fatigue. This isn't situational sadness \u2014 it's a neurological baseline.",
    attentionInConversation: "Present but low-energy. Tracks the conversation but may not engage actively. Responses may be brief, flat, or pessimistic \u2014 not from disinterest but from the cognitive tax of maintaining engagement while the limbic system drains energy. Partners often feel like they're carrying the conversation.",
    emotionalRegulation: "Chronic low mood with periodic dips into deeper hopelessness. Emotions are muted rather than explosive. Joy is possible but fleeting and effortful. Negativity feels automatic and authentic; positivity feels forced and suspect. Emotional flatness can make partners feel shut out.",
    conflictStyle: "Avoids conflict because it depletes already-limited energy. May concede, withdraw, or become passively resentful rather than engage directly. If pushed past the energy threshold, may express hopelessness ('Nothing I do matters anyway') rather than anger.",
    sensoryNeeds: "Low sensory activation. The world feels muted \u2014 colors seem duller, food tastes blander, physical sensations register dimly. May seek comfort through specific sensory anchors (warm blankets, familiar music) while avoiding high-stimulation environments that feel overwhelming for a depleted system.",
    timePlanning: "Future orientation is impaired by hopelessness. Planning feels futile because the brain doesn't believe the future will be better. The present feels heavy and the past feels full of failure. Partners who plan enthusiastically may trigger guilt ('I should be excited about this').",
    communicationStyle: "Low volume, low frequency. May not initiate conversations or share internal experience because articulating it feels both exhausting and pointless. Partners often misread this as disinterest when it's actually the cognitive cost of translating internal fog into words.",
    energySocial: "Chronically low energy. Social interaction is a significant drain. May cancel plans, avoid gatherings, or sit silently at events. Recovery time after social exposure is extended. Partners may feel isolated because the limbic brain cannot match their social energy.",
    routineSpontaneity: "Routine provides stability and reduces decision fatigue. Spontaneity feels threatening because it demands cognitive resources that are already depleted. Prefers predictable, low-demand environments. Change is not exciting \u2014 it's another thing to survive.",
    decisionMaking: "Difficulty making decisions due to anhedonia and negative forecasting. Every option feels equally uninspiring. May defer decisions to a partner repeatedly, creating an unbalanced dynamic. The partner becomes the default decision-maker, which breeds both dependency and resentment.",
    intimacyConnection: "Craves connection but struggles to generate the energy for it. May feel guilty for not being more present, affectionate, or engaged \u2014 which deepens the shame cycle. Love is expressed through loyalty and quiet presence rather than active demonstration.",
    householdLogistics: "Minimal capacity. Basic tasks (cooking, cleaning, organizing) require disproportionate energy. The household burden shifts to the partner by default. Periods of improved mood bring bursts of productivity that can't be sustained, creating false hope cycles.",
    maskingAuthenticity: "Masks the depth of internal despair behind functionality. Goes to work, performs adequately, but every hour costs double what it should. Partners see more of the real state but may still not grasp how heavy each day feels. 'I'm fine' is the most-used mask.",
    triggerPoint: "Gets triggered by high expectations, enthusiasm they can't match, or being told to 'cheer up,' 'look on the bright side,' or 'just be grateful.' These phrases negate the neurological reality and deepen the shame of not being able to feel what they 'should' feel.",
    complement: "Brings quiet depth, empathic sensitivity, and emotional honesty when the fog lifts. Has a unique capacity for sitting with others in their pain without trying to fix it \u2014 because they know what it feels like. Their loyalty through difficulty is profound and hard-won.",
    needToUnderstand: "\"My low mood isn't about you and it isn't a choice. I'm not sad because of our relationship \u2014 my brain has a baseline of heaviness that I carry everywhere. When I can't match your energy or enthusiasm, it's not rejection. I need you to not take my flatness personally \u2014 and to celebrate the moments when the fog lifts, because I'm working harder than you know to get there.\""
  },

  ringoffire: {
    coreWiring: "A brain in a state of global cortical hyperactivation \u2014 the entire surface is overactive, creating a 'ring of fire' on SPECT imaging. Everything is turned up: sensory processing, emotional intensity, cognitive speed, and threat detection. The brain is perpetually overwhelmed by its own activity, leading to extreme sensitivity, racing thoughts, and rapid cycling between emotional states.",
    attentionInConversation: "Hyperattentive to everything simultaneously. Picks up on every micro-expression, tone shift, and environmental change during conversation \u2014 which means they're processing far more information than the words being spoken. May react to a partner's unconscious sigh or slight change in posture as if it were a statement.",
    emotionalRegulation: "Extreme sensitivity with rapid cycling. Can shift from elation to rage to tearfulness within minutes. Emotions are experienced at maximum volume with no dimmer switch. The intensity is not performative \u2014 the brain genuinely processes every stimulus at full amplitude.",
    conflictStyle: "Explosive and multi-directional. May raise issues that seem unrelated because the brain is simultaneously processing multiple grievances at once. Conflict feels like an emergency because the brain cannot modulate the threat response. De-escalation requires external intervention because the brain can't self-regulate during activation.",
    sensoryNeeds: "Extreme hypersensitivity. Every sense is turned up: sounds are louder, lights are brighter, textures are more intense, smells are more potent. Environmental stimuli that others barely notice can be physically painful. The home environment must be carefully managed to prevent sensory overload.",
    timePlanning: "Racing thoughts make linear time-planning difficult. The brain generates ideas, concerns, and scenarios faster than they can be organized into a sequential plan. May over-plan as a way to manage anxiety, then become overwhelmed by the plan itself.",
    communicationStyle: "Intense, fast, and emotionally charged. May overwhelm a partner with the volume and speed of communication. Processes externally \u2014 talks to think, which means the partner is exposed to every unfiltered thought during the processing phase. The finished thought and the raw thought are delivered identically.",
    energySocial: "Rapidly oscillating. Can be intensely social and charismatic, then crash into complete withdrawal when the sensory load becomes unbearable. Partners may experience whiplash as the brain shifts between 'on' and 'overloaded off' with minimal transition.",
    routineSpontaneity: "Needs structure to contain the internal chaos but may rebel against it when the brain is in a hyperactive phase. The relationship to routine changes with brain state \u2014 craving it when overwhelmed, fighting it when activated. Partners can't build consistent expectations.",
    decisionMaking: "Decisions are made rapidly under activation and may be reversed just as quickly when the emotional state shifts. Long-term commitment to a single path is difficult because the brain is constantly generating alternative scenarios. Partners may experience decision whiplash.",
    intimacyConnection: "Intensely passionate and emotionally immersive when connected. Love is experienced at the same maximum amplitude as everything else. The partner may feel deeply adored and simultaneously overwhelmed by the intensity. Connection can feel consuming rather than comfortable.",
    householdLogistics: "Driven by energy state. During hyperactive phases, may reorganize the entire house. During overwhelm phases, can't handle basic tasks. The swing between productivity and paralysis makes household management unpredictable for both partners.",
    maskingAuthenticity: "Exhausting masking to contain the intensity. Appears 'high-strung' or 'dramatic' but is actually experiencing neurological storms that would be visible on brain imaging. The gap between what they're managing internally and what others see is enormous.",
    triggerPoint: "Gets triggered by anything that adds sensory or emotional load to an already overloaded system. A partner's raised voice, unexpected touch, strong perfume, or even emotional enthusiasm can tip the brain from coping into crisis. The trigger is cumulative load, not any single event.",
    complement: "Brings extraordinary perceptual sensitivity, creative intensity, and the ability to detect threats and opportunities that others miss entirely. Their emotional range, when managed, creates a capacity for profound empathy and artistic expression that enriches everyone around them.",
    needToUnderstand: "\"Everything is loud inside my brain \u2014 all the time. When I react intensely to something small, it's because for me it wasn't small \u2014 it was the last drop in an already overflowing cup. I need you to help me manage the environment and to understand that my sensitivity is not a commentary on you.\""
  },

  anxious: {
    coreWiring: "A brain with elevated basal ganglia activity that maintains a chronic state of nervous tension. The threat detection system is always on, scanning for danger even in safe environments. Anxiety isn't a reaction to specific threats \u2014 it's the brain's permanent operating frequency. Everything passes through a filter of 'what could go wrong.'",
    attentionInConversation: "Attentive but filtered through worry. While listening, part of the brain is simultaneously scanning for signs of disapproval, judgment, or impending conflict. May over-interpret neutral statements as criticism. Listening is compromised not by inattention but by the parallel processing of threat data.",
    emotionalRegulation: "Chronic anxiety with intermittent spikes to panic-level intensity. Physical symptoms (racing heart, tight chest, nausea, trembling) accompany emotional states. Stress is embodied, not just psychological. Calm is achievable but requires active, effortful maintenance rather than being a default state.",
    conflictStyle: "Avoids conflict at almost any cost. Anticipatory anxiety about disagreement can prevent issues from ever being raised. If forced into conflict, may freeze, panic, or capitulate immediately. After conflict, rumination loops replay the interaction for days, searching for signs of irreparable damage.",
    sensoryNeeds: "Vigilant sensory processing. Constantly scanning the environment for threats. Startle responses are heightened. Unexpected sounds or changes in the environment trigger the alarm system. Needs a calm, predictable sensory environment to maintain baseline regulation.",
    timePlanning: "Over-plans as an anxiety management strategy. Excessive preparation for every contingency. Becomes distressed when plans change because each plan was a carefully constructed safety net. Arriving early, over-packing, and excessive checking are not quirks \u2014 they're coping mechanisms.",
    communicationStyle: "Careful, measured, and often self-censored. Rehearses conversations in advance. May not say what they really think for fear of the other person's reaction. Seeks reassurance frequently. Needs explicit confirmation that the relationship is safe before they can be fully honest.",
    energySocial: "Anxiety is energetically expensive. Social situations require constant self-monitoring and threat assessment. May appear socially competent but internally is running a complex anxiety management program. Recovery time after social engagement is significant. May cancel plans as protective avoidance.",
    routineSpontaneity: "Depends on routine for anxiety management. Predictability reduces the number of unknowns the brain must scan. Spontaneity feels dangerous \u2014 each unplanned variable is another potential threat. Resists change not from stubbornness but from the overwhelming cognitive cost of adapting the safety protocol.",
    decisionMaking: "Paralyzed by fear of making the wrong choice. Every decision carries catastrophic weight because the brain models worst-case scenarios as if they're probable. Seeks excessive reassurance before committing. May defer to a partner to avoid the anxiety of personal responsibility for the outcome.",
    intimacyConnection: "Deeply loving but filtered through fear of abandonment. May seek constant reassurance that the relationship is secure. Love is expressed through caretaking and hyper-attentiveness to the partner's needs \u2014 partly from genuine care, partly from the anxious calculation that if they're indispensable, they won't be left.",
    householdLogistics: "Manages logistics through anxiety-driven hyper-vigilance. May be the most 'organized' partner \u2014 not because they enjoy it but because unmanaged tasks generate unbearable anxiety. The household runs smoothly but at enormous internal cost.",
    maskingAuthenticity: "Masks anxiety behind competence, perfectionism, or people-pleasing. The world sees someone who has it together. Inside, the brain is running worst-case scenarios continuously. The mask is so effective that partners may not realize the depth of the anxiety until it breaks through as panic or physical symptoms.",
    triggerPoint: "Gets triggered by uncertainty, sudden changes, perceived disapproval, or any situation where the outcome is unpredictable. A partner who is vague about plans, dismissive of worries, or inconsistent in communication directly activates the threat detection system.",
    complement: "Brings extraordinary conscientiousness, preparation, and care to the relationship. Nothing falls through the cracks because the anxious brain has already anticipated and prepared for every contingency. Their hyper-attentiveness to a partner's needs creates a feeling of being truly cared for.",
    needToUnderstand: "\"My anxiety isn't a choice and it isn't about you. When I ask 'are we okay?' for the third time, it's because my brain is generating evidence that we're not \u2014 even when everything is fine. I need you to answer without frustration, because your patience is the data my brain needs to update its threat model.\""
  },

  'adhd-dyslexia': {
    coreWiring: "A dual-bottleneck brain: attention regulation AND language processing compete for the same limited cognitive resources. The ADHD drives the eyes forward faster than the dyslexic brain can fully process, creating a speed-accuracy mismatch. Neither condition is visible the way adults expect, and together they mask each other.",
    attentionInConversation: "Highly articulate verbally but operates on a different conversational altitude. Assumes the listener shares their internal context and skips foundational explanations, jumping to advanced connections. May leave a partner confused without realizing it. Excellent auditory processing when engaged; unreliable when not.",
    emotionalRegulation: "Carries dual shame \u2014 'lazy' (ADHD) and 'stupid' (Dyslexia). Shame is particularly confusing because they don't look like they're struggling. The gap between brilliant engaged moments and failing routine moments creates identity whiplash. Until someone names this pattern, they oscillate between inflated confidence and crushing doubt.",
    conflictStyle: "May withdraw (ADHD-I pattern) or intellectualize as defense (using verbal ability to argue out of shame). How feedback is delivered matters enormously \u2014 misattuned framing ('you're not trying hard enough') triggers shutdown; accurate naming ('your brain processed faster than it could track') triggers relief and trust.",
    sensoryNeeds: "Stimulus-seeking combined with fatigue sensitivity. The ADHD brain craves novelty input while the dyslexic processing system fatigues under sustained cognitive load. Background stimulation (music, movement) helps regulation; text-heavy environments drain rapidly.",
    timePlanning: "Lives in 'now' and 'not now' \u2014 future tasks vanish from awareness within minutes. Must act immediately or capture externally. Digital devices are prosthetic memory devices (timers, alarms, reminders), not distraction tools. Without external cues, commitments fall out of awareness entirely.",
    communicationStyle: "Verbally brilliant but text-avoidant. Can give a stunning presentation but struggles to write a simple email. Tends to speak over listeners' heads because the brain auto-fills the knowledge gap it assumes others have. Needs coaching on calibrating to the listener's level \u2014 framed as translation, not flaw.",
    energySocial: "Interest-gated energy. When the topic or person activates them, energy is boundless. In low-stimulation social settings, energy crashes. Partners may feel adored during activation and invisible during depletion. The variability is neurological, not emotional.",
    routineSpontaneity: "Theoretical valuer of routine, chronic violator of it. Knows structure helps but can't self-generate or maintain it. The ADHD brain seeks novelty while the dyslexic brain needs predictable patterns for processing. This internal contradiction is exhausting and confusing to partners.",
    decisionMaking: "Fast ideation, slow execution. Generates ten improvements to any plan but can't settle on a version because the brain keeps generating better ones. Gets stuck in optimization loops. Needs permission to produce a 'draft zero' \u2014 something intentionally imperfect so the ideation engine has somewhere to land.",
    intimacyConnection: "Deeply devoted but inconsistently demonstrative. Love is shown through creative gestures, verbal brilliance, and moments of hyperfocused attention. But the partner also experiences forgotten dates, half-completed surprises, and the frustration of unrealized intentions. The care is real; the executive function isn't.",
    householdLogistics: "Avoids text-heavy tasks (bills, forms, insurance) with dual avoidance \u2014 both the attention required and the reading involved. These tasks activate every deficit simultaneously. Partners absorb this burden often without understanding that it's not laziness but dual neurological overwhelm.",
    maskingAuthenticity: "Highly developed and unconscious masking. The brain auto-fills gaps \u2014 in reading, conversation, and self-perception. Genuinely believes they read the passage, completed the steps, and followed the conversation. The mask is neurological, not behavioral. Partners may see the gaps before the person does.",
    triggerPoint: "Gets triggered by being told to 'just slow down and be more careful' (invalidating because they don't know they're skipping) or 'see, you can do it when you try' (the most damaging sentence, because it attributes neurological failure to effort). Also triggered by paper-heavy demands or being asked to read aloud.",
    complement: "A visionary synthesizer and relentless innovator. The fast-scanning, novelty-seeking, pattern-recognizing brain absorbs massive cross-domain input and reassembles it into original insights no one else saw coming. With the right scaffolding, this brain doesn't just succeed \u2014 it redefines the category.",
    needToUnderstand: "\"I am carrying two invisible conditions that make every text-based task feel like climbing a mountain in the dark. When I avoid paperwork, it's not laziness \u2014 it activates every deficit simultaneously. And when I seem to read fine but miss the meaning, my brain auto-filled the gaps without telling me. I need you to trust my intelligence while supporting my access.\""
  },

  dyslexia: {
    coreWiring: "A brain with a primary bottleneck in the language processing system \u2014 decoding, encoding, and orthographic mapping. Attention, executive function, emotional regulation, and social skills are largely intact. The challenge is specific and localized to print, but in a print-dominated world, it touches everything.",
    attentionInConversation: "Fully present and attentive. Listening is often their best intake channel. Verbal communication is typically a reliable strength and the clearest window into their actual ability. Communicates at the level of the audience without assumption-gaps.",
    emotionalRegulation: "Generally typical emotional regulation. Shame and frustration are targeted and localized: 'I hate reading. I'm bad at spelling.' Self-concept pain is specific to literacy, allowing a clearer strength-based identity in other domains (sports, art, math, social life).",
    conflictStyle: "Engages proportionally. Can separate conflict from identity more easily because the challenge is named and localized. Doesn't typically experience global shame responses. Can participate in direct conflict resolution without neurological overwhelm, unless the conflict involves literacy-related shame.",
    sensoryNeeds: "Standard sensory processing. No unusual sensory sensitivities or seeking behaviors. Can work in typical environments without sensory accommodations. The brain doesn't need environmental management beyond standard comfort preferences.",
    timePlanning: "Intact prospective memory and time perception. Can hold future tasks in mind and plan for them. Uses planners and reminders as organizational aids rather than survival tools. Time management is a non-issue compared to other neurodivergent profiles.",
    communicationStyle: "Verbally articulate and coherent. Often the strongest communicator in a room when print is removed from the equation. Expresses complex ideas clearly in speech. Written communication is the sole bottleneck \u2014 strong ideas hampered by spelling errors and slow production.",
    energySocial: "Normal energy patterns. Social engagement charges and depletes at typical rates. No unusual withdrawal patterns. Can maintain social connections without the energy management challenges of ADHD or autism. Social life is unimpaired.",
    routineSpontaneity: "Flexible and adaptive. Can handle routine and spontaneity with typical balance. Doesn't require rigid structure or constant novelty. Adapts to partner's preferences in this domain without neurological strain.",
    decisionMaking: "Intact decision-making. Can weigh options, tolerate ambiguity, and commit within typical timeframes. Reading-heavy decision processes (contracts, research) are slowed by the decoding bottleneck but the underlying judgment is sound.",
    intimacyConnection: "Expresses and receives love through typical channels. The relationship is unaffected by the dyslexia except in situations requiring shared literacy tasks. Emotional availability and consistency are strengths. The partner doesn't need to manage neurological unpredictability.",
    householdLogistics: "Can share household management equitably. Executive functions support follow-through on commitments. Tasks take longer when reading is involved, but they get done. The partner doesn't typically need to absorb disproportionate household burden.",
    maskingAuthenticity: "Targeted, sometimes deliberate masking around literacy. Avoids reading aloud, volunteers for non-reading roles, may memorize passages to simulate fluency. The masking is a conscious strategy, not an unconscious neurological process. Outside of literacy contexts, no masking is required.",
    triggerPoint: "Gets triggered by being asked to read aloud, having spelling errors pointed out publicly, or being placed in situations where the literacy gap is visible. Also triggered when the partner underestimates the cognitive cost of reading ('it's just a menu') or attributes all struggles to the dyslexia.",
    complement: "Brings resilience, determination, and deep empathy forged through sustained effort. Has learned to work harder than everyone else for the same result \u2014 that grit transfers powerfully. Spatial reasoning, narrative thinking, and entrepreneurial pattern recognition are genuine cognitive gifts.",
    needToUnderstand: "\"Reading is hard for me in a way that's difficult to explain to someone for whom it's automatic. It doesn't define how smart I am. When I ask you to read something, it's not laziness \u2014 it's access. And when you help without judgment, you give me the greatest gift possible.\""
  },

  'asd-1': {
    coreWiring: "A monotropic attention system that channels cognitive resources into narrow, deep tunnels of focus. Processes the world through systematic analysis rather than social intuition. The brain excels at pattern recognition, logical consistency, and deep expertise \u2014 but this comes at the cost of flexible social navigation, sensory filtering, and rapid context-switching.",
    attentionInConversation: "Intensely focused on content but may miss social subtext. Processes language literally \u2014 sarcasm, hints, and implied meaning may not register. Needs explicit statements rather than implied expectations. May not make eye contact, which partners can misinterpret as disinterest when it's actually a processing strategy.",
    emotionalRegulation: "Emotions are deep but delayed. The brain processes emotional input on a slower timeline \u2014 the feeling may arrive hours after the triggering event. Alexithymia (difficulty identifying and naming emotions) affects approximately 50% of autistic individuals, meaning the partner may need to help translate emotional experience into language.",
    conflictStyle: "Logical, systematic, and sometimes inadvertently cold. Approaches disagreements as problems to solve rather than emotions to process. May not recognize when a partner needs emotional validation before practical solutions. Can become rigid under stress, making compromise neurologically difficult.",
    sensoryNeeds: "Significant sensory sensitivities. Specific sounds, textures, lights, or smells can cause genuine physical distress. Sensory overload triggers autonomic threat responses (meltdowns or shutdowns). The home environment is a sensory regulation tool, not just a living space.",
    timePlanning: "Highly structured time orientation. Relies on schedules, routines, and predictable sequences. Transitions between activities are cognitively expensive. Needs advance notice for changes. Can appear rigid about timing but is actually managing the cognitive cost of unexpected transitions.",
    communicationStyle: "Direct, literal, precise. Says exactly what they mean and expects the same. May not understand why partners use indirect communication ('it would be nice if someone took out the trash'). Needs explicit requests. Communicates affection through actions and special-interest sharing rather than verbal affirmation.",
    energySocial: "Social interaction is inherently costly. Even positive social engagement drains the battery. Needs significant alone time for sensory and social recovery. Parallel activities (being together while doing separate things) are the ideal connection mode. A partner who takes withdrawal personally will struggle.",
    routineSpontaneity: "Profoundly routine-dependent. Routines are not preferences but cognitive scaffolding. When routines are disrupted, the cognitive cost of rebuilding moment-to-moment decisions is enormous. Insistence on sameness is a coping mechanism, not controlling behavior.",
    decisionMaking: "Deliberate, research-intensive, and thorough. May take significantly longer than a partner expects because the brain needs to analyze all variables before committing. Once decided, the decision is firm. Changing course is cognitively expensive and may be resisted even when it's logically warranted.",
    intimacyConnection: "Shows love through reliability, deep interest in the partner's world, acts of service, and special-interest sharing. May not provide the spontaneous verbal affirmation or physical affection that a partner expects. The love is deep and genuine but expressed through a different channel than most relationship advice assumes.",
    householdLogistics: "Excellent within established systems. Creates and maintains organizational structures. May struggle when the partner disrupts the system or handles tasks differently. Household management is reliable as long as the routine is respected.",
    maskingAuthenticity: "Camouflaging is pervasive and exhausting. The CAT-Q framework identifies three components: compensation (scripting social responses), masking (suppressing autistic behaviors), and assimilation (trying to appear neurotypical). High camouflaging scores correlate with depression and suicidality. Home is the only place the mask can drop.",
    triggerPoint: "Gets triggered by unexpected changes to routines or plans, sensory intrusions in their regulated space, indirect or ambiguous communication, and being told to 'just relax' or 'be more flexible.' Each of these demands the brain do the very thing its architecture makes most difficult.",
    complement: "Brings extraordinary reliability, deep commitment, systematic thinking, and honest communication. When this brain commits to a relationship, it commits with the same thoroughness it brings to a special interest. The partner is studied, understood, and supported with remarkable consistency and depth.",
    needToUnderstand: "\"My need for routine isn't about controlling you \u2014 it's my brain's scaffolding. When routines change, I don't just feel annoyed \u2014 I lose the cognitive structure that lets me function. When I seem cold, I'm not \u2014 my emotions are delayed, not absent. And when I retreat, I'm not leaving you \u2014 I'm trying to come back to myself so I can come back to you.\""
  },

  'asd-2': {
    coreWiring: "A brain requiring substantial support for social communication and behavioral flexibility. Verbal and nonverbal deficits are marked even with supports in place. Restricted and repetitive behaviors cause significant interference and distress when interrupted. The brain processes the world through rigid patterns that provide essential structure but limit adaptive responses.",
    attentionInConversation: "Communication deficits are pronounced. May use limited phrases, echolalia, or augmentative/alternative communication (AAC). Conversation tracking is inconsistent \u2014 may engage deeply on preferred topics but be unable to follow general discussion. The partner must adapt communication methods significantly.",
    emotionalRegulation: "Intense emotional responses with limited self-regulation capacity. Distress with change is high and pervasive. Meltdowns and shutdowns are more frequent and severe than Level 1. Recovery periods are longer. The partner is often the primary co-regulation resource.",
    conflictStyle: "Conflict is often overwhelming and may trigger severe meltdowns. Cannot process disagreement in real-time. Resolution requires low-demand, structured approaches with significant cool-down time. Traditional conflict resolution strategies are largely inapplicable.",
    sensoryNeeds: "Pervasive and intense sensory sensitivities. May require controlled environments with specific lighting, sound levels, temperature, and textures. Sensory overload can be debilitating. The partner's role in environmental management is significant and constant.",
    timePlanning: "Dependent on external structure and predictable routines. Time concepts may be concrete rather than abstract. Requires visual schedules, timers, and consistent routines. The partner or caregiver provides the temporal scaffolding the brain cannot generate internally.",
    communicationStyle: "Communication may be limited, scripted, or require AAC support. Understanding is often stronger than expression. The partner must learn to read behavioral cues, scripted phrases, and nonverbal communication as valid expression. Traditional conversational reciprocity may not apply.",
    energySocial: "Social engagement is profoundly draining. Requires extended recovery time. Meaningful connection often happens through parallel activity, shared routine, or special-interest engagement rather than traditional social interaction.",
    routineSpontaneity: "Extreme dependence on routine. Deviations cause marked distress. The partner must understand that insistence on sameness is not rigidity but survival. Transitions require preparation, visual cues, and patience.",
    decisionMaking: "Decision-making may require external support. Can express preferences clearly within established patterns but may struggle with novel choices. The partner or support system often facilitates decision-making through structured choices.",
    intimacyConnection: "Connection is expressed through shared routines, physical proximity, and special-interest engagement. Traditional romantic expression may not apply. The partner who learns to read and value these expressions experiences a profound, unique form of devotion.",
    householdLogistics: "Requires structured support for most household tasks. Can contribute within established routines and with appropriate scaffolding. The partner often carries a significant share of household management alongside a support team.",
    maskingAuthenticity: "Less masking than Level 1 because the support needs are more visible. Authenticity may be more accessible precisely because the presentation doesn't allow for extensive camouflaging. The partner interacts with a more unfiltered version of the person.",
    triggerPoint: "Gets triggered by routine disruption, sensory overload, communication breakdown, or being rushed through transitions. The triggers are predictable once learned, which means the partner can prevent many crises through environmental and schedule management.",
    complement: "Brings a unique form of presence, honesty, and dedication to shared routines. Their engagement with special interests can be deeply enriching when shared. The consistency of their preferences creates a stable, predictable partnership foundation.",
    needToUnderstand: "\"My world is smaller and more structured than yours, but it's deeply felt. When I repeat routines, I'm not stuck \u2014 I'm anchored. When I can't communicate what I'm feeling, it doesn't mean I'm not feeling it. I need you to learn my language, even when it doesn't look like yours.\""
  },

  'asd-3': {
    coreWiring: "A brain requiring very substantial support across all domains. Severe social communication deficits with minimal functional speech. Responds primarily to direct, simple approaches. Extreme inflexibility with pervasive distress when routines change. The brain requires comprehensive, lifelong support structures to navigate daily life.",
    attentionInConversation: "Conventional conversational engagement is severely limited. Communication may occur through behavior, limited vocalizations, gesture, or assistive devices. The partner or caregiver learns to interpret subtle behavioral cues as meaningful communication. Mutual understanding develops through deep familiarity rather than language.",
    emotionalRegulation: "Extreme difficulty with self-regulation. Meltdowns and shutdowns can be prolonged and intense. Distress signals may be behavioral rather than verbal. The partner or caregiver serves as the primary co-regulation system. Understanding the individual's specific triggers is essential for safety and well-being.",
    conflictStyle: "Traditional conflict does not apply in the conventional sense. Disagreement manifests as behavioral distress, resistance, or withdrawal. The partner or caregiver must interpret and respond to behavioral communication rather than verbal disagreement. Resolution involves restoring routine and safety.",
    sensoryNeeds: "Extreme and pervasive sensory differences. May seek or avoid specific sensory inputs with great intensity. Environmental management is essential for basic function and well-being. The home must be carefully designed as a sensory regulation space. Changes to the sensory environment can cause significant distress.",
    timePlanning: "Entirely dependent on external temporal structure. Visual schedules, consistent routines, and predictable sequences are essential. The partner or care team provides all temporal scaffolding. Unexpected schedule changes can trigger severe distress.",
    communicationStyle: "Communication is primarily nonverbal or minimally verbal. May use AAC devices, picture exchange, or behavioral communication. The partner or caregiver develops a deep, individualized understanding of the person's unique communication system. This understanding is itself a form of profound intimacy.",
    energySocial: "Social demands are managed entirely by the support system. The individual may have a small circle of familiar people who understand their communication and needs. Unfamiliar people and environments are profoundly challenging.",
    routineSpontaneity: "Complete dependence on routine and sameness. Any deviation can trigger severe distress. The partner or caregiver's role is to maintain routine consistency while gradually introducing supported flexibility when appropriate.",
    decisionMaking: "Decisions are facilitated by the support team based on known preferences, behavioral cues, and individual patterns. Supported decision-making respects autonomy while providing necessary scaffolding.",
    intimacyConnection: "Connection is expressed through proximity, shared routines, physical comfort-seeking, and response to familiar voices and presence. The bond between a Level 3 individual and their primary person is unique, deep, and expressed through a language that only those close to them can read.",
    householdLogistics: "Requires comprehensive support for daily living. The partner or caregiver manages all household logistics, often with professional support team assistance. The role is caregiving as much as partnership.",
    maskingAuthenticity: "Minimal masking. The presentation is largely unfiltered and authentic. This honesty, while sometimes challenging for the support system, means the partner interacts with the most genuine version of the person without social performance layers.",
    triggerPoint: "Gets triggered by any disruption to routine, unfamiliar people or environments, sensory overload, communication breakdown, or loss of familiar support people. Triggers are high-stakes and require immediate, practiced responses from the support system.",
    complement: "Brings a form of connection that strips away all social pretense. Their presence demands that those around them develop patience, attunement, and a capacity for love that transcends conventional expression. Caring for this brain teaches what unconditional really means.",
    needToUnderstand: "\"I experience the world with an intensity you may never fully comprehend. My distress is real even when you can't see the cause. My communication is valid even when it doesn't use words. I need you to be my stability, my interpreter, and my safe space \u2014 and to know that your presence is the most important thing in my world.\""
  },

  audhd: {
    coreWiring: "Two neurological systems in perpetual conflict. The ADHD brain craves novelty, stimulation, and spontaneity. The autistic brain craves routine, predictability, and depth. Neither wins \u2014 they alternate control, creating a person who appears paradoxical: building systems then breaking them, craving connection then withdrawing, planning meticulously then acting impulsively.",
    attentionInConversation: "Oscillates between ADHD-mode (rapid, tangential, associative) and ASD-mode (precise, focused, literal). The partner can't predict which processing style will show up. May hyperfocus on a conversation topic with autistic depth, then suddenly shift to ADHD-mode and lose the thread entirely.",
    emotionalRegulation: "Double-loaded emotional system. ADHD contributes emotional impulsivity and RSD; autism contributes delayed emotional processing and alexithymia. The result is a person who may have a rapid emotional reaction they can't identify or name, creating confusion for both themselves and their partner.",
    conflictStyle: "Unpredictable and internally conflicted. The ADHD brain wants to resolve NOW with emotional engagement. The autistic brain needs time, space, and logical structure. The partner experiences different conflict styles from the same person depending on which system is dominant in the moment.",
    sensoryNeeds: "Oscillating between hyper-sensitivity (autism) and sensation-seeking (ADHD). May need loud music and then suddenly need complete silence. The environment that works at 2pm may be unbearable at 4pm. Partners cannot maintain a single environmental setting \u2014 adaptability is essential.",
    timePlanning: "Paradoxical: builds elaborate plans (ASD) then abandons them (ADHD). May be time-blind one day and rigidly scheduled the next. The internal war between the need for structure and the need for flexibility creates chronic scheduling inconsistency. Partners find it impossible to 'plan around.'",
    communicationStyle: "Shifts between ADHD communication (fast, tangential, emotional) and ASD communication (precise, literal, logical) \u2014 sometimes within the same conversation. Partners who expect consistency will be frustrated. Needs a partner who can code-switch between communication modes.",
    energySocial: "Deeply contradictory social needs. Craves connection (ADHD) but is drained by it (ASD). May initiate a social event enthusiastically, then need to leave an hour in. Partners may feel whiplashed by the approach-withdraw cycle. Parallel time (together but separate) is often the sweet spot.",
    routineSpontaneity: "The defining paradox. Needs routine (ASD) but breaks it (ADHD). Builds systems with autistic precision and then violates them with ADHD impulsivity. The internal frustration of this cycle is enormous. Partners who witness the pattern see 'inconsistency' where the person feels 'internal civil war.'",
    decisionMaking: "Paralyzed between systems. The autistic brain wants to research exhaustively. The ADHD brain wants to decide NOW. The result is either impulsive decisions followed by autistic regret, or research paralysis with ADHD frustration. Neither system lets the other complete its process.",
    intimacyConnection: "Intensely devoted when both systems align. The ADHD brain brings passion and spontaneity; the autistic brain brings depth and loyalty. But the oscillation between approach (ADHD-driven desire for connection) and withdrawal (ASD-driven need for recovery) can make partners feel like they're in a relationship with two different people.",
    householdLogistics: "Creates elaborate organizational systems (ASD) then fails to maintain them (ADHD). The systems are genuinely brilliant \u2014 the follow-through is genuinely impaired. Partners may find beautifully designed filing systems with months of unfiled papers sitting next to them.",
    maskingAuthenticity: "Double masking \u2014 suppressing both ADHD traits and autistic traits simultaneously. The exhaustion is compounded because each mask conflicts with the other (masking ADHD requires stillness; masking autism requires social flexibility). Home is the only place both masks can drop, and the unmasked version can be raw.",
    triggerPoint: "Gets triggered by anyone who demands consistency because consistency requires the two systems to cooperate \u2014 which they neurologically can't do reliably. Also triggered by 'pick one \u2014 are you rigid or impulsive?' because the answer is genuinely both, and being forced to choose feels like being asked to amputate half their brain.",
    complement: "Brings an extraordinary combination of creative spontaneity AND analytical depth that few other brains can produce. When both systems fire together \u2014 the ADHD generating ideas while the autism provides structural rigor \u2014 the output is genuinely exceptional. The partner who learns to ride the wave accesses a remarkably rich inner world.",
    needToUnderstand: "\"I am two brains in one body, and they fight each other constantly. When I build a system and then break it, both actions were genuine. When I crave your closeness and then need space, both needs were real. I'm not being contradictory \u2014 I'm being all of myself at once. I need you to hold space for my complexity without trying to resolve it into something simpler.\""
  }
};


// ============================================================
// RELATIONAL DYNAMICS ENGINE
// Generates per-dimension conflict and complement analysis
// for any pair of neurotypes based on their trait profiles.
// ============================================================

function getRelationalDynamic(dimKey, brainAId, brainBId) {
  // Returns {conflict, complement} text for this dimension between these two brains
  const a = RELATIONAL_PROFILES[brainAId];
  const b = RELATIONAL_PROFILES[brainBId];
  if (!a || !b) return null;

  // Check for curated dynamics first
  const pairKey = [brainAId, brainBId].sort().join('|');
  const curated = CURATED_DYNAMICS[pairKey];
  if (curated && curated[dimKey]) return curated[dimKey];

  // Generate dynamic conflict/complement based on trait analysis
  return generateDimensionDynamic(dimKey, brainAId, brainBId);
}

// Trait extraction helpers for dynamic generation
function getDimTrait(dimKey, brainId) {
  const traits = {
    coreWiring: {
      neurotypical: 'balanced', 'adhd-c': 'dopamine-seeking', 'adhd-i': 'dopamine-seeking-quiet',
      overfocused: 'rigid-locked', temporal: 'volatile-storm', limbic: 'low-energy-depression',
      ringoffire: 'global-hyperactive', anxious: 'threat-scanning', 'adhd-dyslexia': 'dual-bottleneck',
      dyslexia: 'language-specific', 'asd-1': 'monotropic-deep', 'asd-2': 'monotropic-supported',
      'asd-3': 'monotropic-comprehensive', audhd: 'paradoxical-dual'
    },
    routineSpontaneity: {
      neurotypical: 'flexible', 'adhd-c': 'novelty-craving', 'adhd-i': 'routine-failing',
      overfocused: 'routine-rigid', temporal: 'routine-broken-by-episodes', limbic: 'routine-for-survival',
      ringoffire: 'state-dependent', anxious: 'routine-for-safety', 'adhd-dyslexia': 'routine-failing',
      dyslexia: 'flexible', 'asd-1': 'routine-dependent', 'asd-2': 'routine-essential',
      'asd-3': 'routine-critical', audhd: 'paradoxical'
    },
    energySocial: {
      neurotypical: 'moderate', 'adhd-c': 'volatile-high', 'adhd-i': 'low-draining',
      overfocused: 'selective', temporal: 'unpredictable', limbic: 'chronically-low',
      ringoffire: 'oscillating', anxious: 'anxiety-expensive', 'adhd-dyslexia': 'interest-gated',
      dyslexia: 'normal', 'asd-1': 'costly', 'asd-2': 'profoundly-draining',
      'asd-3': 'managed-externally', audhd: 'contradictory'
    },
    conflictStyle: {
      neurotypical: 'linear-resolution', 'adhd-c': 'immediate-intense', 'adhd-i': 'withdrawal',
      overfocused: 'repetitive-locked', temporal: 'explosive-unsafe', limbic: 'avoidant-hopeless',
      ringoffire: 'explosive-multi', anxious: 'avoidant-freeze', 'adhd-dyslexia': 'shame-driven',
      dyslexia: 'proportional', 'asd-1': 'logical-rigid', 'asd-2': 'overwhelm-meltdown',
      'asd-3': 'behavioral', audhd: 'unpredictable-dual'
    },
    sensoryNeeds: {
      neurotypical: 'moderate', 'adhd-c': 'seeking-high', 'adhd-i': 'under-responsive',
      overfocused: 'fixation-pattern', temporal: 'volatile', limbic: 'muted',
      ringoffire: 'extreme-hyper', anxious: 'vigilant', 'adhd-dyslexia': 'seeking-fatiguing',
      dyslexia: 'standard', 'asd-1': 'hyper-sensitive', 'asd-2': 'pervasive-intense',
      'asd-3': 'extreme-pervasive', audhd: 'oscillating'
    }
  };
  return (traits[dimKey] && traits[dimKey][brainId]) || 'typical';
}

function generateDimensionDynamic(dimKey, brainAId, brainBId) {
  const aName = NEUROTYPES[brainAId].name;
  const bName = NEUROTYPES[brainBId].name;
  const aTrait = getDimTrait(dimKey, brainAId);
  const bTrait = getDimTrait(dimKey, brainBId);

  // Dynamic conflict/complement generation based on dimensional traits
  const dynamics = {
    coreWiring: () => {
      if (aTrait === bTrait) return { conflict: `Both brains share the same fundamental wiring pattern. While this creates deep mutual understanding, it also means shared blind spots \u2014 neither partner naturally compensates for the other's gaps.`, complement: `The shared neurological architecture creates an intuitive understanding that doesn't need explanation. Both partners 'get it' at a level that outsiders rarely can.` };
      return { conflict: `These two brains process the world through fundamentally different operating systems. What feels natural to one can feel alien to the other \u2014 creating a persistent translation gap that requires conscious effort from both.`, complement: `The different processing architectures mean each brain catches what the other misses. Together, they have access to a wider cognitive range than either alone.` };
    },
    attentionInConversation: () => {
      return { conflict: `Conversational rhythms collide: ${aName}'s attention style may feel dismissive to ${bName}, while ${bName}'s style may feel demanding or confusing to ${aName}. Neither is being rude \u2014 their brains are running different conversational software.`, complement: `When both partners learn each other's attention language, conversations become richer. Each brain brings a different kind of listening that, combined, captures both the content and the emotional undertone.` };
    },
    emotionalRegulation: () => {
      return { conflict: `Emotional timing and intensity mismatches create the most painful friction. One brain's way of processing emotion can inadvertently trigger or overwhelm the other \u2014 not from lack of care, but from neurological incompatibility in how feelings are experienced and expressed.`, complement: `The different emotional processing styles mean one partner can offer what the other lacks: grounding during intensity, or permission for deeper feeling during flatness. The key is recognizing each style as valid, not broken.` };
    },
    conflictStyle: () => {
      return { conflict: `When disagreements arise, these two brains reach for fundamentally different tools. The mismatch in conflict style often escalates the conflict beyond the original issue \u2014 the fight becomes about HOW they're fighting, not what started it.`, complement: `Understanding that conflict style is neurological, not characterological, transforms fights into problem-solving. When both partners name their conflict neurology ('My brain wants to resolve this now' / 'My brain needs processing time'), the dynamic shifts from blame to collaboration.` };
    },
    sensoryNeeds: () => {
      if (aTrait === bTrait) return { conflict: `Shared sensory profiles can create competition for the same environmental resources. Both may need the same conditions but at different times, creating a scheduling challenge for shared space.`, complement: `Shared sensory understanding means neither partner has to justify their environmental needs. Both know what sensory overload or deprivation feels like, creating natural empathy for accommodations.` };
      return { conflict: `The sensory environment that one brain needs to function can be the environment that disables the other. Finding shared space that works for both requires creative negotiation and designated zones.`, complement: `Different sensory needs can expand the household's environmental repertoire. One partner's need for stimulation and the other's need for calm can create a home with diverse spaces that serve both.` };
    },
    timePlanning: () => {
      return { conflict: `Time perception and planning differences create daily friction. One partner's 'running late' is the other's 'deliberate disrespect.' One partner's 'over-planning' is the other's 'suffocating control.' The gap between how time feels to each brain is real and persistent.`, complement: `The partner with stronger temporal awareness can serve as a gentle external clock, while the other brings spontaneous flexibility that prevents life from becoming rigid. Together, they can build a temporal rhythm that honors both structure and flow.` };
    },
    communicationStyle: () => {
      return { conflict: `Communication style mismatches are the most frequent source of daily misunderstanding. Pace, directness, processing time, and the balance between explicit and implicit meaning all differ \u2014 creating a relationship where 'we speak different languages' is literally true at a neurological level.`, complement: `When both partners learn to translate, the relationship gains extraordinary communicative range. Direct communication prevents misunderstandings; nuanced communication builds emotional depth. Together, they develop a shared language richer than either could alone.` };
    },
    energySocial: () => {
      return { conflict: `Social energy mismatches create a persistent approach-withdraw dynamic. One partner wants more engagement while the other needs more recovery. Neither is wrong \u2014 but the imbalance can make one feel rejected and the other feel pressured.`, complement: `The partner with more social energy can handle the relationship's external social demands (family gatherings, friend meetups), while the other creates the restorative home environment both ultimately need. Division of social labor by neurological fit.` };
    },
    routineSpontaneity: () => {
      return { conflict: `The routine-spontaneity axis is where neurological differences become most visible in daily life. One brain's essential structure is another's suffocating cage. One brain's exciting flexibility is another's destabilizing chaos.`, complement: `When negotiated consciously, the structure-flexibility balance can create a life that's both stable and interesting. The routine-lover provides the foundation; the novelty-seeker brings the adventure. The key is respecting both needs as legitimate.` };
    },
    decisionMaking: () => {
      return { conflict: `Decision-making pace differences create frustration on both sides. One brain commits before the other has finished processing; the other processes so thoroughly that the first brain's window of motivation closes. Timing is everything \u2014 and their timers are set differently.`, complement: `The fast decider brings momentum; the thorough analyzer brings quality. Together, they can make decisions that are both timely and well-considered \u2014 if they build a process that gives each brain its needed input.` };
    },
    intimacyConnection: () => {
      return { conflict: `Love languages are neurologically determined, not just preferentially chosen. When one brain shows love through presence and the other through action, both partners can feel unloved despite being deeply loved. The gap is in translation, not affection.`, complement: `The different expressions of love, once recognized and valued, create a relationship rich in multiple dimensions of care. Acts of service AND verbal affirmation. Quality time AND special-interest sharing. The love is real on both sides.` };
    },
    householdLogistics: () => {
      return { conflict: `Household task distribution often becomes the concrete manifestation of neurological differences. Executive function gaps, sensory avoidance, and energy limitations create uneven division that can breed resentment if the neurological basis isn't understood.`, complement: `Dividing household tasks by cognitive fit rather than arbitrary equality creates efficiency and reduces resentment. Each partner handles what their brain does best \u2014 the result is a household that runs on neurological strength rather than struggling against deficit.` };
    },
    maskingAuthenticity: () => {
      return { conflict: `Masking differences create an intimacy gap. The heavily-masking partner may feel unseen ('you don't know the real me') while the less-masking partner may feel confused ('who are you when we're not at home?'). The mask is a survival tool, not a deception \u2014 but it can feel like one.`, complement: `The relationship becomes the safe space where masks can drop. When both partners understand the cost of masking, home becomes a sanctuary of authenticity. The trust required for unmasking deepens the bond beyond what surface relationships can achieve.` };
    },
    triggerPoint: () => {
      return { conflict: `Each brain has specific triggers that the other partner may inadvertently activate daily. Understanding that triggers are neurological \u2014 not character defects \u2014 is the first step. The second step is learning each other's trigger map and navigating around the known landmines.`, complement: `Mapped triggers become predictable and manageable. When both partners know each other's neurological flashpoints, they can create proactive accommodations rather than reactive damage control. This level of attunement is rare and deeply bonding.` };
    },
    complement: () => {
      return { conflict: `The very strengths each brain brings can become irritants in close quarters. Reliability can feel like rigidity. Spontaneity can feel like chaos. Depth can feel like obsession. The line between 'strength I admire' and 'trait that exhausts me' is often the line between a good day and a bad day.`, complement: `When both brains operate in their strength zone, the partnership becomes more capable than either individual. The weaknesses of one are genuinely covered by the strengths of the other. This isn't codependence \u2014 it's neurological complementarity.` };
    },
    needToUnderstand: () => {
      return { conflict: `The deepest wound in any neurotype pairing is feeling fundamentally misunderstood \u2014 that your partner sees your neurology as a choice, a character flaw, or something you could fix if you 'just tried harder.' This wound cuts deeper than any specific argument.`, complement: `The deepest gift in any neurotype pairing is being truly understood \u2014 having a partner who sees past the behavior to the brain beneath it, and who says 'I see you struggling, and I know it's not a choice.' This understanding is transformative.` };
    }
  };

  const generator = dynamics[dimKey];
  if (generator) return generator();

  // Fallback for any unmapped dimension
  return {
    conflict: `In this dimension, ${aName} and ${bName} may experience friction when their neurological patterns pull in different directions. The key is recognizing that both responses are brain-driven, not character-driven.`,
    complement: `When both brains bring their strengths to this dimension, the partnership covers ground that neither could alone. The difference, once understood, becomes a resource rather than a liability.`
  };
}


// ============================================================
// CURATED DYNAMICS — High-traffic pairings with hand-crafted
// per-dimension conflict/complement text.
// ============================================================

const CURATED_DYNAMICS = {
  'adhd-c|neurotypical': {
    routineSpontaneity: {
      conflict: "The NT brain plans a weekend in advance; the ADHD-C brain changes those plans at 10am Saturday because a better idea hit. This cycle repeats weekly. The NT partner feels their planning is disrespected; the ADHD-C partner feels caged by plans that killed the only thing that excited them.",
      complement: "The NT partner builds the framework that prevents chaos from becoming crisis. The ADHD-C partner injects the spontaneity that prevents the framework from becoming a prison. When negotiated, the balance creates a life that's both stable and alive."
    },
    householdLogistics: {
      conflict: "The NT partner absorbs the executive function burden — bills, appointments, school forms, meal planning — and slowly becomes a resentful household manager. The ADHD-C partner sees the growing resentment but genuinely cannot sustain the consistency required, deepening their shame.",
      complement: "External systems (autopay, shared calendars, cleaning schedules) remove executive function from the relationship equation. The NT partner's organizational strength paired with the ADHD-C partner's crisis competence means everything gets handled — just through different channels."
    },
    emotionalRegulation: {
      conflict: "ADHD-C's emotions hit fast and loud — a flash of frustration becomes a shouted sentence. The NT partner recoils from the intensity, which triggers RSD in the ADHD-C partner, which escalates the outburst. A 30-second emotional spike can derail an entire evening.",
      complement: "The NT partner learns to be the emotional anchor — not dismissing the intensity but also not escalating with it. The ADHD-C partner learns to narrate ('I'm having a big feeling but I'm okay'). The combination of passionate engagement and steady grounding creates emotional safety."
    }
  },
  'adhd-c|asd-1': {
    routineSpontaneity: {
      conflict: "The collision is almost daily. ASD-1 builds a routine and depends on it for cognitive stability. ADHD-C shatters it because a new idea arrived. For ASD-1, this isn't annoying — it's destabilizing. For ADHD-C, the routine isn't comforting — it's suffocating.",
      complement: "When they negotiate 'flex windows' inside structured routines, both brains get what they need. ASD-1 keeps the anchors (morning routine, meals, bedtime). ADHD-C gets designated adventure space. The structure has breathing room; the spontaneity has guardrails."
    },
    sensoryNeeds: {
      conflict: "ADHD-C's stimulation-seeking directly conflicts with ASD-1's sensory sensitivity. The loud music that regulates one brain overwhelms the other. The quiet environment that calms one brain agitates the other. The shared living space becomes a daily negotiation.",
      complement: "Designated zones solve most conflicts: a stimulation room (ADHD-C's workspace with music, movement, creative chaos) and a sanctuary room (ASD-1's sensory-regulated retreat). Noise-canceling headphones become a relationship tool, not just a personal accessory."
    },
    conflictStyle: {
      conflict: "ADHD-C wants resolution NOW — loudly, emotionally, immediately. ASD-1 needs time, logic, and space to process. The ADHD-C partner reads silence as rejection (triggering RSD). The ASD-1 partner reads intensity as threat (triggering shutdown). The escalation cycle is neurological, not intentional.",
      complement: "A structured conflict protocol honors both: ADHD-C names the emotion immediately ('I'm hurt'). Both take a timed break (30-60 min). They reconvene with an agreed structure (one speaker at a time, specific issue only). ADHD-C gets to be heard; ASD-1 gets processing time."
    }
  },
  'adhd-i|asd-1': {
    routineSpontaneity: {
      conflict: "ASD-1 builds systems expecting them to hold. ADHD-I values the systems theoretically but drifts away from them — not by rebellion but by executive dysfunction. The ASD-1 partner watches commitments evaporate and reads it as disrespect for the structure they both agreed to.",
      complement: "Both brains value depth over breadth. ADHD-I's quiet creative drift and ASD-1's systematic focus can coexist beautifully in parallel work sessions. Neither pressures the other for social performance. The home can be a shared haven of focused quiet."
    },
    communicationStyle: {
      conflict: "ASD-1's direct, literal communication collides with ADHD-I's indirect, reflective style. ASD-1 asks a clear question and gets a tangential response. ADHD-I shares a feeling and gets a logical solution instead of emotional validation. Both feel unheard.",
      complement: "ADHD-I's intuitive, associative thinking catches implications ASD-1 misses. ASD-1's precise, explicit communication provides the clarity ADHD-I needs. Together, they cover both the logical and emotional dimensions of any conversation."
    }
  },
  'asd-1|audhd': {
    routineSpontaneity: {
      conflict: "ASD-1 watches their AuDHD partner build a meticulous system and then violate it the next day. This is uniquely frustrating because the AuDHD partner clearly understands the VALUE of the system — they designed it. The violation feels personal because it appears chosen.",
      complement: "The ASD-1 partner can serve as the system's guardian — maintaining what the AuDHD partner designed but can't consistently follow. The AuDHD partner provides the creative flexibility that prevents the systems from becoming rigid or obsolete."
    },
    sensoryNeeds: {
      conflict: "ASD-1's sensory needs are consistent and predictable. AuDHD's sensory needs oscillate daily between seeking and avoiding. Yesterday's perfect shared environment is today's impossible compromise. ASD-1 cannot build a stable sensory plan because the AuDHD partner's needs are a moving target.",
      complement: "Both understand sensory sensitivity at a deep level. The shared autistic foundation means neither has to explain why the 'wrong' texture or sound is a crisis. They speak the same sensory language, even when the dialects differ day-to-day."
    }
  },
  'audhd|neurotypical': {
    coreWiring: {
      conflict: "The NT partner encounters what appears to be a walking contradiction — rigid one hour, impulsive the next. The AuDHD partner cannot explain why they need both routine AND novelty because the internal war between systems is pre-verbal. The NT partner's reasonable question 'What do you actually need?' has no single answer.",
      complement: "The NT brain's consistent processing provides a stable reference point for the AuDHD brain's oscillations. When the NT partner learns to read which system is dominant ('Are you in structure mode or adventure mode today?'), both can navigate more effectively."
    },
    maskingAuthenticity: {
      conflict: "The AuDHD partner is double-masking: suppressing ADHD impulsivity AND autistic traits simultaneously. By the time they reach home, there is nothing left. The NT partner gets the unmasked version — which may be volatile, withdrawn, or paradoxical. The NT partner may feel they only ever get the 'leftovers.'",
      complement: "Home becomes the only place both masks can drop. When the NT partner accepts that the unmasked AuDHD partner is the real partner, and the public version is the performance, trust deepens. The NT partner's acceptance becomes the most important emotional resource."
    }
  }
};


// ============================================================
// COMPARISON TABLE GENERATOR v2
// Takes two neurotype IDs, pulls their relational profiles
// and per-dimension dynamics, and assembles a structured
// comparison table with conflict/complement analysis.
// ============================================================

function generateComparisonTable(brainAId, brainBId) {
  const a = NEUROTYPES[brainAId];
  const b = NEUROTYPES[brainBId];
  if (!a || !b) return null;

  const profileA = RELATIONAL_PROFILES[brainAId];
  const profileB = RELATIONAL_PROFILES[brainBId];
  if (!profileA || !profileB) return null;

  const rows = COMPARISON_DIMENSIONS.map(dim => {
    const dynamic = getRelationalDynamic(dim.key, brainAId, brainBId);
    return {
      key: dim.key,
      label: dim.label,
      icon: dim.icon,
      color: dim.color,
      desc: dim.desc,
      brainA: profileA[dim.key] || '',
      brainB: profileB[dim.key] || '',
      conflict: dynamic ? dynamic.conflict : '',
      complement: dynamic ? dynamic.complement : ''
    };
  });

  return {
    brainA: a,
    brainB: b,
    rows: rows
  };
}
