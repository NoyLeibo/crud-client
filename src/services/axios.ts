import type { IProductModel, ProductCategory } from "../models/types";
import { httpService } from "./http.service";

const BASE_URL = "product/";

interface ProductFilter {
  filterByCategory: ProductCategory | null;
  filterByName: string;
}
// GET: Fetch all products (optionally filtered by category and name)
async function getProducts(filter: ProductFilter): Promise<IProductModel[]> {
  const query: Record<string, string> = {};

  if (filter.filterByCategory) {
    query.category = filter.filterByCategory;
  }

  if (filter.filterByName) {
    query.name = filter.filterByName;
  }

  const res = await httpService.get(BASE_URL, query);
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

async function undoDelete(
  ids: string | string[]
): Promise<IProductModel[] | IProductModel> {
  return await httpService.put(BASE_URL + "undo-delete", { ids })
}

export const axios = {
  getProducts,
  save,
  remove,
  getById,
  undoDelete,
};
