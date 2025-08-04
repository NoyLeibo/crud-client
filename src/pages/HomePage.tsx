import { useState } from "react";
import { AppHeader } from "../cmps/AppHeader";
import { AddProductModal } from "../cmps/AddProductModal";

export function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    marketingDate: "",
  });
  const [addProudctModal, setAddProudctModal] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.text();
      alert(data);
    } catch (err) {
      alert("Error creating product");
    }
  };

  const onAddProduct = () => setAddProudctModal(!addProudctModal);
  const onDeleteProduct = () => setAddProudctModal(!addProudctModal);

  return (
    <>
      <AppHeader onAddProduct={onAddProduct} onDeleteProduct={onDeleteProduct} />
      {addProudctModal && <AddProductModal handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}/>}
    </>
  );
}
