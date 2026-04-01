/**
 * EJEMPLO: Cómo agregar un nuevo producto
 *
 * Este archivo muestra cómo estructurar un nuevo producto
 * para el sistema de gestión local sin backend
 */

// Paso 1: Agregar el producto a lib/products.ts en el array 'products'
const newProductExample = {
  id: "5", // ID único
  name: "Nombre del Producto",
  price: 45000, // Precio en ARS
  originalPrice: 55000, // Opcional: precio original para descuentos
  category: "Remeras" as const, // Debe ser una categoría válida
  isNew: true, // Opcional: marca el producto como nuevo
  sizes: ["S", "M", "L", "XL"],
  image: "/images/products/5/main.jpg", // Imagen principal
  description: "Descripción breve del producto", // Opcional
  colors: [
    {
      id: "1",
      name: "Negro",
      hex: "#000000",
      image: "/images/products/5/negro.jpg", // Imagen del color específico
      stock: 5,
    },
    {
      name: "Blanco",
      hex: "#FFFFFF",
      image: "/images/products/5/blanco.jpg",
      stock: 8,
    },
    // ... más colores
  ],
};

// Paso 2: Crear la carpeta de imágenes
// public/images/products/5/
//   ├── main.webp       (imagen principal - 500x650px, recomendado WEBP)
//   ├── main.jpg        (alternativa JPG)
//   ├── negro.webp      (variante de color)
//   ├── blanco.png
//   └── ...

// Paso 3: Nombrar las imágenes consistentemente
// Convenciones:
// - main.{webp|jpg|png} para portada
// - {color}.{webp|jpg|png} en minúsculas para las variantes
// - Ejemplo: "azul-marino.webp" NOT "Azul Marino.jpg"
// - Formatos: WEBP ⭐ (mejor), JPG, PNG

// Paso 4: (Opcional) Crear entrada en categories si es nueva categoría
// En lib/products.ts, actualizar el type Product['category']

// TIPS para imágenes:
// ✅ Usa WEBP para mejor compresión (50-80% más pequeño que JPG)
// ✅ Optimiza con: TinyPNG, Squoosh.app, ImageOptim
// ✅ Usa 500x650px para consistencia
// ✅ Máximo 150KB por imagen (WEBP) o 200KB (JPG/PNG)
// ✅ WEBP para fotos, PNG para gráficos/transparencias

export {};
