# 🛍️ Ove Clothes - Ecommerce Mejorado

## ✨ Cambios Realizados

### 1. Panel Admin Completamente Nuevo (/admin)

- ✅ Formulario limpio y simple para crear productos
- ✅ **Explicación clara sobre cómo funcionan las imágenes** (caja de advertencia naranja)
- ✅ Agregar dinámicamente: variantes (talle + color), imágenes
- ✅ Lista de productos con vista previa
- ✅ Botón delete para cada producto
- ✅ Mensajes de éxito/error

**¿Cómo funciona?**

1. Ve a `http://localhost:3000/admin`
2. Ingresa contraseña: `admin123`
3. Crea producto con nombre, precio, stock
4. Agrega variantes (Talle + Color)
5. **Agrega imágenes:**
   - Primero coloca la imagen en `/public/productos/` (manualmente)
   - Luego pega la ruta en el formulario: `/productos/remera-azul.jpg`
6. ¡Listo! El producto aparece en la tienda automáticamente

### 2. Tienda Visual (/store o página principal)

- ✅ Grid responsivo de productos desde la API
- ✅ Cada card muestra: imagen, nombre, precio, stock
- ✅ Efecto hover en las imágenes
- ✅ Clickeable para ir al detalle

### 3. Página de Detalle de Producto (/products/[id])

- ✅ Galería de imágenes con thumbnails
- ✅ Selector de variantes (talle + color)
- ✅ Selector de cantidad (+ / -)
- ✅ Cálculo automático del total
- ✅ Formulario de cliente (nombre, teléfono opcional)
- ✅ **Botón "Comprar por WhatsApp"** (verde)

### 4. Checkout por WhatsApp

El botón genera automáticamente un mensaje con:

```
Hola! Quiero comprar:

📦 *Nombre del Producto*
💵 Precio: $XX
📊 Cantidad: X
👕 Talle: M
🎨 Color: Azul

💰 *Total: $XXX*

Nombre: Juan Pérez
Teléfono: +5491234567890
```

Y redirige a WhatsApp con el mensaje pre-llenado.

---

## 🚀 Flujo de Uso

### ADMIN

```
1. Ir a /admin
2. Contraseña: admin123
3. Crear producto
   - Nombre
   - Precio
   - Stock
   - Variantes (opcional: talle + color)
   - Imágenes (se agregan manualmente a /public/productos)
4. ✓ Producto creado
```

### CLIENTE

```
1. Ver tienda (página principal)
2. Clickear en producto
3. Ver detalles:
   - Galería de imágenes
   - Seleccionar variante (talle + color)
   - Seleccionar cantidad
   - Ingresar nombre y teléfono
4. Clickear "Comprar por WhatsApp"
5. Se abre WhatsApp con mensaje pre-llenado
```

---

## 📁 Estructura de Carpetas

```
/app
  /api
    /products
      route.ts          ← GET (público) | POST (admin)
      /[id]
        route.ts        ← GET (público) | DELETE (admin)
    /order
      route.ts          ← POST crear orden
    /orders
      route.ts          ← GET listado de órdenes (admin)

  /admin
    page.tsx            ← Panel admin (nuevo)

  /products
    /[id]
      page.tsx          ← Detalle de producto (mejorado)

  page.tsx              ← Home / Tienda (actualizado)

/lib
  mongodb.ts            ← Conexión MongoDB
  /models
    Product.ts          ← Esquema producto
    Order.ts            ← Esquema orden
  whatsapp-checkout.ts  ← Funciones WhatsApp

/components
  product-grid-store.tsx  ← Grid de tienda (nueva)
  ...otros componentes
```

---

## 🖼️ Cómo Funcionan las Imágenes

### IMPORTANTE: Las imágenes NO se suben desde el admin

**Proceso:**

1. **Agrega la imagen manualmente a `/public/productos/`**
   - Usa FTP, Git, o File Manager
   - Ejemplo: `remera-azul.jpg`, `producto.png`, etc.

2. **En el admin, pega la ruta:**
   - Campo: "Rutas de Imágenes"
   - Ejemplo: `/productos/remera-azul.jpg`
   - Clickea el botón **+**

