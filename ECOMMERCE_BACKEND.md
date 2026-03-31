# Ecommerce Backend - Guía de Uso

## Configuración

### 1. Instalar dependencias

```bash
npm install mongoose
# o
pnpm add mongoose
```

### 2. Configurar variables de entorno (.env.local)

```
MONGODB_URI=mongodb://localhost:27017/oveclothes
ADMIN_SECRET=admin123
```

### 3. Asegúrate de que MongoDB esté corriendo

```bash
# En otra terminal
mongod
```

## API Endpoints

### Productos

#### GET /api/products

Obtiene todos los productos

```bash
curl http://localhost:3000/api/products
```

**Respuesta:**

```json
[
  {
    "_id": "...",
    "name": "Remera Azul",
    "price": 50,
    "stock": 10,
    "variants": [{ "size": "M", "color": "Azul" }],
    "images": ["/productos/remera-1.jpg"],
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### POST /api/products (Admin)

Crear un nuevo producto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: admin123" \
  -d '{
    "name": "Remera Azul",
    "price": 50,
    "stock": 10,
    "variants": [
      { "size": "M", "color": "Azul" },
      { "size": "L", "color": "Azul" }
    ],
    "images": ["/productos/remera-1.jpg"]
  }'
```

### Órdenes

#### POST /api/order

Crear una nueva orden

```bash
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {
        "productId": "67a1b2c3d4e5f6g7h8i9j0k1",
        "quantity": 2,
        "selectedVariant": {
          "size": "M",
          "color": "Azul"
        }
      }
    ],
    "customer": {
      "name": "Juan Pérez",
      "phone": "+5491234567890",
      "address": "Calle 123, Apto 4",
      "postalCode": "1425",
      "notes": "Entregar después de las 18hs"
    },
    "total": 100
  }'
```

**Respuesta:**

```json
{
  "success": true,
  "orderId": "...",
  "message": "Order created successfully"
}
```

#### GET /api/orders (Admin)

Obtener todas las órdenes

```bash
curl http://localhost:3000/api/orders \
  -H "x-admin-secret: admin123"
```

## Panel Admin

Accede a: `http://localhost:3000/admin`

Contraseña por defecto: `admin123`

**Features:**

- Ver todas las órdenes
- Información del cliente
- Enlace directo a WhatsApp
- Total de órdenes

## Frontend Integration

### Ejemplo: Usar checkout con WhatsApp

```typescript
import { sendOrderAndRedirectWhatsApp } from "@/lib/whatsapp-checkout";

// En tu componente
const handleCheckout = async () => {
  try {
    await sendOrderAndRedirectWhatsApp({
      items: [
        {
          productId: "67a1b2c3d4e5f6g7h8i9j0k1",
          name: "Remera Azul",
          quantity: 2,
          price: 50,
          selectedVariant: {
            size: "M",
            color: "Azul",
          },
        },
      ],
      customerName: "Juan Pérez",
      phone: "+5491234567890",
      address: "Calle 123, Apto 4",
      postalCode: "1425",
      notes: "Entregar después de las 18hs",
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### Mensaje WhatsApp generado

```
Hola, quiero comprar:
- Remera Azul x2 (Talle: M, Color: Azul)

Total: $100.00
```

## Estructura de Base de Datos

### Colección: products

```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  stock: Number,
  variants: [
    {
      size: String,
      color: String
    }
  ],
  images: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: orders

```javascript
{
  _id: ObjectId,
  products: [
    {
      productId: String,
      quantity: Number,
      selectedVariant: {
        size: String,
        color: String
      }
    }
  ],
  total: Number,
  customer: {
    name: String,
    phone: String,
    address: String,
    postalCode: String,
    notes: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Cambiar contraseña admin

1. Actualiza la variable `ADMIN_SECRET` en `.env.local`
2. Reinicia el servidor Next.js

```env
ADMIN_SECRET=mi_nueva_contrasena_segura
```

## Notas Importantes

- El stock se reduce automáticamente cuando se crea una orden
- No se permite crear órdenes sin stock suficiente
- La autenticación admin es a través del header `x-admin-secret`
- MongoDB debe estar corriendo en tu máquina local (o reemplaza MONGODB_URI)
- Los IDs de productos son ObjectIds de MongoDB (copialos desde /api/products)
