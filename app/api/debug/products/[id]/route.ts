import { connectDB } from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id);

    // Return detailed debug info
    return Response.json({
      success: !!product,
      productId: id,
      product: product
        ? {
            name: product.name,
            images: product.images,
            imagesCount: product.images?.length || 0,
            imagesArray: product.images || [],
          }
        : null,
      message: product ? "Producto encontrado" : "Producto no encontrado",
    });
  } catch (error) {
    return Response.json(
      {
        error: String(error),
        message: "Error al obtener producto",
      },
      { status: 500 },
    );
  }
}