3. **Puedes agregar múltiples imágenes:**
   - Primera imagen = thumbnail en la tienda
   - Todas las imágenes = galería en el detalle

---

## 📋 API Endpoints

### Públicos (sin autenticación)

#### GET /api/products

```bash
curl http://localhost:3000/api/products
```

Devuelve todos los productos

#### GET /api/products/:id

```bash
curl http://localhost:3000/api/products/67a1b2c3d4e5f6g7h8i9j0k1
```

Devuelve un producto específico

#### POST /api/order

```bash
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "products": [{
      "productId": "...",
      "quantity": 2,
      "selectedVariant": {"size": "M", "color": "Azul"}
    }],
    "customer": {
      "name": "Juan",
      "phone": "+549123...",
      "address": "Calle 123",
      "postalCode": "1425",
      "notes": "Instrucciones de entrega"
    },
    "total": 100
  }'
```

Crea una nueva orden

### Admin (requiere header x-admin-secret: admin123)

#### POST /api/products

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: admin123" \
  -d '{
    "name": "Remera Azul",
    "price": 50,
    "stock": 10,
    "variants": [
      {"size": "M", "color": "Azul"},
      {"size": "L", "color": "Azul"}
    ],
    "images": ["/productos/remera-azul.jpg"]
  }'
```

Crea un nuevo producto

#### DELETE /api/products/:id

```bash
curl -X DELETE http://localhost:3000/api/products/67a1b2c3d4e5f6g7h8i9j0k1 \
  -H "x-admin-secret: admin123"
```

Elimina un producto

#### GET /api/orders

```bash
curl http://localhost:3000/api/orders \
  -H "x-admin-secret: admin123"
```

Obtiene todas las órdenes

---

## 🔑 Variables de Entorno

```env
# Conexión MongoDB
MONGODB_URI=mongodb://localhost:27017/oveclothes

# Autenticación admin en backend
ADMIN_SECRET=admin123

# Autenticación admin en frontend (se usa en el formulario)
NEXT_PUBLIC_ADMIN_SECRET=admin123
```

---

## 🛠️ Configuración Inicial

### 1. Asegúrate que MongoDB está corriendo

```bash
mongod
```

### 2. Reinicia el servidor Next.js

```bash
npm run dev
# o
pnpm dev
```

### 3. Prueba los endpoints

**Ver productos:**

```
http://localhost:3000/api/products
```

**Ir a admin:**

```
http://localhost:3000/admin
```

Contraseña: `admin123`

**Ir a tienda:**

```
http://localhost:3000/
```

---

## 📝 Notas Importantes

- ✅ El stock se reduce automáticamente cuando se crea una orden
- ✅ No se puede crear una orden sin stock suficiente
- ✅ Las imágenes deben colocarse manualmente en `/public/productos/`
- ✅ El admin panel es muy simple, sin validaciones complejas
- ✅ No hay sistema de usuarios, solo protección simple con contraseña
- ✅ El mensaje WhatsApp se genera automáticamente con los datos del cliente
- ✅ El teléfono en el checkout es opcional

---

## 🚨 Troubleshooting

### "Error al conectar con MongoDB"

- Verifica que `mongod` está corriendo

### "Contraseña incorrecta en admin"

- Reinicia el servidor (Ctrl+C y `npm run dev`)
- La contraseña es: `admin123`

### Las imágenes no se ven

- Verifica que están en `/public/productos/`
- La ruta debe empezar con `/productos/`
- Ejemplo correcto: `/productos/remera.jpg`

### El WhatsApp no abre

- Verifica que ingresaste el nombre
- Verifica que tienes WhatsApp Web disponible
- El teléfono es opcional

---

## 💡 Tips para No-Técnicos

- **Admin es tu espacio:** Crea y gestiona productos
- **Tienda es para clientes:** Ven y compran by WhatsApp
- **Imágenes:** Manualidad en `/public/productos`, ruta en admin
- **No hay login de clientes:** Todo es simple y directo
- **Pedidos se guardan:** En la base de datos MongoDB
