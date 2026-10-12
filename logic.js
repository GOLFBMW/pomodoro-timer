const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function nextState({ remaining, isBreak }) {
  const next = remaining - 1;
  if (next <= 0) {
    const nextIsBreak = !isBreak;
    return { remaining: nextIsBreak ? BREAK_SECONDS : WORK_SECONDS, isBreak: nextIsBreak };
  }
  return { remaining: next, isBreak };
}

// Node（テスト）からも読み込めるようにする
if (typeof module !== "undefined") {
  module.exports = { WORK_SECONDS, BREAK_SECONDS, formatTime, nextState };
}
