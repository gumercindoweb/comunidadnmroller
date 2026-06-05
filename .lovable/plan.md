# Ajuste del bloque "¡Comprobante recibido!" en `/pago-confirmado`

Solo cambia el contenido del estado `done` en `src/pages/PagoConfirmado.tsx`. Sin cambios de lógica, formulario ni edge function.

## Objetivos del nuevo copy
1. Empujar a **revisar el correo** como paso final del onboarding.
2. Ofrecer **WhatsApp como atajo** (sin nombrarlo como "más rápido" ni hablar de demoras).
3. Eliminar menciones a plazos ("24hs hábiles", "menos de…").
4. Aclarar que este onboarding es **por única vez** y que después todo se autogestiona desde la app **Turnos Web** (comprar planes, reservar, cancelar, novedades).

## Estructura propuesta del bloque

```text
[icono FileCheck]

¡COMPROBANTE RECIBIDO!

Último paso del onboarding 👇
Revisá tu correo en {email}: ahí te confirmamos el alta y te
pasamos el acceso para empezar a rolear.

[ Botón primario rojo · uppercase · glow ]
  ABRIR MI CORREO     (link: https://mail.google.com/ — _blank)

— o —

¿Querés que lo coordinemos al toque por WhatsApp?
[ Botón secundario · borde verde WhatsApp ]
  ESCRIBINOS POR WHATSAPP

────────────────────────────────────

Esto es por única vez. Desde ahora, todo lo gestionás vos misma
desde la app Turnos Web: comprás planes, reservás clases,
cancelás turnos y te enterás de novedades.
```

## Detalles de copy (final)

- **Subtítulo destacado:** "Último paso del onboarding"
- **Cuerpo:** "Revisá tu correo en **{email}**: ahí te confirmamos el alta y te pasamos el acceso para empezar a rolear."
- **CTA primario:** `ABRIR MI CORREO` → `https://mail.google.com/` (target _blank)
- **Puente sutil:** "¿Preferís que lo coordinemos al toque por WhatsApp?"
- **CTA secundario:** `ESCRIBINOS POR WHATSAPP` → mismo `wa.me` que ya estaba
- **Nota de cierre (más chica, separada por divider):**
  "Esto es **por única vez**. Desde ahora gestionás todo desde la app **Turnos Web**: comprá planes, reservá clases, cancelá turnos y enterate de novedades."

## Detalles visuales

- Mantener el card actual: `border-2 border-primary bg-background`.
- Conservar el ícono `FileCheck` y el H3 "¡Comprobante recibido!".
- Dos botones apilados (full-width en mobile, lado a lado en `sm:`):
  - Primario: clases ya usadas en el form (`bg-primary` + glow rojo, uppercase tracking 0.18em, sharp).
  - Secundario WhatsApp: `bg-background border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white` (sharp, uppercase tracking 0.18em). Icono inline SVG de WhatsApp.
- Separador `border-t border-foreground/10` antes de la nota de autogestión.
- Sin emojis salvo el 👇 del subtítulo (opcional, alineado con el tono ya usado en el paso 2).

## Archivos
- `src/pages/PagoConfirmado.tsx` — solo el bloque dentro de `{done ? (...) : ...}`.
