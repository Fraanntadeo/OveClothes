"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";

export function Hero() {
  const scrollToProducts = () => {
    const element = document.querySelector("#productos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] bg-linear-to-b from-[#0F0F0F] via-[#1a1a1a] to-[#1A1A1A]"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center lg:px-8">
        {/* Badge */}
        <span className="mb-6 border border-[#2A2A2A] px-4 py-2 text-xs font-light uppercase tracking-[0.3em] text-[#FFFFFF]/80">
          Hecho en Argentina
        </span>

        {/* Main Title */}
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-[#FFFFFF] md:text-6xl lg:text-7xl">
          OVE CLOTHES
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg font-light leading-relaxed text-[#FFFFFF]/70 md:text-xl">
          Ropa urbana minimalista para quienes buscan estilo sin complicaciones.
          Diseños únicos, calidad premium.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="group h-12 bg-[#FFFFFF] px-8 text-sm font-medium tracking-wider text-[#000000] hover:bg-[#FFFFFF]/90"
          >
            Ver Productos
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="h-12 border-[#FFFFFF] bg-transparent px-8 text-sm font-medium tracking-wider text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
          >
            <a
              href="https://www.instagram.com/_ove.clothes_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 size-4" />
              Seguinos en IG
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center md:gap-16">
          <div>
            <p className="text-3xl font-bold text-[#FFFFFF]">500+</p>
            <p className="mt-1 text-sm text-[#FFFFFF]/60">Clientes felices</p>
          </div>
          <div className="h-12 w-px bg-[#2A2A2A]" />
          <div>
            <p className="text-3xl font-bold text-[#FFFFFF]">100%</p>
            <p className="mt-1 text-sm text-[#FFFFFF]/60">Producción local</p>
          </div>
          <div className="h-12 w-px bg-[#2A2A2A]" />
          <div>
            <p className="text-3xl font-bold text-[#FFFFFF]">24hs</p>
            <p className="mt-1 text-sm text-[#FFFFFF]/60">Envío en CABA</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-wider text-[#A0A0A0]">
            Scrolleá
          </span>
          <div className="h-12 w-px animate-pulse bg-linear-to-b from-[#FFFFFF]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
