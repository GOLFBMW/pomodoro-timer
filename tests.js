const test = require("node:test");
const assert = require("node:assert/strict");
const { WORK_SECONDS, BREAK_SECONDS, formatTime, nextState } = require("./logic.js");

test("formatTime: 25分は 25:00", () => {
  assert.equal(formatTime(WORK_SECONDS), "25:00");
});

test("formatTime: 0秒は 00:00", () => {
  assert.equal(formatTime(0), "00:00");
});

test("formatTime: 秒・分をゼロ埋めする", () => {
  assert.equal(formatTime(65), "01:05");
  assert.equal(formatTime(9), "00:09");
});

test("nextState: 通常は1秒減る", () => {
  assert.deepEqual(nextState({ remaining: 100, isBreak: false }), { remaining: 99, isBreak: false });
});

test("nextState: 残り2秒なら残り1秒になる（まだ切り替わらない）", () => {
  assert.deepEqual(nextState({ remaining: 2, isBreak: false }), { remaining: 1, isBreak: false });
});

test("nextState: 作業の残り1秒の次で休憩に切り替わる（00:00 は表示しない）", () => {
  assert.deepEqual(nextState({ remaining: 1, isBreak: false }), { remaining: BREAK_SECONDS, isBreak: true });
});

test("nextState: 休憩の残り1秒の次で作業に戻る", () => {
  assert.deepEqual(nextState({ remaining: 1, isBreak: true }), { remaining: WORK_SECONDS, isBreak: false });
});

test("nextState: 作業はちょうど25分（1500回の更新）で終わる", () => {
  let state = { remaining: WORK_SECONDS, isBreak: false };
  let ticks = 0;
  do {
    state = nextState(state);
    ticks += 1;
  } while (!state.isBreak);
  assert.equal(ticks, WORK_SECONDS);
});

test("nextState: 休憩はちょうど5分（300回の更新）で終わる", () => {
  let state = { remaining: BREAK_SECONDS, isBreak: true };
  let ticks = 0;
  do {
    state = nextState(state);
    ticks += 1;
  } while (state.isBreak);
  assert.equal(ticks, BREAK_SECONDS);
});

test("nextState: 元の状態を書き換えない", () => {
  const state = { remaining: 10, isBreak: false };
  nextState(state);
  assert.deepEqual(state, { remaining: 10, isBreak: false });
});
