// ============================================================
// THE NEURODIVERGENT BRAIN — Assessment Question Bank v2.1
// 138 Likert + 8 Validity + 6 Medical Review = 152 total
// Organized as screen objects matching the UX spec
// ============================================================

// Screen definitions — one domain per screen
// Each screen: { id, title, contextNote, questions[], validityItems[] }
// Questions: { id, text, isInverse? }
// Validity items: { id, text } — inserted at position indices 2, 5, or 8 (0-based)

const NDA_SCREENS = [
  // ─── SCREEN 3: DOM_A ────────────────────────────────────────
  {
    screenNum: 3,
    domainId: 'A',
    title: 'Attention & Focus',
    icon: 'fa-eye',
    color: '#F59E0B',
    contextNote: 'These questions ask about how you typically experience attention and focus in daily life.',
    questions: [
      { id: 'Q1',  text: 'My mind drifts away from what I am doing even when I genuinely want to stay focused.' },
      { id: 'Q2',  text: 'I lose track of what I was doing mid-task and have to start over.' },
      { id: 'Q3',  text: 'I start tasks with good intentions but lose interest quickly unless the activity is highly stimulating or novel.' },
      // V1 inserted here at index 3
      { id: 'Q4',  text: 'I can focus intensely for hours on things that captivate me, but struggle to focus at all on things that do not interest me.' },
      { id: 'Q5',  text: 'People describe me as spacey, absent-minded, or "in my own world."' },
      { id: 'Q6',  text: 'I miss important details in instructions, work, or conversations because I was not paying close enough attention.' },
      { id: 'Q7',  text: 'I forget what someone just said to me almost immediately after they say it.' },
      { id: 'Q8',  text: 'Sustaining attention during meetings, lectures, long readings, or repetitive tasks is genuinely difficult for me.' },
      { id: 'Q9',  text: 'I make careless errors on tasks that require consistent sustained attention.' },
      { id: 'Q10', text: 'I zone out mid-activity and lose significant time without realizing it.' },
      { id: 'Q11', text: 'Following multi-step verbal instructions is difficult because I forget steps before completing them.' },
      { id: 'Q12', text: 'I actively avoid tasks that require prolonged mental effort, even when they matter to me.' },
      { id: 'Q13', text: 'Even in important conversations or situations, part of my mind is always somewhere else.' },
      { id: 'Q14', text: 'I struggle to finish projects I started with enthusiasm, leaving many things incomplete.' }
    ],
    validityItems: [
      { id: 'V1', text: 'My thoughts wander away from what I am working on even when I am trying to concentrate.', insertAfterIndex: 2 }
    ]
  },

  // ─── SCREEN 4: DOM_B ────────────────────────────────────────
  {
    screenNum: 4,
    domainId: 'B',
    title: 'Physical Energy & Movement',
    icon: 'fa-bolt',
    color: '#F97316',
    contextNote: 'These questions are about your energy levels, physical restlessness, and the need to move.',
    questions: [
      { id: 'Q15', text: 'I feel physically restless and find it genuinely hard to stay still for extended periods.' },
      { id: 'Q16', text: 'I tap my fingers or feet, fidget with objects, or shift my body position repeatedly without meaning to.' },
      { id: 'Q17', text: 'I feel like I am driven by an internal motor that is always running, even when I am trying to rest.' },
      { id: 'Q18', text: 'I talk excessively, interrupt others, or finish people\'s sentences because I cannot wait.' },
      { id: 'Q19', text: 'I jump from activity to activity without completing any of them, pulled by whatever seems interesting in the moment.' },
      { id: 'Q20', text: 'During long sedentary activities, I feel a physical urgency to get up and move.' },
      { id: 'Q21', text: 'Others have described me as wound up, hyper, or unable to relax.' },
      { id: 'Q22', text: 'Waiting my turn, standing in line, or sitting through long events causes me significant discomfort.' },
      { id: 'Q23', text: 'I feel calm and comfortable sitting quietly for long periods without needing to move or do anything.', isInverse: true },
      { id: 'Q24', text: 'As a child, I was described as hyperactive, always moving, or very difficult to settle down.' }
    ],
    validityItems: []
  },

  // ─── SCREEN 5: DOM_C ────────────────────────────────────────
  {
    screenNum: 5,
    domainId: 'C',
    title: 'Impulse Control & Thinking Patterns',
    icon: 'fa-brain',
    color: '#E11D48',
    contextNote: 'These questions cover impulsivity, cognitive rigidity, and the ability to shift your thinking.',
    questions: [
      { id: 'Q25', text: 'I say things without thinking through the impact first and often regret it afterward.' },
      { id: 'Q26', text: 'I make impulsive decisions — spending, quitting, reacting, committing — that I later wish I had thought through.' },
      // V2 inserted here at index 2
      { id: 'Q27', text: 'When an idea or worry enters my mind, I cannot let it go even when I consciously try to move on.' },
      { id: 'Q28', text: 'I replay the same concern, memory, or problem repeatedly in my head without being able to resolve it.' },
      { id: 'Q29', text: 'When interrupted mid-task, I have great difficulty returning to what I was doing or shifting to something new.' },
      { id: 'Q30', text: 'I hold onto grievances and find it very difficult to let go of things that upset me, even minor ones.' },
      { id: 'Q31', text: 'I have a rigid sense of how things should be done and feel genuinely distressed when others do it differently.' },
      { id: 'Q32', text: 'I interrupt people mid-sentence because I am afraid I will forget what I wanted to say if I wait.' },
      { id: 'Q33', text: 'I form strong opinions quickly and genuinely struggle to consider alternative viewpoints without feeling threatened.' },
      { id: 'Q34', text: 'I act on urges immediately rather than pausing to consider consequences or delay gratification.' }
    ],
    validityItems: [
      { id: 'V2', text: 'I regularly experience visual hallucinations — seeing things that are not there — when I am not under the influence of any substance.', insertAfterIndex: 2 }
    ]
  },

  // ─── SCREEN 6: DOM_D ────────────────────────────────────────
  {
    screenNum: 6,
    domainId: 'D',
    title: 'Organization & Planning',
    icon: 'fa-tasks',
    color: '#7C3AED',
    contextNote: 'These questions are about how you manage time, organize tasks, and stay on top of responsibilities.',
    questions: [
      { id: 'Q35', text: 'My living or workspace is frequently disorganized in ways that interfere with my productivity or daily functioning.' },
      { id: 'Q36', text: 'I regularly lose important items — keys, phone, wallet, documents — and spend significant time searching for them.' },
      // V3 inserted here at index 2
      { id: 'Q37', text: 'Planning and sequencing multi-step tasks is genuinely difficult; I struggle to know where to start.' },
      { id: 'Q38', text: 'I am chronically late or consistently misjudge how long things will take.' },
      { id: 'Q39', text: 'I struggle to prioritize — everything feels equally urgent, or I cannot identify what matters most.' },
      { id: 'Q40', text: 'I procrastinate significantly on tasks I care about, not just things I dislike.' },
      { id: 'Q41', text: 'Transitioning smoothly between tasks requires an external prompt or deadline; I cannot do it internally.' },
      { id: 'Q42', text: 'I forget appointments, obligations, or commitments even when they matter to me.' },
      { id: 'Q43', text: 'Managing money, paperwork, forms, or administrative tasks feels disproportionately overwhelming.' },
      { id: 'Q44', text: 'I depend entirely on external systems — alarms, reminders, detailed lists — because my internal organization consistently fails me.' },
      { id: 'Q45', text: 'I consistently complete projects on time and follow through on commitments without external reminders.', isInverse: true },
      { id: 'Q46', text: 'I start my day with a clear plan and generally execute it the way I intended.', isInverse: true }
    ],
    validityItems: [
      { id: 'V3', text: 'I have excellent internal organization and rarely need external reminders or systems to stay on track.', insertAfterIndex: 2 }
    ]
  },

  // ─── SCREEN 7: DOM_E ────────────────────────────────────────
  {
    screenNum: 7,
    domainId: 'E',
    title: 'Mood & Emotions',
    icon: 'fa-heart',
    color: '#4338CA',
    contextNote: 'These questions are about your typical emotional experience — not just how you feel today, but your general patterns.',
    questions: [
      { id: 'Q47', text: 'I experience a persistent low-level sadness or flatness that does not have a specific identifiable cause.' },
      { id: 'Q48', text: 'I feel chronically low in energy or motivation in a way that is not explained by physical illness or poor sleep.' },
      { id: 'Q49', text: 'I feel helpless about my ability to change recurring problems in my life.' },
      { id: 'Q50', text: 'I withdraw socially from people I care about during difficult periods, preferring isolation.' },
      // V4 inserted here at index 4
      { id: 'Q51', text: 'I feel anxious, tense, or on edge frequently without a clear reason I can identify.' },
      { id: 'Q52', text: 'I anticipate the worst outcome in ambiguous situations — my default expectation is that things will go badly.' },
      { id: 'Q53', text: 'I avoid situations where I might be evaluated, judged, or criticized by others.' },
      { id: 'Q54', text: 'I experience physical symptoms of anxiety — headaches, stomach distress, muscle tension — when stressed.' },
      { id: 'Q55', text: 'Fear of conflict or social judgment prevents me from speaking up or asserting myself even when I should.' },
      { id: 'Q56', text: 'My mood fluctuates significantly throughout the day without obvious external triggers I can point to.' },
      { id: 'Q57', text: 'I experience sudden or intense irritability that feels out of proportion to what triggered it.' },
      { id: 'Q58', text: 'I have periods of intense emotional overwhelm in which I either shut down completely or have a meltdown.' },
      { id: 'Q59', text: 'My emotional reactions feel more intense and harder to control than what most people around me seem to experience.' },
      { id: 'Q60', text: 'I generally feel emotionally stable and recover from upsets relatively quickly.', isInverse: true }
    ],
    validityItems: [
      { id: 'V4', text: 'I feel nervous or apprehensive in situations where I might be judged or evaluated by others.', insertAfterIndex: 4 }
    ]
  },

  // ─── SCREEN 8: DOM_F ────────────────────────────────────────
  {
    screenNum: 8,
    domainId: 'F',
    title: 'Sensory Experience',
    icon: 'fa-hand-sparkles',
    color: '#EC4899',
    contextNote: 'These questions are about how you process sensory information — sounds, textures, lights, touch, and more.',
    questions: [
      { id: 'Q61', text: 'Certain sounds — background noise, crowd noise, high-pitched tones — feel physically painful or unbearable to me.' },
      { id: 'Q62', text: 'Bright or flickering lights cause me significant discomfort or sensory distress beyond what seems normal.' },
      { id: 'Q63', text: 'The textures of clothing — tags, seams, certain fabrics — can be so uncomfortable that I cannot think about anything else.' },
      { id: 'Q64', text: 'Smells that others do not seem to notice or find pleasant bother me significantly.' },
      { id: 'Q65', text: 'Being touched unexpectedly feels aversive or physically uncomfortable, even by people I trust.' },
      { id: 'Q66', text: 'Environments with multiple simultaneous sensory inputs — crowds, busy restaurants, shopping centers — quickly overwhelm me.' },
      { id: 'Q67', text: 'I have a strong need or drive to touch, smell, squeeze, or otherwise physically interact with objects in ways others find unusual.' },
      { id: 'Q68', text: 'I have significant difficulty filtering background noise from the main conversation I am trying to hear.' },
      { id: 'Q69', text: 'Physical sensations — heat, cold, pain, pressure — affect me more intensely than they seem to affect others.' },
      { id: 'Q70', text: 'I find deep calm and regulation in specific sensory inputs — weighted pressure, rocking, certain sounds, specific textures.' }
    ],
    validityItems: []
  },

  // ─── SCREEN 9: DOM_G ────────────────────────────────────────
  {
    screenNum: 9,
    domainId: 'G',
    title: 'Social Communication',
    icon: 'fa-users',
    color: '#8B5CF6',
    contextNote: 'These questions are about how you experience social interactions, communication, and connection with others.',
    questions: [
      { id: 'Q71', text: 'I understand what people say literally but frequently miss the emotional subtext or implied meaning behind their words.' },
      { id: 'Q72', text: 'Making and maintaining friendships feels confusing, unpredictable, or exhausting in ways it does not seem to for others.' },
      { id: 'Q73', text: 'Initiating conversations or knowing how to keep them going naturally feels genuinely difficult for me.' },
      { id: 'Q74', text: 'Eye contact feels unnatural, uncomfortable, or requires conscious effort — it does not happen automatically.' },
      // V5 inserted here at index 4
      { id: 'Q75', text: 'I miss social cues — facial expressions, tone of voice, body language — that others seem to pick up without thinking.' },
      { id: 'Q76', text: 'I have repeatedly experienced misunderstanding others\' intentions or being misunderstood myself in ways that hurt relationships.' },
      { id: 'Q77', text: 'I feel depleted and need significant recovery time after social interactions, even ones I enjoyed.' },
      { id: 'Q78', text: 'I have developed a social persona or script that I consciously perform in public to appear normal, and maintaining it is exhausting.' },
      { id: 'Q79', text: 'I prefer to communicate in writing rather than in person or by phone, even for important matters.' },
      { id: 'Q80', text: 'Humor, sarcasm, irony, and idiomatic expressions are harder for me to process and respond to naturally than for most people.' },
      { id: 'Q81', text: 'Group conversations feel chaotic — I struggle to track multiple speakers, follow topic shifts, or know when to contribute.' },
      { id: 'Q82', text: 'I feel significantly more comfortable in interactions that have clear rules, defined roles, and predictable structure.' }
    ],
    validityItems: [
      { id: 'V5', text: 'I regularly see patterns or meaningful messages in completely random things like static, background noise, or arrangements of ordinary objects.', insertAfterIndex: 4 }
    ]
  },

  // ─── SCREEN 10: DOM_H ────────────────────────────────────────
  {
    screenNum: 10,
    domainId: 'H',
    title: 'Routines & Patterns',
    icon: 'fa-redo',
    color: '#2DD4BF',
    contextNote: 'These questions are about routines, repetitive behaviors, special interests, and how you respond to change.',
    questions: [
      { id: 'Q83', text: 'I rely on specific daily routines, and disruptions to those routines cause me genuine distress that takes time to recover from.' },
      { id: 'Q84', text: 'I have one or more subjects or interests that I know to extraordinary depth and that occupy a large proportion of my thoughts and time.' },
      { id: 'Q85', text: 'I engage in repetitive movements or sounds — rocking, hand-flapping, humming, pacing, tapping — to manage stress or regulate my body.' },
      // V6 inserted here at index 3
      { id: 'Q86', text: 'I need to complete tasks in a specific order and feel significantly unsettled or unable to function if that order is disrupted.' },
      { id: 'Q87', text: 'Transitions — from one activity to another, from one place to another, or from one life phase to another — are genuinely difficult for me.' },
      { id: 'Q88', text: 'I have rules or rituals for how things must be done that I cannot fully explain rationally but must follow regardless.' },
      { id: 'Q89', text: 'I have always been intensely drawn to specific systems, patterns, or categorical knowledge — languages, numbers, maps, animals, history, mechanics.' },
      { id: 'Q90', text: 'Unexpected changes to plans, environments, or routines cause me disproportionate distress compared to what others around me seem to feel.' },
      { id: 'Q91', text: 'I repeat phrases, lines from media, quotes, or scripts — to myself or in conversation — as a way of communicating or self-regulating.' },
      { id: 'Q92', text: 'I have been told I take things too literally or that I am rigid and inflexible in how I approach situations.' }
    ],
    validityItems: [
      { id: 'V6', text: 'I adapt easily to unexpected changes in plans or routines and rarely feel bothered by disruptions.', insertAfterIndex: 3 }
    ]
  },

  // ─── SCREEN 11: DOM_I ────────────────────────────────────────
  {
    screenNum: 11,
    domainId: 'I',
    title: 'Reading & Language',
    icon: 'fa-book-open',
    color: '#A78BFA',
    contextNote: 'These questions are about your experience with reading, writing, spelling, and language processing.',
    questions: [
      { id: 'Q93',  text: 'I read slowly and must re-read sentences multiple times before I understand or retain them.' },
      { id: 'Q94',  text: 'Learning to read was significantly harder for me than it seemed to be for my peers, even when I was trying my hardest.' },
      { id: 'Q95',  text: 'I frequently confuse visually similar letters or numbers — b/d, p/q, 6/9, or similar pairs.' },
      // V7 inserted here at index 3
      { id: 'Q96',  text: 'Sounding out unfamiliar words phonetically is difficult — I cannot easily decode new words I have not seen before.' },
      { id: 'Q97',  text: 'My spelling is poor despite knowing the meaning of words and being otherwise intelligent.' },
      { id: 'Q98',  text: 'I know what I want to say but cannot quickly retrieve the right word — it feels just out of reach.' },
      { id: 'Q99',  text: 'When reading aloud, I frequently stumble, substitute wrong words, skip words, or lose my place.' },
      { id: 'Q100', text: 'My reading comprehension is significantly weaker than my verbal intelligence or general knowledge would predict.' },
      { id: 'Q101', text: 'I avoid reading whenever possible because it requires effort that others do not seem to need for the same text.' },
      { id: 'Q102', text: 'Tasks involving sequences of symbols — musical notation, mathematical formulas, codes, programming syntax — are particularly difficult.' },
      { id: 'Q103', text: 'I struggle to distinguish similar-sounding words or to identify rhymes and sound patterns in language.' },
      { id: 'Q104', text: 'Writing takes me disproportionately longer than most people, and the written product rarely reflects what I actually know or think.' },
      { id: 'Q105', text: 'I have difficulty following spoken instructions because the words arrive faster than I can process them into meaning.' },
      { id: 'Q106', text: 'Reading for pleasure is easy and natural for me; I can read quickly and retain what I read without difficulty.', isInverse: true }
    ],
    validityItems: [
      { id: 'V7', text: 'When I am reading, I frequently have to go back and re-read the same passage because I did not absorb it the first time.', insertAfterIndex: 3 }
    ]
  },

  // ─── SCREEN 12: DOM_J ────────────────────────────────────────
  {
    screenNum: 12,
    domainId: 'J',
    title: 'Memory & Thinking Clarity',
    icon: 'fa-memory',
    color: '#DC2626',
    contextNote: 'These questions are about memory, auditory processing, and moments of cognitive disruption.',
    questions: [
      { id: 'Q107', text: 'I experience sudden brief flashes of anger or irritability that feel disproportionate to what triggered them and pass quickly.' },
      { id: 'Q108', text: 'I have brief periods of confusion, spaciness, or dissociation — feeling disconnected from my surroundings — without a clear trigger.' },
      // V8 inserted here at index 2
      { id: 'Q109', text: 'I have difficulty learning and retaining new information even when I am genuinely paying attention.' },
      { id: 'Q110', text: 'I hear words clearly but have trouble quickly making sense of what they mean — processing lags behind hearing.' },
      { id: 'Q111', text: 'I have a poor memory for sequences, names, dates, verbal instructions, or lists.' },
      { id: 'Q112', text: 'I experience mild, unexplained paranoia or suspicion in situations that others seem completely comfortable with.' },
      { id: 'Q113', text: 'I have experienced unexplained headaches or abdominal pain that doctors have not been able to explain physically.' },
      { id: 'Q114', text: 'When I am overloaded, my thinking can briefly feel scrambled, disorganized, or hard to control.' },
      { id: 'Q115', text: 'I experience brief moments of inexplicable fear or panic that come on suddenly and do not match the situation.' },
      { id: 'Q116', text: 'My long-term memory for details, events, and facts from years ago is significantly stronger than my short-term memory for recent things.' }
    ],
    validityItems: [
      { id: 'V8', text: 'I have on multiple occasions lost complete chunks of time — hours or days — with no memory of what happened during that period.', insertAfterIndex: 2 }
    ]
  },

  // ─── SCREEN 13: DOM_K ────────────────────────────────────────
  {
    screenNum: 13,
    domainId: 'K',
    title: 'Internal Conflicts & Masking',
    icon: 'fa-mask',
    color: '#EC4899',
    contextNote: 'These questions explore the experience of internal contradictions, masking, and the hidden cost of appearing functional.',
    questions: [
      { id: 'Q117', text: 'I crave structure and routine, but my own impulsivity or forgetfulness constantly undermines the routines I try to build.' },
      { id: 'Q118', text: 'I feel like two contradictory people — one who needs sameness, predictability, and order, and one who is driven toward novelty, chaos, and change.' },
      { id: 'Q119', text: 'I expend enormous energy appearing normal or capable in social situations and feel completely depleted or collapsed afterward.' },
      { id: 'Q120', text: 'My emotional reactions are more intense and harder to regulate than what my attention difficulties or social differences alone would seem to explain.' },
      { id: 'Q121', text: 'I have deep, consuming special interests — but I also jump impulsively between them, leaving many unfinished. Both the depth and the abandonment feel like me.' },
      { id: 'Q122', text: 'My need to blend in and appear capable masks how much I am actually struggling, so I look high-functioning in public at enormous internal cost.' },
      { id: 'Q123', text: 'The strategies that help my scattered attention — flexibility, novelty, low structure — often directly conflict with what helps my need for sameness — predictability, routine, stability. This tension is a constant source of exhaustion.' },
      { id: 'Q124', text: 'I have been dismissed, misunderstood, or misdiagnosed multiple times because others saw only one side of my struggles and missed the full picture.' },
      { id: 'Q125', text: 'I experience a kind of double imposter syndrome — I feel like I am not struggling enough in one area, and not struggling enough in another, to belong in any community, even though I relate deeply to multiple experiences.' },
      { id: 'Q126', text: 'The combination of needing to hide my social differences AND manage my attention and impulse difficulties simultaneously makes everyday functioning significantly more effortful than it appears from the outside.' }
    ],
    validityItems: []
  },

  // ─── SCREEN 14: DOM_L + DOM_M ────────────────────────────────
  {
    screenNum: 14,
    domainId: 'LM',
    title: 'Daily Impact & Your Background',
    icon: 'fa-history',
    color: '#6B7280',
    contextNote: 'For "Daily Impact": rate how consistently each statement reflects your experience. For "Your Background": rate how true each statement is about your history (Never = not at all true · Almost Always = completely true).',
    sections: [
      {
        sectionTitle: 'Daily Impact',
        questions: [
          { id: 'Q128', text: 'My attention and organization difficulties show up across multiple areas of my life — work or school, home, and relationships — not just in one setting.' },
          { id: 'Q131', text: 'My attention or social difficulties cause meaningful disruption in at least one major life area — work, school, relationships, or daily independence.' },
          { id: 'Q134', text: 'These difficulties persist even when I genuinely try to address them through strategies, adjustments, or support.' },
          { id: 'Q135', text: 'I have to work substantially harder than people around me to meet the same ordinary expectations.' }
        ]
      },
      {
        sectionTitle: 'Your Background',
        questions: [
          { id: 'Q127', text: 'The difficulties I experience with attention, focus, or organization have been part of my life since childhood.' },
          { id: 'Q129', text: 'My social communication differences, need for sameness, or sensory sensitivities have been present since I was young.' },
          { id: 'Q130', text: 'My reading, spelling, or language difficulties started when I was learning to read and have continued throughout my life.' },
          { id: 'Q132', text: 'My current difficulties seem to have started recently in response to a specific stressor, trauma, or illness — they are not longstanding.', isInverse: true },
          { id: 'Q133', text: 'A parent, sibling, or close biological relative has been identified with attention difficulties, social differences, learning differences, or similar traits.' }
        ]
      }
    ],
    validityItems: []
  },

  // ─── SCREEN 15: DOM_N ────────────────────────────────────────
  {
    screenNum: 15,
    domainId: 'N',
    title: 'Right Now',
    icon: 'fa-clock',
    color: '#6B7280',
    contextNote: 'Just three questions about your current state. Rate how true each statement is for you right now: Never = not at all · Almost Always = very much so.',
    questions: [
      { id: 'Q136', text: 'My current stress level is significantly worsening my concentration, mood, or emotional regulation right now.' },
      { id: 'Q137', text: 'Poor sleep, exhaustion, or burnout is significantly affecting how I am functioning right now.' },
      { id: 'Q138', text: 'My difficulties feel noticeably worse recently — in the past few months — compared to my usual baseline.' }
    ],
    validityItems: []
  },

  // ─── SCREEN 16: MEDICAL REVIEW ───────────────────────────────
  {
    screenNum: 16,
    domainId: 'MR',
    title: 'Medical Background',
    icon: 'fa-stethoscope',
    color: '#6B7280',
    contextNote: 'These final questions help us identify patterns that may benefit from medical review. Please answer Yes or No.',
    isBinary: true,
    questions: [
      { id: 'MR1', text: 'Have you had episodes of lost time, altered awareness, or "blank spells"?' },
      { id: 'MR2', text: 'Have you had recurrent déjà vu, unusual smell/taste sensations, or sudden fear spells that felt neurological rather than purely anxious?' },
      { id: 'MR3', text: 'Do you have a history of concussion, significant head injury, seizure disorder, or unexplained neurologic events?' },
      { id: 'MR4', text: 'Have you had migraines or neurologic episodes involving confusion, sensory distortion, or speech difficulty?' },
      { id: 'MR5', text: 'Have others noticed brief periods when you seemed "not fully there"?' },
      { id: 'MR6', text: 'Have you had auditory or visual distortions that felt more neurological than emotional?' }
    ],
    validityItems: []
  }
];

