/**
 * Products Database
 * Sistema de gestión de productos con imágenes locales sin necesidad de backend
 */

import { getColorPlaceholder } from "./image-utils";

export interface ProductColor {
  name: string;
  hex: string;
  image: string; // Ruta local: /images/products/product-id/color-name.{jpg|png|webp}
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string; // Ruta local: /images/products/product-id/main.{jpg|png|webp}
  category: "Remeras" | "Buzos" | "Pantalones" | "Camperas" | "Accesorios";
  description?: string;
  isNew?: boolean;
  sizes: string[];
  colors: ProductColor[];
}

/**
 * Base de datos de productos
 * Para agregar imágenes:
 * 1. Crea una carpeta en public/images/products/{product-id}/
 * 2. Agrega las imágenes (main.{jpg|png|webp} para portada, y color-name.{jpg|png|webp} para colores)
 * 3. Actualiza las rutas en el objeto product
 *
 * Formatos soportados: JPG, PNG, WEBP (recomendado WEBP para mejor compresión)
 */
export const products: Product[] = [
  {
    id: "1",
    name: "Remera Oversize Algodón",
    price: 18500,
    category: "Remeras",
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    image: "/images/products/1/main.jpg",
    description: "Remera oversize 100% algodón, cómoda y versátil",
    colors: [
      {
        name: "Negro",
        hex: "#000000",
        image: "/images/products/1/main.jpg", // Usar main.jpg como fallback temporal
        stock: 5,
      },
      {
        name: "Blanco",
        hex: "#FFFFFF",
        image: "/images/products/1/main.jpg", // Usar main.jpg como fallback temporal
        stock: 8,
      },
      {
        name: "Rojo",
        hex: "#FF0000",
        image: "/images/products/1/main.jpg", // Usar main.jpg como fallback temporal
        stock: 3,
      },
      {
        name: "Gris",
        hex: "#808080",
        image: "/images/products/1/main.jpg", // Usar main.jpg como fallback temporal
        stock: 6,
      },
      {
        name: "Azul",
        hex: "#0000FF",
        image: "/images/products/1/azul.jpg",
        stock: 13,
      },
    ],
  },
  {
    id: "2",
    name: "Buzo Hoodie Básico",
    price: 32000,
    category: "Buzos",
    sizes: ["S", "M", "L", "XL"],
    image: getColorPlaceholder("#1A1A1A", "Buzo 2"), // Placeholder temporal
    description: "Buzo hoodie cómodo y cálido para todo el año",
    colors: [
      {
        name: "Negro",
        hex: "#000000",
        image: getColorPlaceholder("#000000", "Negro"),
        stock: 4,
      },
      {
        name: "Blanco",
        hex: "#FFFFFF",
        image: getColorPlaceholder("#FFFFFF", "Blanco"),
        stock: 7,
      },
      {
        name: "Rojo",
        hex: "#FF0000",
        image: getColorPlaceholder("#FF0000", "Rojo"),
        stock: 2,
      },
      {
        name: "Gris",
        hex: "#808080",
        image: getColorPlaceholder("#808080", "Gris"),
        stock: 9,
      },
      {
        name: "Azul",
        hex: "#0000FF",
        image: getColorPlaceholder("#0000FF", "Azul"),
        stock: 11,
      },
    ],
  },
  {
    id: "3",
    name: "Pantalón Cargo Wide",
    price: 38500,
    category: "Pantalones",
    sizes: ["28", "30", "32", "34", "36"],
    image: getColorPlaceholder("#3A3A3A", "Pantalón 3"), // Placeholder temporal
    description: "Pantalón cargo con corte wide leg y múltiples bolsillos",
    colors: [
      {
        name: "Negro",
        hex: "#000000",
        image: getColorPlaceholder("#000000", "Negro"),
        stock: 6,
      },
      {
        name: "Blanco",
        hex: "#FFFFFF",
        image: getColorPlaceholder("#FFFFFF", "Blanco"),
        stock: 4,
      },
      {
        name: "Rojo",
        hex: "#FF0000",
        image: getColorPlaceholder("#FF0000", "Rojo"),
        stock: 2,
      },
      {
        name: "Gris",
        hex: "#808080",
        image: getColorPlaceholder("#808080", "Gris"),
        stock: 5,
      },
      {
        name: "Azul",
        hex: "#0000FF",
        image: getColorPlaceholder("#0000FF", "Azul"),
        stock: 7,
      },
    ],
  },
  {
    id: "4",
    name: "Campera Rompevientos",
    price: 45000,
    originalPrice: 55000,
    category: "Camperas",
    sizes: ["S", "M", "L", "XL"],
    image: getColorPlaceholder("#2C3E50", "Campera 4"), // Placeholder temporal
    description: "Campera rompevientos ligera y resistente",
    colors: [
      {
        name: "Negro",
        hex: "#000000",
        image: getColorPlaceholder("#000000", "Negro"),
        stock: 8,
      },
      {
        name: "Blanco",
        hex: "#FFFFFF",
        image: getColorPlaceholder("#FFFFFF", "Blanco"),
        stock: 3,
      },
      {
        name: "Rojo",
        hex: "#FF0000",
        image: getColorPlaceholder("#FF0000", "Rojo"),
        stock: 1,
      },
      {
        name: "Gris",
        hex: "#808080",
        image: getColorPlaceholder("#808080", "Gris"),
        stock: 7,
      },
      {
        name: "Azul",
        hex: "#0000FF",
        image: getColorPlaceholder("#0000FF", "Azul"),
        stock: 9,
      },
    ],
  },
];

/**
 * Obtener un producto por ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

/**
 * Obtener todos los productos
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Obtener productos por categoría
 */
export function getProductsByCategory(
  category: Product["category"],
): Product[] {
  return products.filter((product) => product.category === category);
}

/**
 * Obtener todas las categorías únicas
 */
export function getCategories(): Product["category"][] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}
