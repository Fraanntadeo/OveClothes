# 📸 Configuración de Imágenes - OveClothes

Este documento explica cómo configurar las imágenes en el proyecto sin necesidad de un backend o base de datos.

## 📁 Estructura de Carpetas

```
public/
└── images/
    └── products/
        ├── 1/
        │   ├── main.webp         (imagen principal - WEBP recomendado)
        │   ├── negro.webp        (variante de color)
        │   ├── blanco.png        (admite PNG también)
        │   ├── rojo.jpg          (y JPG)
        │   ├── gris.webp
        │   └── azul.webp
        ├── 2/
        │   ├── main.jpg
        │   ├── negro.png
        │   ├── blanco.webp
        │   └── ...
        └── ...
```

✨ **Soporta:** WEBP (⭐ recomendado), JPG, PNG

## ➕ Cómo Agregar Imágenes

### Paso 1: Organiza tus imágenes

1. Coloca las imágenes en `public/images/products/{product-id}/`
2. Nombra la imagen principal como `main.{webp|jpg|png}` (recomendado: WEBP)
3. Nombra las variantes de color como `{color-name}.{webp|jpg|png}` (ejemplo: `negro.webp`, `blanco.png`)

### Paso 2: Actualiza los datos en `lib/products.ts`

```typescript
{
  id: "1",
  name: "Remera Oversize Algodón",
  image: "/images/products/1/main.webp",  // imagen principal (WEBP recomendado)
  colors: [
    {
      name: "Negro",
      hex: "#000000",
      image: "/images/products/1/negro.webp",  // imagen del color (WEBP, JPG o PNG)
      stock: 5,
    },
    // ...
  ]
}
```

## 🎨 Convenciones Recomendadas

### Nombres de Archivos

- **Imagen principal**: `main.webp` (o `main.jpg`, `main.png`)
- **Colores**: `{nombre-color}.webp` en minúsculas (ejemplo: `gris.webp`, `blanco.png`)
- **No usar espacios** en los nombres de archivos

### Formatos de Imagen

| Formato     | Ventajas                              | Desventajas          | Mejor para        |
| ----------- | ------------------------------------- | -------------------- | ----------------- |
| **WEBP** ⭐ | 50-80% más pequeño, excelente calidad | Navegadores antiguos | **Fotos de ropa** |
| **JPG**     | Amplio soporte, buena compresión      | Más pesado que WEBP  | Fotos genéricas   |
| **PNG**     | Transparencia, sin pérdida            | Más pesado, limitado | Gráficos, iconos  |

### Dimensiones de Imágenes

- **Recomendado**: 500x650px (proporción 3:4)
- **Formato**: WEBP (recomendado), JPG o PNG
- **Peso máximo**:
  - WEBP: <150KB
  - JPG/PNG: <200KB

### Estructura de Datos

Los datos de productos están en `lib/products.ts`:

- Cada producto tiene una imagen principal (`image`)
- Cada color tiene su propia imagen (`colors[i].image`)
- Los valores son rutas relativas comenzando con `/`

## 🔄 Sincronización Automática

El componente `ProductCard` ya está configurado para:

- Leer imágenes desde rutas locales
- Manejar errores de carga de imágenes
- Optimizar imágenes con Next.js Image component

## 💡 Alternativas

### Usar SVGs para prototipos rápidos

Si aún no tienes las imágenes finales, puedes usar placeholders SVG:

```typescript
image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='650'%3E%3Crect fill='%231a1a1a' width='500' height='650'/%3E%3Ctext x='250' y='325' text-anchor='middle' fill='%23999' font-size='48'%3E500x650%3C/text%3E%3C/svg%3E";
```

### Usar URLs externas (temporal)

Si aún estás desarrollando, puedes mantener URLs externas en el archivo `data/products.json` como respaldo.

## ✅ Checklist para Preparar Imágenes

- [ ] Crear carpeta `public/images/products/`
- [ ] Subir imágenes en `public/images/products/{id}/`
- [ ] Nombrar `main.jpg` para imagen principal
- [ ] Nombrar variantes `{color}.jpg`
- [ ] Actualizar rutas en `lib/products.ts`
- [ ] Probar carga de imágenes en desarrollo
- [ ] Optimizar peso de imágenes (<200KB)

## 🚀 Usar los Datos en Componentes

Ejemplo de uso en componentes:

```typescript
import { getAllProducts } from '@/lib/products';

export function ProductGrid() {
  const products = getAllProducts();

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 📚 Recursos

- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [TinyPNG - Optimizar imágenes](https://tinypng.com/)
- [Compressor.io - Compresión online](https://compressor.io/)
