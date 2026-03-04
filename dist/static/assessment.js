// ============================================================
// THE NEURODIVERGENT BRAIN — Self-Assessment Tool
// 60 Questions, 6 Domains, Weighted Scoring
// Now includes Amen ADD types: overfocused, temporal, limbic,
//   ringoffire, anxious
// ============================================================

const ASSESSMENT_QUESTIONS = [
  // ============ DOMAIN 1: ATTENTION & FOCUS (10 questions) ============
  { id: 1, domain: 'attention', text: "I often finish reading a page and realize I absorbed none of it.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 1, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 1, temporal: 1, limbic: 2, ringoffire: 1, anxious: 2 }},
  { id: 2, domain: 'attention', text: "I feel physically restless when forced to sit still for extended periods.", weights: { 'adhd-c': 3, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 1, limbic: -1, ringoffire: 2, anxious: 1 }},
  { id: 3, domain: 'attention', text: "When deeply engaged in something I enjoy, I lose track of hours without noticing hunger, thirst, or the need for a break.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 2, audhd: 3, neurotypical: -1, overfocused: 3, temporal: 1, limbic: 0, ringoffire: 2, anxious: 0 }},
  { id: 4, domain: 'attention', text: "I frequently start tasks but leave them unfinished when something more interesting comes along.", weights: { 'adhd-c': 3, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': -1, 'asd-2': -1, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: -1, temporal: 1, limbic: 1, ringoffire: 2, anxious: 0 }},
  { id: 5, domain: 'attention', text: "I can focus intensely on topics that interest me but struggle to maintain attention on tasks that don't.", weights: { 'adhd-c': 3, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 2, 'asd-2': 2, 'asd-3': 1, audhd: 3, neurotypical: -2, overfocused: 2, temporal: 1, limbic: 1, ringoffire: 2, anxious: 1 }},
  { id: 6, domain: 'attention', text: "I often zone out during conversations even when I'm genuinely trying to listen.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 1, 'asd-2': 1, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 2, limbic: 2, ringoffire: 1, anxious: 1 }},
  { id: 7, domain: 'attention', text: "I need background noise or music to concentrate effectively.", weights: { 'adhd-c': 2, 'adhd-i': 2, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': -1, 'asd-2': -2, 'asd-3': -2, audhd: 1, neurotypical: 0, overfocused: 0, temporal: 0, limbic: 0, ringoffire: -1, anxious: 0 }},
  { id: 8, domain: 'attention', text: "My mind races with multiple thoughts simultaneously, making it hard to focus on one thing.", weights: { 'adhd-c': 3, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 1, limbic: 1, ringoffire: 3, anxious: 2 }},
  { id: 9, domain: 'attention', text: "I find it easy to sustain attention on routine tasks for long periods.", weights: { 'adhd-c': -3, 'adhd-i': -3, 'adhd-dyslexia': -2, dyslexia: 0, 'asd-1': 1, 'asd-2': 1, 'asd-3': 0, audhd: -2, neurotypical: 3, overfocused: 0, temporal: -1, limbic: -2, ringoffire: -2, anxious: -1 }},
  { id: 10, domain: 'attention', text: "I often interrupt people or blurt out responses before they finish speaking.", weights: { 'adhd-c': 3, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 0, ringoffire: 2, anxious: -1 }},

  // ============ DOMAIN 2: SENSORY EXPERIENCE (10 questions) ============
  { id: 11, domain: 'sensory', text: "Certain sounds that don't bother others can make it nearly impossible for me to concentrate.", weights: { 'adhd-c': 1, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 2, limbic: 0, ringoffire: 3, anxious: 1 }},
  { id: 12, domain: 'sensory', text: "I often don't notice I'm hungry, thirsty, or need the bathroom until it becomes urgent.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 2, 'asd-2': 2, 'asd-3': 2, audhd: 3, neurotypical: -2, overfocused: 2, temporal: 1, limbic: 1, ringoffire: 1, anxious: 0 }},
  { id: 13, domain: 'sensory', text: "I need to fidget, move, or have something in my hands to think clearly.", weights: { 'adhd-c': 3, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 2, 'asd-2': 2, 'asd-3': 2, audhd: 3, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 0, ringoffire: 2, anxious: 1 }},
  { id: 14, domain: 'sensory', text: "I sometimes seek out intense sensory experiences (loud music, spicy food, extreme sports) to feel 'reset'.", weights: { 'adhd-c': 3, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 0, 'asd-2': -1, 'asd-3': -1, audhd: 2, neurotypical: -1, overfocused: 0, temporal: 0, limbic: -1, ringoffire: 2, anxious: -1 }},
  { id: 15, domain: 'sensory', text: "I have been told I'm too sensitive to things like clothing tags, bright lights, or certain textures.", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 0, limbic: 0, ringoffire: 3, anxious: 0 }},
  { id: 16, domain: 'sensory', text: "I sometimes experience sensory overload where everything becomes too much and I need to withdraw completely.", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 0, ringoffire: 3, anxious: 1 }},
  { id: 17, domain: 'sensory', text: "I have strong reactions to smells that other people barely notice.", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 2, 'asd-2': 3, 'asd-3': 3, audhd: 2, neurotypical: -1, overfocused: 0, temporal: 0, limbic: 0, ringoffire: 3, anxious: 0 }},
  { id: 18, domain: 'sensory', text: "I find it comforting to rock, sway, pace, or engage in repetitive movements.", weights: { 'adhd-c': 1, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 0, limbic: 0, ringoffire: 1, anxious: 1 }},
  { id: 19, domain: 'sensory', text: "I can easily filter out background noise and focus on what I need to.", weights: { 'adhd-c': -2, 'adhd-i': -2, 'adhd-dyslexia': -2, dyslexia: 0, 'asd-1': -2, 'asd-2': -3, 'asd-3': -3, audhd: -3, neurotypical: 3, overfocused: 0, temporal: -2, limbic: 0, ringoffire: -3, anxious: -1 }},
  { id: 20, domain: 'sensory', text: "I frequently oscillate between craving intense stimulation and being overwhelmed by it.", weights: { 'adhd-c': 1, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 1, 'asd-2': 1, 'asd-3': 1, audhd: 3, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 0, ringoffire: 3, anxious: 1 }},

  // ============ DOMAIN 3: SOCIAL COMMUNICATION (10 questions) ============
  { id: 21, domain: 'social', text: "I frequently discover that something I said was taken differently than I intended.", weights: { 'adhd-c': 1, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 2, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 1, limbic: 0, ringoffire: 1, anxious: 0 }},
  { id: 22, domain: 'social', text: "After socializing, I need significant alone time to recover.", weights: { 'adhd-c': 0, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: -1, overfocused: 1, temporal: 0, limbic: 2, ringoffire: 1, anxious: 2 }},
  { id: 23, domain: 'social', text: "I often mentally rehearse conversations before having them.", weights: { 'adhd-c': 0, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 2, audhd: 2, neurotypical: -1, overfocused: 2, temporal: 0, limbic: 0, ringoffire: 0, anxious: 3 }},
  { id: 24, domain: 'social', text: "I find it easier to connect with people through shared activities or projects than open-ended conversation.", weights: { 'adhd-c': 1, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 2, audhd: 2, neurotypical: -1, overfocused: 1, temporal: 0, limbic: 1, ringoffire: 0, anxious: 1 }},
  { id: 25, domain: 'social', text: "I have been told I come across as blunt, insensitive, or lacking in empathy when I thought I was being clear.", weights: { 'adhd-c': 1, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 2, audhd: 2, neurotypical: -2, overfocused: 2, temporal: 1, limbic: 0, ringoffire: 1, anxious: -1 }},
  { id: 26, domain: 'social', text: "I feel like I'm constantly performing a version of myself in social settings.", weights: { 'adhd-c': 1, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 1, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 0, limbic: 1, ringoffire: 1, anxious: 2 }},
  { id: 27, domain: 'social', text: "I struggle to read facial expressions or body language accurately.", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 28, domain: 'social', text: "I tend to forget to reach out to friends and then feel guilty about lost connections.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 1, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 2, ringoffire: 0, anxious: 1 }},
  { id: 29, domain: 'social', text: "I find group conversations overwhelming or hard to follow.", weights: { 'adhd-c': 1, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 2, limbic: 1, ringoffire: 2, anxious: 2 }},
  { id: 30, domain: 'social', text: "I naturally pick up on social cues and adjust my behavior accordingly without much effort.", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': -3, 'asd-2': -3, 'asd-3': -3, audhd: -2, neurotypical: 3, overfocused: 0, temporal: 0, limbic: 0, ringoffire: 0, anxious: 0 }},

  // ============ DOMAIN 4: EXECUTIVE FUNCTION (10 questions) ============
  { id: 31, domain: 'executive', text: "I can walk into a room and completely forget why I went there.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -1, overfocused: 0, temporal: 2, limbic: 1, ringoffire: 1, anxious: 1 }},
  { id: 32, domain: 'executive', text: "I consistently underestimate how long tasks will take.", weights: { 'adhd-c': 3, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 1, temporal: 1, limbic: 1, ringoffire: 1, anxious: 0 }},
  { id: 33, domain: 'executive', text: "I find it very difficult to switch from one activity to another, even when I need to.", weights: { 'adhd-c': 0, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: -2, overfocused: 3, temporal: 0, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 34, domain: 'executive', text: "I often say things impulsively and then immediately wish I hadn't.", weights: { 'adhd-c': 3, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 0, temporal: 2, limbic: 0, ringoffire: 2, anxious: 0 }},
  { id: 35, domain: 'executive', text: "I know what I need to do but physically cannot make myself start.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 1, 'asd-2': 1, 'asd-3': 1, audhd: 3, neurotypical: -3, overfocused: 1, temporal: 1, limbic: 3, ringoffire: 1, anxious: 2 }},
  { id: 36, domain: 'executive', text: "My living or working space tends to have 'piles' of things I intend to organize eventually.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': -1, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: -1, temporal: 1, limbic: 2, ringoffire: 1, anxious: 0 }},
  { id: 37, domain: 'executive', text: "I struggle to prioritize tasks — everything feels equally urgent or equally unimportant.", weights: { 'adhd-c': 3, 'adhd-i': 3, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 1, 'asd-2': 1, 'asd-3': 0, audhd: 3, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 2, ringoffire: 2, anxious: 1 }},
  { id: 38, domain: 'executive', text: "I need things to be in a specific order or done a specific way, or I become very uncomfortable.", weights: { 'adhd-c': -1, 'adhd-i': 0, 'adhd-dyslexia': 0, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 2, neurotypical: -1, overfocused: 3, temporal: 0, limbic: 0, ringoffire: 1, anxious: 1 }},
  { id: 39, domain: 'executive', text: "I can manage multiple tasks and switch between them smoothly.", weights: { 'adhd-c': -1, 'adhd-i': -2, 'adhd-dyslexia': -2, dyslexia: 0, 'asd-1': -2, 'asd-2': -3, 'asd-3': -3, audhd: -3, neurotypical: 3, overfocused: -2, temporal: -1, limbic: -1, ringoffire: -1, anxious: -1 }},
  { id: 40, domain: 'executive', text: "Once I start something I'm interested in, I find it nearly impossible to stop even when I should.", weights: { 'adhd-c': 2, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 2, audhd: 3, neurotypical: -1, overfocused: 3, temporal: 1, limbic: 0, ringoffire: 2, anxious: 0 }},

  // ============ DOMAIN 5: READING & LANGUAGE PROCESSING (10 questions) ============
  { id: 41, domain: 'reading', text: "I often skip words or lines when reading without realizing it.", weights: { 'adhd-c': 2, 'adhd-i': 2, 'adhd-dyslexia': 3, dyslexia: 2, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 1, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 1, ringoffire: 1, anxious: 0 }},
  { id: 42, domain: 'reading', text: "I strongly prefer to receive information as audio or video rather than written text.", weights: { 'adhd-c': 1, 'adhd-i': 2, 'adhd-dyslexia': 3, dyslexia: 3, 'asd-1': -1, 'asd-2': 0, 'asd-3': 0, audhd: 1, neurotypical: -1, overfocused: 0, temporal: 1, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 43, domain: 'reading', text: "Spelling has always been difficult for me, even for common words.", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': 3, dyslexia: 3, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 0, neurotypical: -2, overfocused: 0, temporal: 0, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 44, domain: 'reading', text: "I read slowly but accurately — I need to decode each word carefully.", weights: { 'adhd-c': -1, 'adhd-i': 0, 'adhd-dyslexia': 1, dyslexia: 3, 'asd-1': 1, 'asd-2': 1, 'asd-3': 0, audhd: 0, neurotypical: -1, overfocused: 1, temporal: 0, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 45, domain: 'reading', text: "I often skim written material quickly and discover later that I missed key details.", weights: { 'adhd-c': 3, 'adhd-i': 2, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': -1, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -1, overfocused: -1, temporal: 1, limbic: 1, ringoffire: 2, anxious: 0 }},
  { id: 46, domain: 'reading', text: "I sometimes confuse similar-looking letters or numbers (b/d, p/q, 6/9).", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': 3, dyslexia: 3, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 0, neurotypical: -2, overfocused: 0, temporal: 0, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 47, domain: 'reading', text: "Writing emails or messages takes me much longer than it seems to take others.", weights: { 'adhd-c': 0, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 2, 'asd-1': 2, 'asd-2': 2, 'asd-3': 1, audhd: 1, neurotypical: -1, overfocused: 2, temporal: 1, limbic: 1, ringoffire: 0, anxious: 2 }},
  { id: 48, domain: 'reading', text: "I prefer written instructions over verbal ones.", weights: { 'adhd-c': -1, 'adhd-i': 0, 'adhd-dyslexia': -2, dyslexia: -2, 'asd-1': 3, 'asd-2': 2, 'asd-3': 1, audhd: 1, neurotypical: 0, overfocused: 1, temporal: -1, limbic: 0, ringoffire: 0, anxious: 1 }},
  { id: 49, domain: 'reading', text: "I can read and write fluently without significant difficulty.", weights: { 'adhd-c': 0, 'adhd-i': 0, 'adhd-dyslexia': -3, dyslexia: -3, 'asd-1': 1, 'asd-2': 0, 'asd-3': -1, audhd: 0, neurotypical: 2, overfocused: 0, temporal: 0, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 50, domain: 'reading', text: "I often have to re-read paragraphs multiple times before the meaning sinks in.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 2, 'asd-1': 0, 'asd-2': 0, 'asd-3': 0, audhd: 2, neurotypical: -2, overfocused: 1, temporal: 2, limbic: 2, ringoffire: 1, anxious: 2 }},

  // ============ DOMAIN 6: EMOTIONAL REGULATION & INNER WORLD (10 questions) ============
  { id: 51, domain: 'emotional', text: "Small criticisms can feel devastating to me, far beyond what the situation warrants.", weights: { 'adhd-c': 2, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 2, 'asd-2': 2, 'asd-3': 1, audhd: 3, neurotypical: -2, overfocused: 2, temporal: 2, limbic: 2, ringoffire: 3, anxious: 2 }},
  { id: 52, domain: 'emotional', text: "I often struggle to name what emotion I'm feeling in the moment.", weights: { 'adhd-c': 0, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: -2, overfocused: 0, temporal: 1, limbic: 1, ringoffire: 1, anxious: 0 }},
  { id: 53, domain: 'emotional', text: "I feel like I'm performing a version of myself in social or professional settings.", weights: { 'adhd-c': 1, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 1, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 0, limbic: 1, ringoffire: 1, anxious: 2 }},
  { id: 54, domain: 'emotional', text: "I cycle between periods of high productivity and periods where I can barely function.", weights: { 'adhd-c': 3, 'adhd-i': 3, 'adhd-dyslexia': 3, dyslexia: 0, 'asd-1': 1, 'asd-2': 2, 'asd-3': 1, audhd: 3, neurotypical: -2, overfocused: 0, temporal: 2, limbic: 3, ringoffire: 3, anxious: 1 }},
  { id: 55, domain: 'emotional', text: "I often feel exhausted in a way that sleep doesn't fix.", weights: { 'adhd-c': 1, 'adhd-i': 2, 'adhd-dyslexia': 2, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 1, limbic: 3, ringoffire: 2, anxious: 2 }},
  { id: 56, domain: 'emotional', text: "My emotions are intense and change rapidly — I can go from fine to furious or fine to devastated quickly.", weights: { 'adhd-c': 3, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 1, 'asd-2': 2, 'asd-3': 2, audhd: 3, neurotypical: -2, overfocused: 1, temporal: 3, limbic: 1, ringoffire: 3, anxious: 1 }},
  { id: 57, domain: 'emotional', text: "I process emotions on a delay — sometimes realizing hours or days later what I actually felt.", weights: { 'adhd-c': 0, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 2, neurotypical: -2, overfocused: 1, temporal: 0, limbic: 0, ringoffire: 0, anxious: 0 }},
  { id: 58, domain: 'emotional', text: "I have a strong sense of justice and become intensely upset when things feel unfair.", weights: { 'adhd-c': 2, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 2, audhd: 3, neurotypical: 0, overfocused: 2, temporal: 1, limbic: 0, ringoffire: 2, anxious: 0 }},
  { id: 59, domain: 'emotional', text: "I rarely feel overwhelmed by my emotions — I can generally manage them without difficulty.", weights: { 'adhd-c': -2, 'adhd-i': -2, 'adhd-dyslexia': -2, dyslexia: 0, 'asd-1': -1, 'asd-2': -2, 'asd-3': -2, audhd: -3, neurotypical: 3, overfocused: -1, temporal: -3, limbic: -2, ringoffire: -3, anxious: -2 }},
  { id: 60, domain: 'emotional', text: "I have deep, intense interests that feel central to my identity — not just hobbies but part of who I am.", weights: { 'adhd-c': 1, 'adhd-i': 1, 'adhd-dyslexia': 1, dyslexia: 0, 'asd-1': 3, 'asd-2': 3, 'asd-3': 3, audhd: 3, neurotypical: 0, overfocused: 2, temporal: 0, limbic: 0, ringoffire: 1, anxious: 0 }}
];

const DOMAIN_LABELS = {
  attention: { name: 'Attention & Focus', icon: 'fa-eye', color: '#F59E0B' },
  sensory: { name: 'Sensory Experience', icon: 'fa-hand-sparkles', color: '#EC4899' },
  social: { name: 'Social Communication', icon: 'fa-users', color: '#8B5CF6' },
  executive: { name: 'Executive Function', icon: 'fa-cogs', color: '#F97316' },
  reading: { name: 'Reading & Language', icon: 'fa-book-open', color: '#A78BFA' },
  emotional: { name: 'Emotional Regulation', icon: 'fa-heart', color: '#FB7185' }
};

const LIKERT_OPTIONS = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Rarely' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Often' },
  { value: 4, label: 'Almost Always' }
];

// ============================================================
// SCORING ENGINE — v3: Differentiation-Aware Scoring
//
// KEY INSIGHTS:
// 1. Neurotypical is the baseline when ND traits are low.
// 2. Uniform/flat responding (answering everything the same)
//    inflates ALL ND scores equally — this is not genuine
//    multi-profile neurodivergence, it's acquiescence bias.
// 3. The 6 reverse-coded questions (Q9,19,30,39,49,59)
//    describe neurotypical strengths. A genuinely ND person
//    answers these LOW and ND-trait questions HIGH. A flat
//    responder answers them all the same.
//
// APPROACH:
// 1. Score 13 ND profiles using positive weights
// 2. Compute a Differentiation Index from reverse-coded Qs
//    to measure whether the person discriminated between
//    ND-trait items and NT-strength items
// 3. Apply differentiation dampening: flat responders get
//    scores pushed toward zero; discriminating responders
//    get full credit
// 4. Compute NT baseline as the inverse of adjusted ND scores
// 5. Use clinical interpretation tiers for context
// ============================================================

const ND_PROFILES = NEUROTYPE_ORDER.filter(id => id !== 'neurotypical');

// The 6 reverse-coded questions (NT-strength items)
// These describe capabilities that are typically EASY for NT brains
// and HARD for ND brains. A genuine ND profile should rate these LOW.
const REVERSE_CODED_QS = [9, 19, 30, 39, 49, 59];

// Interpretation tiers
const INTERPRETATION_TIERS = [
  { maxScore: 30, label: 'No Significant Alignment', color: '#8B9DAF',
    desc: 'Your responses do not suggest significant alignment with this profile. This does not rule anything out — it means this particular screening did not detect strong patterns.' },
  { maxScore: 45, label: 'Mild Alignment', color: '#FBBF24',
    desc: 'Some trait patterns are present but not pronounced. This may reflect subclinical traits, situational factors, or overlap from another profile. Worth noting but not necessarily actionable alone.' },
  { maxScore: 65, label: 'Moderate Alignment', color: '#F97316',
    desc: 'Notable trait alignment that may be worth exploring with a qualified professional. Patterns at this level often reflect genuine neurological differences that affect daily function.' },
  { maxScore: 100, label: 'Strong Alignment', color: '#EF4444',
    desc: 'Strong trait alignment suggesting significant resonance with this profile. Consider professional evaluation if you haven\'t already. This level of alignment typically reflects patterns that meaningfully shape cognition, emotion, and behavior.' }
];

function getTier(score) {
  return INTERPRETATION_TIERS.find(t => score <= t.maxScore) || INTERPRETATION_TIERS[INTERPRETATION_TIERS.length - 1];
}

function calculateAssessmentResults(answers) {
  // ─── STEP 1: Raw ND Profile Scoring ───
  const scores = {};
  const maxScores = {};

  ND_PROFILES.forEach(nt => {
    scores[nt] = 0;
    maxScores[nt] = 0;
  });

  ASSESSMENT_QUESTIONS.forEach(q => {
    const answer = answers[q.id] !== undefined ? answers[q.id] : 0;
    ND_PROFILES.forEach(nt => {
      const weight = q.weights[nt] || 0;
      scores[nt] += answer * weight;
      if (weight > 0) {
        maxScores[nt] += 4 * weight;  // max answer (4) * positive weight
      }
    });
  });

  // Raw normalized scores (before differentiation adjustment)
  const rawNormalized = {};
  ND_PROFILES.forEach(nt => {
    if (maxScores[nt] > 0) {
      rawNormalized[nt] = Math.max(0, Math.min(100, Math.round((scores[nt] / maxScores[nt]) * 100)));
    } else {
      rawNormalized[nt] = 0;
    }
  });

  // ─── STEP 2: Differentiation Index ───
  // Measures how well the person discriminated between ND-trait
  // and NT-strength questions. Range: 0 (no discrimination) to 1 (perfect).
  //
  // Logic: Reverse-coded Qs describe NT strengths (e.g., "I can sustain
  // attention on routine tasks"). A genuine ND person rates these LOW
  // and rates ND-trait items HIGH. A flat responder rates them the same.
  //
  // We compute:
  //   avgReverse = average answer on reverse-coded Qs
  //   avgForward = average answer on all OTHER questions
  //   gap = avgForward - avgReverse (positive = good discrimination)
  //   diffIndex = gap normalized to 0-1 range

  const reverseAnswers = REVERSE_CODED_QS.map(id => answers[id] !== undefined ? answers[id] : 0);
  const forwardQIds = ASSESSMENT_QUESTIONS.filter(q => !REVERSE_CODED_QS.includes(q.id)).map(q => q.id);
  const forwardAnswers = forwardQIds.map(id => answers[id] !== undefined ? answers[id] : 0);

  const avgReverse = reverseAnswers.reduce((a, b) => a + b, 0) / reverseAnswers.length;
  const avgForward = forwardAnswers.reduce((a, b) => a + b, 0) / forwardAnswers.length;

  // Gap: how much higher forward (ND-trait) answers are vs reverse (NT-strength)
  // Perfect ND: avgForward=4, avgReverse=0 → gap=4
  // Flat responder: avgForward=2, avgReverse=2 → gap=0
  // Perfect NT: avgForward=0, avgReverse=4 → gap=-4
  const rawGap = avgForward - avgReverse;

  // Normalize gap to a 0-1 differentiation index
  // gap of 0 or negative = 0 differentiation (flat or NT-leaning)
  // gap of 2+ = full differentiation (strong discrimination)
  const diffIndex = Math.max(0, Math.min(1, rawGap / 2.0));

  // ─── STEP 3: Score Variance Check ───
  // Additional check: if all ND scores cluster tightly together,
  // that signals undifferentiated responding, not genuine multi-profile.
  const rawScoreValues = ND_PROFILES.map(nt => rawNormalized[nt]);
  const rawMean = rawScoreValues.reduce((a, b) => a + b, 0) / rawScoreValues.length;
  const rawVariance = rawScoreValues.reduce((a, b) => a + Math.pow(b - rawMean, 2), 0) / rawScoreValues.length;
  const rawStdDev = Math.sqrt(rawVariance);

  // Coefficient of variation: how spread out are the scores?
  // Low CV (< 0.15) = all profiles scored similarly = flat responding
  // High CV (> 0.4) = genuine differentiation between profiles
  const cv = rawMean > 0 ? rawStdDev / rawMean : 0;

  // Profile spread factor: boosts when scores are differentiated
  // Minimum 0.3 (always allow some score through), max 1.0
  const spreadFactor = Math.max(0.3, Math.min(1, cv / 0.35));

  // ─── STEP 4: Combined Dampening Factor ───
  // Combines differentiation index (reverse-coded Q check) with
  // profile spread factor (variance check) for robust flat-response detection.
  //
  // For flat responders: diffIndex ≈ 0, spreadFactor ≈ 0.3 → dampening ≈ 0.15
  // For discriminating responders: diffIndex ≈ 1, spreadFactor ≈ 1 → dampening ≈ 1.0
  // For mixed: partial dampening proportional to discrimination quality
  const dampening = Math.max(0.1, Math.min(1, (diffIndex * 0.65 + spreadFactor * 0.35)));

  // ─── STEP 5: Apply Dampening to ND Scores ───
  const normalized = {};
  ND_PROFILES.forEach(nt => {
    normalized[nt] = Math.max(0, Math.min(100, Math.round(rawNormalized[nt] * dampening)));
  });

  // ─── STEP 6: Compute Neurotypical Baseline ───
  const ndScores = ND_PROFILES.map(nt => normalized[nt]);
  const avgNdScore = ndScores.reduce((a, b) => a + b, 0) / ndScores.length;
  const maxNdScore = Math.max(...ndScores);
  
  // NT baseline: inverse of ND trait endorsement
  // Weighting: 40% average, 60% max ND score
  const ntBaseline = Math.max(0, Math.min(100, Math.round(
    100 - (avgNdScore * 0.4 + maxNdScore * 0.6)
  )));
  normalized['neurotypical'] = ntBaseline;

  // ─── STEP 7: Sort and Classify ───
  const sortedNd = ND_PROFILES
    .map(nt => ({ id: nt, score: normalized[nt], name: NEUROTYPES[nt].name, color: NEUROTYPES[nt].color }))
    .sort((a, b) => b.score - a.score);

  const topScore = sortedNd[0].score;
  const significantProfiles = sortedNd.filter(p => p.score >= 30);
  
  let profileSummary;
  if (topScore < 30) {
    profileSummary = 'neurotypical-predominant';
  } else if (topScore < 45) {
    profileSummary = 'mild-traits';
  } else if (significantProfiles.length >= 3 && significantProfiles[2].score >= 45) {
    profileSummary = 'multi-profile';
  } else {
    profileSummary = 'profile-aligned';
  }

  // Flag if flat responding was detected
  // Conditions: low ND-direction differentiation AND not NT-direction differentiated
  // AND raw scores were high enough that dampening actually mattered
  // Key: if rawGap is negative (NT-leaning), that's NOT flat responding
  const absoluteGap = Math.abs(avgForward - avgReverse);
  const flatResponseDetected = diffIndex < 0.25 && absoluteGap < 0.5 && rawMean > 10;

  return {
    normalized,
    sorted: sortedNd,
    raw: scores,
    ntBaseline,
    topScore,
    significantProfiles,
    profileSummary,
    // Diagnostic metadata for results display
    diffIndex: Math.round(diffIndex * 100),
    dampening: Math.round(dampening * 100),
    flatResponseDetected,
    rawTopScore: Math.max(...Object.values(rawNormalized))
  };
}
