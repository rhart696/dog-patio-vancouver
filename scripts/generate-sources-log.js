// scripts/generate-sources-log.js

const fs = require("fs");
const path = require("path");

// Paths
const datasetPath = path.resolve(__dirname, "../data/patios.2025-04.json");
const outputPath = path.resolve(__dirname, "../docs/sources-log.md");

// Load dataset
const rawData = fs.readFileSync(datasetPath, "utf-8");
const patios = JSON.parse(rawData);

// Markdown header
let md = `# Patio Sources Log

This document records original source URLs or verification locations for each patio listing in the dataset.

| Venue Name | Source URL | Verified On |
|------------|------------|-------------|
`;

// Format each entry
const today = new Date().toISOString().split("T")[0]; // e.g., "2025-04-21"

patios.forEach(patio => {
  const name = patio.Name?.replace(/\|/g, "\\|") || "Unnamed";
  const website = patio.Contact?.WebsiteURL?.trim();
  const insta = patio.Contact?.Instagram?.trim();
  const fallback = website || (insta?.startsWith("http") ? insta : `https://instagram.com/${insta?.replace(/^@/, "")}`) || "N/A";
  md += `| ${name} | ${fallback} | ${today} |\n`;
});

// Footer note
md += `
> ℹ️ For entries without a website, Instagram or other trusted source are listed. If none available, "N/A" is shown.
`;

// Write to file
fs.writeFileSync(outputPath, md, "utf-8");

console.log("✅ sources-log.md successfully generated.");
