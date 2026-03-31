import { readdirSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const imagePath = join(process.cwd(), "public", "productos");
    const files = readdirSync(imagePath);

    // Filter only image files and add /productos/ prefix
    const imageFiles = files
      .filter((file) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file))
      .map((file) => `/productos/${file}`);

    return Response.json(imageFiles);
  } catch (error) {
    console.error("Error reading images:", error);
    return Response.json([], { status: 200 });
  }
}
