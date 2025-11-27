#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const pdfPath = process.argv[2] || '../assets/events/2025_11_13 UG+workshop/1. Intro + Strengths and pitfalls of Embedded Security Testing Tools.pdf';

console.log(`Reading PDF: ${pdfPath}`);

const dataBuffer = fs.readFileSync(pdfPath);
pdfParse(dataBuffer).then(pdf => {
  console.log(`\n=== PDF Info ===`);
  console.log(`Total Pages: ${pdf.numpages}`);
  console.log(`Producer: ${pdf.info?.Producer || 'Unknown'}`);
  console.log(`Creator: ${pdf.info?.Creator || 'Unknown'}`);
  console.log(`\n=== Extracted Text (first 1000 chars) ===`);
  console.log(pdf.text.substring(0, 1000));
  console.log(`\n... (${pdf.text.length} total characters)`);
}).catch(err => {
  console.error('Error reading PDF:', err.message);
});
