import assert from "node:assert/strict";
import test from "node:test";
import { translateFullText } from "./translator.ts";

test("translates every paragraph instead of only the first paragraph", () => {
  const input =
    "Paragraph one about assignment.\n\nParagraph two about lecture notes.\n\nParagraph three about final exam.";
  const output = translateFullText(input);

  assert.equal(output.split("\n").length, input.split("\n").length);
  assert.ok(output.includes("段落 one 关于 作业"));
  assert.ok(output.includes("段落 two 关于 讲座笔记"));
  assert.ok(output.includes("段落 three 关于 期末考试"));
});

test("preserves bullet lists and numbered lists", () => {
  const input = "- Submit assignment\n- Contact student services\n\n1. Complete lecture notes\n2. Discuss policy";
  const output = translateFullText(input);

  assert.ok(output.includes("- 提交 作业"));
  assert.ok(output.includes("- 联系 学生服务中心"));
  assert.ok(output.includes("1. 完成 讲座笔记"));
  assert.ok(output.includes("2. 讨论 政策"));
});

test("preserves markdown table structure", () => {
  const input = "| Task | Weight | Due Date |\n| --- | --- | --- |\n| Assignment | 40% | Week 6 |";
  const output = translateFullText(input);

  assert.equal(output.split("\n").length, 3);
  assert.ok(output.includes("| 任务 | Weight | 截止日期 |"));
  assert.ok(output.includes("|---|---|---|"));
  assert.ok(output.includes("| 作业 | 40% | 周 6 |"));
});

test("handles long text without truncating", () => {
  const input = Array.from({ length: 1200 }, (_, index) => `Line ${index + 1}: assignment`).join(
    "\n"
  );
  const output = translateFullText(input);

  assert.equal(output.split("\n").length, 1200);
  assert.ok(output.includes("Line 1200: 作业"));
});
