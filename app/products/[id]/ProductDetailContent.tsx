"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

interface ProductDetailContentProps {
  product: Product | undefined;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-[#FFFFFF]">
            Producto no encontrado
          </h1>
          <Link href="/">
            <Button className="bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5]">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentColor = product.colors?.find((c) => c.name === selectedColor);
  const currentImage = currentColor?.image || product.image;
  const currentStock = currentColor?.stock ?? 5;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleComprar = () => {
    if (!selectedSize) {
      alert("Por favor seleccioná un talle");
      return;
    }
    if (currentStock === 0) {
      alert("Este color no tiene stock disponible");
      return;
    }
    const precioTotal = (product.price * quantity).toLocaleString("es-AR");
    const mensaje = `Hola! Me interesa comprar:\n\n*${product.name}*\nColor: ${selectedColor}\nTalle: ${selectedSize}\nCantidad: ${quantity}\nPrecio total: $${precioTotal}\n\n¿Tienen disponibilidad?`;
    const url = `https://wa.me/5491157185820?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#2A2A2A] bg-[#1A1A1A]">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 lg:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
            >
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* ── Galería ── */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedColor === color.name
                      ? "border-[#FFFFFF]"
                      : "border-transparent hover:border-[#FFFFFF]/40"
                  }`}
                >
                  <Image
                    src={color.image}
                    alt={color.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Imagen principal */}
            <div className="relative flex-1 overflow-hidden rounded-lg bg-[#1A1A1A] aspect-[3/4]">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-[#000000] px-2 py-1 text-[10px] font-medium tracking-wider text-[#FFFFFF]">
                  NUEVO
                </span>
              )}
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-[#808080] px-2 py-1 text-[10px] font-medium tracking-wider text-[#FFFFFF]">
                  SALE
                </span>
              )}
            </div>
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col gap-6">
            {/* Título */}
            <div>
              <p className="text-xs font-light uppercase tracking-[0.3em] text-[#A0A0A0] mb-1">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-[#FFFFFF]">
                {product.name}
              </h1>
            </div>

            {/* Precio */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#FFFFFF]">
                  ${product.price.toLocaleString("es-AR")}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-[#A0A0A0]">
                    ${product.originalPrice.toLocaleString("es-AR")}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-xs text-[#FF6B6B] mt-1">
                  {discount}% de descuento
                </p>
              )}
            </div>

            {/* Descripción */}
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              {product.description ||
                "Prenda de alta calidad, confeccionada con materiales premium. Diseño moderno y cómodo para usar en cualquier ocasión. Fabricado 100% en Argentina."}
            </p>

            <div className="border-t border-[#2A2A2A]" />

            {/* Color */}
            <div>
              <p className="text-sm font-semibold text-[#FFFFFF] mb-3">
                Color:{" "}
                <span className="font-light text-[#A0A0A0]">
                  {selectedColor}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors?.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color.name
                        ? "border-[#FFFFFF]"
                        : "border-[#2A2A2A] hover:border-[#FFFFFF]/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.name && (
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          color.hex === "#FFFFFF" ? "bg-black" : "bg-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Talle */}
            <div>
              <p className="text-sm font-semibold text-[#FFFFFF] mb-3">
                Talle:{" "}
                <span className="font-light text-[#A0A0A0]">
                  {selectedSize || "—"}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-10 px-2 rounded border-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-[#FFFFFF] bg-[#FFFFFF] text-[#000000]"
                        : "border-[#2A2A2A] text-[#FFFFFF] hover:border-[#FFFFFF]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-[#FFFFFF]">Cantidad:</p>
              <div className="flex items-center border border-[#2A2A2A]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-[#A0A0A0] hover:bg-[#1A1A1A] transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-[#FFFFFF]">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(currentStock, quantity + 1))
                  }
                  className="flex h-10 w-10 items-center justify-center text-[#A0A0A0] hover:bg-[#1A1A1A] transition-colors"
                >
                  +
                </button>
              </div>
              <p
                className={`text-sm ${
                  currentStock > 0
                    ? "text-[#A0A0A0]"
                    : "text-[#FF6B6B] font-semibold"
                }`}
              >
                {currentStock > 0 ? `${currentStock} disponibles` : "Sin stock"}
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <Button
                onClick={handleComprar}
                disabled={currentStock === 0}
                className="flex-1 h-12 bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5] text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-2 size-5" />
                Comprar por WhatsApp
              </Button>
              <Button
                onClick={() => setIsFavorite(!isFavorite)}
                variant="outline"
                size="icon"
                className={`h-12 w-12 border-2 transition-colors ${
                  isFavorite
                    ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                    : "border-[#2A2A2A] hover:border-[#FFFFFF]/50"
                }`}
              >
                <Heart
                  className={`size-5 ${
                    isFavorite
                      ? "fill-[#FF6B6B] text-[#FF6B6B]"
                      : "text-[#FFFFFF]"
                  }`}
                />
              </Button>
            </div>

            <div className="border-t border-[#2A2A2A]" />

            {/* Info extra */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg mt-0.5">🚚</span>
                <div>
                  <p className="text-sm font-semibold text-[#FFFFFF]">
                    Envío rápido
                  </p>
                  <p className="text-xs text-[#A0A0A0]">
                    Gratis en CABA +$30.000
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-lg mt-0.5">🇦🇷</span>
                <div>
                  <p className="text-sm font-semibold text-[#FFFFFF]">
                    Hecho en Argentina
                  </p>
                  <p className="text-xs text-[#A0A0A0]">
                    Producción 100% local
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-lg mt-0.5">↩️</span>
                <div>
                  <p className="text-sm font-semibold text-[#FFFFFF]">
                    Cambios
                  </p>
                  <p className="text-xs text-[#A0A0A0]">10 días para cambiar</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-lg mt-0.5">💳</span>
                <div>
                  <p className="text-sm font-semibold text-[#FFFFFF]">
                    Pago seguro
                  </p>
                  <p className="text-xs text-[#A0A0A0]">
                    MercadoPago / transferencia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
