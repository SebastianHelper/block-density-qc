const SETTINGS = {
  factors: {
    // Steindichte = Steingewicht [kg] / (Steinhöhe [mm] * Faktor)
    I2: 0.031,
    I3: 0.046,
  },
  minDensity: {
    // Mindestdichte zum Bestehen
    I2: 1.34,
    I3: 1.28,
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

// Zustand (eine Nachkommastelle)
const state = { blockType: "I2", weight: 13.0, height: 21.5 };

function updateDisplays() {
  document.getElementById("weight-val").textContent = state.weight.toFixed(1).replace(".", ",");
  document.getElementById("height-val").textContent = state.height.toFixed(1).replace(".", ",");
}

function updateTypeUI() {
  document.querySelectorAll(".type-btn").forEach((btn) => {
    const isActive = btn.dataset.type === state.blockType;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-checked", isActive ? "true" : "false");
  });
}

function compute() {
  const blockType = state.blockType;
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
    `<div class="result-details">Dichte: ${density.toFixed(3).replace('.', ',')} · Minimum: ${min
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

document.querySelectorAll(".type-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.blockType = btn.dataset.type;
    updateTypeUI();
    compute();
  });
});

updateDisplays();
updateTypeUI();
compute();
