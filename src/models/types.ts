export type SetState<S> = React.Dispatch<React.SetStateAction<S>>;

export type ProductCategory = "Fruit" | "Vegetable" | "Field Crop";

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
  name: ProductName;
  sku: number;
  description?: string;
  category: ProductCategory;
  marketingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
