"use client";

import { useEffect, useState, useMemo } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/dashboard/SearchInput";
import { ProductTable } from "@/components/dashboard/ProductTable";
import { ProductFormModal } from "@/components/dashboard/ProductFormModal";
import { DeleteProductModal } from "@/components/dashboard/DeleteProductModal";
import { getCurrentUser } from "@/lib/supabase/auth";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/supabase/products";
import { Product } from "@/lib/mock/products";

const AUTH_STORAGE_KEY = "ai-revenue-auth";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    if (!isAuthenticated) return;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      const userResult = await getCurrentUser();
      if (!userResult.success || !userResult.user) {
        setError("Please sign in to view products.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProducts(userResult.user.id);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleAddProduct = async (data: Omit<Product, "id" | "userId">) => {
    const userResult = await getCurrentUser();
    if (!userResult.success || !userResult.user) {
      setError("Please sign in to add products.");
      return;
    }

    const created = await createProduct({
      userId: userResult.user.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
      status: data.status,
    });

    setProducts((prev) => [created, ...prev]);
  };

  const handleUpdateProduct = async (data: Omit<Product, "id" | "userId">) => {
    if (!editingProduct) return;

    const userResult = await getCurrentUser();
    if (!userResult.success || !userResult.user) {
      setError("Please sign in to update products.");
      return;
    }

    const updated = await updateProduct(userResult.user.id, editingProduct.id, {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
      status: data.status,
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? updated : p))
    );
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;

    const userResult = await getCurrentUser();
    if (!userResult.success || !userResult.user) {
      setError("Please sign in to delete products.");
      return;
    }

    await deleteProduct(userResult.user.id, deletingProduct.id);
    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
    setIsDeleteOpen(false);
    setDeletingProduct(null);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-violet-600">Catalog</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
            Products
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Manage your product catalog, update details, and track inventory status.
          </p>
        </div>

        <Button
          onClick={() => setIsFormOpen(true)}
          disabled={loading}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-500 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          placeholder="Search products..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="sm:max-w-sm"
        />
        <p className="text-sm text-slate-500">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      )}

      <ProductFormModal
        key={editingProduct?.id ?? "new"}
        open={isFormOpen}
        onClose={closeFormModal}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        initialProduct={editingProduct ?? undefined}
      />

      <DeleteProductModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingProduct(null);
        }}
        onConfirm={handleDeleteProduct}
        productName={deletingProduct?.name ?? ""}
      />
    </div>
  );
}
