import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Validate required fields
    const { products, customer, total } = data;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Products array is required" },
        { status: 400 },
      );
    }

    if (
      !customer ||
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.postalCode
    ) {
      return NextResponse.json(
        { error: "Missing customer information" },
        { status: 400 },
      );
    }

    if (total === undefined || total <= 0) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

    // Validate and update stock
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 },
        );
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      products,
      customer,
      total,
    });

    await order.save();

    return NextResponse.json(
      {
        success: true,
        orderId: order._id,
        message: "Order created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
