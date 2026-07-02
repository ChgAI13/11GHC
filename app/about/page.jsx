import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "About | GradPlan"
};

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About"
      title="About GradPlan"
      intro="GradPlan is an independent academic planning platform designed to help university students plan their degree more efficiently."
      metadata
      sections={[
        {
          title: "Current Beta focus",
          items: [
            "The current Beta focuses on University of Queensland students.",
            "The first supported program is Bachelor of Economics.",
            "Future versions will support more universities, programs, and planning workflows."
          ]
        },
        {
          title: "Mission",
          items: [
            "Make academic planning simple.",
            "GradPlan helps students plan semesters, track graduation progress, calculate GPA, and build a degree roadmap.",
            "GradPlan is built independently and is currently in Beta. Feedback and corrections are welcome."
          ]
        }
      ]}
    />
  );
}
