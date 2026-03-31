"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Edit2,
} from "lucide-react";

interface Variant {
  size: string;
  color: string;
  images?: string[];
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  variants: Variant[];
  images: string[];
}

interface FormData {
  name: string;
  price: string;
  stock: string;
  variants: Variant[];
  images: string[];
}

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || "admin123";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    variants: [],
    images: [],
  });

  const [newVariant, setNewVariant] = useState({ size: "", color: "" });
  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(
    null,
  );
  const [newImage, setNewImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Get available images from /public/productos
  useEffect(() => {
    const fetchAvailableImages = async () => {
      try {
        // Fetch list of images from public/productos
        const res = await fetch("/api/images");
        if (res.ok) {
          const data = await res.json();
          setAvailableImages(data);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    if (authenticated) {
      fetchAvailableImages();
    }
  }, [authenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      setAuthenticated(true);
      setAuthError("");
      setPassword("");
      fetchProducts();
    } else {
      setAuthError("Contraseña incorrecta");
      setPassword("");
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage({ type: "error", text: "Error al cargar productos" });
    } finally {
      setLoading(false);
    }
  };

  // Add Variant
  const addVariant = () => {
    if (newVariant.size && newVariant.color) {
      setFormData({
        ...formData,
        variants: [...formData.variants, { ...newVariant, images: [] }],
      });
      setNewVariant({ size: "", color: "" });
    }
  };

  // Remove Variant
  const removeVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  // Add Image
  const addImage = async () => {
    const imagePath = newImage.trim();
    if (!imagePath) {
      setImageError("Ingresa una ruta de imagen");
      return;
    }

    // Validate image path format
    if (!imagePath.startsWith("/")) {
      setImageError(
        "❌ La ruta debe empezar con / (ej: /productos/remera.webp)",
      );
      return;
    }

    // Try to validate image exists
    try {
      const res = await fetch(imagePath, { method: "HEAD" });
      if (!res.ok) {
        setImageError(
          `⚠️ Advertencia: Imagen podría no existir en ${imagePath}. Verifica que el archivo esté en /public${imagePath}.`,
        );
        // Allow adding anyway - user responsibility
      }
    } catch (err) {
      console.warn("Could not validate image:", err);
      setImageError(
        `⚠️ No se pudo validar la imagen. Asegúrate que el archivo exista en /public${imagePath}`,
      );
      // Don't return - allow user to add anyway
    }

    setFormData({
      ...formData,
      images: [...formData.images, imagePath],
    });
    setNewImage("");
    setImageError("");
  };

  // Remove Image (from product level)
  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // Add Image to Variant
  const addImageToVariant = () => {
    if (editingVariantIndex === null) {
      setImageError("Selecciona una variante primero");
      return;
    }

    const imagePath = newImage.trim();
    if (!imagePath) {
      setImageError("Ingresa una ruta de imagen");
      return;
    }

    const newVariants = [...formData.variants];
    if (!newVariants[editingVariantIndex].images) {
      newVariants[editingVariantIndex].images = [];
    }
    newVariants[editingVariantIndex].images!.push(imagePath);

    setFormData({ ...formData, variants: newVariants });
    setNewImage("");
    setPreviewImage(null);
    setImageError("");
  };

  // Remove Image from Variant
  const removeImageFromVariant = (variantIndex: number, imageIndex: number) => {
    const newVariants = [...formData.variants];
    if (newVariants[variantIndex].images) {
      newVariants[variantIndex].images = newVariants[
        variantIndex
      ].images!.filter((_, i) => i !== imageIndex);
    }
    setFormData({ ...formData, variants: newVariants });
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      variants: [],
      images: [],
    });
    setEditingId(null);
    setNewVariant({ size: "", color: "" });
    setNewImage("");
    setImageError("");
  };

  // Load product for editing
  const loadProductForEditing = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      variants: product.variants,
      images: product.images,
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.name || !formData.price || !formData.stock) {
      setMessage({ type: "error", text: "Completa nombre, precio y stock" });
      return;
    }

    try {
      const endpoint = editingId
        ? `/api/products/${editingId}`
        : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": ADMIN_SECRET,
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          variants: formData.variants,
          images: formData.images,
        }),
      });

      if (res.ok) {
        const successText = editingId
          ? "✓ Producto actualizado"
          : "✓ Producto creado exitosamente";
        setMessage({ type: "success", text: successText });
        clearForm();
        fetchProducts();
      } else {
        const errorText = editingId
          ? "Error al actualizar producto"
          : "Error al crear producto";
        setMessage({ type: "error", text: errorText });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Error de conexión" });
    }
  };

  // Delete Product
  const deleteProduct = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": ADMIN_SECRET,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        setMessage({ type: "success", text: "✓ Producto eliminado" });
      } else {
        setMessage({ type: "error", text: "Error al eliminar" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Error de conexión" });
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    setProducts([]);
    setMessage(null);
  };

  // LOGIN PAGE
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="bg-slate-100">
            <CardTitle className="text-xl">🔐 Panel Admin</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Contraseña Admin
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa contraseña"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ADMIN PAGE
  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📦 Panel Admin de Productos</h1>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>

        {/* Message */}
        {message && (
          <Alert
            variant={message.type === "success" ? "default" : "destructive"}
            className="mb-6"
          >
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FORM SIDE */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader className="bg-black-50 border-b">
                <CardTitle className="text-lg">
                  {editingId ? "✏️ Editar Producto" : "➕ Crear Producto"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {/* CHECKLIST */}
                <div className="bg-slate-100 p-3 rounded mb-4 space-y-2">
                  <p className="font-bold text-sm">Checklist antes de crear:</p>
                  <div className="space-y-1 text-xs">
                    <div
                      className={
                        formData.name ? "text-green-700" : "text-gray-600"
                      }
                    >
                      {formData.name ? "✅" : "⬜"} Nombre completado
                    </div>
                    <div
                      className={
                        formData.price ? "text-green-700" : "text-gray-600"
                      }
                    >
                      {formData.price ? "✅" : "⬜"} Precio completado
                    </div>
                    <div
                      className={
                        formData.stock && formData.stock !== "0"
                          ? "text-green-700"
                          : "text-gray-600"
                      }
                    >
                      {formData.stock && formData.stock !== "0" ? "✅" : "⬜"}{" "}
                      Stock completado
                    </div>
                    <div
                      className={
                        formData.images.length > 0
                          ? "text-green-700"
                          : "text-red-600"
                      }
                    >
                      {formData.images.length > 0 ? "✅" : "❌"} Al menos 1
                      imagen ({formData.images.length})
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Nombre
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ej: Remera Azul"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Precio ($)
                    </label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Stock
                    </label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="0"
                    />
                  </div>

                  {/* Variants */}
                  <div className="border-t pt-4">
                    <label className="block text-sm font-semibold mb-2">
                      Variantes (Talle + Color)
                    </label>
                    <div className="space-y-2 mb-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Talle (M, L, XL...)"
                          value={newVariant.size}
                          onChange={(e) =>
                            setNewVariant({
                              ...newVariant,
                              size: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                        <Input
                          placeholder="Color (Azul, Negro...)"
                          value={newVariant.color}
                          onChange={(e) =>
                            setNewVariant({
                              ...newVariant,
                              color: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addVariant}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Agregar Variante
                      </Button>
                    </div>

                    {/* Variantes List */}
                    {formData.variants.length > 0 && (
                      <div className="bg-slate-100 p-2 rounded space-y-1 text-sm">
                        {formData.variants.map((v, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center bg-white p-2 rounded"
                          >
                            <span>
                              {v.size} - {v.color}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeVariant(i)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Images - INTERACTIVE GALLERY */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="bg-blue-50 border border-blue-300 rounded p-3 space-y-2">
                      <p className="font-bold text-blue-900 text-sm">
                        📸 AGREGAR IMÁGENES:
                      </p>
                      <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Clickea una imagen abajo</li>
                        <li>Verás una preview grande</li>
                        <li>Clickea el botón + para agregarla</li>
                        <li>Confirmada con miniatura abajo</li>
                      </ol>
                    </div>

                    {/* Available Images Gallery */}
                    {availableImages.length > 0 && (
                      <div className="space-y-3 bg-slate-50 p-3 rounded border border-slate-200">
                        {/* Large Preview */}
                        <div className="bg-white rounded border-2 border-slate-300 overflow-hidden aspect-square flex items-center justify-center">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center text-slate-400 text-sm py-8">
                              Selecciona una imagen para ver preview
                            </div>
                          )}
                        </div>

                        {/* Thumbnails Selection */}
                        <p className="text-xs font-semibold text-gray-700">
                          📁 Selecciona una imagen:
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {availableImages.map((img) => (
                            <button
                              key={img}
                              type="button"
                              onClick={() => {
                                setPreviewImage(img);
                                setNewImage(img);
                                setImageError("");
                              }}
                              className={`flex flex-col items-center gap-1 p-2 rounded border-2 transition ${
                                previewImage === img
                                  ? "border-blue-600 bg-blue-100 shadow-md"
                                  : "border-slate-300 hover:border-blue-400 hover:bg-slate-100"
                              }`}
                            >
                              <img
                                src={img}
                                alt={img}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <span className="truncate w-full text-center text-xs font-medium">
                                {img.replace("/productos/", "")}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="/productos/remera.webp"
                          value={newImage}
                          onChange={(e) => setNewImage(e.target.value)}
                          className="flex-1 text-sm"
                        />
                        <Button
                          type="button"
                          onClick={addImage}
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Error Message */}
                      {imageError && (
                        <Alert variant="destructive" className="py-2">
                          <AlertCircle className="h-3 w-3" />
                          <AlertDescription className="text-xs">
                            {imageError}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    {/* Added Images Preview */}
                    {formData.images.length > 0 ? (
                      <div className="bg-green-50 border border-green-300 rounded p-2">
                        <p className="text-xs font-semibold text-green-900 mb-2">
                          ✅ {formData.images.length} imagen(es) agregada(s):
                        </p>
                        <div className="space-y-2">
                          {formData.images.map((img, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between bg-white p-2 rounded border border-green-200"
                            >
                              <div className="flex gap-2 items-center min-w-0">
                                <img
                                  src={img}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded flex-shrink-0"
                                />
                                <span className="truncate text-xs font-mono">
                                  {img}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="text-red-500 hover:text-red-700 flex-shrink-0"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-300 rounded p-2 text-xs text-yellow-800">
                        ⚠️ Sin imágenes aún. Agrega al menos 1 imagen.
                      </div>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-2">
                    {!formData.name ||
                    !formData.price ||
                    !formData.stock ||
                    formData.images.length === 0 ? (
                      <Button
                        type="submit"
                        disabled
                        className="flex-1 bg-gray-400 text-white cursor-not-allowed"
                        title="Completa todos los campos y agrega al menos 1 imagen"
                      >
                        {editingId ? "✓ Actualizar" : "✓ Crear"} (Falta info)
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        {editingId ? "✓ Actualizar" : "✓ Crear"}
                      </Button>
                    )}
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={clearForm}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* PRODUCTS LIST SIDE */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-black-50 border-b">
                <CardTitle className="text-lg">
                  📋 Productos ({products.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {loading ? (
                  <p className="text-center text-gray-500">Cargando...</p>
                ) : products.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No hay productos aún
                  </p>
                ) : (
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="border rounded-lg p-4 hover:bg-slate-50 transition"
                      >
                        <div className="flex gap-4">
                          {/* Imagen */}
                          {product.images[0] && (
                            <div className="w-20 h-20 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Info */}
                          <div className="flex-1">
                            <h3 className="font-bold">
                              {product.name}{" "}
                              <span className="text-green-600">
                                ${product.price}
                              </span>
                            </h3>
                            <p className="text-sm text-gray-600">
                              Stock: <strong>{product.stock}</strong>
                            </p>
                            {product.variants.length > 0 && (
                              <p className="text-xs text-gray-500">
                                Variantes:{" "}
                                {product.variants
                                  .map((v) => `${v.size}/${v.color}`)
                                  .join(", ")}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              {product.images.length} imagen(es)
                            </p>
                          </div>

                          {/* Delete Button */}
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => loadProductForEditing(product)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded transition"
                              title="Editar"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded transition"
                              title="Eliminar"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
