import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Categories } from "@/components/categories";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with gradient background */}
      <Hero />

      {/* Features Bar */}
      <Features />

      {/* Categories Section */}
      <Categories />

      {/* Products Section */}
      <ProductGrid />

      {/* Footer with gradient */}
      <Footer />
    </div>
  );
}
