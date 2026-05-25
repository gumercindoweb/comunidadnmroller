## Objetivo

Crear una nueva página `/newsletter-desde-cero` para captar emails (replicando el LP actual `lp.comunidadnmroller.com`), integrada con **GetResponse** vía API key y accesible desde navbar + footer.

## Cambios

### 1. Lovable Cloud + secreto GetResponse
- Activar Lovable Cloud (necesario para edge function).
- Pedirte la `GETRESPONSE_API_KEY` vía secret manager (no se hardcodea).
- Opcional: `GETRESPONSE_CAMPAIGN_ID` (lista/campaign donde sumar el contacto). Te lo pediré junto a la API key.

### 2. Edge function `subscribe-newsletter`
- Endpoint POST que recibe `{ name, email }`.
- Validación con Zod (nombre 1–100 chars, email válido, max 255).
- Llama a GetResponse API: `POST https://api.getresponse.com/v3/contacts` con header `X-Auth-Token: api-key {KEY}` y body `{ name, email, campaign: { campaignId } }`.
- Manejo de errores: 409 (email ya suscrito) se trata como éxito, resto devuelve 4xx/5xx con mensaje claro.
- CORS habilitado.

### 3. Imagen hero (IA generada)
- Generar con `imagegen` una ilustración tipo mockup de celular con "Mapa de Aprendizaje NM Roller" estética DS v1.0 (fondo dark #111, acentos rojo #D01C1F y teal #62C3BF, niveles/pins de skate).
- Guardar en `src/assets/newsletter-mockup.png`.

### 4. Nueva página `src/pages/NewsletterDesdeCero.tsx`
- Layout dark full-screen alineado al DS:
  - **Hero split (60/40 desktop, stack mobile)**:
    - Izquierda: eyebrow "¿Y SI SÍ PODÉS EMPEZAR A PATINAR?", h1 "LA NEWSLETTER QUE TE IMPULSA A DAR TU PRIMER PASO" (rojo en "TU PRIMER PASO"), subhead, form (Nombre + Email + CTA "SUSCRIBIRME"), disclaimer `¡ACEPTO! Recibir contenido útil y promocional…`.
    - Derecha: imagen generada.
  - **Banda roja inferior** (`bg-primary`): título "RECIBÍ EN TU BANDEJA DE ENTRADA" + 4 checks:
    1. Tips simples para patinar con seguridad y confianza
    2. Mini desafíos y motivación semanal
    3. Historias reales de personas como vos
    4. Acceso a la Ruta de Aprendizaje + Bitácora
- Form maneja estado loading/success/error con shadcn `toast`.
- Validación client-side con Zod.
- Logo NM en top centrado.
- Link "Volver al sitio" abajo.

### 5. Routing
- Agregar `<Route path="/newsletter-desde-cero" element={<NewsletterDesdeCero />} />` en `src/App.tsx`.

### 6. Acceso desde el sitio
- **Navbar (`Navbar.tsx`)**: nuevo item "Newsletter" que linkea a `/newsletter-desde-cero` (visible desktop + mobile menu).
- **Footer (`Footer.tsx`)**: link "Newsletter Desde Cero" en la columna correspondiente.

### 7. SEO
- `<title>` "Newsletter Desde Cero — Comunidad NM Roller" (<60 chars)
- meta description orientada al hook + beneficio (<160 chars)
- H1 único, alt en la imagen, viewport responsive.

## Detalles técnicos

```
supabase/functions/subscribe-newsletter/index.ts   (nuevo)
src/pages/NewsletterDesdeCero.tsx                  (nuevo)
src/assets/newsletter-mockup.png                   (generada)
src/App.tsx                                        (route)
src/components/Navbar.tsx                          (link)
src/components/Footer.tsx                          (link)
```

- Cliente invoca `supabase.functions.invoke('subscribe-newsletter', { body: { name, email } })`.
- API GetResponse docs: https://apidocs.getresponse.com/v3/resources/contacts#contacts.create

## Fuera de alcance
- Double opt-in custom (GetResponse lo maneja según config de tu lista).
- Página de "gracias" separada (mostramos confirmación inline + toast).
- Etiquetas/segmentación avanzada en GetResponse.
- Tracking analytics extra (se puede sumar luego).

## Necesito de tu lado (te lo pediré al pasar a build)
1. **GETRESPONSE_API_KEY** (Panel GetResponse → Menu → Integrations & API → API → Generate API key).
2. **GETRESPONSE_CAMPAIGN_ID** (ID alfanumérico de la lista donde se sumarán los contactos — lo ves en GetResponse → Contacts → Lists → editar lista, o lo levantamos vía API si preferís).
