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
  return density > min ? "BESTANDEN" : "NICHT BESTANDEN";
}

// Stepper state (eine Nachkommastelle)
const state = { weight: 13.0, height: 21.5 };

function updateDisplays() {
  document.getElementById("weight-val").textContent = state.weight.toFixed(1);
  document.getElementById("height-val").textContent = state.height.toFixed(1);
}

function compute() {
  const blockType = document.getElementById("blockType").value;
  const result = document.getElementById("result");

  if (!SETTINGS.factors[blockType] || !SETTINGS.minDensity[blockType]) {
    result.textContent = `Unbekannter Steintyp: ${blockType}. Bitte I2 oder I3 wählen.`;
    result.className = "result fail";
    return;
  }

  const density = computeDensity(state.weight, state.height, blockType);
  const status = classify(density, blockType);
  const min = SETTINGS.minDensity[blockType];

  result.className = `result ${status === "BESTANDEN" ? "pass" : "fail"}`;
  result.innerHTML =
    `<div class="status-badge">${status}</div>` +
    `<div class="result-details">Dichte: ${density.toFixed(3).replace('.', ',')} &bull; Minimum: ${min
      .toFixed(3)
      .replace('.', ',')}</div>`;
}

document.querySelectorAll(".step-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const field = btn.dataset.field;
    const dir = Number(btn.dataset.dir);
    state[field] = Math.round((state[field] + dir * 0.1) * 10) / 10;
    if (state[field] < 0.1) state[field] = 0.1;
    updateDisplays();
    compute();
  });
});

document.getElementById("blockType").addEventListener("change", compute);

// Initial render
updateDisplays();
compute();
