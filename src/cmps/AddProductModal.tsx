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
import { useAlert } from "../context/AlertContext";

interface AddProductModalProps {
  setProductList: SetState<IProductModel[]>;
  productList: IProductModel[];
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: SetState<boolean>;
  formData: Partial<IProductModel>;
  setFormData: SetState<Partial<IProductModel>>;
  clearFilters: () => void;
}

export function AddProductModal({
  isAddProductModalOpen,
  formData,
  setFormData,
  productList,
  setProductList,
  setIsAddProductModalOpen,
  clearFilters,
}: AddProductModalProps) {
  const addProductModalRef = useRef<HTMLDivElement>(null);
  const { showAlert } = useAlert();

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);

  useEffect(() => {
    if (!isAddProductModalOpen) return;

    setFormData(EMPTY_PRODUCT);
    setValidationErrors({});
  }, [isAddProductModalOpen]);

  //Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isAddProductModalOpen &&
        addProductModalRef.current &&
        !addProductModalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddProductModalOpen, formData]);

  const handleCloseModal = () => {
    if (isEqual(formData, EMPTY_PRODUCT)) {
      setIsAddProductModalOpen(false);
    } else {
      setShowUnsavedChangesModal(true);
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
      setValidationErrors(validationErrors);
      return;
    }

    try {
      const newProduct = await axios.save(formData);

      setProductList([...productList, newProduct]);
      setIsAddProductModalOpen(false);
      setFormData(EMPTY_PRODUCT);
      clearFilters();
      showAlert({
        text: "Product has been added",
        type: "success",
        duration: 3000,
      });
    } catch (error: any) {
      console.log(error);

      showAlert({
        text: `Validator failed for path "name" with value ${formData.name}`,
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <div className="add-product-modal">
      <main className="flex align-center justify-center full">
        <div ref={addProductModalRef} className="modal flex column">
          <form onSubmit={handleSubmit} className="flex column">
            <div className="flex row align-center">
              <ArrowBigLeft
                className="arrow-back cursor"
                onClick={() => handleCloseModal()}
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
            {Object.entries(validationErrors).map(([field, message]) => (
              <span key={field} className="form-error">
                {message}
              </span>
            ))}
          </div>
        </div>
      </main>

      {showUnsavedChangesModal && (
        <YesOrNoModal
          text="Are you sure you want to leave? Unsaved changes will be lost."
          handleYes={() => setIsAddProductModalOpen(false)}
          handleNo={() => setShowUnsavedChangesModal(false)}
        />
      )}

      <div className="modal-background"></div>
    </div>
  );
}
