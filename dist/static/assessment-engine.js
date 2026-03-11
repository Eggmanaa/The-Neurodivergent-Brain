// ============================================================
// THE NEURODIVERGENT BRAIN — Assessment Engine v2.1
// Complete scoring, validity, subscores, confidence
// Based on Neurotype Discovery Assessment Spec v2.1 Final
// ============================================================

// ── WEIGHT MATRIX ────────────────────────────────────────────
const WEIGHT_MATRIX = {
  A1_COMBINED: { A:0.18, B:0.22, C:0.12, D:0.15, E:0.05, F:0.03, G:0.04, H:0.00, I:0.00, J:0.04, K:0.00, L:0.08, M:0.09, N:0.00 },
  A2_INATTENT: { A:0.30, B:0.00, C:0.05, D:0.25, E:0.05, F:0.00, G:0.04, H:0.00, I:0.02, J:0.12, K:0.00, L:0.08, M:0.09, N:0.00 },
  A3_OVERFOC:  { A:0.12, B:0.04, C:0.33, D:0.20, E:0.08, F:0.00, G:0.05, H:0.08, I:0.00, J:0.02, K:0.01, L:0.03, M:0.04, N:0.00 },
  A4_TEMPORAL: { A:0.10, B:0.04, C:0.05, D:0.06, E:0.05, F:0.02, G:0.00, H:0.00, I:0.04, J:0.50, K:0.00, L:0.05, M:0.09, N:0.00 },
  A5_LIMBIC:   { A:0.13, B:0.00, C:0.02, D:0.08, E:0.42, F:0.00, G:0.08, H:0.00, I:0.00, J:0.12, K:0.00, L:0.06, M:0.09, N:0.00 },
  A6_RINGFIRE: { A:0.09, B:0.14, C:0.18, D:0.02, E:0.16, F:0.18, G:0.02, H:0.02, I:0.00, J:0.10, K:0.00, L:0.04, M:0.05, N:0.00 },
  A7_ANXIOUS:  { A:0.14, B:0.00, C:0.05, D:0.06, E:0.42, F:0.06, G:0.12, H:0.00, I:0.00, J:0.05, K:0.00, L:0.04, M:0.06, N:0.00 },
  A8_DXCOMBO:  { A:0.18, B:0.00, C:0.00, D:0.10, E:0.02, F:0.00, G:0.02, H:0.00, I:0.52, J:0.06, K:0.00, L:0.04, M:0.06, N:0.00 },
  B1_DYSLEXIA: { A:0.04, B:0.00, C:0.00, D:0.04, E:0.00, F:0.00, G:0.02, H:0.00, I:0.75, J:0.08, K:0.00, L:0.02, M:0.05, N:0.00 },
  C1_ASD_L1:   { A:0.04, B:0.00, C:0.06, D:0.06, E:0.06, F:0.10, G:0.28, H:0.18, I:0.00, J:0.00, K:0.15, L:0.03, M:0.04, N:0.00 },
  C2_ASD_L2:   { A:0.00, B:0.00, C:0.06, D:0.05, E:0.06, F:0.14, G:0.30, H:0.24, I:0.00, J:0.00, K:0.10, L:0.02, M:0.03, N:0.00 },
  C3_ASD_L3:   { A:0.00, B:0.00, C:0.03, D:0.03, E:0.05, F:0.20, G:0.30, H:0.28, I:0.00, J:0.04, K:0.04, L:0.01, M:0.02, N:0.00 },
  C4_ASD_COMB: { A:0.02, B:0.00, C:0.06, D:0.05, E:0.06, F:0.14, G:0.30, H:0.27, I:0.00, J:0.00, K:0.07, L:0.01, M:0.02, N:0.00 },
  D1_AUDHD:    { A:0.10, B:0.07, C:0.07, D:0.08, E:0.08, F:0.08, G:0.10, H:0.08, I:0.00, J:0.03, K:0.24, L:0.03, M:0.04, N:0.00 }
};

