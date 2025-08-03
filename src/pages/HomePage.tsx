import { useState } from "react";

export function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    marketingDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  return (
    <main className="flex align-center justify-center full">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <h1>Add New Product</h1>
        <input
          name="name"
          placeholder="Name (e.g. Apple)"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="sku"
          type="number"
          placeholder="SKU (e.g. 101)"
          value={formData.sku}
          onChange={handleChange}
          required
        />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Field Crop">Field Crop</option>
        </select>
        <input
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="marketingDate"
          type="date"
          value={formData.marketingDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Product</button>
      </form>
    </main>
  );
}
