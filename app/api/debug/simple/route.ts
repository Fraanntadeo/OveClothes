import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Check MongoDB connection
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/oveclothes";

    if (!mongoose.connection.readyState) {
      await mongoose.connect(mongoUri);
    }

    const db = mongoose.connection.db;
    if (!db) {
      return Response.json({ error: "Database not available" });
    }

    const collection = db.collection("products");
    const products = await collection.find({}).toArray();

    return Response.json({
      status: "ok",
      dbConnected: mongoose.connection.readyState === 1,
      totalProducts: products.length,
      products: products.map((p) => ({
        _id: p._id?.toString(),
        name: p.name,
        price: p.price,
        stock: p.stock,
        images: p.images || [],
        imagesCount: (p.images || []).length,
        variants: p.variants || [],
      })),
    });
  } catch (error) {
    return Response.json(
      {
        error: String(error),
        status: "error",
        message: "Error conectando a la base de datos",
      },
      { status: 500 },
    );
  }
}
