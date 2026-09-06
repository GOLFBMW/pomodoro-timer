const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const phaseEl = document.getElementById("phase");
const timeEl = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");

let remaining = WORK_SECONDS;
let isBreak = false;
let intervalId = null;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function render() {
  timeEl.textContent = formatTime(remaining);
  phaseEl.textContent = isBreak ? "休憩中" : "作業中";
  document.body.classList.toggle("break", isBreak);
  startPauseBtn.textContent = intervalId ? "一時停止" : "開始";
}

function tick() {
  remaining -= 1;
  if (remaining < 0) {
    isBreak = !isBreak;
    remaining = isBreak ? BREAK_SECONDS : WORK_SECONDS;
  }
  render();
}

function start() {
  if (intervalId) return;
  intervalId = setInterval(tick, 1000);
  render();
}

function pause() {
  clearInterval(intervalId);
  intervalId = null;
  render();
}

function reset() {
  pause();
  isBreak = false;
  remaining = WORK_SECONDS;
  render();
}

startPauseBtn.addEventListener("click", () => {
  intervalId ? pause() : start();
});
resetBtn.addEventListener("click", reset);

render();
