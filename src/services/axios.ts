import type { IProductModel } from "../models/types";
import { httpService } from "./http.service";

// GET: Fetch all products (optionally filtered by name)
async function getProducts(filterByName?: string): Promise<IProductModel[]> {
  const params = filterByName ? { name: filterByName } : undefined;
  return await httpService.get("product", params);
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
async function deleteProduct(productId: string): Promise<{ message: string }> {
  return await httpService.delete(`product/${productId}`);
}

export const axios = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
