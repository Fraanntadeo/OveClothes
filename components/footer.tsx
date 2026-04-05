"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  tienda: [
    { label: "Remeras", href: "#productos", filter: "remeras" },
    { label: "Buzos", href: "#productos", filter: "buzos" },
    { label: "Pantalones", href: "#productos", filter: "pantalones" },
    { label: "Camperas", href: "#productos", filter: "camperas" },
    { label: "Ver todo", href: "#productos", filter: "all" },
  ],
  ayuda: [
    { label: "Envíos", href: "#envios" },
    { label: "Cambios y devoluciones", href: "#envios" },
    { label: "Guía de talles", href: "#productos" },
    { label: "Medios de pago", href: "#contacto" },
    { label: "Preguntas frecuentes", href: "#contacto" },
  ],
  empresa: [
    { label: "Sobre nosotros", href: "/nosotros" },
    { label: "Contacto", href: "#contacto" },
    { label: "Nuestros productos", href: "#productos" },
  ],
};

export function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    filter?: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // If there's a filter, dispatch a custom event so ProductGrid can pick it up
    if (filter) {
      window.dispatchEvent(
        new CustomEvent("ove:filter", { detail: { category: filter } }),
      );
    }
  };

  return (
    <footer
      id="contacto"
      className="bg-linear-to-b from-[#1A1A1A] to-[#0F0F0F]"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Separator className="bg-[#FFFFFF]/20" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:py-16">
          {/* Tienda */}
          <div>
            <h4 className="text-sm font-medium tracking-wider text-[#FFFFFF]">
              Tienda
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href, link.filter)}
                    className="cursor-pointer text-sm font-light text-[#FFFFFF]/70 transition-colors hover:text-[#FFFFFF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-sm font-medium tracking-wider text-[#FFFFFF]">
              Ayuda
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="cursor-pointer text-sm font-light text-[#FFFFFF]/70 transition-colors hover:text-[#FFFFFF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-sm font-medium tracking-wider text-[#FFFFFF]">
              Ove Clothes
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="cursor-pointer text-sm font-light text-[#FFFFFF]/70 transition-colors hover:text-[#FFFFFF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-medium tracking-wider text-[#FFFFFF]">
              Contacto
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm font-light text-[#FFFFFF]/70">
                <MapPin className="size-4 shrink-0" />
                Buenos Aires, Argentina
              </li>
              <li>
                <a
                  href="https://wa.me/5491112345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-light text-[#FFFFFF]/70 transition-colors hover:text-[#FFFFFF]"
                >
                  <Phone className="size-4 shrink-0" />
                  +54 9 11 1234-5678
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@oveclothes.com.ar"
                  className="flex items-center gap-2 text-sm font-light text-[#FFFFFF]/70 transition-colors hover:text-[#FFFFFF]"
                >
                  <Mail className="size-4 shrink-0" />
                  hola@oveclothes.com.ar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-[#FFFFFF]/20" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <span className="text-lg font-bold tracking-[0.2em] text-[#FFFFFF]">
              OVE CLOTHES
            </span>
            <span className="text-xs font-light text-[#FFFFFF]/60">
              © 2025 Ove Clothes. Todos los derechos reservados.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/_ove.clothes_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#FFFFFF]/70 transition-colors hover:text-[#FFFFFF]"
              aria-label="Seguinos en Instagram"
            >
              <Instagram className="size-5" />
              <span className="text-sm">@oveclothes</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <span className="text-xs text-[#FFFFFF]/40">
            Hecho con amor en Argentina
          </span>
        </div>
      </div>
    </footer>
  );
}
