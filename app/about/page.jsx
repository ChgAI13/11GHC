import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "About | GHC Academic Planner"
};

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About"
      title="About GHC Academic Planner"
      intro="GHC Academic Planner is a student-built academic planning tool for UQ Economics students."
      metadata
      sections={[
        {
          title: "What this product does",
          items: [
            "This website is independently developed by a UQ Economics student.",
            "The goal is to help students plan courses, calculate GPA, and check graduation requirements in one place.",
            "The product is currently in Beta. Features, data, and workflows will continue to improve based on user feedback."
          ]
        },
        {
          title: "Important context",
          items: [
            "This website is not an official University of Queensland product.",
            "It is not affiliated with, endorsed by, or operated by The University of Queensland.",
            "Users are welcome to share feedback, suggestions, and corrections so the planner can become more useful."
          ]
        }
      ]}
    />
  );
}
