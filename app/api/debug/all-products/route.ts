import { connectDB } from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();

    return Response.json({
      totalProducts: products.length,
      products: products.map((p) => ({
        _id: p._id,
        name: p.name,
        images: p.images,
        imagesCount: p.images?.length || 0,
        stock: p.stock,
        price: p.price,
      })),
    });
  } catch (error) {
    return Response.json(
      {
        error: String(error),
        message: "Error al obtener productos",
      },
      { status: 500 },
    );
  }
}
