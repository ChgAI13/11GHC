import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata = {
  title: "澳洲留学生 AI 助手",
  description: "手机端友好的澳洲留学生 AI 助手 MVP"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
