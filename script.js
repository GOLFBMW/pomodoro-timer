const phaseEl = document.getElementById("phase");
const timeEl = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");

let remaining = WORK_SECONDS;
let isBreak = false;
let intervalId = null;

function render() {
  timeEl.textContent = formatTime(remaining);
  phaseEl.textContent = isBreak ? "休憩中" : "作業中";
  document.body.classList.toggle("break", isBreak);
  startPauseBtn.textContent = intervalId ? "一時停止" : "開始";
}

function tick() {
  ({ remaining, isBreak } = nextState({ remaining, isBreak }));
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
