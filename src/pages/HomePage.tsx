import { useEffect, useState } from "react";
import { AppHeader } from "../cmps/AppHeader";
import { AddProductModal } from "../cmps/AddProductModal";
import { ProductList } from "../cmps/ProductList";
import { axios } from "../services/axios";
import type { IProductModel, ProductCategory } from "../models/types";

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
      const data = await axios.createProduct(formData);
      alert(data);
    } catch (err) {
      alert("Error creating product");
    }
  };

  function getExactlyOneWeekAgo() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0];
  }

  const onAddProduct = () => setAddProudctModal(!addProudctModal);

  // TODO: Add deleteProduct and deleteProduct functianality
  const onDeleteProduct = () => setAddProudctModal(!addProudctModal);
  const onDeleteProducts = () => setAddProudctModal(!addProudctModal);

  return (
    <>
      <AppHeader onDeleteProducts={onDeleteProducts} onAddProduct={onAddProduct} />
      {/* TODO: Add lazy loading */}
      {products ? <ProductList products={products} /> : <></>}
      {addProudctModal && (
        <AddProductModal
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          getExactlyOneWeekAgo={getExactlyOneWeekAgo}
        />
      )}
    </>
  );
}
