const SETTINGS = {
  // Replace these placeholders with exact values from the QC sheet.
  factors: {
    I2: null,
    I3: null,
  },
  densityLimits: {
    I2: { min: null, max: null },
    I3: { min: null, max: null },
  },
};

function hasValidConfigFor(blockType) {
  const factor = SETTINGS.factors[blockType];
  const limits = SETTINGS.densityLimits[blockType];

  return (
    Number.isFinite(factor) &&
    Number.isFinite(limits?.min) &&
    Number.isFinite(limits?.max) &&
    limits.min < limits.max
  );
}

function computeDensity(weightKg, heightCm, blockType) {
  const factor = SETTINGS.factors[blockType];

  // Placeholder formula until values from QC sheet are locked:
  // density = (weight / height) * factor
  return (weightKg / heightCm) * factor;
}

function classify(density, blockType) {
  const { min, max } = SETTINGS.densityLimits[blockType];
  return density >= min && density <= max ? "PASS" : "FAIL";
}

document.getElementById("qc-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const blockType = document.getElementById("blockType").value;
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);
  const result = document.getElementById("result");

  if (!Number.isFinite(weight) || !Number.isFinite(height) || height <= 0) {
    result.textContent = "Please enter valid positive numbers.";
    result.className = "result fail";
    return;
  }

  if (!hasValidConfigFor(blockType)) {
    result.className = "result fail";
    result.innerHTML =
      "<strong>Configuration missing:</strong> QC constants for this block type are not set yet.";
    return;
  }

  const density = computeDensity(weight, height, blockType);
  const status = classify(density, blockType);

  result.className = `result ${status === "PASS" ? "pass" : "fail"}`;
  result.innerHTML = `<strong>Density:</strong> ${density.toFixed(3)}<br /><strong>QC:</strong> ${status}`;
});
