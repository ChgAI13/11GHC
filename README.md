# UQ Academic Planner

一个面向 University of Queensland 本科学生的 Academic Planning MVP。第一版先服务 Bachelor of Economics 学生，当前首页为 Dashboard，使用 Mock Data。

## 功能

- Dashboard：展示 Current GPA、Target GPA、Completed Courses、Remaining Courses、Academic Progress 和 Recommended Next Actions。
- 后续扩展方向：GPA Planner、Course Planner、Graduation Checker、Course Database。
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
  gpa/
    page.jsx
  globals.css
  layout.jsx
  page.jsx
components/
  AppShell.jsx
  GpaGoalPlanner.jsx
```
