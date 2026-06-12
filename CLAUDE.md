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

---

## 🔧 Errores recurrentes y cómo se resolvieron

> ⭐ **REGLA (PRIORIDAD ALTA):** ante un error **igual o parecido** a alguno de abajo,
> **NO reinventar el diagnóstico**: ir directo a este apartado, identificar el patrón y
> **repetir el fix documentado** que ya funcionó. Recién si no aplica, investigar de cero.
> Si aparece un **error nuevo que se repite**, sumá su patrón (síntoma → causa → fix) a esta lista.

> **Antes de pelear con un bug de deploy/Hostinger/Lovable, leé acá: ya nos pasó.**

### 1. El sitio en producción da **404** en todo (home, rutas internas) tras subir el `dist/`
- **Causa típica:** el `.htaccess` que está en `public_html/` no es el nuestro (quedó uno viejo) o no se aplicó.
- **Fix que funcionó:** abrir el `.htaccess` en el editor del File Manager y pegar el contenido bueno (el de `public/.htaccess`). El acto de guardarlo fuerza al server a releerlo.
- El `.htaccess` correcto pesa **~1.1 KiB (1155 bytes)**. Si ves uno de ~203 bytes, es el viejo malo.

### 2. URLs se redirigen a **minúsculas** (301) → assets de Vite (con mayúsculas en el hash) dan 404
- **Síntoma:** `/assets/index-CLz5p8Rf.js` → 301 → `/assets/index-clz5p8rf.js` → 404. Probar `curl -skI .../TEST-MAYUS`: si da 301 a `/test-mayus`, hay regla de lowercase activa.
- **Causa:** un `.htaccess` viejo con regla `tolower`/lowercase. NO está en el nuestro.
- **Fix:** reemplazar el `.htaccess` por el nuestro (sin esa regla). Si persiste, **purgar la caché de Hostinger** (hPanel → Performance/Caché → vaciar; revisar CDN).

### 3. **Pantalla en blanco** tras un deploy (el `<title>` carga pero nada más)
- **Causa:** el navegador tiene cacheado el `index.html` viejo, que pide un JS con hash anterior; ese JS ya no existe y el `.htaccess` SPA lo sirve como `index.html` (HTML) → "Failed to load module script" → blanco.
- **Fix:** el `.htaccess` ya fuerza `ExpiresByType text/html "access plus 0 seconds"` (HTML sin caché). Para el usuario: **hard reload** (Cmd+Shift+R) o incógnito.

### 4. Al subir el `.htaccess` no aparece / no se sube
- Es un **archivo oculto**. En el File Manager: Settings → **"Show hidden files (dotfiles)"**. Sin esto no lo ves ni lo subís y el sitio sigue en 404.

### 5. Guardar `.htaccess` con `Header set ...` da **403 Forbidden (openresty)**
- El **WAF de Hostinger** bloquea directivas `Header set`. Para "no-cache del HTML" usar **`mod_expires`** (`ExpiresByType text/html "access plus 0 seconds"`), no `mod_headers`.

### 6. `git push` rechazado: **"Updates were rejected (fetch first)"**
- Lovable también pushea a `main`. Hacer **`git pull --rebase origin main`** y volver a pushear.

### 7. Logos/imágenes de Lovable **rotas en Hostinger**
- Lovable guarda assets como `*.webp.asset.json` con URL **`/__l5e/assets-v1/...`** que solo existe en su hosting → 404 en Hostinger.
- **Fix:** descargar el `.webp` real (`https://id-preview--<project_id>.lovable.app/__l5e/assets-v1/<asset>`), guardarlo en `src/assets/` e importarlo normal (`import x from "@/assets/x.webp"`, usar `x` directo, no `x.url`). Así entra al bundle.

### 8. El **deploy es manual**: pushear a GitHub NO actualiza el sitio en vivo
- GitHub/Lovable ≠ producción. Producción es Hostinger (`public_html/`). Hay que `npm run build` y subir el `dist/`.
- **Tip:** zipear el `dist/` (`cd dist && zip -r ../nmroller-dist.zip .`) y subir 1 archivo. **Ojo:** el File Manager de Hostinger **obliga a poner nombre de carpeta** al extraer → extrae en `public_html/<nombre>/`; después hay que **mover el contenido** (incluido `.htaccess`) a `public_html/` y borrar la temporal.

### 9. Mensaje de WhatsApp pre-llenado sale **genérico** (placeholders)
- El pre-llenado usa **router state** (en memoria), que se pierde al recargar o entrar directo a la confirmación. Por eso, si abrís la confirmación sin pasar por el form, sale el fallback. Ya hay **backup en `sessionStorage`** (claves `sportclub_form`, `clasegratis_form`) para que sobreviva recargas.

### 10. Screenshots del preview salen en **negro** (glitch)
- Verificar por DOM con `preview_eval` (leer textos/atributos) en vez de pelear con el screenshot.

### 11. **CDN de Hostinger** rompe el dominio (404 en algunos edges, SSL error, cambia la IP)
- **Síntoma:** al activar el CDN de Hostinger, el dominio cambia a una **IP de CDN** (ej. `104.160.67.72`, headers "pelados" sin `server`), que puede **cachear los 404 viejos** y servirlos en algunos edges (anda en una red/celu y en otra no). Al **desactivarlo**, queda en limbo de propagación con **error SSL** ("conexión no es privada") hasta que el DNS vuelva al origen (**24–48 hs**, normalmente menos).
- **Diagnóstico:** comparar IPs con `dig +short comunidadnmroller.com`. El **origen real** es `185.249.224.136` / `77.37.85.34` (el de `lp` es otro: `62.72.62.63`). Verificar que el origen está sano sin depender del DNS:
  `curl -sk --resolve comunidadnmroller.com:443:185.249.224.136 https://comunidadnmroller.com/ | grep '<title>'` → debe dar "Escuela #1 de Patinaje…".
- **Fix:** **mantener el CDN DESACTIVADO** para este sitio (es liviano, no lo necesita) y esperar la propagación DNS al origen. No tocar archivos: el origen ya está bien. Flush DNS local del Mac: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.
