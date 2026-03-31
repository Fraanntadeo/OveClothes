import mongoose, { Schema, model, Document } from "mongoose";

interface IVariant {
  size: string;
  color: string;
  images?: string[];
}

export interface IProduct extends Document {
  name: string;
  price: number;
  stock: number;
  variants: IVariant[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema<IVariant>({
  size: { type: String, required: true },
  color: { type: String, required: true },
  images: [{ type: String }],
});

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    variants: [VariantSchema],
    images: [{ type: String }],
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || model<IProduct>("Product", ProductSchema);
