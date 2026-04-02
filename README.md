# Block Density QC

Simple one-page GitHub Pages app to calculate block density for quality control.

## Inputs
- Block type: `I2` or `I3`
- Weight in kilograms
- Height in centimeters (converted to mm internally)

## Formula
`Steindichte = Steingewicht [kg] / (Steinhöhe [mm] * Faktor)`

Factors:
- I2: `0.031`
- I3: `0.046`

Minimum density to pass:
- I2: `> 1.387`
- I3: `> 1.358`

## Controls
Weight and height are adjusted with **−/+** buttons (0.1 step, one decimal place) — no keyboard entry required. The result updates instantly on every change. Designed mobile-first; fits on a single phone screen.

## Run locally
Open `index.html` directly in a browser.

## Deploy
GitHub Pages serves from root (`/`) on `main` branch.
