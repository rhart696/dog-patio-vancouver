// scripts/generate-data-schema.js

const fs = require("fs");
const path = require("path");

// File paths
const dataPath = path.resolve(__dirname, "../data/patios.2025-04.json");
const outputPath = path.resolve(__dirname, "../docs/data-schema.md");

// Load dataset
const rawData = fs.readFileSync(dataPath, "utf-8");
const entries = JSON.parse(rawData);

// Helper to get type of value
const getType = (val) => {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  if (typeof val === "object") return "object";
  return typeof val;
};

// Recursive schema builder
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

// Use first entry as schema sample
const schemaExample = entries[0];

// Build markdown content
let md = `# Dog-Friendly Patios Data Schema

This schema is automatically generated based on the latest JSON data in \`data/patios.2025-04.json\`. It reflects field groupings, nested objects, and inferred data types.

## Top-Level Fields
${buildSchema(schemaExample)}

> ⚠️ Note: This schema reflects the structure of the first entry. To enforce global validation rules, use a dedicated schema validator (e.g., JSON Schema).
`;

// Write the markdown file
fs.writeFileSync(outputPath, md, "utf-8");
console.log("✅ data-schema.md successfully generated.");
