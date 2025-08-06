import type { IProductModel } from "../models/types";

export const getExactlyOneWeekAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0];
};

export const EMPTY_PRODUCT: Partial<IProductModel> = {
  name: "",
  sku: 0,
  category: "",
  description: "",
  marketingDate: getExactlyOneWeekAgo(),
  isDeleted: false,
};