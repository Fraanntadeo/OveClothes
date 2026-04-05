"use client";

export function Nosotros() {
  return (
    <section id="nosotros" className="bg-[#0F0F0F] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="text-xs font-light uppercase tracking-[0.3em] text-[#A0A0A0]">
            Quiénes somos
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#FFFFFF] md:text-5xl lg:text-6xl">
            Ove Clothes
          </h2>
        </div>

        {/* Contenido principal */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Texto */}
          <div className="flex flex-col gap-8">
            <p className="text-lg font-light leading-relaxed text-[#FFFFFF]/80">
              Somos una marca de ropa urbana nacida en Buenos Aires, Argentina.
              Creemos que la moda no tiene que ser complicada — prendas simples,
              calidad real, precio justo.
            </p>
            <p className="text-base font-light leading-relaxed text-[#A0A0A0]">
              Cada prenda que diseñamos pasa por un proceso de selección de
              materiales cuidadoso. Trabajamos con proveedores locales para
              garantizar que lo que llega a tus manos esté hecho para durar.
            </p>
            <p className="text-base font-light leading-relaxed text-[#A0A0A0]">
              Producción 100% argentina. Sin intermediarios. Sin vueltas.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-[#2A2A2A] pt-8 mt-2">
              <div>
                <p className="text-3xl font-bold text-[#FFFFFF]">100+</p>
                <p className="text-xs font-light uppercase tracking-wider text-[#A0A0A0] mt-1">
                  Clientes felices
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FFFFFF]">100%</p>
                <p className="text-xs font-light uppercase tracking-wider text-[#A0A0A0] mt-1">
                  Producción local
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FFFFFF]">2026</p>
                <p className="text-xs font-light uppercase tracking-wider text-[#A0A0A0] mt-1">
                  Desde
                </p>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="flex flex-col gap-6">
            {[
              {
                numero: "01",
                titulo: "Calidad sin compromiso",
                descripcion:
                  "Seleccionamos cada material con cuidado. Si no lo usaríamos nosotros, no lo vendemos.",
              },
              {
                numero: "02",
                titulo: "Diseño minimalista",
                descripcion:
                  "Menos es más. Prendas que combinan con todo y nunca pasan de moda.",
              },
              {
                numero: "03",
                titulo: "Hecho en Argentina",
                descripcion:
                  "Apoyamos la industria local. Todo se produce en Buenos Aires, de principio a fin.",
              },
              {
                numero: "04",
                titulo: "Precio justo",
                descripcion:
                  "Sin intermediarios ni markups absurdos. Calidad real a un precio que tiene sentido.",
              },
            ].map((valor) => (
              <div
                key={valor.numero}
                className="flex gap-6 border-b border-[#2A2A2A] pb-6 last:border-0 last:pb-0"
              >
                <span className="text-xs font-light text-[#A0A0A0] pt-1 shrink-0">
                  {valor.numero}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#FFFFFF] mb-1">
                    {valor.titulo}
                  </h3>
                  <p className="text-sm font-light text-[#A0A0A0] leading-relaxed">
                    {valor.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frase final */}
        <div className="mt-24 border-t border-[#2A2A2A] pt-16 text-center">
          <blockquote className="text-2xl font-light italic text-[#FFFFFF]/60 md:text-3xl lg:text-4xl max-w-3xl mx-auto leading-relaxed">
            "Ropa para los que no necesitan que la ropa hable por ellos."
          </blockquote>
          <p className="mt-4 text-sm text-[#A0A0A0]">— Ove Clothes, Buenos Aires</p>
        </div>

      </div>
    </section>
  );
}