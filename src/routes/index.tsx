import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InductionCard, type CardData } from "@/components/InductionCard";

const fmt = (iso: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Generador de Fichas de Inducción SST | Fractal" },
      {
        name: "description",
        content:
          "Crea fichas de inducción SST con los datos del colaborador y descárgalas en PDF listas para imprimir.",
      },
      { property: "og:title", content: "Generador de Fichas de Inducción SST" },
      {
        property: "og:description",
        content: "Completa los datos y descarga la ficha de inducción SST en formato PDF.",
      },
    ],
  }),
  component: Index,
});

const empty: CardData = {
  nombre: "",
  cedula: "",
  proyecto: "",
  fechaEmision: "",
  validoHasta: "",
};

function Index() {
  const [data, setData] = useState<CardData>(empty);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof CardData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const download = async () => {
    if (!cardRef.current) return;
    setLoading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(cardRef.current, { scale: 3, backgroundColor: null });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [153, 102] });
      pdf.addImage(img, "PNG", 0, 0, 153, 102);
      const name = data.nombre.trim().replace(/\s+/g, "_") || "ficha";
      pdf.save(`Induccion_SST_${name}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy">
            Generador de Fichas de Inducción SST
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Completa los datos, revisa la vista previa y descarga la ficha en PDF.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              {(
                [
                  ["nombre", "Nombre", "text"],
                  ["cedula", "Cedula/DPI", "text"],
                  ["proyecto", "Proyecto", "text"],
                  ["fechaEmision", "Fecha emisión", "date"],
                  ["validoHasta", "Válido hasta", "date"],
                ] as const
              ).map(([key, label, type]) => (
                <div key={key} className="space-y-1.5">
                  <Label htmlFor={key}>{label}</Label>
                  <Input id={key} type={type} value={data[key]} onChange={set(key)} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <Button onClick={download} disabled={loading} className="flex-1">
                {loading ? "Generando…" : "Descargar PDF"}
              </Button>
              <Button variant="outline" onClick={() => setData(empty)}>
                Limpiar
              </Button>
            </div>
          </section>

          <section>
            <div className="mx-auto w-full max-w-[900px]">
              <InductionCard
                ref={cardRef}
                data={{
                  ...data,
                  fechaEmision: fmt(data.fechaEmision),
                  validoHasta: fmt(data.validoHasta),
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
