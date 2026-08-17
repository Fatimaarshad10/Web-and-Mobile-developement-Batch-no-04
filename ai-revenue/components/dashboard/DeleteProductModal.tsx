"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  productName,
}: DeleteProductModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Delete Product?
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Are you sure you want to delete &quot;{productName}&quot;? This action
          cannot be undone.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isDeleting}
          className="rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleConfirm}
          disabled={isDeleting}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}
