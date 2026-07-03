import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AppShell } from "@/components/AppShell";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ProfileProvider } from "@/components/ProfileProvider";

export const metadata = {
  title: "GradPlan",
  description: "Academic planning platform for university students"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <LanguageProvider>
          <ProfileProvider>
            <AppShell>{children}</AppShell>
          </ProfileProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
