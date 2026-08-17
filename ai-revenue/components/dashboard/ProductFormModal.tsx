"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, "id" | "userId">) => void;
  initialProduct?: Product;
}

export function ProductFormModal({
  open,
  onClose,
  onSubmit,
  initialProduct,
}: ProductFormModalProps) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [price, setPrice] = useState(initialProduct?.price?.toString() ?? "");
  const [stock, setStock] = useState(initialProduct?.stock?.toString() ?? "");
  const [imageUrl, setImageUrl] = useState(initialProduct?.imageUrl ?? "");
  const [status, setStatus] = useState<"Active" | "Draft">(initialProduct?.status ?? "Active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImageUrl("");
    setStatus("Active");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!price.trim() || isNaN(Number(price)) || Number(price) < 0) {
      newErrors.price = "Valid price is required";
    }
    if (!stock.trim() || isNaN(Number(stock)) || Number(stock) < 0) {
      newErrors.stock = "Valid stock is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      stock: Number(stock),
      imageUrl: imageUrl.trim(),
      status,
    });

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {initialProduct ? "Edit Product" : "Add Product"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {initialProduct
              ? "Update product details below."
              : "Fill in the details to add a new product."}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Product Name</label>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="e.g. Wireless Headphones"
            className={cn("mt-1.5", errors.name && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief product description"
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Price ($)</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
              }}
              placeholder="0.00"
              className={cn("mt-1.5", errors.price && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100")}
            />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Stock</label>
            <Input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
                if (errors.stock) setErrors((prev) => ({ ...prev, stock: "" }));
              }}
              placeholder="0"
              className={cn("mt-1.5", errors.stock && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100")}
            />
            {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Image URL</label>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="mt-1.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Status</label>
          <div className="mt-1.5 flex items-center gap-2">
            {(["Active", "Draft"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={cn(
                  "h-9 rounded-xl border px-4 text-sm font-medium transition-all",
                  status === option
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <Button
          variant="outline"
          onClick={handleClose}
          className="rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          {initialProduct ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </Modal>
  );
}
