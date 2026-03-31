import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/oveclothes";

    if (!mongoose.connection.readyState) {
      await mongoose.connect(mongoUri);
    }

    const db = mongoose.connection.db;
    const result = await db?.collection("products").deleteMany({});

    return Response.json({
      status: "ok",
      message: "Todos los productos fueron eliminados",
      deletedCount: result?.deletedCount,
    });
  } catch (error) {
    return Response.json(
      {
        error: String(error),
        status: "error",
      },
      { status: 500 },
    );
  }
}
