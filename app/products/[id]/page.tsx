import productsData from "@/data/products.json";
import { ProductDetailContent } from "./ProductDetailContent";

export function generateStaticParams() {
  return productsData.products.map((product) => ({
    id: product.id,
  }));
}

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = productsData.products.find((p) => p.id === id);
  return <ProductDetailContent product={product} />;
}
