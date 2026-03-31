# 🔧 Solución - Admin y API Routes

## Problema 1: Error de Static Export

El proyecto estaba configurado con `output: "export"` lo que no permite rutas API dinámicas.

**Solución:** He actualizado `next.config.mjs` para que solo use static export cuando `DEPLOY_TARGET=github-pages`. En desarrollo local, Now puedes usar rutas API.

## Problema 2: Admin dice "Contraseña Incorrecta"

**Causa:** Necesitas **reiniciar el servidor de desarrollo** para que las variables de entorno de `.env.local` se carguen correctamente.

### Pasos para Arreglarlo:

1. **Detén el servidor** (Ctrl+C en la terminal donde está corriendo `npm run dev`)

2. **Reinicia el servidor:**

```bash
npm run dev
# o
pnpm dev
```

3. **Accede a:** `http://localhost:3000/admin`

4. **Ingresa la contraseña:** `admin123`

## Verificar que todo esté funcionando:

### 1. Prueba GET /api/products (público)

```bash
curl http://localhost:3000/api/products
```

Debería devolver: `[]` (array vacío) - sin error

### 2. Prueba POST /api/products (admin)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: admin123" \
  -d '{
    "name": "Test Product",
    "price": 100,
    "stock": 5,
    "variants": [{"size": "M", "color": "Red"}],
    "images": ["/productos/test.jpg"]
  }'
```

Debería devolver el producto creado con `_id`

### 3. Prueba GET /api/orders (admin only)

```bash
curl http://localhost:3000/api/orders \
  -H "x-admin-secret: admin123"
```

Debería devolver: `[]` (sin error de Unauthorized)

### 4. Accede al Admin Panel

- URL: `http://localhost:3000/admin`
- Contraseña: `admin123`

Deberías ver la lista de órdenes (vacía al inicio)

## Si Aún No Funciona:

1. Verifica que `.env.local` tenga:

```
MONGODB_URI=mongodb://localhost:27017/oveclothes
ADMIN_SECRET=admin123
```

2. Verifica que MongoDB esté corriendo:

```bash
mongod
```

3. En PowerShell, verifica la variable de entorno:

```powershell
$env:ADMIN_SECRET
```

Debería mostrar: `admin123`

## Cambios Realizados:

✅ `next.config.mjs` - Static export solo para GitHub Pages  
✅ Todas las rutas API - Agregado `export const dynamic = 'force-dynamic'`  
✅ `.env.local` - Ya contiene `ADMIN_SECRET=admin123`
