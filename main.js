import { onINP } from "https://unpkg.com/web-vitals@3.0.0-beta.2/dist/web-vitals.js?module";

const FRAME = 16; // Millseconds per frame at 60hz

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

let lastClockTime = performance.now();
function time() {
  return performance.now() - lastClockTime;
}

let isClockEnabled = true;
let startTime = performance.now();
let lastFrameTime = startTime;

function block(blockingTime = 0) {
  const blockingStart = performance.now();
  while (performance.now() < blockingStart + blockingTime) {
    // Block...
  }
}

function periodicBlock() {
  const amount = 3000;

  block(Math.random() * amount);

  setTimeout(periodicBlock, Math.random() * 1000);
}

function initialize() {
  addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      lastFrameTime = performance.now();
    }
  });

  periodicBlock();

  // Log INP any time its value changes.
  onINP(console.log, {
    reportAllChanges: true,
    durationThreshold: 0,
  });
}

if (
  "PerformanceEventTiming" in self &&
  "interactionId" in PerformanceEventTiming.prototype
) {
  initialize();
} else {
  document.body.classList.add("unsupported");
  alert(
    [
      `Oops, this brower does not fully support the Event Timing API,`,
      `which is required for this demo.`,
    ].join(" ")
  );
}
