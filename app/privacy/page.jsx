import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy | GHC Academic Planner"
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy explains how the Beta version handles user data."
      sections={[
        {
          title: "Current Beta version",
          items: [
            "The current Beta version does not require users to create an account.",
            "We do not collect identity document information.",
            "We do not collect bank card or payment information.",
            "We do not sell user data."
          ]
        },
        {
          title: "Academic Profile data",
          items: [
            "Academic Profile data is stored in your browser Local Storage by default.",
            "This means your profile is saved on your own device and browser, not in a cloud database.",
            "You can clear local profile data at any time by using the Reset All Data button.",
            "If cloud sync, accounts, analytics, or payment features are added in the future, this Privacy Policy will be updated before those features are used."
          ]
        }
      ]}
    />
  );
}
