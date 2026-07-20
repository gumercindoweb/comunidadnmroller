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
import { confirmarPago, type ConfirmarPagoInput, type Turno } from "@/lib/panelVentasApi";

interface Props {
  turno: Turno | null;
  onClose: () => void;
  onConfirmed: () => void;
  // Punto de inyección para el modo demo (datos simulados, sin backend real).
  // En uso normal se omite y se llama a confirmarPago().
  onSubmit?: (input: ConfirmarPagoInput) => Promise<void>;
}

const ESTADOS = [
  { value: "pagado", label: "Pagó" },
  { value: "no_show", label: "No se presentó" },
  { value: "no_pago", label: "Vino y no pagó" },
] as const;

// Todos los vendedores comparten el mismo login del panel, así que este
// campo es la única forma de saber quién gestionó cada turno. Se recuerda
// por dispositivo/navegador para no tener que reelegirlo cada vez.
const VENDEDOR_STORAGE_KEY = "panel_ventas_vendedor_nombre";
const VENDEDORES = ["Fruti", "Ana", "Martu", "Rama", "Nico", "Vladi"];
const OTRO = "otro";

const NOTAS_PLACEHOLDER: Record<"pagado" | "no_show" | "no_pago", string> = {
  pagado: "Notas (opcional)",
  no_show: "Notas (opcional) — ej: avisó que no podía venir, no avisó nada, etc.",
  no_pago: "¿Qué lo frenó? Ej: le faltaba el dinero, quiere pensarlo, prefiere transferencia, etc.",
};

const ConfirmarPagoDialog = ({ turno, onClose, onConfirmed, onSubmit }: Props) => {
  const [estado, setEstado] = useState<"pagado" | "no_show" | "no_pago">("pagado");
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState(() => {
    let stored = "";
    try {
      stored = localStorage.getItem(VENDEDOR_STORAGE_KEY) ?? "";
    } catch {
      stored = "";
    }
    if (!stored) return "";
    return VENDEDORES.includes(stored) ? stored : OTRO;
  });
  const [vendedorOtro, setVendedorOtro] = useState(() => {
    try {
      const stored = localStorage.getItem(VENDEDOR_STORAGE_KEY) ?? "";
      return VENDEDORES.includes(stored) ? "" : stored;
    } catch {
      return "";
    }
  });
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
    if (!vendedorSeleccionado) {
      toast.error("Elegí qué vendedor gestionó este turno.");
      return;
    }
    const vendedorFinal = vendedorSeleccionado === OTRO ? vendedorOtro.trim() : vendedorSeleccionado;
    if (!vendedorFinal) {
      toast.error("Escribí el nombre del vendedor.");
      return;
    }
    if (estado === "pagado" && !plan.trim()) {
      toast.error("Indicá qué plan pagó.");
      return;
    }
    setLoading(true);
    try {
      const input: ConfirmarPagoInput = {
        calendly_event_uuid: turno.calendly_event_uuid,
        calendly_invitee_uuid: turno.calendly_invitee_uuid,
        estado,
        vendedor: vendedorFinal,
        plan_preguntado: turno.plan_preguntado,
        plan_pagado: estado === "pagado" ? plan.trim() : null,
        nombre: turno.nombre,
        nombre_pila: turno.nombre_pila,
        apellido: turno.apellido,
        email: turno.email ?? "",
        telefono: turno.telefono,
        dni: turno.dni,
        notas: notas.trim() || null,
      };
      await (onSubmit ? onSubmit(input) : confirmarPago(input));
      try {
        localStorage.setItem(VENDEDOR_STORAGE_KEY, vendedorFinal);
      } catch {
        // localStorage puede fallar en modo privado; no es crítico.
      }
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

          <Select value={vendedorSeleccionado} onValueChange={setVendedorSeleccionado} disabled={loading}>
            <SelectTrigger className="rounded-none">
              <SelectValue placeholder="¿Quién gestiona este turno?" />
            </SelectTrigger>
            <SelectContent>
              {VENDEDORES.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
              <SelectItem value={OTRO}>Otro</SelectItem>
            </SelectContent>
          </Select>

          {vendedorSeleccionado === OTRO && (
            <Input
              placeholder="Nombre del vendedor"
              value={vendedorOtro}
              onChange={(e) => setVendedorOtro(e.target.value)}
              disabled={loading}
              className="rounded-none"
            />
          )}

          <Textarea
            placeholder={NOTAS_PLACEHOLDER[estado]}
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