// ── PROFILE METADATA ─────────────────────────────────────────
const PROFILE_META = {
  A1_COMBINED: { name: 'ADHD Combined (Classic)',     tier: 1, group: 'ADHD Spectrum',    ntId: 'adhd-c',         radarLabel: 'Combined'    },
  A2_INATTENT: { name: 'ADHD Inattentive',            tier: 1, group: 'ADHD Spectrum',    ntId: 'adhd-i',         radarLabel: 'Inattentive' },
  A3_OVERFOC:  { name: 'ADHD Over-Focused',           tier: 3, group: 'ADHD Spectrum',    ntId: 'overfocused',    radarLabel: 'Over-Focused'},
  A4_TEMPORAL: { name: 'ADHD Temporal Lobe',          tier: 3, group: 'ADHD Spectrum',    ntId: 'temporal',       radarLabel: 'Temporal'    },
  A5_LIMBIC:   { name: 'ADHD Limbic',                 tier: 3, group: 'ADHD Spectrum',    ntId: 'limbic',         radarLabel: 'Limbic'      },
  A6_RINGFIRE: { name: 'ADHD Ring of Fire',           tier: 3, group: 'ADHD Spectrum',    ntId: 'ringoffire',     radarLabel: 'Ring of Fire'},
  A7_ANXIOUS:  { name: 'ADHD Anxious',                tier: 2, group: 'ADHD Spectrum',    ntId: 'anxious',        radarLabel: 'Anxious'     },
  A8_DXCOMBO:  { name: 'ADHD-I + Dyslexia',          tier: 2, group: 'ADHD Spectrum',    ntId: 'adhd-dyslexia',  radarLabel: 'ADHD+Dys'    },
  B1_DYSLEXIA: { name: 'Dyslexia (Standalone)',       tier: 1, group: 'Reading & Language',ntId: 'dyslexia',      radarLabel: 'Dyslexia'    },
  C1_ASD_L1:   { name: 'ASD Level 1 Estimate',        tier: 2, group: 'Autism Spectrum',  ntId: 'asd-1',          radarLabel: 'ASD L1'      },
  C2_ASD_L2:   { name: 'ASD Level 2 Estimate',        tier: 2, group: 'Autism Spectrum',  ntId: 'asd-2',          radarLabel: 'ASD L2'      },
  C3_ASD_L3:   { name: 'ASD Level 3 Estimate',        tier: 3, group: 'Autism Spectrum',  ntId: 'asd-3',          radarLabel: 'ASD L3'      },
  C4_ASD_COMB: { name: 'Autism Spectrum (Combined)',  tier: 1, group: 'Autism Spectrum',  ntId: 'asd-1',          radarLabel: 'ASD Combined'},
  D1_AUDHD:    { name: 'AuDHD',                       tier: 1, group: 'Combined Profile', ntId: 'audhd',          radarLabel: 'AuDHD'       }
};

// Ordered for radar display (clockwise from top)
const RADAR_ORDER = ['A1_COMBINED','A2_INATTENT','A3_OVERFOC','A4_TEMPORAL','A5_LIMBIC',
                     'A6_RINGFIRE','A7_ANXIOUS','A8_DXCOMBO','B1_DYSLEXIA',
                     'C1_ASD_L1','C2_ASD_L2','C3_ASD_L3','C4_ASD_COMB','D1_AUDHD'];

// ── HELPER FUNCTIONS ──────────────────────────────────────────
function clamp100(x) { return Math.max(0, Math.min(100, x)); }

function weightedScore(weights, norm) {
  return Object.entries(weights).reduce((sum, [dom, w]) => sum + w * (norm[dom] || 0), 0);
}

function softReq(score, center, width = 10) {
  return 1 / (1 + Math.exp(-(score - center) / width));
}

function softInverse(score, center, width = 10) {
  return 1 / (1 + Math.exp((score - center) / width));
}

function gm(values) {
  const eps = 1e-6;
  const logMean = values.reduce((a, v) => a + Math.log(Math.max(v, eps)), 0) / values.length;
  return Math.exp(logMean);
}

function classifyBand(s) {
  if (s <= 20) return 'Not Indicated';
  if (s <= 40) return 'Subclinical';
  if (s <= 60) return 'Moderate';
  if (s <= 78) return 'Elevated';
  return 'Very High';
}

