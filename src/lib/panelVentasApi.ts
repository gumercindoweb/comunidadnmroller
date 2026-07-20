import { supabase } from "@/integrations/supabase/client";

export type EstadoTurno = "pendiente" | "cancelado" | "pagado" | "no_show" | "no_pago";

export interface Turno {
  calendly_event_uuid: string;
  calendly_invitee_uuid: string | null;
  start_time: string;
  end_time: string;
  estado_calendly: "agendado" | "cancelado";
  cancellation: { canceled_by: string; reason: string | null; canceler_type: string } | null;
  reprogramado: boolean;
  nombre: string | null;
  email: string | null;
  telefono: string | null;
  dni: string | null;
  plan_preguntado: string | null;
  via: string | null;
  comentario: string | null;
  estado: EstadoTurno;
  plan_pagado: string | null;
  notas: string | null;
  vendedor: string | null;
  confirmado_por: string | null;
}

export async function listarTurnos(params?: { desde?: string; hasta?: string }): Promise<Turno[]> {
  const { data, error } = await supabase.functions.invoke("listar-turnos-efectivo", {
    body: params ?? {},
  });
  if (error) throw error;
  if (!data?.ok) throw new Error(data?.error ?? "No pudimos traer los turnos.");
  return data.turnos as Turno[];
}

export interface ConfirmarPagoInput {
  calendly_event_uuid: string;
  calendly_invitee_uuid?: string | null;
  estado: "pagado" | "no_show" | "no_pago";
  vendedor: string;
  plan_preguntado?: string | null;
  plan_pagado?: string | null;
  nombre?: string | null;
  email: string;
  telefono?: string | null;
  dni?: string | null;
  notas?: string | null;
}

export async function confirmarPago(input: ConfirmarPagoInput) {
  const { data, error } = await supabase.functions.invoke("confirmar-pago-efectivo", {
    body: input,
  });
  if (error) throw error;
  if (!data?.ok) throw new Error(data?.error ?? "No pudimos guardar la confirmación.");
  return data;
}
