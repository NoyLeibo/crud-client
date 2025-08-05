// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import type { IProductModel } from "../models/types";
// import { axios } from "../services/axios"; // ודא שזה הנתיב הנכון

export function DetailsPage() {
  return <></>;
  //   const { productId } = useParams();
  //   const navigate = useNavigate();
  //   const [product, setProduct] = useState<IProductModel | null>(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     async function fetchProduct() {
  //       try {
  //         const res = await axios.getById(`/products/${productId}`);
  //         setProduct(res.data);
  //       } catch (err: any) {
  //         setError("Product not found");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }

  //     if (productId) fetchProduct();
  //   }, [productId]);

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value } = e.target;
  //     if (!product) return;
  //     setProduct({ ...product, [name]: value });
  //   };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       await axios.save(product);
  //       alert("Product updated!");
  //       navigate("/");
  //     } catch (err: any) {
  //       console.error("Update failed", err);
  //     }
  //   };

  //   if (isLoading) return <p>Loading...</p>;
  //   if (error) return <p>{error}</p>;
  //   if (!product) return null;

  //   return (
  //     <main className="product-details-page">
  //       <h1>Edit Product</h1>
  //       <form onSubmit={handleSubmit} className="flex column gap">
  //         <label>
  //           Name:
  //           <input name="name" value={product.name} onChange={handleChange} required />
  //         </label>
  //         <label>
  //           SKU:
  //           <input name="sku" type="number" value={product.sku} onChange={handleChange} required />
  //         </label>
  //         <label>
  //           Category:
  //           <select name="category" value={product.category} onChange={handleChange} required>
  //             <option value="Fruit">Fruit</option>
  //             <option value="Vegetable">Vegetable</option>
  //             <option value="Field Crop">Field Crop</option>
  //           </select>
  //         </label>
  //         <label>
  //           Description:
  //           <input name="description" value={product.description || ""} onChange={handleChange} />
  //         </label>
  //         <label>
  //           Marketing Date:
  //           <input
  //             name="marketingDate"
  //             type="date"
  //             value={product.marketingDate?.slice(0, 10)}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label>
  //         <button type="submit">Save</button>
  //       </form>
  //     </main>
  //   );
}
