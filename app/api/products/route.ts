import { connectDB } from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";

// GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST create product (admin only)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-secret");
    if (authHeader !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    // Validate required fields
    if (!data.name || data.price === undefined || data.stock === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, stock" },
        { status: 400 },
      );
    }

    const product = new Product({
      name: data.name,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      variants: data.variants || [],
      images: data.images || [],
    });

    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
