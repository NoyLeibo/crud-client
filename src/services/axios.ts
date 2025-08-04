import type { IProductModel, ProductCategory } from "../models/types";
import { httpService } from "./http.service";

// GET: Fetch all products (optionally filtered by name)
async function getProducts(
  filter: ProductCategory | null
): Promise<IProductModel[]> {
  const res = filter
    ? await httpService.get("product", { category: filter })
    : await httpService.get("product");
  return res;
}

// POST: Create new product
async function createProduct(
  product: Partial<IProductModel>
): Promise<IProductModel> {
  return await httpService.post("product", product);
}

// PUT: Update existing product
async function updateProduct(
  productId: string,
  updatedFields: Partial<IProductModel>
): Promise<IProductModel> {
  return await httpService.put(`product/${productId}`, updatedFields);
}

// DELETE: Remove product
async function deleteProduct(
  productId: string | string[]
): Promise<{ message: string }> {
  return await httpService.delete("product", { ids: productId });
}

export const axios = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
