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
// SCORING ENGINE — Original v1 Simple Weighted Scoring
// Scores all profiles using NEUROTYPE_ORDER.
// Neurotypical is included in the scoring but the results page
// handles it separately — if all ND scores are low (<30%), a
// note tells the user they likely have a neurotypical brain.
// ============================================================

function calculateAssessmentResults(answers) {
  const scores = {};
  const maxScores = {};

  NEUROTYPE_ORDER.forEach(nt => {
    scores[nt] = 0;
    maxScores[nt] = 0;
  });

  ASSESSMENT_QUESTIONS.forEach(q => {
    const answer = answers[q.id] !== undefined ? answers[q.id] : 0;
    NEUROTYPE_ORDER.forEach(nt => {
      const weight = q.weights[nt] || 0;
      scores[nt] += answer * weight;
      if (weight > 0) {
        maxScores[nt] += 4 * weight;  // max answer (4) * positive weight
      }
    });
  });

  // Normalize to 0-100
  const normalized = {};
  NEUROTYPE_ORDER.forEach(nt => {
    if (maxScores[nt] > 0) {
      normalized[nt] = Math.max(0, Math.min(100, Math.round((scores[nt] / maxScores[nt]) * 100)));
    } else {
      normalized[nt] = 0;
    }
  });

  // Sort by score descending
  const sorted = NEUROTYPE_ORDER
    .map(nt => ({ id: nt, score: normalized[nt], name: NEUROTYPES[nt].name, color: NEUROTYPES[nt].color }))
    .sort((a, b) => b.score - a.score);

  return { normalized, sorted, raw: scores };
}
