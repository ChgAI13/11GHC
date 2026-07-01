# 部署到 GitHub + Vercel

## 1. 本地检查

```bash
pnpm install
pnpm build
```

构建通过后，就可以上传到 GitHub。

## 2. 上传到 GitHub

先在 GitHub 创建一个空仓库，例如：

```text
au-student-ai-assistant
```

然后在项目目录运行：

```bash
git init
git add .
git commit -m "Initial MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/au-student-ai-assistant.git
git push -u origin main
```

把 `YOUR_USERNAME` 换成你的 GitHub 用户名。

## 3. 在 Vercel 部署

1. 打开 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 `Add New...` -> `Project`
4. 选择 `au-student-ai-assistant` 仓库
5. Framework Preset 选择 `Next.js`
6. Build Command 保持 `pnpm build`
7. Install Command 保持 `pnpm install`
8. 点击 `Deploy`

部署完成后，Vercel 会生成一个公开网址，格式通常类似：

```text
https://au-student-ai-assistant.vercel.app
```

## 4. 可选：用 Vercel CLI 直接部署

如果你已经登录 Vercel CLI，也可以运行：

```bash
pnpm dlx vercel
pnpm dlx vercel --prod
```

第一次会让你选择账号、项目名和团队。完成后，终端会输出公开访问 URL。
