const DAMAGE_LEVELS = ["Low", "Moderate", "Severe"];

export function simulateAssessmentFromSignal(signal) {
  const numericSignal = Number.isFinite(signal) ? Math.abs(Math.floor(signal)) : 0;
  const category = DAMAGE_LEVELS[numericSignal % DAMAGE_LEVELS.length];
  const confidence = 0.58 + (numericSignal % 38) / 100;
  return {
    category,
    confidence: Number(Math.min(confidence, 0.95).toFixed(2))
  };
}

export function compareAssessments(aiCategory, verifiedCategory) {
  return {
    aiCategory,
    verifiedCategory,
    changed: aiCategory !== verifiedCategory
  };
}

export function generateResponsePlan(verifiedCategory) {
  const base = [
    "Accessibility checks for roads and critical routes",
    "Resource allocation updates for response teams"
  ];

  if (verifiedCategory === "Severe") {
    return [
      "Emergency response deployment to highest-impact zones",
      "Urgent medical assistance mobilization",
      "Rapid shelter expansion for displaced residents",
      ...base
    ];
  }

  if (verifiedCategory === "Moderate") {
    return [
      "Targeted emergency response for priority sectors",
      "Medical assistance triage support",
      "Shelter readiness and capacity checks",
      ...base
    ];
  }

  return [
    "Localized response team dispatch for affected pockets",
    "Community medical outreach and monitoring",
    "Preparedness-level shelter coordination",
    ...base
  ];
}