// ── CONTEXT QUESTIONS ─────────────────────────────────────────
const NDA_CONTEXT_QUESTIONS = [
  {
    id: 'ageRange',
    label: 'Age Range',
    type: 'select',
    options: ['Under 18', '18–25', '26–35', '36–50', '51+'],
    helperText: 'Helps contextualize developmental patterns'
  },
  {
    id: 'genderIdentity',
    label: 'Gender Identity',
    type: 'select',
    options: ['Man', 'Woman', 'Non-binary', 'Prefer not to say'],
    helperText: 'Helps account for diagnostic presentation differences'
  },
  {
    id: 'priorDiagnosis',
    label: 'Prior Diagnosis (if any)',
    type: 'select',
    options: ['None', 'ADHD', 'Autism', 'Dyslexia', 'Multiple', 'Unsure'],
    helperText: 'Helps contextualize your results'
  },
  {
    id: 'hasFamilyHistory',
    label: 'A biological family member has been diagnosed with ADHD, autism, or a learning difference',
    type: 'toggle',
    helperText: 'Family history is a meaningful factor in neurodevelopmental profiles'
  },
  {
    id: 'strongestReadingLanguage',
    label: 'Strongest Reading Language',
    type: 'select',
    options: ['English', 'Spanish', 'Mandarin', 'French', 'German', 'Japanese', 'Arabic', 'Portuguese', 'Other'],
    helperText: 'Affects how reading/language scores are interpreted'
  },
  {
    id: 'yearsFormalSchoolingInAssessmentLanguage',
    label: 'Years of formal schooling in English',
    type: 'select',
    options: [
      { label: '0–2 years', value: 1 },
      { label: '3–5 years', value: 4 },
      { label: '6–8 years', value: 7 },
      { label: '9–12 years', value: 10 },
      { label: '13+ years', value: 13 }
    ],
    helperText: 'Helps account for language background in reading scores'
  },
  {
    id: 'interruptedSchooling',
    label: 'My schooling was significantly interrupted (illness, moving, other circumstances)',
    type: 'toggle'
  },
  {
    id: 'historyHearingVisionProblemsAffectingReading',
    label: 'I have a history of hearing or vision problems that affected reading',
    type: 'toggle'
  }
];

