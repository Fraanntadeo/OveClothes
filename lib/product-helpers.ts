/**
 * Helper para obtener datos de productos en las páginas
 * Proporciona funcionalidad para trabajar con el sistema de productos local
 */

import { getProductById } from '@/lib/products';
import type { Product } from '@/lib/products';

/**
 * Obtener un producto para la página de detalles
 */
export function getProductForDetail(id: string): Product | undefined {
  return getProductById(id);
}

/**
 * Validar si un producto existe
 */
export function productExists(id: string): boolean {
  return getProductById(id) !== undefined;
}

/**
 * Obtener URL estática de los parámetros dinámicos
 * Útil para Static Generation (SSG)
 */
export function getStaticProductIds(): { id: string }[] {
  const { getAllProducts } = require('@/lib/products');
  const products = getAllProducts();
  return products.map((p: Product) => ({ id: p.id }));
}
