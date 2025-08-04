import { useEffect, useRef } from "react";
import type { IProductModel, SetState } from "../models/types";

interface AddProductModalProps {
  formData: Partial<IProductModel>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  getExactlyOneWeekAgo: () => string;
  addProudctModal: boolean;
  setAddProudctModal: SetState<boolean>;
}

export function AddProductModal({
  handleSubmit,
  handleChange,
  formData,
  getExactlyOneWeekAgo,
  addProudctModal,
  setAddProudctModal,
}: AddProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("clickkkk");

      if (
        addProudctModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setAddProudctModal(false);
      }
    };
    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [addProudctModal]);

  return (
    <div className="add-product-modal">
      <main className="flex align-center justify-center full">
        <div ref={modalRef} className="modal flex">
          <form onSubmit={handleSubmit} className="flex column">
            <h1>Add New Product</h1>
            <div className="flex column">
              <label htmlFor="name">Name*</label>
              <input
                name="name"
                placeholder="(e.g. Apple)"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex column">
              <label htmlFor="name">SKU*</label>
              <input
                name="sku"
                type="number"
                placeholder="SKU (e.g. 101)"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex column">
              <label htmlFor="name">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Field Crop">Field Crop</option>
              </select>
            </div>
            <div className="flex column">
              <label htmlFor="name">Description</label>
              <input
                name="description"
                placeholder="(optional)"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex column">
              <label htmlFor="name">Marketing Date*</label>
              <input
                name="marketingDate"
                type="date"
                value={formData.marketingDate}
                onChange={handleChange}
                required
                max={getExactlyOneWeekAgo()}
              />
            </div>
            <button type="submit">Create Product</button>
          </form>
        </div>
      </main>
      <div className="modal-background"></div>
    </div>
  );
}