// ── LIKERT SCALE ──────────────────────────────────────────────
const NDA_LIKERT = [
  { value: 0, label: 'Never',        shortLabel: 'Never',    sublabel: 'Not at all like me' },
  { value: 1, label: 'Rarely',       shortLabel: 'Rarely',   sublabel: 'Slightly like me' },
  { value: 2, label: 'Sometimes',    shortLabel: 'Sometimes',sublabel: 'Moderately like me' },
  { value: 3, label: 'Often',        shortLabel: 'Often',    sublabel: 'Mostly like me' },
  { value: 4, label: 'Almost Always',shortLabel: 'Almost',   sublabel: 'Very much like me' }
];

// ── NEUROTYPE DESCRIPTIONS FOR RESULTS ───────────────────────
const NDA_DESCRIPTIONS = {
  A1_COMBINED: {
    tier1Label: 'Clinically Established',
    description: `Classic ADHD presents with both significant inattention AND hyperactivity-impulsivity across multiple settings. People with this profile experience a brain that is both difficult to direct and difficult to restrain — attention slips away from low-interest tasks while impulsivity accelerates decisions before they have been fully formed. Energy is high but directional control is poor. This is the most widely recognized ADHD presentation and maps directly to the DSM-5-TR "Combined Presentation." A strong score here suggests a pattern that would be clinically meaningful if confirmed by professional evaluation, particularly if present since childhood across multiple settings.`
  },
  A2_INATTENT: {
    tier1Label: 'Clinically Established',
    description: `Inattentive ADHD presents without visible hyperactivity. These individuals are frequently described as dreamy, slow, forgetful, or unmotivated — but the reality is that their brains work hard against a persistent attentional pull that resists redirection. Focus is inconsistent, task initiation is difficult, and follow-through is a constant challenge. This type is significantly underdiagnosed, particularly in women, girls, and quieter individuals who do not display disruptive behaviors. It maps directly to the DSM-5-TR "Predominantly Inattentive Presentation." A strong score here is one of the more clinically meaningful results this tool produces.`
  },
  A3_OVERFOC: {
    tier1Label: 'Exploratory Pattern',
    description: `Over-Focused ADHD involves getting stuck — not in an inability to focus, but in an inability to stop focusing on the wrong things. Cognitive inflexibility, rumination, rigid rules, and oppositional tendencies are hallmarks. It is sometimes confused with OCD, anxiety, or autism due to shared rigidity features. This profile originates from Dr. Daniel Amen's brain-imaging research and is not independently classified in the DSM-5-TR. This should be understood as a descriptive pattern cluster, not a clinical diagnosis. It may be most useful as a conversation-starter with a clinician.`,
    caveat: true
  },
  A4_TEMPORAL: {
    tier1Label: 'Exploratory Pattern',
    description: `Temporal Lobe ADHD combines attention difficulties with memory instability, auditory processing challenges, and emotional dysregulation including sudden anger, mild paranoia, or unexplained irritability. It is associated with past head injuries, prolonged illness, or early neurological insults. This is not a DSM-5-TR classification. If your score here is high and you have a history of head injury or unexplained neurological symptoms, this warrants a medical conversation, not just a psychological one.`,
    caveat: true
  },
  A5_LIMBIC: {
    tier1Label: 'Exploratory Pattern',
    description: `Limbic ADHD presents with persistent low-grade sadness, low energy, social withdrawal, and negativity overlaid on core attention difficulties. It is frequently misidentified as depression. The differentiator is temporal sequence: attention problems predate and cause the mood symptoms, rather than the mood disorder being primary. This comes from Amen's brain-imaging framework. A strong score should prompt careful evaluation to distinguish between ADHD with secondary low mood, dysthymia, or clinical depression.`,
    caveat: true
  },
  A6_RINGFIRE: {
    tier1Label: 'Exploratory Pattern',
    description: `Ring of Fire ADHD is characterized by global brain overactivation — racing thoughts, sensory hypersensitivity, intense irritability, rapid speech, cyclic mood instability, and explosive episodes. Stimulant medications frequently worsen symptoms in this group. This overlaps with bipolar spectrum, PTSD-related dysregulation, and sensory processing disorder. A strong score requires careful professional differential evaluation.`,
    caveat: true
  },
  A7_ANXIOUS: {
    tier1Label: 'Moderate Evidence',
    description: `Anxious ADHD is driven by chronic fear, tension, anticipatory dread, and conflict avoidance layered over core attention difficulties. These individuals freeze rather than impulsively act; they anticipate failure; they avoid evaluation. Physical stress symptoms are common. This profile has meaningful clinical grounding in the documented co-occurrence of ADHD and anxiety disorders, but is not independently classified in DSM-5-TR.`
  },
  A8_DXCOMBO: {
    tier1Label: 'Moderate Evidence',
    description: `This profile captures co-occurring Inattentive ADHD with reading and phonological processing difficulties. The two conditions interact: inattention makes compensatory reading strategies harder to sustain, while reading difficulty compounds ADHD demoralization. Both components must be meaningfully elevated for this profile to register — the scoring engine enforces this through dual requirements.`
  },
  B1_DYSLEXIA: {
    tier1Label: 'Clinically Established',
    description: `Dyslexia is a neurobiological difference in phonological processing that affects reading fluency, decoding, and spelling. It has no relationship to intelligence. The challenge is specifically with the code of written language, not with ideas or comprehension. This profile requires phonological processing items to be elevated, not just general reading difficulty. A strong score with childhood onset is one of the more reliable self-report signals this tool produces.`
  },
  C1_ASD_L1: {
    tier1Label: 'Moderate Evidence',
    description: `Level 1 autism involves social communication differences and restricted/repetitive patterns requiring some support, though many individuals navigate daily life independently at significant hidden cost. The defining feature is the gap between capability and cost. Social exhaustion, intense special interests, sensitivity to disruption, and effortful masking are hallmarks. This score has been adjusted for masking. Formal autism assessment by a masking-aware clinician is required for any formal determination.`
  },
  C2_ASD_L2: {
    tier1Label: 'Moderate Evidence',
    description: `Level 2 autism involves more visible support needs. Social communication deficits are apparent across contexts, restricted behaviors cause meaningful interference, and sensory processing differences are pronounced. This is an estimate — support level is typically assessed by a multidisciplinary team.`
  },
  C3_ASD_L3: {
    tier1Label: 'Exploratory Pattern',
    description: `Level 3 autism involves very substantial support needs across multiple life domains. It is uncommon for a self-administered tool to reliably identify this pattern, as very substantial support needs often affect test-taking itself. A strong score should be discussed with a clinician promptly.`,
    caveat: true
  },
  C4_ASD_COMB: {
    tier1Label: 'Clinically Established',
    description: `This is the broadest autism profile — strong patterns across both core domains without mapping to a single support level. This is the most clinically meaningful autism signal this tool produces at the broad level. A strong score warrants professional autism assessment.`
  },
  D1_AUDHD: {
    tier1Label: 'Clinically Established',
    description: `AuDHD is not simply autism plus ADHD. The co-occurrence creates a genuinely distinct profile where the two conditions interact, often amplifying each other while simultaneously masking both. The central tension is between the autistic need for sameness and the ADHD drive toward novelty. Emotional dysregulation typically exceeds what either condition alone would predict. This profile requires meaningful elevation on BOTH ADHD and ASD dimensions — the scoring engine enforces this.`
  }
};

