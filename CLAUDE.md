# CLAUDE.md — Comunidad NM Roller

## ⭐ Principio rector (PRIORIDAD MÁXIMA)

Cuando el usuario pida algo, **buscá siempre el camino más fácil / menos complejo pero eficiente, sin sacrificar la calidad del resultado.**

- Antes de meterte en un proceso largo o enredado, **frená y preguntá: ¿hay una forma más simple de lograr el mismo resultado de calidad?** Si la hay, proponéla primero.
- Si en mitad de una tarea notás que **nos estamos complicando demasiado** (muchos pasos, dependencias externas, configuraciones pesadas, fricción innecesaria), **decílo de una y ofrecé la alternativa simple** en vez de seguir empujando el camino difícil.
- Evaluá las opciones mentalmente y recomendá la mejor relación **simplicidad ↔ resultado**, no la primera que aparezca.
- No hace falta pedir permiso para pensar en simple: es el modo por defecto.

**Ejemplo real (junio 2026):** para el mapa interactivo nos metimos con Google Maps → API keys, restricciones de dominio, Google Cloud, billing con tarjeta… un lío. La solución simple y de igual calidad era **Leaflet + OpenStreetMap** (gratis, sin key, sin tarjeta). Si lo hubiéramos visto desde el principio, nos ahorrábamos todos esos problemas. **Esa es la mentalidad que se espera siempre.**

---

## Contexto del proyecto

- **Qué es:** landing/sitio de NM Roller (escuela de patinaje, Buenos Aires). React + Vite + TypeScript + Tailwind + shadcn/ui.
- **Origen:** generado en **Lovable**, sincronizado con GitHub (`git@github.com:gumercindoweb/comunidadnmroller.git`).
- **Backend:** Supabase (Edge Functions `subscribe-newsletter` y `notify-comprobante`) + GetResponse (secuencias de email). Lovable administra ese Supabase; las Edge Functions se redeployan desde Lovable.

## Flujo de trabajo (Git)

- ⭐ **SIEMPRE que apliques un cambio: commit + push a `main` automáticamente.** No esperar a que el usuario lo pida. Tras cada tanda de cambios, hacer `git add` de los archivos tocados, commit con mensaje claro y `git push origin main`. Lovable sincroniza desde GitHub.
- Mensaje de commit en español, conciso, con prefijo tipo `fix()/copy()/feat()`.

## Deploy (producción)

- **Hosting:** Hostinger (cPanel / File Manager), dominio `comunidadnmroller.com`.
- **Flujo:** `npm run build` → subir el contenido de `dist/` a `public_html/`.
- ⚠️ **Nunca tocar la carpeta `public_html/lp/`** → es el subdominio `lp.comunidadnmroller.com`, vive aparte.
- El sitio es **SPA**: requiere `.htaccess` en `public_html/` que redirige todo a `index.html` (si falta, las rutas internas dan 404 al recargar). Ya está en `public/.htaccess`.
- SSH de Hostinger existe pero el puerto puede dar timeout; el camino confiable es cPanel File Manager.

## Notas técnicas

- **Mapa:** Leaflet + tiles oscuros de CARTO (`SedesMapa.tsx`). Sin Google Maps, sin API key, sin billing.
- **Pagos:** links de Mercado Pago por plan en `PricingSection.tsx`; al volver, el usuario sube comprobante en `/pago-confirmado`.
- **Dev server:** Vite en puerto 8080 (o `PORT` si el preview lo asigna).
