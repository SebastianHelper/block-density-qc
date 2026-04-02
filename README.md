# Block Density QC

Simple one-page GitHub Pages app to calculate block density for quality control.

## Inputs
- Block type: `I2` or `I3`
- Weight in kilograms
- Height in centimeters

## Configure formula
Current `app.js` includes placeholder factor and limit values.

Update these in `SETTINGS`:
- `factors.I2`
- `factors.I3`
- `densityLimits.I2`
- `densityLimits.I3`

## Run locally
Open `index.html` directly in a browser.

## Deploy
GitHub Pages serves from root (`/`) on `main` branch.
