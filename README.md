# 澳洲留学生 AI 助手 MVP

一个面向澳洲留学生的手机端友好 Next.js + Tailwind CSS MVP，包含首页、GPA Calculator、Living Cost Calculator 和 AI Email Explainer。

## 功能

- GPA Calculator：输入课程、学分、成绩等级或分数，支持 7 分制 GPA、4 分制 GPA 和 WAM。
- Living Cost Calculator：输入每周支出和打工收入，自动计算每周/月预算并提示是否超支。
- AI Email Explainer：粘贴英文邮件后返回 mock 中文解释、重要日期和行动清单。
- 当前版本没有登录系统、数据库和真实支付。

## 运行

```bash
pnpm install
pnpm dev
```

打开 http://localhost:3000 查看项目。

`pnpm dev` 默认使用轮询监听，在文件监听限制较低的 macOS 环境里更稳定。如果你想用 Next.js 默认监听方式，可以运行：

```bash
pnpm dev:normal
```

## 部署

部署到 GitHub + Vercel 的步骤见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 项目结构

```text
app/
  ai-email-explainer/
    page.jsx
  gpa-calculator/
    page.jsx
  living-cost-calculator/
    page.jsx
  globals.css
  layout.jsx
  page.jsx
components/
  AppShell.jsx
  StatCard.jsx
  ToolLink.jsx
lib/
  gpa.js
```
