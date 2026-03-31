import mongoose, { Schema, model, Document } from "mongoose";

interface IOrderProduct {
  productId: string;
  quantity: number;
  selectedVariant: {
    size: string;
    color: string;
  };
}

interface ICustomer {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
  notes: string;
}

export interface IOrder extends Document {
  products: IOrderProduct[];
  total: number;
  customer: ICustomer;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  notes: { type: String, default: "" },
});

const OrderProductSchema = new Schema<IOrderProduct>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedVariant: {
    size: { type: String, required: true },
    color: { type: String, required: true },
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    products: [OrderProductSchema],
    total: { type: Number, required: true, min: 0 },
    customer: { type: CustomerSchema, required: true },
  },
  { timestamps: true },
);

export const Order =
  mongoose.models.Order || model<IOrder>("Order", OrderSchema);
