import type { IProductModel } from "../models/types";

interface AddProductModalProps {
  formData: Partial<IProductModel>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  getExactlyOneWeekAgo: () => string;
}

export function AddProductModal({
  handleSubmit,
  handleChange,
  formData,
  getExactlyOneWeekAgo,
}: AddProductModalProps) {
  return (
    <div className="add-product-modal">
      <main className="flex align-center justify-center full">
        <div className="modal flex">
          <form onSubmit={handleSubmit} className="flex column">
            <h1>Add New Product</h1>
            <input
              name="name"
              placeholder="Name (e.g. Apple)"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="sku"
              type="number"
              placeholder="SKU (e.g. 101)"
              value={formData.sku}
              onChange={handleChange}
              required
            />
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
            <input
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange}
            />
            <div>
              <span>Market Date</span>
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
