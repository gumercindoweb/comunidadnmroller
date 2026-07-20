import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Turno } from "@/lib/panelVentasApi";

const ESTADO_BADGE: Record<Turno["estado"], { label: string; className: string }> = {
  pendiente: { label: "Pendiente", className: "bg-muted text-foreground/70 border-border" },
  cancelado: { label: "Cancelado", className: "bg-destructive/10 text-destructive border-destructive/30" },
  pagado: { label: "Pagado", className: "bg-primary/10 text-primary border-primary/30" },
  no_show: { label: "No se presentó", className: "bg-muted text-foreground/70 border-border" },
  no_pago: { label: "Vino, no pagó", className: "bg-secondary/10 text-secondary border-secondary/30" },
};

const formatFecha = (iso: string) =>
  new Date(iso).toLocaleString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

interface Props {
  turnos: Turno[];
  onConfirmar: (turno: Turno) => void;
}

const TurnosTable = ({ turnos, onConfirmar }: Props) => {
  if (turnos.length === 0) {
    return <p className="text-foreground/60 text-sm py-10 text-center">No hay turnos en este rango.</p>;
  }

  return (
    <div className="border border-border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Fecha</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Plan preguntado</TableHead>
            <TableHead>Plan confirmado</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Vía</TableHead>
            <TableHead className="text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {turnos.map((t) => {
            const badge = ESTADO_BADGE[t.estado];
            const puedeConfirmar = t.estado_calendly !== "cancelado";
            return (
              <TableRow key={t.calendly_event_uuid}>
                <TableCell className="whitespace-nowrap text-xs">
                  {formatFecha(t.start_time)}
                  {t.reprogramado && <span className="block text-[10px] text-foreground/50">reprogramado</span>}
                </TableCell>
                <TableCell className="text-sm font-medium">{t.nombre ?? "-"}</TableCell>
                <TableCell className="text-xs text-foreground/70">
                  <div>{t.email ?? "-"}</div>
                  <div>{t.telefono ?? "-"}</div>
                </TableCell>
                <TableCell className="text-sm">{t.plan_preguntado ?? "-"}</TableCell>
                <TableCell className="text-sm font-semibold">{t.plan_pagado ?? "-"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`rounded-none ${badge.className}`}>{badge.label}</Badge>
                </TableCell>
                <TableCell className="text-xs text-foreground/60">{t.via ?? "-"}</TableCell>
                <TableCell className="text-right">
                  {puedeConfirmar && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-none"
                      onClick={() => onConfirmar(t)}
                    >
                      {t.estado === "pendiente" ? "Confirmar" : "Editar"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TurnosTable;
