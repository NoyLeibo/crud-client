import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productSchema, type IProductModel } from "../models/types";
import { axios } from "../services/axios";
import { ArrowBigLeft } from "lucide-react";
import { getExactlyOneWeekAgo } from "../services/utills";
import { Spinner } from "../cmps/Spinner";
import { YesOrNoModal } from "../cmps/yesOrNoModal";

export function DetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProductModel | null>(null);
  const [initialProduct, setInitialProduct] = useState<IProductModel | null>(
    null
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setErrorMsg("Missing productId from route params");
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const productData = await axios.getById(productId);
        setProduct(productData);
        setInitialProduct(productData);
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!product) return;
    setProduct({ ...product, [name]: value });
  };

  const handleBackClick = () => {
    if (JSON.stringify(product) === JSON.stringify(initialProduct)) {
      navigate("/");
    } else {
      setShowLeaveModal(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    console.log('handleFormSubmit');
    
    e.preventDefault();
    if (!product) return;

    const result = productSchema.safeParse(product);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        if (issue.path[0]) {
          errors[issue.path[0] as string] = issue.message;
        }
      }
      setFormErrors(errors);
      return;
    }

    try {
      await axios.save(product);
      navigate("/");
    } catch (err: any) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading) return <Spinner />;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!product) return null;

  return (
    <main className="product-details-page flex column align-center">
      <div className="flex row align-center">
        <ArrowBigLeft
          className="arrow-back cursor"
          onClick={() => handleBackClick()}
        />
        <h1 className="fs24">Edit Product</h1>
      </div>

      <form onSubmit={handleFormSubmit} className="product-form flex column">
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
            max={getExactlyOneWeekAgo()}
            required
          />
        </label>

        <button type="submit" className="btn-save">
          Save
        </button>

        <div className="flex column">
          {Object.entries(formErrors).map(([field, message]) => (
            <span key={field} className="form-error">
              {message}
            </span>
          ))}
        </div>

        {showLeaveModal && (
          <YesOrNoModal
            text="Are you sure you want to leave? Unsaved changes will be lost."
            handleYes={() => navigate("/")}
            handleNo={() => setShowLeaveModal(false)}
          />
        )}
      </form>
    </main>
  );
}
