import type { IProductModel } from "../models/types";
import { httpService } from "./http.service";


// GET: Fetch all products (optionally filtered by name)
export async function getProducts(filterByName?: string): Promise<IProductModel[]> {
  const params = filterByName ? { name: filterByName } : undefined;
  return await httpService.get("product", params);
}

// POST: Create new product
export async function createProduct(product: Partial<IProductModel>): Promise<IProductModel> {
  return await httpService.post("product", product);
}

// PUT: Update existing product
export async function updateProduct(productId: string, updatedFields: Partial<IProductModel>): Promise<IProductModel> {
  return await httpService.put(`product/${productId}`, updatedFields);
}

// DELETE: Remove product
export async function deleteProduct(productId: string): Promise<{ message: string }> {
  return await httpService.delete(`product/${productId}`);
}
