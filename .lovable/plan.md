## Objetivo
Que todos los suscriptores del formulario de newsletter del sitio caigan en la campaña de GetResponse con ID **`GbvSq`** (la que tiene la secuencia de autoresponders activos).

## Estado actual
- ✅ Edge function `subscribe-newsletter` funcionando.
- ✅ Formulario en `/newsletter-desde-cero` enviando nombre + email.
- ✅ Secret `GETRESPONSE_API_KEY` cargado.
- ⚠️ Secret `GETRESPONSE_CAMPAIGN_ID` cargado pero con un valor que no es `GbvSq` → hay que actualizarlo.

## Pasos

### 1. Actualizar el secret `GETRESPONSE_CAMPAIGN_ID`
Abrir el formulario seguro de secrets y pegar el nuevo valor: **`GbvSq`**.  
(No se ve en el chat. Lo hacés vos en el formulario que te abro.)

### 2. Verificar que el secret apunte a la campaña correcta
Llamar a `GET https://api.getresponse.com/v3/campaigns/GbvSq` desde un test rápido y confirmar que devuelve el nombre de tu campaña de newsletter. Te muestro el nombre en chat para que valides.

### 3. Test end-to-end real
- Suscribirse desde el formulario del sitio con un email de prueba.
- Verificar en GetResponse → **Contacts** que el contacto aparezca en la campaña `GbvSq` con **Day of cycle = 0**.
- Confirmar que llega el primer correo de la secuencia (si tenés *Confirmed opt-in* activado, primero llega el de confirmación y la secuencia arranca después del clic).

## Qué no se toca
- No se modifica el código del edge function ni el del formulario (ya usan `GETRESPONSE_CAMPAIGN_ID` correctamente).
- No se crean secrets nuevos ni se cambia el flujo.

## Qué necesito de vos
Confirmar el plan. Al pasar a build mode te abro el formulario para pegar `GbvSq` como nuevo valor de `GETRESPONSE_CAMPAIGN_ID`.
