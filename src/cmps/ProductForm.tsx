// import { useState } from "react";
// import { InputField } from "./InputField";
// import { CategorySelect } from "./CategorySelect";

// export function ProductForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     sku: "",
//     category: "",
//     description: "",
//     marketingDate: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // שליחת fetch
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
//       <InputField name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" type="number" />
//       <CategorySelect value={formData.category} onChange={handleChange} />
//       <InputField name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
//       <InputField name="marketingDate" value={formData.marketingDate} onChange={handleChange} type="date" />
//       <button type="submit">Create Product</button>
//     </form>
//   );
// }
