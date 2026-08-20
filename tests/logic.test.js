import test from "node:test";
import assert from "node:assert/strict";
import {
  compareAssessments,
  generateResponsePlan,
  simulateAssessmentFromSignal
} from "../src/logic.js";

test("simulateAssessmentFromSignal returns valid category and bounded confidence", () => {
  const result = simulateAssessmentFromSignal(12345);
  assert.ok(["Low", "Moderate", "Severe"].includes(result.category));
  assert.ok(result.confidence >= 0.58);
  assert.ok(result.confidence <= 0.95);
});

test("compareAssessments marks changed result", () => {
  const result = compareAssessments("Moderate", "Severe");
  assert.equal(result.changed, true);
});

test("generateResponsePlan returns severe priority recommendations", () => {
  const plan = generateResponsePlan("Severe");
  assert.ok(plan.some((entry) => entry.includes("Emergency response")));
  assert.ok(plan.some((entry) => entry.includes("medical assistance")));
  assert.ok(plan.some((entry) => entry.includes("shelter")));
});
