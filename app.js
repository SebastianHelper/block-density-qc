const SETTINGS = {
  factors: {
    // Steindichte = Steingewicht [kg] / (Steinhöhe [mm] * Faktor)
    I2: 0.031,
    I3: 0.046,
  },
  minDensity: {
    // Mindestdichte zum Bestehen
    I2: 1.387,
    I3: 1.358,
  },
};

function computeDensity(weightKg, heightCm, blockType) {
  const factor = SETTINGS.factors[blockType];
  const heightMm = heightCm * 10;
  return weightKg / (heightMm * factor);
}

function classify(density, blockType) {
  const min = SETTINGS.minDensity[blockType];
  return density > min ? "PASS" : "FAIL";
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

  const density = computeDensity(weight, height, blockType);
  const status = classify(density, blockType);
  const min = SETTINGS.minDensity[blockType];

  result.className = `result ${status === "PASS" ? "pass" : "fail"}`;
  result.innerHTML = `<strong>Density:</strong> ${density.toFixed(3)}<br /><strong>Minimum:</strong> ${min.toFixed(3)}<br /><strong>QC:</strong> ${status}`;
});
