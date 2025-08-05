import type { IProductModel, SetState } from "../models/types";
import { ProductPreview } from "./ProductPreview";

interface ProductListProps {
  products: IProductModel[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  setSelectedIds: SetState<string[]>;
  selectedIds: string[];
}

export function ProductList({
  products,
  onEdit,
  onDelete,
  setSelectedIds,
  selectedIds,
}: ProductListProps) {
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p._id!));
    }
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  return (
    <div className="product-list-container flex justify-center">
      <table className="product-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="selectAll"
                onChange={toggleSelectAll}
                checked={
                  selectedIds.length === products.length &&
                  selectedIds.length > 0
                }
              />
            </th>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Description</th>
            <th>Marketing Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductPreview
              key={product._id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              toggleSelect={toggleSelect}
              isSelected={isSelected}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
