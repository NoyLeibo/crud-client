import type { ProductCategory, SetState } from "../models/types";

interface FilterByProps {
  filterBy: ProductCategory | null;
  setFilterBy: SetState<ProductCategory | null>;
}

export function FilterBy({ filterBy, setFilterBy }: FilterByProps) {
  return (
    <div className="filter-by-section flex justify-center align-center">
      <h3>Filter by:&nbsp;</h3>
      <select
        name="category"
        value={filterBy || ""}
        onChange={(e) =>
          setFilterBy((e.target.value as ProductCategory) || null)
        }
        required
      >
        <option value="">All Category</option>
        <option value="Fruit">Fruit</option>
        <option value="Vegetable">Vegetable</option>
        <option value="Field Crop">Field Crop</option>
      </select>
    </div>
  );
}
