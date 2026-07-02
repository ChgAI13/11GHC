import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Disclaimer | GradPlan"
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Disclaimer"
      title="Disclaimer"
      intro="Please read this disclaimer before using GradPlan for academic planning."
      officialLink
      sections={[
        {
          title: "Reference only",
          items: [
            "This website is provided for learning, planning, and general reference only.",
            "This website is not part of The University of Queensland and has no official partnership with The University of Queensland.",
            "All course information, graduation requirements, GPA calculations, and course recommendations are for reference only."
          ]
        },
        {
          title: "Accuracy and responsibility",
          items: [
            "Although we try to keep information accurate, we cannot guarantee that it always matches the latest official university requirements.",
            "Students should check their university's official website before making enrolment, graduation, or academic decisions.",
            "Official university rules and published course information should always be treated as the final source of truth.",
            "Users are responsible for their own course selection, enrolment, and academic decisions."
          ]
        },
        {
          title: "Limitation of responsibility",
          items: [
            "This website is not responsible for any direct or indirect loss caused by using or relying on the website.",
            "If you are unsure about your degree plan, contact UQ Student Central, your faculty, or an official academic adviser."
          ]
        }
      ]}
    />
  );
}
