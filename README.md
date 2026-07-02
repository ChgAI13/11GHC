# GradPlan

GradPlan 是一个 Academic Planning Platform，帮助大学生规划学期课程、追踪毕业进度、计算 GPA，并建立完整的 Degree Roadmap。

当前 Beta 版本先支持：

- Supported University: University of Queensland
- Supported Program: Bachelor of Economics

## 功能

- Dashboard：展示 Current GPA、Target GPA、Completed Courses、Remaining Courses、Academic Progress 和 Recommended Next Actions。
- Profile：统一保存 Academic Profile。
- GPA Planner：规划目标 GPA。
- Degree Planner：模拟 6 个学期的课程路径。
- Graduation Checker：检查毕业要求完成度。
- Course Database：搜索和查看课程信息。
- 当前版本没有登录系统、数据库和真实支付。

GradPlan 是独立开发的非官方工具，不属于 The University of Queensland。

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
