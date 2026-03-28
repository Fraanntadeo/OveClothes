"use client"

import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: "1",
    name: "Remeras",
    description: "Básicas y estampadas",
    itemCount: 15,
  },
  {
    id: "2",
    name: "Buzos",
    description: "Hoodies y crew neck",
    itemCount: 12,
  },
  {
    id: "3",
    name: "Pantalones",
    description: "Cargo, joggers y jeans",
    itemCount: 18,
  },
]

export function Categories() {
  const scrollToProducts = () => {
    const element = document.querySelector("#productos")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-[#FFFFFF] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-light uppercase tracking-[0.3em] text-[#808080]">
            Explorá
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#000000] md:text-4xl">
            Categorías
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={scrollToProducts}
              className="group relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#E5E5E5] to-[#D0D0D0] text-left"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#000000]/0 transition-colors duration-300 group-hover:bg-[#000000]/10" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-xs font-light uppercase tracking-wider text-[#808080]">
                    {category.itemCount} productos
                  </span>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#000000] lg:text-3xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm font-light text-[#808080]">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium tracking-wider text-[#000000] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span>Ver productos</span>
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
