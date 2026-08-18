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
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
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
    <path d="M4 16a8 8 0 0 1 16 0" />
    <path d="M2.5 16.5h19" strokeLinecap="round" />
    <path d="M9.5 8.6V6.2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2.4" strokeLinecap="round" />
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
      className="relative aspect-[1.6/1] w-full overflow-hidden rounded-[28px] bg-brand-paper shadow-2xl"
    >
      {/* Fondo de decoraciones esquinas */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 900 562"
        preserveAspectRatio="none"
      >
        {/* Esquina superior izquierda: navy + green */}
        <path d="M0 0h180c-40 70-110 140-180 190Z" className="fill-brand-navy" />
        <path d="M0 0h60c-10 80-40 160-60 210Z" className="fill-brand-green" />

        {/* Esquina superior derecha: green + navy */}
        <path d="M900 0v160c-100-50-200-90-320-160Z" className="fill-brand-green" />
        <path d="M900 0v90c-60-20-140-50-230-90Z" className="fill-brand-navy" />

        {/* Esquina inferior izquierda: green */}
        <path d="M0 562v-180c100 30 180 100 240 180Z" className="fill-brand-green" />

        {/* Esquina inferior derecha: navy + orange */}
        <path d="M900 562h-280c80-60 180-110 280-150Z" className="fill-brand-navy" />
        <path d="M900 562h-180c50-40 110-70 180-90Z" className="fill-brand-orange" />
      </svg>

      {/* Patrones de puntos decorativos */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-[40%] opacity-30"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={20 + c * 24}
              cy={20 + r * 24}
              r="3"
              className="fill-brand-navy"
            />
          ))
        )}
      </svg>
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-[35%] w-[35%] opacity-30"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={180 - c * 24}
              cy={180 - r * 24}
              r="3"
              className="fill-brand-orange"
            />
          ))
        )}
      </svg>

      {/* Hojas decorativas */}
      <Leaf className="absolute right-6 top-5 h-28 w-28 text-brand-paper opacity-90" />
      <Leaf className="absolute bottom-5 left-6 h-28 w-28 text-brand-paper opacity-90" />

      <div className="relative flex h-full flex-col px-[6%] py-[4%]">
        {/* Título */}
        <h1 className="text-center font-display text-[3.4vw] font-extrabold uppercase leading-none tracking-tight text-brand-navy sm:text-[2.6cqw] md:text-[40px]">
          Inducción <span className="text-brand-green">SST</span>
        </h1>

        {/* Logo + franjas */}
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-[5px] w-12 rounded-full bg-brand-green" />
            <span className="h-[5px] w-12 rounded-full bg-brand-navy" />
            <span className="h-[5px] w-12 rounded-full bg-brand-orange" />
          </div>
          <img src={logoAsset.url} alt="Fractal Estrategias Sostenibles" className="h-[70px] w-auto" />
          <div className="flex items-center gap-2">
            <span className="h-[5px] w-12 rounded-full bg-brand-green" />
            <span className="h-[5px] w-12 rounded-full bg-brand-navy" />
            <span className="h-[5px] w-12 rounded-full bg-brand-orange" />
          </div>
        </div>

        {/* Cuadrícula de campos */}
        <div className="mt-4 grid flex-1 grid-cols-2 gap-x-0">
          {/* Columna izquierda */}
          <div className="flex flex-col justify-center gap-4 px-[4%] pr-[6%]">
            <Field label="Nombre:" value={data.nombre} color="navy" icon={IconUser} />
            <Field label="Cedula/DPI:" value={data.cedula} color="green" icon={IconId} />
            <Field label="Proyecto:" value={data.proyecto} color="navy" icon={IconHelmet} />
          </div>

          {/* Separador vertical punteado */}
          <div className="relative flex items-center justify-center">
            <svg className="h-[80%] w-4" viewBox="0 0 10 200" preserveAspectRatio="none">
              <line
                x1="5"
                y1="0"
                x2="5"
                y2="200"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 6"
                className="text-brand-navy"
              />
              <circle cx="5" cy="20" r="4" className="fill-brand-green" />
              <circle cx="5" cy="100" r="4" className="fill-brand-navy" />
              <circle cx="5" cy="180" r="4" className="fill-brand-orange" />
            </svg>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col justify-center gap-6 px-[6%] pl-[8%]">
            <Field label="Fecha emisión:" value={data.fechaEmision} color="green" icon={IconCal} />
            <Field label="Válido hasta:" value={data.validoHasta} color="orange" icon={IconCal} />
          </div>
        </div>

        {/* Lema */}
        <p className="mt-2 text-center font-script text-[28px] leading-tight text-brand-navy">
          Con compromiso,
          <br />
          <span className="text-brand-green">hacemos la diferencia.</span>
        </p>
      </div>
    </div>
  );
});
InductionCard.displayName = "InductionCard";
