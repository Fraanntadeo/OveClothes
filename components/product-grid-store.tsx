"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";

interface Variant {
  size: string;
  color: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  variants: Variant[];
  images: string[];
}

export function ProductGridStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-[#A0A0A0]">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/products/${product._id}`}
          className="group block"
        >
          {/* Card */}
          <div className="relative overflow-hidden bg-transparent">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A] mb-4">
              {/* Product Image */}
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] transition-transform duration-500 group-hover:scale-105">
                  <div className="text-center">
                    <div className="mx-auto mb-2 size-16 rounded-full bg-[#A0A0A0]/20" />
                    <p className="text-xs text-[#A0A0A0]">Sin imagen</p>
                  </div>
                </div>
              )}

              {/* NUEVO Badge */}
              <span className="absolute top-3 left-3 bg-[#000000] px-2 py-1 text-[10px] font-medium tracking-wider text-[#FFFFFF]">
                {product.stock <= 0 ? "AGOTADO" : "NUEVO"}
              </span>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <p className="text-xs text-[#A0A0A0] tracking-wide uppercase">
                GENERAL
              </p>
              <h3 className="text-base font-medium text-[#FFFFFF] group-hover:text-[#B0B0B0] transition">
                {product.name}
              </h3>
              <p className="text-lg font-medium text-[#FFFFFF]">
                $ {product.price.toLocaleString("es-AR")}
              </p>
            </div>

            {/* Variants/Sizes */}
            {product.variants.length > 0 ? (
              <div className="mt-4 flex gap-2 flex-wrap">
                {product.variants.map((variant, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 border border-[#2A2A2A] text-[#A0A0A0] hover:border-[#FFFFFF] hover:text-[#FFFFFF] transition cursor-default"
                  >
                    {variant.size}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex gap-2">
                <span className="text-xs px-2 py-1 border border-[#2A2A2A] text-[#A0A0A0]">
                  Sin variantes
                </span>
              </div>
            )}

            {/* Stock Info */}
            <p className="text-xs text-[#808080] mt-2">
              {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
