/**
 * Utilidades para manejo de imágenes con fallbacks
 */

/**
 * Generar un placeholder SVG por color
 * Útil mientras no tienes las imágenes reales
 */
export function getColorPlaceholder(
  colorHex: string,
  productName: string,
): string {
  const sanitized = colorHex.replace("#", "");
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='650'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${sanitized};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${sanitized};stop-opacity:0.7' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='650' fill='url(%23grad)'/%3E%3Ctext x='250' y='300' text-anchor='middle' font-size='32' fill='white' font-weight='bold'%3E${encodeURIComponent(productName.substring(0, 10))}%3C/text%3E%3Ctext x='250' y='350' text-anchor='middle' font-size='24' fill='rgba(255,255,255,0.7)'%3E500x650%3C/text%3E%3C/svg%3E`;
}

/**
 * Resolver imagen con fallback
 * Intenta cargar desde local, sino usa placeholder
 */
export function resolveImageUrl(
  localPath: string,
  colorHex?: string,
  fallbackText?: string,
): string {
  // Si tienes la imagen local, úsala
  if (localPath && localPath.startsWith("/")) {
    return localPath;
  }

  // Fallback: placeholder con color del producto
  if (colorHex) {
    return getColorPlaceholder(colorHex, fallbackText || "Producto");
  }

  // Último recurso: placeholder genérico
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='650'%3E%3Crect fill='%231a1a1a' width='500' height='650'/%3E%3Ctext x='250' y='325' text-anchor='middle' fill='%23999' font-size='48'%3E500x650%3C/text%3E%3C/svg%3E`;
}

/**
 * Obtener todas las extensiones soportadas
 */
export const SUPPORTED_FORMATS = ["webp", "jpg", "jpeg", "png"] as const;
export type ImageFormat = (typeof SUPPORTED_FORMATS)[number];

/**
 * Intentar cargar imagen en múltiples formatos
 * Útil para detectar qué formato existe
 */
export async function findImageInFormats(
  basePath: string,
): Promise<string | null> {
  // Esta es una versión simplificada
  // En producción, sería necesario hacer requests al servidor

  for (const format of SUPPORTED_FORMATS) {
    const path = `${basePath}.${format}`;
    // Aquí irían validaciones reales del servidor
  }

  return null;
}
