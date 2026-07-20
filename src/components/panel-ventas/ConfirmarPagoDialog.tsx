import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { confirmarPago, type Turno } from "@/lib/panelVentasApi";

interface Props {
  turno: Turno | null;
  onClose: () => void;
  onConfirmed: () => void;
}

const ESTADOS = [
  { value: "pagado", label: "Pagó" },
  { value: "no_show", label: "No se presentó" },
  { value: "no_pago", label: "Vino y no pagó" },
] as const;

const ConfirmarPagoDialog = ({ turno, onClose, onConfirmed }: Props) => {
  const [estado, setEstado] = useState<"pagado" | "no_show" | "no_pago">("pagado");
  const [plan, setPlan] = useState("");
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (turno) {
      setEstado(
        turno.estado === "pagado" || turno.estado === "no_show" || turno.estado === "no_pago"
          ? turno.estado
          : "pagado",
      );
      setPlan(turno.plan_pagado ?? turno.plan_preguntado ?? "");
      setNotas(turno.notas ?? "");
    }
  }, [turno]);

  if (!turno) return null;

  const handleConfirm = async () => {
    if (estado === "pagado" && !plan.trim()) {
      toast.error("Indicá qué plan pagó.");
      return;
    }
    setLoading(true);
    try {
      await confirmarPago({
        calendly_event_uuid: turno.calendly_event_uuid,
        calendly_invitee_uuid: turno.calendly_invitee_uuid,
        estado,
        plan_preguntado: turno.plan_preguntado,
        plan_pagado: estado === "pagado" ? plan.trim() : (plan.trim() || null),
        nombre: turno.nombre,
        email: turno.email,
        telefono: turno.telefono,
        dni: turno.dni,
        notas: notas.trim() || null,
      });
      toast.success("Turno actualizado.");
      onConfirmed();
    } catch (err: any) {
      toast.error(err?.message ?? "No pudimos guardar la confirmación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!turno} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle className="font-display italic uppercase">
            {turno.nombre ?? turno.email ?? "Turno"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Select value={estado} onValueChange={(v) => setEstado(v as typeof estado)} disabled={loading}>
            <SelectTrigger className="rounded-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ESTADOS.map((e) => (
                <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {estado === "pagado" && (
            <Input
              placeholder="Plan pagado (podés corregirlo)"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              disabled={loading}
              className="rounded-none"
            />
          )}

          <Textarea
            placeholder="Notas (opcional)"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            disabled={loading}
            className="rounded-none"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded-none" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button className="rounded-none bg-primary hover:bg-primary/90" onClick={handleConfirm} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmarPagoDialog;
