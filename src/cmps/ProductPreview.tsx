import type { IProductModel } from "../models/types";
import { Pencil, Trash2 } from "lucide-react";

interface ProductPreviewProps {
  product: IProductModel;
  onEdit?: (product: IProductModel) => void;
  onDelete?: (id: string) => void;
  toggleSelect: (id: string) => void;
  isSelected: (id: string) => boolean;
}

export function ProductPreview({
  product,
  onEdit,
  onDelete,
  toggleSelect,
  isSelected,
}: ProductPreviewProps) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={() => toggleSelect(product._id)}
          checked={isSelected(product._id)}
        />
      </td>
      <td>{product.name}</td>
      <td>{product.sku}</td>
      <td>{product.category}</td>
      <td>{product.description ? product.description : '-'}</td>
      <td>{product.marketingDate}</td>
      <td>
        <button onClick={() => onEdit?.(product)}>
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete?.(product._id!)}>
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}
