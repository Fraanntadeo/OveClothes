"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import productsData from "@/data/products.json";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter products by query
  const results =
    query.trim().length >= 2
      ? productsData.products.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  // Focus input when search bar opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const handleResultClick = (category: string) => {
    setSearchOpen(false);
    setQuery("");
    const section = document.getElementById("productos");
    if (section) section.scrollIntoView({ behavior: "smooth" });
    // Dispatch filter event so ProductGrid applies the category
    window.dispatchEvent(
      new CustomEvent("ove:filter", {
        detail: { category: category.toLowerCase() },
      }),
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleResultClick(results[0].category);
    } else if (query.trim()) {
      // No matches: just scroll to products
      setSearchOpen(false);
      setQuery("");
      const section = document.getElementById("productos");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000]">
      {/* Search Bar — slides down when open */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 flex h-16 items-center gap-3 bg-[#000000] px-4 lg:px-8">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex flex-1 items-center"
          >
            <Search className="absolute left-3 size-4 text-[#808080]" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="h-10 w-full border-[#808080]/40 bg-[#FFFFFF]/10 pl-10 text-sm text-[#FFFFFF] placeholder:text-[#808080] focus-visible:ring-[#FFFFFF]/40"
            />
          </form>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(false)}
            className="shrink-0 text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
            aria-label="Cerrar búsqueda"
          >
            <X className="size-5" />
          </Button>

          {/* Dropdown results */}
          {query.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-16 bg-[#111111] shadow-xl">
              {results.length > 0 ? (
                <ul>
                  {results.slice(0, 6).map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleResultClick(product.category)}
                        className="flex w-full items-center justify-between px-6 py-3 text-left text-sm text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/10"
                      >
                        <span>{product.name}</span>
                        <span className="text-xs text-[#808080]">
                          {product.category}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-6 py-4 text-sm text-[#808080]">
                  No encontramos &quot;{query}&quot;
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
              >
                <Menu className="size-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              aria-describedby={undefined}
              className="w-full max-w-xs border-[#808080]/30 bg-[#000000]"
            >
              <SheetHeader>
                <SheetTitle className="text-[#FFFFFF]">Menú</SheetTitle>
                <SheetDescription className="text-[#FFFFFF]/60">
                  Navegación principal de Ove Clothes
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-lg font-light tracking-wide text-[#FFFFFF] transition-colors hover:text-[#808080]"
                    onClick={(e) => scrollToSection(e, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://www.instagram.com/_ove.clothes_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-light tracking-wide text-[#FFFFFF] transition-colors hover:text-[#808080]"
                >
                  <Instagram className="size-5" />
                  @oveclothes
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-[0.2em] text-[#FFFFFF]">
            OVE CLOTHES
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-light tracking-wide text-[#FFFFFF] transition-colors hover:text-[#808080]"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/_ove.clothes_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[#FFFFFF] transition-colors hover:text-[#808080] sm:flex"
            aria-label="Instagram"
          >
            <Instagram className="size-5" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
            aria-label="Buscar"
          >
            <Search className="size-5" />
          </Button>
          <CartSheet />
        </div>
      </nav>
    </header>
  );
}
