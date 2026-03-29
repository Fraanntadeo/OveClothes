"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Heart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category: string;
  isNew?: boolean;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card
        className="group relative overflow-hidden border-0 bg-transparent shadow-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
          {/* Product Image */}
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#E5E5E5] to-[#D5D5D5] transition-transform duration-500 group-hover:scale-105">
              <div className="text-center">
                <div className="mx-auto mb-2 size-16 rounded-full bg-[#808080]/20" />
                <p className="text-xs text-[#808080]">{product.category}</p>
              </div>
            </div>
          )}

          {/* Badges */}
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

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-[#FFFFFF]/90 text-[#000000] opacity-0 transition-opacity hover:bg-[#FFFFFF] group-hover:opacity-100"
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
            }
          >
            <Heart className={`size-4 ${isFavorite ? "fill-[#000000]" : ""}`} />
          </button>

          {/* Quick Add Button */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-[#000000]/95 p-3 transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Button
              variant="ghost"
              className="w-full h-10 text-sm font-medium tracking-wider text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
              onClick={() => onAddToCart?.(product)}
            >
              <Plus className="mr-2 size-4" />
              Agregar al carrito
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="px-0 pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-light uppercase tracking-wider text-[#808080]">
              {product.category}
            </span>
            <h3 className="text-sm font-medium text-[#000000]">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#000000]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#808080] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {/* Available Sizes */}
            {product.sizes && (
              <div className="mt-2 flex flex-wrap gap-1">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="text-[10px] text-[#808080] border border-[#E5E5E5] px-1.5 py-0.5"
                  >
                    {size}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
