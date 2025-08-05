export type SetState<S> = React.Dispatch<React.SetStateAction<S>>;

export type ProductCategory = "Fruit" | "Vegetable" | "Field Crop" | "All";

export type ProductName =
  // Fruit:
  | "Apple"
  | "Banana"
  | "Grapes"
  // Vegetable:
  | "Cucumber"
  | "Tomato"
  | "Carrot"
  // Field Crop:
  | "Rice"
  | "Lentils"
  | "Wheat";

export interface IProductModel {
  _id: string;
  name: string;
  sku: number;
  description?: string;
  category: string;
  marketingDate: string;
  createdAt: Date;
  updatedAt: Date;
}

import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(50),
  sku: z.number().nonnegative("SKU must be 0 or more"),
  description: z.string().optional(),
  category: z.enum(["Fruit", "Vegetable", "Field Crop"]),
  marketingDate: z.string().refine(
    (val) => {
      const inputDate = new Date(val);
      const today = new Date();

      inputDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      return inputDate <= sevenDaysAgo;
    },
    {
      message: "Date must be 7 or more days ago",
    }
  ),
});
