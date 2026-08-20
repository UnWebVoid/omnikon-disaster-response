import {
  compareAssessments,
  generateResponsePlan,
  simulateAssessmentFromSignal
} from "./logic.js";

const imageInput = document.getElementById("imageInput");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const imagePreviewCanvas = document.getElementById("imagePreviewCanvas");
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
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
]);

let currentAiCategory = "";

function clearNode(node) {
  node.replaceChildren();
}

function renderResponsePlan(level) {
  const priorities = generateResponsePlan(level);
  clearNode(responsePlan);
  priorities.forEach((priority) => {
    const li = document.createElement("li");
    li.textContent = priority;
    responsePlan.appendChild(li);
  });
}

function resetVerification() {
  verificationResult.classList.add("hidden");
  clearNode(responsePlan);
}

imageInput.addEventListener("change", (event) => {
  void handleImageChange(event);
});

async function handleImageChange(event) {
  const [file] = event.target.files || [];
  if (!file || !ALLOWED_IMAGE_TYPES.has(file.type)) {
    return;
  }

  const canvasContext = imagePreviewCanvas.getContext("2d");
  if (!canvasContext) {
    return;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxWidth = 640;
    const scale = Math.min(1, maxWidth / bitmap.width);
    imagePreviewCanvas.width = Math.max(1, Math.round(bitmap.width * scale));
    imagePreviewCanvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvasContext.clearRect(0, 0, imagePreviewCanvas.width, imagePreviewCanvas.height);
    canvasContext.drawImage(bitmap, 0, 0, imagePreviewCanvas.width, imagePreviewCanvas.height);
    bitmap.close();
    imagePreviewContainer.classList.remove("hidden");
  } catch {
    return;
  }

  const assessment = simulateAssessmentFromSignal(file.size);
  currentAiCategory = assessment.category;

  aiCategory.textContent = assessment.category;
  aiConfidence.textContent = `${Math.round(assessment.confidence * 100)}%`;
  aiResult.classList.remove("hidden");

  verifiedCategory.disabled = false;
  verifyButton.disabled = false;
  verifiedCategory.value = assessment.category;
  resetVerification();
}

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
