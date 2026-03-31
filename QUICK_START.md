# ⚡ QUICK START - Cómo Empezar Ahora

## 1️⃣ Asegúrate que MongoDB está corriendo

```bash
mongod
```

Deberías ver: `[initandlisten] Waiting for connections on port 27017`

## 2️⃣ Reinicia el servidor Next.js

```bash
npm run dev
```

Espera que compile.

## 3️⃣ Abre el Admin

Ve a: **http://localhost:3000/admin**

Contraseña: `admin123`

![Verás un formulario limpio para crear productos]

## 4️⃣ Crea tu primer producto

**Llena el formulario:**

- Nombre: "Remera Negra"
- Precio: 50
- Stock: 5

**Agrega una variante:**

- Talle: M
- Color: Negro
- (Click en "+ Agregar Variante")

**Agrega una imagen:**

- Primero: Coloca la imagen en `/public/productos/remera.jpg` (manualmente)
- Luego: En el admin pega: `/productos/remera.jpg`
- (Click en "+")

**Crea el producto:**

- Click en "✓ Crear Producto"
- Verás: "✓ Producto creado exitosamente"

## 5️⃣ Ve a la Tienda

Ve a: **http://localhost:3000/**

Deberías ver tu producto en el grid.

## 6️⃣ Prueba el Checkout

- Clickea en el producto
- Verás: Galería, variantes, cantidad, precio total
- Ingresa tu nombre
- Click en "📱 Comprar por WhatsApp"
- ¡Se abre WhatsApp con el mensaje!

---

## 🎯 Eso es todo!

Tu ecommerce está listo. Ahora puedes:

✅ Crear productos  
✅ Gestionar imágenes  
✅ Ver pedidos  
✅ Recibir órdenes por WhatsApp

---

## 📚 Para más detalles

- Ver: [GUIA_SISTEMA_MEJORADO.md](GUIA_SISTEMA_MEJORADO.md)
- Ver: [RESUMEN_CAMBIOS.md](RESUMEN_CAMBIOS.md)
