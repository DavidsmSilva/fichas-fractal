import { forwardRef } from "react";
import logoAsset from "@/assets/logo.png.asset.json";

export type CardData = {
  nombre: string;
  cedula: string;
  proyecto: string;
  fechaEmision: string;
  validoHasta: string;
};

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 80c0-30 20-52 55-58-4 34-24 54-55 58Z" />
      <path d="M20 80c14-20 26-32 45-42" strokeLinecap="round" />
    </svg>
  );
}

const Field = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: "navy" | "green" | "orange";
  icon: React.ReactNode;
}) => {
  const text =
    color === "navy" ? "text-brand-navy" : color === "green" ? "text-brand-green" : "text-brand-orange";
  const bg = color === "navy" ? "bg-brand-navy" : color === "green" ? "bg-brand-green" : "bg-brand-orange";
  const border =
    color === "navy" ? "border-brand-navy" : color === "green" ? "border-brand-green" : "border-brand-orange";
  return (
    <div className="flex items-center gap-4">
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${bg}`}>
        <span className="text-brand-paper">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className={`font-display text-lg font-bold tracking-tight ${text}`}>{label}</p>
        <div className={`mt-1 border-b-2 ${border} pb-1`}>
          <p className="truncate font-sans text-lg text-brand-navy">{value || "\u00A0"}</p>
        </div>
      </div>
    </div>
  );
};

const IconUser = (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.5-4 4-6 7-6s5.5 2 7 6" strokeLinecap="round" />
  </svg>
);
const IconId = (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <circle cx="8.5" cy="11" r="2" />
    <path d="M5.5 16c.7-1.6 1.8-2.3 3-2.3s2.3.7 3 2.3M14 10h5M14 13.5h5" strokeLinecap="round" />
  </svg>
);
const IconHelmet = (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5.5 15.5v-3a6.5 6.5 0 0 1 13 0v3" />
    <path d="M3 15.5h18" strokeLinecap="round" />
    <path d="M12 4.6v3.4" strokeLinecap="round" />
  </svg>
);
const IconCal = (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" strokeLinecap="round" />
  </svg>
);

export const InductionCard = forwardRef<HTMLDivElement, { data: CardData }>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="relative aspect-[1.5/1] w-full overflow-hidden rounded-[28px] bg-brand-paper shadow-2xl"
    >
      {/* Decoraciones esquinas */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 900 600" preserveAspectRatio="none">
        <path d="M0 0H240C130 65 55 155 0 265Z" className="fill-brand-navy" />
        <path d="M232 0H265C150 70 70 165 22 285L0 262C60 150 130 60 232 0Z" className="fill-brand-green" />
        <path d="M900 0V150C830 100 760 55 660 0Z" className="fill-brand-green" />
        <path d="M900 60V190C840 140 800 105 745 65Z" className="fill-brand-navy" />
        <path d="M0 600V430C90 470 160 520 210 600Z" className="fill-brand-green" />
        <path d="M900 600H560c110-60 210-130 340-170Z" className="fill-brand-navy" />
        <path d="M900 600H660c90-45 160-85 240-105Z" className="fill-brand-orange" />
      </svg>

      <Leaf className="absolute right-8 top-14 h-16 w-16 text-brand-paper opacity-80" />
      <Leaf className="absolute bottom-6 left-4 h-16 w-16 text-brand-paper opacity-80" />

      <div className="relative flex h-full flex-col px-[7%] py-[5%]">
        <h1 className="text-center font-display text-[3.4vw] font-extrabold uppercase leading-none tracking-tight text-brand-navy sm:text-[2.6cqw] md:text-[38px]">
          Inducción <span className="text-brand-green">SST</span>
        </h1>

        <div className="mt-3 flex items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-[4px] w-10 rounded-full bg-brand-green" />
            <span className="h-[4px] w-10 rounded-full bg-brand-navy" />
            <span className="h-[4px] w-10 rounded-full bg-brand-orange" />
          </div>
          <img src={logoAsset.url} alt="Fractal Estrategias Sostenibles" className="h-[96px] w-auto" />
          <div className="flex items-center gap-2">
            <span className="h-[4px] w-10 rounded-full bg-brand-green" />
            <span className="h-[4px] w-10 rounded-full bg-brand-navy" />
            <span className="h-[4px] w-10 rounded-full bg-brand-orange" />
          </div>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-2 gap-x-8 gap-y-5">
          <div className="flex flex-col justify-center gap-5">
            <Field label="Nombre:" value={data.nombre} color="navy" icon={IconUser} />
            <Field label="Cedula/DPI:" value={data.cedula} color="green" icon={IconId} />
            <Field label="Proyecto:" value={data.proyecto} color="navy" icon={IconHelmet} />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <Field label="Fecha emisión:" value={data.fechaEmision} color="green" icon={IconCal} />
            <Field label="Válido hasta:" value={data.validoHasta} color="orange" icon={IconCal} />
          </div>
        </div>

        <p className="mt-2 text-center font-script text-[26px] leading-tight text-brand-navy">
          Con compromiso, <span className="text-brand-green">hacemos la diferencia.</span>
        </p>
      </div>
    </div>
  );
});
InductionCard.displayName = "InductionCard";
