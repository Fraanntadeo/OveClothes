import { getAllProducts, getProductById } from "@/lib/products";
import { ProductDetailContent } from "./ProductDetailContent";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
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
  const product = getProductById(id);
  return <ProductDetailContent product={product} />;
}
