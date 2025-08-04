import { useEffect, useState } from "react";
import { AppHeader } from "../cmps/AppHeader";
import { AddProductModal } from "../cmps/AddProductModal";
import { ProductList } from "../cmps/ProductList";
import { axios } from "../services/axios";
import type { IProductModel, ProductCategory } from "../models/types";

const getExactlyOneWeekAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0];
};

export function HomePage() {
  const [formData, setFormData] = useState<Partial<IProductModel>>({
    name: "",
    sku: 0,
    category: "",
    description: "",
    marketingDate: getExactlyOneWeekAgo(),
  });
  const [addProudctModal, setAddProudctModal] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductModel[] | null>(null);
  const [filterBy, setFilterBy] = useState<ProductCategory | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await axios.getProducts(filterBy));
    };
    getProducts();
  }, [filterBy]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = await axios.createProduct(formData);
      const updatedProducts = [...(products || []), newProduct];
      setProducts(updatedProducts);
      alert("Product has added");
      setAddProudctModal(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onAddProduct = () => setAddProudctModal(!addProudctModal);

  // TODO: Add deleteProduct and deleteProduct functianality
  // const onDeleteProduct = () => setAddProudctModal(!addProudctModal);
  const onDeleteProducts = async (productId?: string) => {
    try {
      console.log(productId);
      if (productId) await axios.deleteProduct(productId);
      else await axios.deleteProduct(selectedIds);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (!products) return <></>;
  return (
    <>
      <AppHeader
        onDeleteProducts={onDeleteProducts}
        onAddProduct={onAddProduct}
      />
      {/* TODO: Add lazy loading */}

      {products ? (
        <ProductList
          products={products}
          onEdit={() => {}}
          onDelete={onDeleteProducts}
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
        />
      ) : (
        //  TODO: Add lazy loading
        <></>
      )}
      {addProudctModal && (
        <AddProductModal
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          getExactlyOneWeekAgo={getExactlyOneWeekAgo}
          addProudctModal={addProudctModal}
          setAddProudctModal={setAddProudctModal}
        />
      )}
    </>
  );
}
