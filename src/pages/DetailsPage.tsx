import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productSchema, type IProductModel } from "../models/types";
import { axios } from "../services/axios";
import { ArrowBigLeft } from "lucide-react";
import { getExactlyOneWeekAgo } from "../services/utills";

export function DetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!productId) {
          throw new Error("Missing productId from route params");
        }
        const res = await axios.getById(productId);
        console.log(res);

        setProduct(res);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!product) return;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = productSchema.safeParse(product);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
        return;
      }
      if (!product) throw new Error("No product has found");
      await axios.save(product);
      navigate("/");
    } catch (error: any) {
      console.error("Update failed", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <main className="product-details-page flex column align-center">
      <div className="flex row align-center">
        <ArrowBigLeft
          className="arrow-back cursor"
          onClick={() => navigate("/")}
        />
        <h1 className="fs24">Edit Product</h1>
      </div>
      <form onSubmit={handleSubmit} className="product-form flex column">
        <label className="flex column">
          Name:
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex column">
          SKU:
          <input
            name="sku"
            type="number"
            value={product.sku}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex column">
          Category:
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Field Crop">Field Crop</option>
          </select>
        </label>
        <label className="flex column">
          Description:
          <input
            name="description"
            value={product.description || ""}
            onChange={handleChange}
          />
        </label>
        <label className="flex column">
          Marketing Date:
          <input
            name="marketingDate"
            type="date"
            value={product.marketingDate?.slice(0, 10)}
            onChange={handleChange}
            required
            max={getExactlyOneWeekAgo()}
          />
        </label>
        <button type="submit" className="btn-save">
          Save
        </button>
        <div className="flex column">
          {formErrors &&
            Object.entries(formErrors).map(([field, message]) => (
              <span key={field} className="form-error">
                {message}
              </span>
            ))}
        </div>
      </form>
    </main>
  );
}
