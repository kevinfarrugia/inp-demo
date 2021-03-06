import { onINP } from "https://unpkg.com/web-vitals@3.0.0-beta.2/dist/web-vitals.js?module";

export function trackInteractions(callback) {
  const observer = new PerformanceObserver((list) => {
    for (let entry of list.getEntries()) {
      if (!entry.interactionId) continue;

      callback(entry);
    }
  });

  observer.observe({
    type: "event",
    durationThreshold: 16, // minumum by spec
    buffered: true,
  });
}

let startTime = performance.now();
let lastFrameTime = startTime;

function block(blockingTime = 0) {
  const blockingStart = performance.now();
  while (performance.now() < blockingStart + blockingTime) {
    // Block...
  }
}

export function periodicBlock(value) {
  const amount = value;

  block(Math.random() * amount);

  setTimeout(() => periodicBlock(value), Math.random() * 1000);
}

function initialize() {
  addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      lastFrameTime = performance.now();
    }
  });

  // Log INP any time its value changes.
  onINP(
    (entry) => {
      console.log(entry);
    },
    {
      reportAllChanges: true,
      durationThreshold: 0,
    }
  );
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
