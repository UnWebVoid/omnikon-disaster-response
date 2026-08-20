import {
  compareAssessments,
  generateResponsePlan,
  simulateAssessmentFromSignal
} from "./logic.js";

const imageInput = document.getElementById("imageInput");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const imagePreview = document.getElementById("imagePreview");
const aiResult = document.getElementById("aiResult");
const aiCategory = document.getElementById("aiCategory");
const aiConfidence = document.getElementById("aiConfidence");
const verifiedCategory = document.getElementById("verifiedCategory");
const verifyButton = document.getElementById("verifyButton");
const verificationResult = document.getElementById("verificationResult");
const diffAi = document.getElementById("diffAi");
const diffVerified = document.getElementById("diffVerified");
const diffStatus = document.getElementById("diffStatus");
const responsePlan = document.getElementById("responsePlan");

let currentAiCategory = "";

function renderResponsePlan(level) {
  const priorities = generateResponsePlan(level);
  responsePlan.innerHTML = "";
  priorities.forEach((priority) => {
    const li = document.createElement("li");
    li.textContent = priority;
    responsePlan.appendChild(li);
  });
}

function resetVerification() {
  verificationResult.classList.add("hidden");
  responsePlan.innerHTML = "";
}

imageInput.addEventListener("change", (event) => {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  imagePreview.src = objectUrl;
  imagePreview.onload = () => URL.revokeObjectURL(objectUrl);
  imagePreviewContainer.classList.remove("hidden");

  const assessment = simulateAssessmentFromSignal(file.size);
  currentAiCategory = assessment.category;

  aiCategory.textContent = assessment.category;
  aiConfidence.textContent = `${Math.round(assessment.confidence * 100)}%`;
  aiResult.classList.remove("hidden");

  verifiedCategory.disabled = false;
  verifyButton.disabled = false;
  verifiedCategory.value = assessment.category;
  resetVerification();
});

verifyButton.addEventListener("click", () => {
  if (!currentAiCategory || !verifiedCategory.value) {
    return;
  }

  const result = compareAssessments(currentAiCategory, verifiedCategory.value);
  diffAi.textContent = result.aiCategory;
  diffVerified.textContent = result.verifiedCategory;
  diffStatus.textContent = result.changed ? "Modified by reviewer" : "Confirmed by reviewer";

  verificationResult.classList.remove("hidden");
  renderResponsePlan(result.verifiedCategory);
});
