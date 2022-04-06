/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  "extensionsToTreatAsEsm": [
    ".ts"
  ],
  "globals": {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "useESM": true
    }
  },
  "preset": "ts-jest/presets/default-esm",
};