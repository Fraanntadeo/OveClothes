import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { ProductGridStore } from "@/components/product-grid-store";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with gradient background */}
      <Hero />

      {/* Features Bar */}
      <Features />

      {/* Products Section */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Nuestros Productos
        </h2>
        <ProductGridStore />
      </section>
    </div>
  );
}
