import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-secret");
    if (authHeader !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({}).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
