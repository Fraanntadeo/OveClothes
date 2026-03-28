"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, Plus, Minus, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  category: string
  image?: string
}

export function CartSheet() {
  const [items, setItems] = useState<CartItem[]>([])
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter(item => item.id !== id))
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = subtotal > 30000 ? 0 : 3500
  const total = subtotal + shipping

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleWhatsAppCheckout = () => {
    const itemsList = items.map(item => 
      `- ${item.name} (${item.size}) x${item.quantity}: ${formatPrice(item.price * item.quantity)}`
    ).join('%0A')
    
    const message = `Hola! Quiero hacer un pedido:%0A%0A${itemsList}%0A%0ASubtotal: ${formatPrice(subtotal)}%0AEnvío: ${shipping === 0 ? 'Gratis' : formatPrice(shipping)}%0A*Total: ${formatPrice(total)}*`
    
    window.open(`https://wa.me/5491112345678?text=${message}`, '_blank')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
        >
          <ShoppingBag className="size-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#FFFFFF] text-xs font-medium text-[#000000]">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Abrir carrito</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-medium tracking-wider text-[#000000]">
            Tu carrito ({totalItems})
          </SheetTitle>
          <SheetDescription className="text-left text-[#808080]">
            Revisá tus productos antes de finalizar la compra
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingBag className="size-12 text-[#808080]" strokeWidth={1} />
            <p className="text-sm text-[#808080]">Tu carrito está vacío</p>
            <Button className="bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90">
              Explorar productos
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Item Image */}
                    <div className="relative size-24 shrink-0 overflow-hidden bg-[#F5F5F5]">
                      {item.image && !imageErrors[item.id] ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <span className="text-xs text-[#808080]">{item.category}</span>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-medium text-[#000000]">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs text-[#808080]">
                              Talle: {item.size}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[#808080] hover:text-[#000000]"
                            aria-label="Eliminar producto"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#E5E5E5]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex size-8 items-center justify-center text-[#808080] hover:text-[#000000]"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="flex size-8 items-center justify-center text-sm text-[#000000]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex size-8 items-center justify-center text-[#808080] hover:text-[#000000]"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-[#000000]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-[#E5E5E5]" />

            {/* Cart Summary */}
            <SheetFooter className="flex-col gap-4 pt-4">
              <div className="flex w-full flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#808080]">Subtotal</span>
                  <span className="text-[#000000]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#808080]">Envío</span>
                  <span className="text-[#000000]">
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#808080]">
                    Envío gratis en compras mayores a $30.000
                  </p>
                )}
              </div>

              <Separator className="bg-[#E5E5E5]" />

              <div className="flex w-full justify-between text-base">
                <span className="font-medium text-[#000000]">Total</span>
                <span className="font-bold text-[#000000]">{formatPrice(total)}</span>
              </div>

              <Button 
                onClick={handleWhatsAppCheckout}
                className="h-12 w-full bg-[#000000] text-sm font-medium tracking-wider text-[#FFFFFF] hover:bg-[#000000]/90"
              >
                <MessageCircle className="mr-2 size-4" />
                Finalizar por WhatsApp
              </Button>
              <p className="text-center text-xs text-[#808080]">
                Te contactaremos para coordinar el pago y envío
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
