import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Use | GradPlan"
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Use"
      intro="These terms describe the basic rules for using GradPlan."
      sections={[
        {
          title: "Use of the website",
          items: [
            "Users may use this website for free during the current Beta period.",
            "Users must not attack, disrupt, or attempt to damage the website.",
            "Users must not automatically scrape, copy, or extract large amounts of data from the website."
          ]
        },
        {
          title: "Service availability",
          items: [
            "We do not guarantee that the website will always be available or error-free.",
            "We reserve the right to update website content, data, design, and features.",
            "We may modify, pause, or stop part of the service at any time, especially while the product is in Beta."
          ]
        }
      ]}
    />
  );
}
