const fs = require("fs");
const path = require("path");

// Shared helpers
const getType = (val) => {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  if (typeof val === "object") return "object";
  return typeof val;
};

const buildSchema = (obj, level = 0) => {
  const indent = "  ".repeat(level);
  let schema = "";
  for (const key in obj) {
    const val = obj[key];
    const type = getType(val);
    if (type === "object" && val !== null && Object.keys(val).length > 0) {
      schema += `${indent}- **${key}** (object)\n`;
      schema += buildSchema(val, level + 1);
    } else if (type === "array" && val.length > 0 && typeof val[0] === "object") {
      schema += `${indent}- **${key}** (array of objects)\n`;
      schema += buildSchema(val[0], level + 1);
    } else if (type === "array") {
      schema += `${indent}- **${key}** (array of ${typeof val[0]})\n`;
    } else {
      schema += `${indent}- **${key}** (${type})\n`;
    }
  }
  return schema;
};

// Load data
const datasetPath = path.resolve(__dirname, "../data/patios.2025-04.json");
const patios = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));

// === SOURCES LOG ===
const sourcesPath = path.resolve(__dirname, "../docs/sources-log.md");
let sourcesMd = `# Patio Sources Log

This document records original source URLs or verification locations for each patio listing in the dataset.

| Venue Name | Source URL | Verified On |
|------------|------------|-------------|
`;

const today = new Date().toISOString().split("T")[0];

patios.forEach(patio => {
  const name = patio.Name?.replace(/\|/g, "\\|") || "Unnamed";
  const website = patio.Contact?.WebsiteURL?.trim();
  const insta = patio.Contact?.Instagram?.trim();
  const fallback = website || (insta?.startsWith("http") ? insta : `https://instagram.com/${insta?.replace(/^@/, "")}`) || "N/A";
  sourcesMd += `| ${name} | ${fallback} | ${today} |\n`;
});

sourcesMd += `
> ℹ️ For entries without a website, Instagram or other trusted source are listed. If none available, "N/A" is shown.
`;

fs.writeFileSync(sourcesPath, sourcesMd, "utf-8");
console.log("✅ sources-log.md updated");

// === DATA SCHEMA ===
const schemaPath = path.resolve(__dirname, "../docs/data-schema.md");
const schemaExample = patios[0];
let schemaMd = `# Dog-Friendly Patios Data Schema

This schema is automatically generated based on the latest JSON data in \`data/patios.2025-04.json\`. It reflects field groupings, nested objects, and inferred data types.

## Top-Level Fields
${buildSchema(schemaExample)}

> ⚠️ Note: This schema reflects the structure of the first entry. To enforce global validation rules, use a dedicated schema validator (e.g., JSON Schema).
`;

fs.writeFileSync(schemaPath, schemaMd, "utf-8");
console.log("✅ data-schema.md updated");
