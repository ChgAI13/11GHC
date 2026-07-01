const phraseTranslations: Record<string, string> = {
  "dear student": "亲爱的同学",
  "kind regards": "此致",
  "course coordinator": "课程协调员",
  "student services": "学生服务中心",
  "assignment extension": "作业延期",
  "extension request": "延期申请",
  "has been approved": "已经被批准",
  "please submit": "请提交",
  "revised report": "修改后的报告",
  "online portal": "在线系统",
  "further assistance": "进一步帮助",
  "before the deadline": "在截止日期之前",
  "lecture notes": "讲座笔记",
  "learning objectives": "学习目标",
  "assessment task": "评估任务",
  "word limit": "字数限制",
  "due date": "截止日期",
  "group presentation": "小组展示",
  "final exam": "期末考试",
  "tutorial participation": "辅导课参与",
  "economic growth": "经济增长",
  "opportunity cost": "机会成本",
  "supply and demand": "供给与需求",
  "market equilibrium": "市场均衡",
  "monetary policy": "货币政策",
  "fiscal policy": "财政政策"
};

const wordTranslations: Record<string, string> = {
  a: "一个",
  about: "关于",
  academic: "学术",
  according: "根据",
  action: "行动",
  additional: "额外",
  after: "之后",
  all: "所有",
  analysis: "分析",
  and: "和",
  answer: "回答",
  approved: "已批准",
  are: "是",
  assessment: "评估",
  assignment: "作业",
  assistance: "帮助",
  before: "之前",
  by: "在",
  class: "课堂",
  complete: "完成",
  contact: "联系",
  content: "内容",
  course: "课程",
  data: "数据",
  deadline: "截止日期",
  demand: "需求",
  discuss: "讨论",
  due: "截止",
  economics: "经济学",
  email: "邮件",
  exam: "考试",
  example: "例子",
  final: "最终",
  for: "为了",
  friday: "星期五",
  from: "来自",
  further: "进一步",
  grade: "成绩",
  group: "小组",
  has: "已经",
  if: "如果",
  important: "重要",
  in: "在",
  include: "包括",
  is: "是",
  issue: "问题",
  lecture: "讲座",
  list: "列表",
  macroeconomics: "宏观经济学",
  market: "市场",
  microeconomics: "微观经济学",
  need: "需要",
  notes: "笔记",
  of: "的",
  on: "在",
  or: "或",
  paragraph: "段落",
  participation: "参与",
  please: "请",
  policy: "政策",
  portal: "系统",
  presentation: "展示",
  report: "报告",
  request: "申请",
  revised: "修改后的",
  services: "服务",
  should: "应该",
  student: "学生",
  submit: "提交",
  summary: "总结",
  supply: "供给",
  table: "表格",
  task: "任务",
  the: "这个",
  this: "这",
  to: "到",
  tutorial: "辅导课",
  university: "大学",
  week: "周",
  will: "将",
  with: "和",
  work: "工作",
  you: "你",
  your: "你的"
};

function translateToken(token: string) {
  const lowerToken = token.toLowerCase();
  return wordTranslations[lowerToken] ?? token;
}

function translateWords(text: string) {
  return text.replace(/[A-Za-z]+(?:'[A-Za-z]+)?/g, translateToken);
}

function translateSegment(text: string) {
  let translatedText = text;

  Object.entries(phraseTranslations)
    .sort(([firstPhrase], [secondPhrase]) => secondPhrase.length - firstPhrase.length)
    .forEach(([phrase, translation]) => {
      translatedText = translatedText.replace(new RegExp(phrase, "gi"), translation);
    });

  return translateWords(translatedText);
}

function isTableSeparator(cell: string) {
  return /^:?-{3,}:?$/.test(cell.trim());
}

function translateTableRow(line: string) {
  const startsWithPipe = line.trimStart().startsWith("|");
  const endsWithPipe = line.trimEnd().endsWith("|");
  const leadingWhitespace = line.match(/^\s*/)?.[0] ?? "";
  const rowBody = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const translatedCells = rowBody.split("|").map((cell) => {
    if (isTableSeparator(cell)) {
      return cell.trim();
    }

    return ` ${translateSegment(cell.trim())} `;
  });

  return `${leadingWhitespace}${startsWithPipe ? "|" : ""}${translatedCells.join("|")}${
    endsWithPipe ? "|" : ""
  }`;
}

function translateLine(line: string) {
  if (line.trim() === "") {
    return line;
  }

  if (line.includes("|")) {
    return translateTableRow(line);
  }

  const bulletMatch = line.match(/^(\s*(?:[-*•]\s+))(.*)$/);
  if (bulletMatch) {
    return `${bulletMatch[1]}${translateSegment(bulletMatch[2])}`;
  }

  const numberMatch = line.match(/^(\s*\d+[.)]\s+)(.*)$/);
  if (numberMatch) {
    return `${numberMatch[1]}${translateSegment(numberMatch[2])}`;
  }

  return translateSegment(line);
}

export function translateFullText(input: string) {
  return input.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").map(translateLine).join("\n");
}
