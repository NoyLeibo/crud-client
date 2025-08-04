import type { IProductModel } from "../models/types";
import { ProductPreview } from "./ProductPreview";

interface ProductListProps {
  products: IProductModel[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <>
      {products.map((product) => (
        <ProductPreview key={product._id} product={product} />
      ))}
    </>
  );
}
