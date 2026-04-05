import { Nosotros } from "@/components/nosotros";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />
      <Nosotros />
      <Footer />
    </div>
  );
}