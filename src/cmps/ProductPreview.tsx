import type { IProductModel } from "../models/types";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { TruncatedText } from "./TruncatedText";

interface ProductPreviewProps {
  product: IProductModel;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
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
  function getCategoryColor(category: string): string {
    switch (category) {
      case "Fruit":
        return "green";
      case "Vegetable":
        return "orange";
      case "Field Crop":
        return "brown";
      default:
        return "black";
    }
  }

  return (
    <tr>
      <td data-label="Select">
        <input
          type="checkbox"
          onChange={() => toggleSelect(product._id)}
          checked={isSelected(product._id)}
        />
      </td>
      <td data-label="Name">{product.name}</td>
      <td data-label="SKU">{product.sku}</td>
      <td data-label="Category">
        <span style={{ color: getCategoryColor(product.category) }}>
          {product.category}
        </span>
      </td>
      <td data-label="Description">
        {!product.description ? "-" : product.description.length > 20 ? <TruncatedText text={product.description} title={product.name} /> : product.description }
      </td>
      <td data-label="Marketing Date">
        {format(new Date(product.marketingDate), "dd/MM/yyyy")}
      </td>
      <td data-label="Actions">
        <button onClick={() => onEdit(product._id)}>
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete(product._id!)}>
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}
