import { useEffect, useState } from "react";
import { AppHeader } from "../cmps/AppHeader";
import { AddProductModal } from "../cmps/AddProductModal";
import { ProductList } from "../cmps/ProductList";
import { axios } from "../services/axios";
import {
  productSchema,
  type IProductModel,
  type ProductCategory,
} from "../models/types";
import { Spinner } from "../cmps/Spinner";
import { ProductFilter } from "../cmps/ProductFilter";
import { useNavigate } from "react-router-dom";
import { getExactlyOneWeekAgo } from "../services/utills";

export function IndexPage() {
  const [formData, setFormData] = useState<Partial<IProductModel>>({
    name: "",
    sku: 0,
    category: "",
    description: "",
    marketingDate: getExactlyOneWeekAgo(),
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [addProudctModal, setAddProudctModal] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductModel[]>([]);
  const [filterBy, setFilterBy] = useState<ProductCategory | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [yesOrNoModal, setYesOrNoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await axios.getProducts(filterBy);
        setProducts(data);
        setSelectedIds([]);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [filterBy]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = productSchema.safeParse(formData);

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
      const newProduct = await axios.save(formData);
      const updatedProducts = [...(products || []), newProduct];
      setProducts(updatedProducts);
      setAddProudctModal(false);
      setFormData({
        name: "",
        sku: 0,
        category: "",
        description: "",
        marketingDate: getExactlyOneWeekAgo(),
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onAddProduct = () => setAddProudctModal(!addProudctModal);

  const onDeleteProducts = async (productId?: string) => {
    try {
      if (productId) {
        await axios.remove(productId);
        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      } else {
        await axios.remove(selectedIds);
        setProducts((prev) =>
          prev.filter((product) => !selectedIds.includes(product._id))
        );
      }
      setSelectedIds([]);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setYesOrNoModal(false);
    }
  };

  return (
    <>
      <AppHeader
        onDeleteProducts={onDeleteProducts}
        onAddProduct={onAddProduct}
        selectedIds={selectedIds}
        yesOrNoModal={yesOrNoModal}
        setYesOrNoModal={setYesOrNoModal}
      />

      <ProductFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      {loading ? (
        <Spinner />
      ) : products && products.length ? (
        <ProductList
          products={products}
          onEdit={(id) => navigate(`/product/${id}`)}
          onDelete={onDeleteProducts}
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
        />
      ) : (
        <h2 className="flex align-center justify-center">
          No products{filterBy && ` with category "${filterBy}"`}&nbsp;
          <span
            className="cursor underline"
            onClick={() => {
              setAddProudctModal(true);
              setFormData((prev) => ({
                ...prev,
                category: filterBy || "",
              }));
            }}
          >
            add one now!
          </span>
        </h2>
      )}

      {addProudctModal && (
        <AddProductModal
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          addProudctModal={addProudctModal}
          setAddProudctModal={setAddProudctModal}
          formErrors={formErrors}
        />
      )}
    </>
  );
}
