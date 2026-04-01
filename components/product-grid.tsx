"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductCard, type Product } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAllProducts, getCategories } from "@/lib/products";

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const products = getAllProducts() as Product[];
  const categories = getCategories();

  // Get all unique sizes from products
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes || [])));

  // Listen for filter events from Navbar and Footer
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ category: string }>).detail;
      if (detail?.category) {
        setSelectedCategory(detail.category);
      }
    };
    window.addEventListener("ove:filter", handler);
    return () => window.removeEventListener("ove:filter", handler);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by size
    if (selectedSize !== "all") {
      result = result.filter((p) => p.sizes?.includes(selectedSize));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, selectedSize, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSize("all");
    setSortBy("newest");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedSize !== "all";

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Category Filter */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#FFFFFF]">
          Categoría
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A]">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size Filter */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#FFFFFF]">
          Talle
        </label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A]">
            <SelectValue placeholder="Todos los talles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los talles</SelectItem>
            {allSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#FFFFFF]">
          Ordenar por
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más nuevos</SelectItem>
            <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="mt-2 border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
        >
          <X className="mr-2 size-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <section id="productos" className="bg-[#0F0F0F] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-light uppercase tracking-[0.3em] text-[#A0A0A0]">
              Nuestra colección
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#FFFFFF] md:text-4xl">
              Productos
            </h2>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-[#FFFFFF]">
                  <SlidersHorizontal className="mr-2 size-4" />
                  Filtros
                  {hasActiveFilters && (
                    <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-[#FFFFFF] text-xs text-[#000000]">
                      !
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-sm bg-[#1A1A1A]"
              >
                <SheetHeader>
                  <SheetTitle className="text-[#FFFFFF]">Filtros</SheetTitle>
                  <SheetDescription className="text-[#A0A0A0]">
                    Filtrá productos por categoría, talle y precio
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden items-center gap-4 lg:flex">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] border-[#2A2A2A]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-[140px] border-[#2A2A2A]">
                <SelectValue placeholder="Talle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {allSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-[#2A2A2A]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más nuevos</SelectItem>
                <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-desc">
                  Precio: mayor a menor
                </SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-[#A0A0A0] hover:text-[#FFFFFF]"
              >
                <X className="mr-1 size-4" />
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-[#A0A0A0]">
          {filteredProducts.length} producto
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg text-[#A0A0A0]">
              No encontramos productos con esos filtros
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mt-4 border-[#FFFFFF]"
            >
              Ver todos los productos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
