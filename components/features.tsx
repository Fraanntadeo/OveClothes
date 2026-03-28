import { Truck, RefreshCw, Shield, MapPin } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Envío a todo el país",
    description: "Llegamos a toda Argentina",
  },
  {
    icon: MapPin,
    title: "Envío gratis CABA",
    description: "En compras mayores a $30.000",
  },
  {
    icon: RefreshCw,
    title: "Cambios y devoluciones",
    description: "10 días para cambiar tu prenda",
  },
  {
    icon: Shield,
    title: "Pago seguro",
    description: "Mercado Pago y transferencia",
  },
]

export function Features() {
  return (
    <section className="border-y border-[#808080]/20 bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`flex flex-col items-center gap-3 py-8 text-center ${
                index < features.length - 1 ? "lg:border-r lg:border-[#808080]/20" : ""
              } ${index < 2 ? "border-b border-[#808080]/20 lg:border-b-0" : ""} ${
                index === 0 || index === 2 ? "border-r border-[#808080]/20 lg:border-r" : ""
              }`}
            >
              <feature.icon className="size-6 text-[#000000]" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-medium tracking-wider text-[#000000]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs font-light text-[#808080]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
