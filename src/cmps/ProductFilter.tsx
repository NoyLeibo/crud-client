import type { ProductCategory, SetState } from "../models/types";
import { FormField } from "./FormFiled";

interface FilterByProps {
  filterByCategory: ProductCategory | null;
  setFilterByCategory: SetState<ProductCategory | null>;
  filterByName: string;
  setFilterByName: SetState<string>;
}

export function ProductFilter({
  filterByCategory,
  setFilterByCategory,
  filterByName,
  setFilterByName,
}: FilterByProps) {
  const clearFilters = () => {
    setFilterByName("");
    setFilterByCategory(null);
  };

  return (
    <div className="filter-by-section flex justify-center align-center">
      <div className="flex column">
        <h3>Filter by category:</h3>
        <select
          name="category"
          value={filterByCategory || ""}
          onChange={(e) =>
            setFilterByCategory((e.target.value as ProductCategory) || null)
          }
          required
        >
          <option value="">All Category</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Field Crop">Field Crop</option>
        </select>
      </div>

      <div className="flex column">
        <h3>Filter by name:</h3>
        <FormField
          name="filter by name"
          value={filterByName}
          onChange={(e) => setFilterByName(e.target.value as string)}
        />
      </div>
      <button
        type="button"
        onClick={() => clearFilters()}
        className="clear-filters-btn"
      >
        Clear Filters
      </button>
    </div>
  );
}
