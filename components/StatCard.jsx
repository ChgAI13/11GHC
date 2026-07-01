export function StatCard({ label, value, helper, tone = "default" }) {
  const tones = {
    default: "border-ink/10 bg-white",
    good: "border-eucalyptus/25 bg-mint/80",
    warn: "border-coral/25 bg-[#fff0ec]"
  };

  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <p className="text-sm font-bold text-ink/60">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-normal text-ink">{value}</p>
      {helper ? <p className="mt-2 text-sm leading-6 text-ink/65">{helper}</p> : null}
    </div>
  );
}