const BAND_COLORS = {
  'Not Indicated': '#9CA3AF',
  'Subclinical':   '#A8D5BA',
  'Moderate':      '#F4D06F',
  'Elevated':      '#E8834A',
  'Very High':     '#C0392B'
};

// ── MAIN SCORING ENGINE ───────────────────────────────────────
function calculateNDAResults(responses, contextData = {}) {
  // ── STEP 0: Inverse scoring ──────────────────────────────
  const R = { ...responses };
  [23, 45, 46, 60, 106, 132].forEach(q => {
    if (R[`Q${q}`] !== undefined) R[`Q${q}`] = 4 - R[`Q${q}`];
  });

  // ── STEP 1: Validity ─────────────────────────────────────
  const v1 = R.V1 !== undefined ? R.V1 : 2;
  const v4 = R.V4 !== undefined ? R.V4 : 2;
  const v7 = R.V7 !== undefined ? R.V7 : 2;
  const v3 = R.V3 !== undefined ? R.V3 : 1;
  const v6 = R.V6 !== undefined ? R.V6 : 1;
  const v2 = R.V2 !== undefined ? R.V2 : 0;
  const v5 = R.V5 !== undefined ? R.V5 : 0;
  const v8 = R.V8 !== undefined ? R.V8 : 0;

  const INC = Math.abs((R.Q1||0) - v1) + Math.abs((R.Q51||0) - v4) + Math.abs((R.Q93||0) - v7);
  const CON = Math.max(0, (R.Q44||0) + v3 - 5) + Math.max(0, (R.Q83||0) + v6 - 5);
  const OVR = v2 + v5 + v8;

  // Acquiescence check
  const scoredItems = [];
  for (let i = 1; i <= 138; i++) {
    if (R[`Q${i}`] !== undefined) scoredItems.push(R[`Q${i}`]);
  }
  let stdDev = 1.0;
  if (scoredItems.length > 10) {
    const mean = scoredItems.reduce((a, b) => a + b, 0) / scoredItems.length;
    const variance = scoredItems.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / scoredItems.length;
    stdDev = Math.sqrt(variance);
  }
  const ACQ_FLAG = stdDev < 0.50;

  const startTime = R._startTime || 0;
  const endTime = R._endTime || Date.now();
  const SPEED_FLAG = (endTime - startTime) > 0 && ((endTime - startTime) / 1000) < 420;

  let validityStatus = 'VALID';
  let VF = 1.00;
  if (INC >= 6 || CON >= 4 || OVR >= 6 || SPEED_FLAG || ACQ_FLAG) {
    validityStatus = 'INVALID'; VF = 0.65;
  } else if (INC >= 4 || CON >= 2 || OVR >= 3) {
    validityStatus = 'CAUTION'; VF = 0.85;
  }

  // ── STEP 2: Raw domain scores ─────────────────────────────
  function rangeQs(start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }

  const domainDef = {
    A: { qs: rangeQs(1,14),    max: 56 },
    B: { qs: rangeQs(15,24),   max: 40 },
    C: { qs: rangeQs(25,34),   max: 40 },
    D: { qs: rangeQs(35,46),   max: 48 },
    E: { qs: rangeQs(47,60),   max: 56 },
    F: { qs: rangeQs(61,70),   max: 40 },
    G: { qs: rangeQs(71,82),   max: 48 },
    H: { qs: rangeQs(83,92),   max: 40 },
    I: { qs: rangeQs(93,106),  max: 56 },
    J: { qs: rangeQs(107,116), max: 40 },
    K: { qs: rangeQs(117,126), max: 40 },
    L: { qs: [128,131,134,135], max: 16 },
    M: { qs: [127,129,130,132,133], max: 20 },
    N: { qs: [136,137,138],    max: 12 }
  };

  const raw = {}, norm = {};
  for (const [dom, def] of Object.entries(domainDef)) {
    raw[dom] = def.qs.reduce((s, q) => s + (R[`Q${q}`] || 0), 0);
    norm[dom] = (raw[dom] / def.max) * 100;
  }

  // ── STEP 3: Subscores ─────────────────────────────────────
  function pct(qs, maxRaw) {
    return (qs.reduce((s, q) => s + (R[`Q${q}`] || 0), 0) / maxRaw) * 100;
  }

  const sub = {
    SADNESS:       pct([47,48,49,50], 16),
    ANXIETY:       pct([51,52,53,54,55], 20),
    DYSREG:        pct([56,57,58,59], 16),
    MASKING:       pct([78,119,122], 12),
    RIGIDITY:      pct([27,28,31,83,86,88,90], 28),
    PHONOLOGY:     pct([94,96,97,99,103], 20),
    IMPAIR:        pct([128,131,134,135], 16),
    DEVHIST:       pct([127,129,130,132,133], 20),
    TEMPORAL:      pct([107,108,109,110,111,112,115], 28),
    AUDHD_TENSION: pct([117,118,123,125], 16),
    STATELOAD:     pct([136,137,138], 12),
    MEDICAL:       (R.MR1||0)+(R.MR2||0)+(R.MR3||0)+(R.MR4||0)+(R.MR5||0)+(R.MR6||0)
  };

  // ── STEP 4: Weighted base scores ──────────────────────────
  const baseScore = {};
  for (const [profile, weights] of Object.entries(WEIGHT_MATRIX)) {
    baseScore[profile] = weightedScore(weights, norm);
  }

  // ── STEP 5: Support-factor damping ────────────────────────
  const requirements = {};
  requirements.A1_COMBINED = [softReq(norm.A,42), softReq(norm.B,35), softReq(norm.L,30), softReq(norm.M,40)];
  requirements.A2_INATTENT = [softReq(norm.A,45), softInverse(norm.B,32), softReq(norm.D,40), softReq(norm.L,30), softReq(norm.M,40)];
  requirements.A3_OVERFOC  = [softReq(norm.A,30), softReq(norm.C,48), softReq(sub.RIGIDITY,45), softReq(norm.L,25)];
  requirements.A4_TEMPORAL = [softReq(norm.A,28), softReq(norm.J,52), softReq(sub.TEMPORAL,48), softReq(norm.M,30)];
  requirements.A5_LIMBIC   = [softReq(norm.A,28), softReq(norm.E,45), softReq(sub.SADNESS,42), softReq(norm.M,30)];
  requirements.A6_RINGFIRE = [softReq(norm.A,25), softReq(norm.B,30), softReq(norm.F,40), softReq(sub.DYSREG,45)];
  requirements.A7_ANXIOUS  = [softReq(norm.A,28), softReq(norm.E,45), softReq(sub.ANXIETY,48), softReq(norm.L,25)];
  requirements.A8_DXCOMBO  = [softReq(norm.A,42), softReq(norm.I,55), softInverse(norm.B,38), softReq(sub.PHONOLOGY,45), softReq(norm.M,35)];
  requirements.B1_DYSLEXIA = [softReq(norm.I,62), softReq(sub.PHONOLOGY,52), softInverse(norm.A,42), softReq(norm.M,35)];
  requirements.C1_ASD_L1   = [softReq(norm.G,42), softReq(norm.H,38), softReq(norm.K,32), softReq(norm.M,35)];
  requirements.C2_ASD_L2   = [softReq(norm.G,55), softReq(norm.H,52), softReq(norm.F,40), softReq(norm.M,30)];
  requirements.C3_ASD_L3   = [softReq(norm.G,68), softReq(norm.H,65), softReq(norm.F,58), softReq(norm.M,25)];
  requirements.C4_ASD_COMB = [softReq(norm.G,45), softReq(norm.H,45), softReq(norm.M,35)];

  const supFactor = {}, supportedScore = {};
  for (const p of Object.keys(WEIGHT_MATRIX)) {
    if (p === 'D1_AUDHD') continue;
    supFactor[p] = 0.40 + 0.60 * gm(requirements[p]);
    supportedScore[p] = baseScore[p] * supFactor[p];
  }

  // D1 — depends on provisional ADHD/ASD scores
  const provMaxADHD = Math.max(
    supportedScore.A1_COMBINED, supportedScore.A2_INATTENT, supportedScore.A3_OVERFOC,
    supportedScore.A4_TEMPORAL, supportedScore.A5_LIMBIC, supportedScore.A6_RINGFIRE, supportedScore.A7_ANXIOUS
  );
  const provMaxASD = Math.max(
    supportedScore.C1_ASD_L1, supportedScore.C2_ASD_L2, supportedScore.C3_ASD_L3, supportedScore.C4_ASD_COMB
  );
  requirements.D1_AUDHD = [
    softReq(norm.A,35), softReq(norm.G,38), softReq(norm.H,38),
    softReq(norm.K,48), softReq(sub.AUDHD_TENSION,50),
    softReq(provMaxADHD,45), softReq(provMaxASD,40)
  ];
  supFactor.D1_AUDHD = 0.40 + 0.60 * gm(requirements.D1_AUDHD);
  supportedScore.D1_AUDHD = baseScore.D1_AUDHD * supFactor.D1_AUDHD;

  // ── STEP 6: Masking adjustment ────────────────────────────
  if (sub.MASKING >= 60) {
    const adj = sub.MASKING - 60;
    supportedScore.C1_ASD_L1   = clamp100(supportedScore.C1_ASD_L1   + adj * 0.15);
    supportedScore.C4_ASD_COMB = clamp100(supportedScore.C4_ASD_COMB + adj * 0.12);
    supportedScore.D1_AUDHD    = clamp100(supportedScore.D1_AUDHD    + adj * 0.10);
  }

  // ── STEP 7: Inhibitory rules ──────────────────────────────
  // Rule 1 — Combined vs Inattentive
  if (norm.B >= 38) supportedScore.A2_INATTENT = Math.min(supportedScore.A2_INATTENT, 42);
  if (norm.B <= 18) supportedScore.A1_COMBINED = Math.min(supportedScore.A1_COMBINED, 38);

  // Rule 2 — Dyslexia vs ADHD+Dys
  if (norm.A >= 45 && sub.PHONOLOGY >= 48) supportedScore.B1_DYSLEXIA = Math.min(supportedScore.B1_DYSLEXIA, 52);
  if (norm.A <= 35 && norm.I >= 60) supportedScore.A8_DXCOMBO = Math.min(supportedScore.A8_DXCOMBO, 46);

  // Rule 3 — Limbic vs Anxious
  if (sub.SADNESS > sub.ANXIETY + 18) supportedScore.A7_ANXIOUS = Math.min(supportedScore.A7_ANXIOUS, 52);
  if (sub.ANXIETY > sub.SADNESS + 18) supportedScore.A5_LIMBIC  = Math.min(supportedScore.A5_LIMBIC, 52);

  // Rule 4 — Ring of Fire vs Anxious
  if (norm.B >= 35) {
    supportedScore.A6_RINGFIRE = clamp100(supportedScore.A6_RINGFIRE * 1.08);
    supportedScore.A7_ANXIOUS  = Math.min(supportedScore.A7_ANXIOUS, 56);
  }
  if (norm.B <= 18 && norm.E >= 50) {
    supportedScore.A7_ANXIOUS  = clamp100(supportedScore.A7_ANXIOUS * 1.08);
    supportedScore.A6_RINGFIRE = Math.min(supportedScore.A6_RINGFIRE, 46);
  }

  // Rule 5 — Over-Focused vs ASD
  if (supportedScore.A3_OVERFOC > 55 && norm.G >= 48 && norm.H >= 48) {
    supportedScore.A3_OVERFOC = Math.min(supportedScore.A3_OVERFOC, 54);
  }

  // Rule 6 — ASD Level Exclusivity
  let levels = [
    { id: 'C1_ASD_L1', score: supportedScore.C1_ASD_L1, tier: 2 },
    { id: 'C2_ASD_L2', score: supportedScore.C2_ASD_L2, tier: 2 },
    { id: 'C3_ASD_L3', score: supportedScore.C3_ASD_L3, tier: 3 }
  ];
  levels.sort((a, b) => b.score - a.score);
  if (levels[0].score > 65) {
    if (levels.length > 1 && levels[1].score > levels[0].score - 8 && levels[1].tier < levels[0].tier) {
      [levels[0], levels[1]] = [levels[1], levels[0]];
    }
    for (let i = 1; i < levels.length; i++) {
      if (levels[i].score > 65) supportedScore[levels[i].id] = 65;
    }
  }

  // Rule 7 — AuDHD safety floor
  const maxADHD = Math.max(
    supportedScore.A1_COMBINED, supportedScore.A2_INATTENT, supportedScore.A3_OVERFOC,
    supportedScore.A4_TEMPORAL, supportedScore.A5_LIMBIC,  supportedScore.A6_RINGFIRE, supportedScore.A7_ANXIOUS
  );
  const maxASD = Math.max(
    supportedScore.C1_ASD_L1, supportedScore.C2_ASD_L2, supportedScore.C3_ASD_L3, supportedScore.C4_ASD_COMB
  );
  if (maxADHD < 40 || maxASD < 35) {
    supportedScore.D1_AUDHD = Math.min(supportedScore.D1_AUDHD, 36);
  }

  // Rule 8 — Temporal medical flag
  const temporalMedicalFlag = supportedScore.A4_TEMPORAL > 60 && sub.TEMPORAL >= 55;

  // ── STEP 8: Dev confirmation bonus ────────────────────────
  if (norm.M >= 65 && sub.DEVHIST >= 65) {
    for (const n of ['A1_COMBINED','A2_INATTENT','B1_DYSLEXIA','C4_ASD_COMB','D1_AUDHD']) {
      supportedScore[n] = clamp100(supportedScore[n] * 1.05);
    }
  }

  // ── STEP 9: Final clamp & bands ───────────────────────────
  const finalScores = {}, bands = {};
  for (const [n, score] of Object.entries(supportedScore)) {
    finalScores[n] = Math.max(0, Math.min(100, Math.round(score)));
    bands[n] = classifyBand(finalScores[n]);
  }

  // ── STEP 10: Confidence scoring ───────────────────────────
  const SLD = 1.0 - (Math.min(sub.STATELOAD, 80) / 200);
  let MU_asd = 1.0, MU_other = 1.0;
  if (sub.MASKING >= 60) {
    MU_asd   = 1.0 - ((sub.MASKING - 60) * 0.005);
    MU_other = 1.0 - ((sub.MASKING - 60) * 0.008);
  }
  let MFU_temporal = 1.0, MFU_other = 1.0;
  if (sub.MEDICAL >= 3) { MFU_temporal = 0.75; MFU_other = 0.90; }
  else if (sub.MEDICAL >= 1) { MFU_temporal = 0.85; MFU_other = 0.95; }

  const tierMap = {
    A1_COMBINED:1, A2_INATTENT:1, A3_OVERFOC:3, A4_TEMPORAL:3,
    A5_LIMBIC:3, A6_RINGFIRE:3, A7_ANXIOUS:2, A8_DXCOMBO:2,
    B1_DYSLEXIA:1, C1_ASD_L1:2, C2_ASD_L2:2, C3_ASD_L3:3,
    C4_ASD_COMB:1, D1_AUDHD:1
  };

  const confidence = {}, confidenceLabel = {};
  for (const [profile, tier] of Object.entries(tierMap)) {
    const isASD = ['C1_ASD_L1','C2_ASD_L2','C3_ASD_L3','C4_ASD_COMB','D1_AUDHD'].includes(profile);
    const isTemporal = ['A4_TEMPORAL','A6_RINGFIRE'].includes(profile);
    const MU  = isASD ? MU_asd : MU_other;
    const MFU = isTemporal ? MFU_temporal : MFU_other;
    const TCF = tier === 1 ? 1.00 : tier === 2 ? 0.90 : 0.78;
    const sf  = supFactor[profile] || 0.5;
    const raw = VF * sf * SLD * MU * MFU * TCF * 100;
    confidence[profile] = Math.max(0, Math.min(100, Math.round(raw)));
    if      (confidence[profile] >= 80) confidenceLabel[profile] = 'High Confidence';
    else if (confidence[profile] >= 60) confidenceLabel[profile] = 'Moderate Confidence';
    else if (confidence[profile] >= 40) confidenceLabel[profile] = 'Low Confidence';
    else                                confidenceLabel[profile] = 'Very Low Confidence';
  }

  // Reading confound
  let readingConfound = false, readingConfoundNote = '';
  const ctx = contextData || {};
  if (ctx.strongestReadingLanguage && ctx.strongestReadingLanguage !== 'English') {
    readingConfound = true;
    readingConfoundNote = 'Your strongest reading language differs from the assessment language. Reading/language scores may reflect language background.';
  }
  if (ctx.yearsFormalSchoolingInAssessmentLanguage < 6) {
    readingConfound = true;
    readingConfoundNote += ' Limited formal schooling in English may affect reading scores.';
  }
  if (ctx.interruptedSchooling) {
    readingConfound = true;
    readingConfoundNote += ' Interrupted schooling can produce reading patterns that resemble dyslexia.';
  }
  if (ctx.historyHearingVisionProblemsAffectingReading) {
    readingConfound = true;
    readingConfoundNote += ' A history of hearing or vision problems may affect reading-related scores.';
  }
  if (readingConfound) {
    confidence.B1_DYSLEXIA = Math.round((confidence.B1_DYSLEXIA || 50) * 0.70);
    confidence.A8_DXCOMBO  = Math.round((confidence.A8_DXCOMBO  || 50) * 0.75);
  }

  // ── STEP 11: Flags ────────────────────────────────────────
  const flags = {
    temporalMedicalFlag,
    medicalReviewFlag:    sub.MEDICAL >= 2,
    devHistoryStrong:     norm.M >= 65,
    maskingHigh:          sub.MASKING >= 60,
    stateLoadHigh:        sub.STATELOAD >= 65,
    acquiescenceFlag:     ACQ_FLAG,
    readingConfound,
    v8ClinicalConcern:    v8 >= 3,
    familyHistoryPresent: ctx.hasFamilyHistory === true
  };

  // ── STEP 12: Top profiles ─────────────────────────────────
  const topProfiles = Object.entries(finalScores)
    .map(([id, score]) => ({
      id, score,
      name:           PROFILE_META[id].name,
      band:           bands[id],
      bandColor:      BAND_COLORS[bands[id]],
      tier:           tierMap[id],
      group:          PROFILE_META[id].group,
      ntId:           PROFILE_META[id].ntId,
      confidence:     confidence[id],
      confidenceLabel:confidenceLabel[id],
      supportFactor:  supFactor[id] || 0
    }))
    .sort((a, b) => b.score - a.score);

  // ── NARRATIVE SUMMARY ─────────────────────────────────────
  const top3 = topProfiles.slice(0, 3);
  const primary = top3[0], secondary = top3[1], tertiary = top3[2];
  const tierLang = {
    1: `Your responses show a strong pattern consistent with`,
    2: `Your responses suggest a notable tendency toward`,
    3: `Your responses indicate a pattern that may resemble`
  };
  let narrative = `${tierLang[primary.tier]} <strong>${primary.name}</strong>. `;
  narrative += `This result carries ${primary.confidenceLabel.toLowerCase()}. `;
  if (secondary && secondary.score > 50) {
    narrative += `There is also a meaningful signal for <strong>${secondary.name}</strong>, which ${secondary.score > 60 ? 'is notably elevated' : 'warrants attention'}. `;
  }
  if (flags.maskingHigh) {
    narrative += `Your responses suggest you invest significant energy masking or camouflaging traits in social settings, which can suppress how these patterns appear on self-report. `;
  }
  if (flags.stateLoadHigh) {
    narrative += `Current stress or burnout may be amplifying some scores — consider this when interpreting your results. `;
  }
  if (flags.temporalMedicalFlag || flags.medicalReviewFlag) {
    narrative += `Some patterns warrant a conversation with a medical professional about neurological factors. `;
  }
  narrative += `These results are best understood as a starting point for self-reflection and professional conversation, not as a diagnosis.`;

  return {
    validityStatus,
    validityDetails: { INC, CON, OVR, SPEED_FLAG, ACQ_FLAG },
    domainRaw: raw,
    domainNorm: norm,
    subscores: sub,
    finalScores,
    bands,
    bandColors: Object.fromEntries(Object.keys(finalScores).map(k => [k, BAND_COLORS[bands[k]]])),
    confidence,
    confidenceLabel,
    supportFactors: supFactor,
    flags,
    topProfiles,
    narrativeSummary: narrative,
    readingConfoundNote,
    VF
  };
}
