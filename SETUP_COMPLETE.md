# Preparación del Proyecto - Imágenes en Código

## ✅ Cambios Realizados

El proyecto ha sido configurado para gestionar imágenes sin backend ni base de datos. Aquí está el resumen:

### 1. **Sistema de Datos Centralizado** (`lib/products.ts`)

- Base de datos de productos completamente en código
- Tipos TypeScript robustos
- Funciones helper para acceder a datos:
  - `getAllProducts()` - obtener todos
  - `getProductById(id)` - obtener uno específico
  - `getProductsByCategory(category)` - filtrar por categoría
  - `getCategories()` - obtener categorías disponibles

### 2. **Estructura de Carpetas**

```
public/images/products/
├── 1/
│   ├── main.jpg
│   ├── negro.jpg
│   ├── blanco.jpg
│   └── ...
├── 2/
└── ...
```

### 3. **Componentes Actualizados**

- ✅ `components/product-grid.tsx` - usa datos locales
- ✅ `app/products/[id]/page.tsx` - usa datos locales
- ✅ `app/products/[id]/ProductDetailContent.tsx` - importa tipos de `lib/products`

### 4. **Documentación**

- 📄 `IMAGES_SETUP.md` - guía completa
- 📄 `lib/products.example.ts` - ejemplo de cómo agregar productos
- 📄 `SETUP_COMPLETE.md` - este archivo

---

## 🚀 Próximos Pasos

### 1. **Agregar tus imágenes**

```bash
# Estructura la carpeta así:
public/images/products/
└── {id}/
    ├── main.jpg (imagen principal del producto)
    ├── negro.jpg
    ├── blanco.jpg
    ├── rojo.jpg
    ├── gris.jpg
    └── azul.jpg
```

### 2. **Actualizar rutas en `lib/products.ts`**

```typescript
// Si tus imágenes están en public/images/products/1/
image: "/images/products/1/main.jpg",
colors: [
  {
    name: "Negro",
    hex: "#000000",
    image: "/images/products/1/negro.jpg", // ← Ruta local
    stock: 5,
  },
]
```

### 3. **Agregar más productos**

- Édita `lib/products.ts`
- Agrega un nuevo objeto al array `products`
- Copia la estructura del `lib/products.example.ts`
- Crea la carpeta de imágenes correspondiente

### 4. **Probar en desarrollo**

```bash
npm run dev
# o
pnpm dev
```

---

## 🎨 Recomendaciones de Imágenes

### Dimensiones

- **Recomendado**: 500x650px (proporción 3:4)
- **Mínimo**: 400x520px
- **Máximo**: 800x1040px

### Formatos

- **JPG**: para fotos de ropa (mejor compresión)
- **PNG**: si necesitas transparencia
- **WebP**: para ventajas modernas (Next.js lo soporta)

### Tamaño de Archivo

- Máximo **200KB por imagen**
- Herramientas de optimización: TinyPNG, ImageOptim, Compressor.io

### Velocidad de Carga

Next.js optimiza automáticamente las imágenes:

- Responsive design
- Lazy loading
- Formato moderno (WebP)
- Compresión automática

---

## 📊 Estructura de Datos Actual

El proyecto incluye **4 productos de ejemplo**:

1. Remera Oversize Algodón (5 colores)
2. Buzo Hoodie Básico (5 colores)
3. Pantalón Cargo Wide (5 colores)
4. Campera Rompevientos (5 colores)

Cada uno con:

- Precio en ARS
- Múltiples tallas
- 5 variantes de color
- Stock por color

---

## 🔍 Archivos Clave

| Archivo                       | Propósito             |
| ----------------------------- | --------------------- |
| `lib/products.ts`             | Base de datos + tipos |
| `lib/product-helpers.ts`      | Funciones auxiliares  |
| `components/product-grid.tsx` | Grilla de productos   |
| `components/product-card.tsx` | Card individual       |
| `app/products/[id]/page.tsx`  | Página de detalle     |
| `IMAGES_SETUP.md`             | Guía de imágenes      |

---

## ⚠️ Importante

1. **Rutas comenzar con `/`**: `/images/products/1/main.jpg`
2. **Carpetas deben existir**: Crea la estructura antes de usar
3. **Nombres sin espacios**: `negro.jpg` no `Negro Claro.jpg`
4. **Sin acentos en rutas**: Usa guiones: `azul-marino.jpg`
5. **Imagen obligatoria**: Cada producto necesita `main.jpg`

---

## 💡 Alternativas

### PlaceHolder Rápido (Si no tienes imágenes)

```typescript
image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='650'%3E%3Crect fill='%231a1a1a' width='500' height='650'/%3E%3Ctext x='250' y='325' text-anchor='middle' fill='%23999' font-size='48'%3E500x650%3C/text%3E%3C/svg%3E";
```

### URLs Externas (Temporal)

```typescript
image: "https://images.unsplash.com/photo-..."; // Sigue funcionando
```

---

## 🆘 Troubleshooting

### Las imágenes no cargan

1. Verifica que la ruta comience con `/`
2. Asegúrate que el archivo existe en `public/`
3. Reinicia el servidor: `npm run dev`
4. Abre DevTools (F12) > Network > verifica el 404

### Imágenes se ven pixeladas

- Aumenta la resolución de la imagen original
- Mínimo 500x650px recomendado

### El proyecto es lento

- Optimiza imágenes (<200KB cada una)
- Usa TinyPNG para comprimir
- Verifica que no haya URLs externas bloqueadas

---

## 📚 Lectura Recomendada

- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image)
- [Optimización de Imágenes para Web](https://web.dev/image-optimization/)
- [TypeScript para React](https://www.typescriptlang.org/docs/handbook/react.html)

---

**¡Listo para empezar!** Commienza agregando tus imágenes a `public/images/products/`
