"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

export function CartSheet() {
  // TODO: Carrito en desarrollo
  // La funcionalidad del carrito estará disponible en próximas versiones

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
        >
          <ShoppingBag className="size-5" />
          <span className="sr-only">Abrir carrito</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-medium tracking-wider text-[#000000]">
            Carrito de compras
          </SheetTitle>
          <SheetDescription className="text-left text-[#808080]">
            Funcionalidad en desarrollo
          </SheetDescription>
        </SheetHeader>

        {/* Empty State */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <ShoppingBag className="size-16 text-[#E5E5E5]" strokeWidth={1} />
          <div className="text-center">
            <h3 className="mb-2 text-base font-semibold text-[#000000]">
              Carrito en desarrollo
            </h3>
            <p className="text-sm text-[#808080]">
              La funcionalidad del carrito y el proceso de compra estarán
              disponibles pronto.
            </p>
          </div>
          <div className="mt-4 w-full space-y-2">
            <p className="text-xs text-[#808080]">Por ahora puedes:</p>
            <ul className="text-xs text-[#808080]">
              <li>✓ Ver los productos disponibles</li>
              <li>✓ Revisar detalles y talles</li>
              <li>✓ Seguirnos en Instagram</li>
            </ul>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-4 w-full border-[#808080]/30 text-[#000000] hover:bg-[#000000]/5"
          onClick={() =>
            window.open("https://www.instagram.com/_ove.clothes_/", "_blank")
          }
        >
          Contacta por Instagram
        </Button>
      </SheetContent>
    </Sheet>
  );
}
