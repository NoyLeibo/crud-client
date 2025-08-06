import { useEffect, useRef, useState } from "react";
import {
  productSchema,
  type IProductModel,
  type SetState,
} from "../models/types";
import { EMPTY_PRODUCT, getExactlyOneWeekAgo } from "../services/utils";
import { axios } from "../services/axios";
import { YesOrNoModal } from "./YesOrNoModal";
import isEqual from "lodash/isEqual";
import { FormField } from "./FormField";
import { ArrowBigLeft } from "lucide-react";

interface AddProductModalProps {
  setProducts: SetState<IProductModel[]>;
  products: IProductModel[];
  addProudctModal: boolean;
  setAddProudctModal: SetState<boolean>;
  formData: Partial<IProductModel>;
  setFormData: SetState<Partial<IProductModel>>;
}

export function AddProductModal({
  addProudctModal,
  formData,
  setFormData,
  products,
  setProducts,
  setAddProudctModal,
}: AddProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    if (!addProudctModal) return;

    setFormData(EMPTY_PRODUCT);
    setFormErrors({});
  }, [addProudctModal]);

  //Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addProudctModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleBackClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addProudctModal, formData]);

  const handleBackClick = () => {
    if (isEqual(formData, EMPTY_PRODUCT)) {
      setAddProudctModal(false);
    } else {
      setShowLeaveModal(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = productSchema.safeParse(formData);
    if (!validation.success) {
      const validationErrors: Record<string, string> = {};
      validation.error.issues.forEach(({ path, message }) => {
        if (path[0]) validationErrors[path[0] as string] = message;
      });
      setFormErrors(validationErrors);
      return;
    }

    try {
      const newProduct = await axios.save(formData);
      setProducts([...products, newProduct]);
      setAddProudctModal(false);
      setFormData(EMPTY_PRODUCT);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="add-product-modal">
      <main className="flex align-center justify-center full">
        <div ref={modalRef} className="modal flex column">
          <form onSubmit={handleSubmit} className="flex column">
            <div className="flex row align-center">
              <ArrowBigLeft
                className="arrow-back cursor"
                onClick={() => handleBackClick()}
              />
              <h1>Add New Product</h1>
            </div>

            <FormField
              label="Name*"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="(e.g. Apple)"
              required
            />

            <FormField
              label="SKU*"
              name="sku"
              type="number"
              value={formData.sku}
              onChange={handleInputChange}
              placeholder="SKU (e.g. 101)"
              required
            />

            <div className="flex column">
              <label htmlFor="category">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled={!!formData.category}>
                  Select Category
                </option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Field Crop">Field Crop</option>
              </select>
            </div>

            <FormField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="(optional)"
            />

            <FormField
              label="Marketing Date*"
              name="marketingDate"
              type="date"
              value={formData.marketingDate}
              onChange={handleInputChange}
              required
              max={getExactlyOneWeekAgo()}
            />

            <button type="submit">Create Product</button>
          </form>

          <div className="flex column">
            {Object.entries(formErrors).map(([field, message]) => (
              <span key={field} className="form-error">
                {message}
              </span>
            ))}
          </div>
        </div>
      </main>

      {showLeaveModal && (
        <YesOrNoModal
          text="Are you sure you want to leave? Unsaved changes will be lost."
          handleYes={() => setAddProudctModal(false)}
          handleNo={() => setShowLeaveModal(false)}
        />
      )}

      <div className="modal-background"></div>
    </div>
  );
}
