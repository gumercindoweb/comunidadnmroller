import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import type { Turno } from "@/lib/panelVentasApi";

const ResumenVentas = ({ turnos }: { turnos: Turno[] }) => {
  const stats = useMemo(() => {
    const activos = turnos.filter((t) => t.estado_calendly !== "cancelado");
    const pagados = turnos.filter((t) => t.estado === "pagado");
    const noShow = turnos.filter((t) => t.estado === "no_show");
    const noPago = turnos.filter((t) => t.estado === "no_pago");
    const pendientes = turnos.filter((t) => t.estado === "pendiente");
    const tasaConversion = activos.length > 0 ? (pagados.length / activos.length) * 100 : 0;

    const porPlan = new Map<string, number>();
    for (const t of pagados) {
      const plan = t.plan_pagado || "Sin especificar";
      porPlan.set(plan, (porPlan.get(plan) ?? 0) + 1);
    }

    return {
      totalActivos: activos.length,
      pagados: pagados.length,
      noShow: noShow.length,
      noPago: noPago.length,
      pendientes: pendientes.length,
      tasaConversion,
      porPlan: Array.from(porPlan.entries()).sort((a, b) => b[1] - a[1]),
    };
  }, [turnos]);

  return (
    <div className="space-y-4 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="p-4 rounded-none bg-card border-border">
          <p className="text-[11px] uppercase tracking-wide text-foreground/50 font-bold">Turnos</p>
          <p className="text-2xl font-black">{stats.totalActivos}</p>
        </Card>
        <Card className="p-4 rounded-none bg-card border-border">
          <p className="text-[11px] uppercase tracking-wide text-foreground/50 font-bold">Pendientes</p>
          <p className="text-2xl font-black text-foreground/70">{stats.pendientes}</p>
        </Card>
        <Card className="p-4 rounded-none border-primary/40 bg-primary/5">
          <p className="text-[11px] uppercase tracking-wide text-primary font-bold">Pagados</p>
          <p className="text-2xl font-black text-primary">{stats.pagados}</p>
        </Card>
        <Card className="p-4 rounded-none bg-card border-border">
          <p className="text-[11px] uppercase tracking-wide text-foreground/50 font-bold">No se presentó</p>
          <p className="text-2xl font-black">{stats.noShow}</p>
        </Card>
        <Card className="p-4 rounded-none bg-card border-border">
          <p className="text-[11px] uppercase tracking-wide text-foreground/50 font-bold">Vino, no pagó</p>
          <p className="text-2xl font-black">{stats.noPago}</p>
        </Card>
      </div>
      <div className="flex flex-wrap items-center gap-4 border border-border bg-card/50 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-foreground/50 font-bold">Tasa de conversión</p>
          <p className="text-xl font-black text-primary">{stats.tasaConversion.toFixed(1)}%</p>
        </div>
        {stats.porPlan.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {stats.porPlan.map(([plan, count]) => (
              <span key={plan} className="text-xs border border-border px-2 py-1 uppercase tracking-wide">
                {plan}: <strong>{count}</strong>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumenVentas;
