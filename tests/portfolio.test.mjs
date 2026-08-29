import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the portfolio renders all five semantic chapters", async () => {
  const app = await read("src/App.jsx");
  const expectedSections = ["Threshold", "About", "Skills", "Works", "Afterlight"];

  expectedSections.forEach((section) => {
    assert.match(app, new RegExp(`<${section} \\/>`));
  });
});

test("the supplied identity and contact details are present", async () => {
  const data = await read("src/data/portfolio.js");

  assert.match(data, /Pocholo F\. Leano/);
  assert.match(data, /Pocholo_leano@sjp2cd\.edu\.ph/);
  assert.match(data, /St\. John Paul of Davao City/);
  assert.match(data, /2nd Year BSIT/);
});

test("all cinematic runtime images exist", async () => {
  const images = [
    "public/assets/threshold-garden.webp",
    "public/assets/still-garden.webp",
    "public/assets/afterlight-workshop.webp",
    "public/assets/pocholo-portrait.webp",
  ];

  for (const image of images) {
    const details = await stat(new URL(`../${image}`, import.meta.url));
    assert.ok(details.size > 10_000, `${image} should contain a real image asset`);
  }
});

test("JSX contains no inline style attributes", async () => {
  const files = [
    "src/App.jsx",
    "src/components/AtmosphereCanvas.jsx",
    "src/components/CustomCursor.jsx",
    "src/components/Header.jsx",
    "src/components/MotionControl.jsx",
    "src/components/PortraitCard.jsx",
    "src/components/WordReveal.jsx",
    "src/sections/Threshold.jsx",
    "src/sections/About.jsx",
    "src/sections/Skills.jsx",
    "src/sections/Works.jsx",
    "src/sections/Afterlight.jsx",
  ];

  for (const file of files) {
    const source = await read(file);
    assert.doesNotMatch(source, /style\s*=\s*\{/);
  }
});

test("reduced motion and motion controls are implemented", async () => {
  const app = await read("src/App.jsx");
  const css = await read("src/styles.css");

  assert.match(app, /useReducedMotion/);
  assert.match(app, /MotionControl/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
