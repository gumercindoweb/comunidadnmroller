import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { listarTurnos, type Turno } from "@/lib/panelVentasApi";
import ResumenVentas from "@/components/panel-ventas/ResumenVentas";
import TurnosTable from "@/components/panel-ventas/TurnosTable";
import ConfirmarPagoDialog from "@/components/panel-ventas/ConfirmarPagoDialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, LogOut, RefreshCw } from "lucide-react";

const FILTROS_ESTADO = [
  { value: "todos", label: "Todos" },
  { value: "pendiente", label: "Pendientes" },
  { value: "pagado", label: "Pagados" },
  { value: "no_show", label: "No se presentó" },
  { value: "no_pago", label: "Vino y no pagó" },
  { value: "cancelado", label: "Cancelados" },
] as const;

const PanelVentas = () => {
  const queryClient = useQueryClient();
  const [filtroEstado, setFiltroEstado] = useState<(typeof FILTROS_ESTADO)[number]["value"]>("todos");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState<Turno | null>(null);

  const { data: turnos = [], isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["turnos-efectivo"],
    queryFn: () => listarTurnos(),
  });

  const turnosFiltrados = useMemo(() => {
    if (filtroEstado === "todos") return turnos;
    return turnos.filter((t) => t.estado === filtroEstado);
  }, [turnos, filtroEstado]);

  const handleConfirmed = () => {
    setTurnoSeleccionado(null);
    queryClient.invalidateQueries({ queryKey: ["turnos-efectivo"] });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-bold">Panel de ventas</p>
            <h1 className="font-display italic uppercase text-2xl md:text-3xl font-black">
              Turnos · Beneficio pago en efectivo
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-none" onClick={() => refetch()} disabled={isFetching}>
              <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Salir
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <p className="text-destructive text-sm">
            {(error as Error)?.message ?? "No pudimos traer los turnos de Calendly."}
          </p>
        ) : (
          <>
            <ResumenVentas turnos={turnos} />

            <div className="flex items-center justify-between mb-4">
              <Select value={filtroEstado} onValueChange={(v) => setFiltroEstado(v as typeof filtroEstado)}>
                <SelectTrigger className="w-56 rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FILTROS_ESTADO.map((f) => (
                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-foreground/50">
                Últimos 60 días + próximos 14. Datos en vivo desde Calendly.
              </p>
            </div>

            <TurnosTable turnos={turnosFiltrados} onConfirmar={setTurnoSeleccionado} />
          </>
        )}

        <div className="mt-10">
          <Link to="/" className="text-xs text-foreground/50 hover:text-foreground uppercase tracking-[0.18em]">
            ← Volver al sitio
          </Link>
        </div>
      </div>

      <ConfirmarPagoDialog
        turno={turnoSeleccionado}
        onClose={() => setTurnoSeleccionado(null)}
        onConfirmed={handleConfirmed}
      />
    </main>
  );
};

export default PanelVentas;
