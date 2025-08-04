import type { IProductModel, SetState } from "../models/types";
import { ProductPreview } from "./ProductPreview";

interface ProductListProps {
  products: IProductModel[];
  onEdit?: (product: IProductModel) => void;
  onDelete?: (id: string) => void;
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
    <div className="product-list flex align-center justify-center">
      <table className="">
        <thead className="">
          <tr>
            <th>
              <input
                type="checkbox"
                id="selectAll"
                onChange={toggleSelectAll}
                checked={selectedIds.length === products.length}
              />
            </th>
            <th className="">Name</th>
            <th className="">SKU</th>
            <th className="">Category</th>
            <th className="">Description</th>
            <th className="">Marketing Date</th>
            <th className="">Actions</th>
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
