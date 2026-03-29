"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductColor {
  name: string;
  hex: string;
  image: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  sizes: string[];
  colors?: ProductColor[];
}

interface ProductDetailContentProps {
  product: Product | undefined;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Inicializar el primer color si existe
  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
      setCurrentColorIndex(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] px-4 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-[#000000]">
            Producto no encontrado
          </h1>
          <Link href="/">
            <Button className="bg-[#000000] text-[#FFFFFF] hover:bg-[#1a1a1a]">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  // Obtener el color actualmente seleccionado
  const currentColor = product?.colors?.find((c) => c.name === selectedColor);
  const currentImage = currentColor?.image || product?.image;
  const currentStock = currentColor?.stock || 5;

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#E5E5E5] bg-[#FFFFFF]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#000000] hover:bg-[#000000]/5"
            >
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery - Left */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 w-20 rounded-lg bg-[#F5F5F5] overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#000000] transition-all"
                >
                  <Image
                    src={currentImage}
                    alt={`Variante ${i}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
              <button className="h-6 flex items-center justify-center text-[#808080] hover:text-[#000000]">
                <ChevronDown className="size-4" />
              </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-[#F5F5F5] rounded-lg overflow-hidden min-h-96 flex items-center justify-center">
              <Image
                src={currentImage}
                alt={product.name}
                width={400}
                height={500}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Product Info - Right */}
          <div className="flex flex-col gap-6">
            {/* Title & Category */}
            <div>
              <h1 className="text-3xl font-bold text-[#000000] mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-[#808080] uppercase tracking-wide">
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-[#000000]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-[#808080]">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#808080]">
                Precio sin impuestos ${(product.price * 0.75).toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-xs text-[#FF6B6B] mt-1">
                  {discount}% de descuento
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[#000000]/70 leading-relaxed">
              Prenda de alta calidad, confeccionada con materiales premium.
              Diseño moderno y cómodo para usar en cualquier ocasión. Fabricado
              100% en Argentina.
            </p>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-semibold text-[#000000] mb-3 block">
                Color: <span className="font-light">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product?.colors?.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color.name
                        ? "border-[#000000]"
                        : "border-[#E5E5E5]"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${color.hex === "#FFFFFF" ? "bg-black" : "bg-white"}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-sm font-semibold text-[#000000] mb-3 block">
                Talle: <span className="font-light">{selectedSize || "-"}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-10 rounded border-2 text-sm font-medium transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? "border-[#000000] bg-[#000000] text-[#FFFFFF]"
                        : "border-[#E5E5E5] text-[#000000] hover:border-[#000000]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-[#000000]">
                Cantidad:
              </label>
              <div className="flex items-center border border-[#E5E5E5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-[#808080] hover:bg-[#F5F5F5]"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-[#000000]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center text-[#808080] hover:bg-[#F5F5F5]"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  if (!selectedSize) {
                    alert("Por favor selecciona un talle");
                    return;
                  }
                  if (currentStock === 0) {
                    alert("Este color no tiene stock disponible");
                    return;
                  }
                  alert(
                    `✓ ${quantity} item(s) de ${product.name} en color ${selectedColor}, talle ${selectedSize}\n\nEl carrito estará disponible pronto.`,
                  );
                }}
                disabled={currentStock === 0}
                className="flex-1 h-12 bg-[#000000] text-[#FFFFFF] hover:bg-[#1a1a1a] text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-2 size-5" />
                Agregar al carrito
              </Button>
              <Button
                onClick={() => setIsFavorite(!isFavorite)}
                variant="outline"
                size="icon"
                className={`h-12 w-12 border-2 ${
                  isFavorite
                    ? "border-[#FF6B6B] bg-[#FF6B6B]/10"
                    : "border-[#E5E5E5]"
                }`}
              >
                <Heart
                  className={`size-5 ${isFavorite ? "fill-[#FF6B6B] text-[#FF6B6B]" : "text-[#000000]"}`}
                />
              </Button>
            </div>

            {/* Stock */}
            <p
              className={`text-sm ${currentStock > 0 ? "text-[#808080]" : "text-[#FF6B6B] font-semibold"}`}
            >
              {currentStock > 0
                ? `✓ ${currentStock} en stock`
                : "Sin stock disponible"}
            </p>

            {/* Divider */}
            <div className="border-t border-[#E5E5E5]" />

            {/* Info Section */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="text-xl">🚚</div>
                <div>
                  <p className="text-sm font-semibold text-[#000000]">
                    Envío rápido
                  </p>
                  <p className="text-xs text-[#808080]">
                    Envío gratis en CABA en compras mayores a $30.000
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-xl">✓</div>
                <div>
                  <p className="text-sm font-semibold text-[#000000]">
                    Garantía
                  </p>
                  <p className="text-xs text-[#808080]">
                    100% original - Producción local argentina
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
