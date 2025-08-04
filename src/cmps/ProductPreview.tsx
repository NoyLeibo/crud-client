import type { IProductModel } from "../models/types";
import { Pencil, Trash2 } from "lucide-react"; 

interface ProductPreviewProps {
  product: IProductModel;
  onEdit?: (product: IProductModel) => void;
  onDelete?: (id: string) => void;
}

export function ProductPreview({ product, onEdit, onDelete }: ProductPreviewProps) {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-2">{product.name}</td>
      <td className="p-2">{product.sku}</td>
      <td className="p-2">{product.category}</td>
      <td className="p-2">{product.description}</td>
      <td className="p-2">{product.marketingDate}</td>
      <td className="p-2 flex gap-2 justify-center">
        <button onClick={() => onEdit?.(product)}>
          <Pencil size={16} className="text-blue-600 hover:text-blue-800" />
        </button>
        <button onClick={() => onDelete?.(product._id!)}>
          <Trash2 size={16} className="text-red-600 hover:text-red-800" />
        </button>
      </td>
    </tr>
  );
}
