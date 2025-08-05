import type { IProductModel, ProductCategory } from "../models/types";
import { httpService } from "./http.service";

const BASE_URL = "product/";

// GET: Fetch all products (optionally filtered by category)
async function getProducts(
  filter: ProductCategory | null
): Promise<IProductModel[]> {
  const res = filter
    ? await httpService.get(BASE_URL, { category: filter })
    : await httpService.get(BASE_URL);
  return res;
}

// PUT: Update existing product, or saving a new one
async function save(
  updatedFields: Partial<IProductModel>
): Promise<IProductModel> {
  if (updatedFields._id)
    return await httpService.put(BASE_URL + updatedFields._id, updatedFields);
  else return await httpService.post(BASE_URL, updatedFields);
}

// DELETE: Remove product
async function remove(
  productId: string | string[]
): Promise<{ message: string }> {
  return await httpService.delete(BASE_URL, { ids: productId });
}

async function getById(productId: string) {
  return await httpService.get(BASE_URL + productId);
}

export const axios = {
  getProducts,
  save,
  remove,
  getById,
};