// ── DOMAIN DISPLAY NAMES (for PDF / domain bar chart) ────────
const NDA_DOMAIN_NAMES = {
  A: { name: 'Attention',             icon: 'fa-eye',           color: '#F59E0B' },
  B: { name: 'Hyperactivity',         icon: 'fa-bolt',          color: '#F97316' },
  C: { name: 'Impulsivity & Rigidity',icon: 'fa-brain',         color: '#E11D48' },
  D: { name: 'Executive Function',    icon: 'fa-tasks',         color: '#7C3AED' },
  E: { name: 'Mood & Anxiety',        icon: 'fa-heart',         color: '#4338CA' },
  F: { name: 'Sensory Processing',    icon: 'fa-hand-sparkles', color: '#EC4899' },
  G: { name: 'Social Communication',  icon: 'fa-users',         color: '#8B5CF6' },
  H: { name: 'Repetitive Patterns',   icon: 'fa-redo',          color: '#2DD4BF' },
  I: { name: 'Reading & Language',    icon: 'fa-book-open',     color: '#A78BFA' },
  J: { name: 'Memory & Cognitive',    icon: 'fa-memory',        color: '#DC2626' },
  K: { name: 'AuDHD Convergence',     icon: 'fa-mask',          color: '#EC4899' },
  L: { name: 'Functional Impairment', icon: 'fa-exclamation-triangle', color: '#F59E0B' },
  M: { name: 'Developmental History', icon: 'fa-history',       color: '#6B7280' },
  N: { name: 'Current State Load',    icon: 'fa-clock',         color: '#9CA3AF' }
};
