import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ProfileProvider } from "@/components/ProfileProvider";

export const metadata = {
  title: "UQ Academic Planner",
  description: "Academic planning dashboard for University of Queensland students"
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
      </body>
    </html>
  );
}
