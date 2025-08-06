import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppHeader } from "../cmps/AppHeader";
import { AddProductModal } from "../cmps/AddProductModal";
import { ProductList } from "../cmps/ProductList";
import { ProductFilter } from "../cmps/ProductFilter";
import { Spinner } from "../cmps/Spinner";

import { axios } from "../services/axios";
import { EMPTY_PRODUCT, getExactlyOneWeekAgo } from "../services/utills";
import type { IProductModel, ProductCategory } from "../models/types";

export function IndexPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<IProductModel[]>([]);
  const [formData, setFormData] =
    useState<Partial<IProductModel>>(EMPTY_PRODUCT);

  const [filterByCategory, setFilterByCategory] =
    useState<ProductCategory | null>(null);
  const [filterByName, setFilterByName] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await axios.getProducts({
          filterByCategory,
          filterByName,
        });
        setProducts(data);
        setSelectedIds([]);
      } catch (err: any) {
        console.error("Failed to fetch products:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filterByCategory, filterByName]);

  const toggleAddProductModal = () => {
    setIsAddProductModalOpen((prev) => !prev);
  };

  useEffect(() => {
    setFormData({
      name: "",
      sku: 0,
      category: "",
      description: "",
      marketingDate: getExactlyOneWeekAgo(),
    });
  }, [isAddProductModalOpen]);

  const handleDeleteProducts = async (productId?: string) => {
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
    } catch (err: any) {
      console.error("Failed to delete product(s):", err.message);
    } finally {
      setIsDeleteConfirmModalOpen(false);
    }
  };

  const handleEmptyClick = () => {
    setIsAddProductModalOpen(true);
  };

  return (
    <>
      <AppHeader
        onDeleteProducts={handleDeleteProducts}
        onAddProduct={toggleAddProductModal}
        selectedIds={selectedIds}
        yesOrNoModal={isDeleteConfirmModalOpen}
        setYesOrNoModal={setIsDeleteConfirmModalOpen}
      />

      <ProductFilter
        filterByCategory={filterByCategory}
        setFilterByCategory={setFilterByCategory}
        filterByName={filterByName}
        setFilterByName={setFilterByName}
      />

      {isLoading ? (
        <Spinner />
      ) : products.length ? (
        <ProductList
          products={products}
          onEdit={(id) => navigate(`/product/${id}`)}
          onDelete={handleDeleteProducts}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      ) : (
        <h2 className="flex align-center justify-center">
          No products
          {filterByCategory && ` with category "${filterByCategory}"`}{" "}
          <span className="cursor underline" onClick={handleEmptyClick}>
            add one now!
          </span>
        </h2>
      )}

      {isAddProductModalOpen && (
        <AddProductModal
          formData={formData}
          setFormData={setFormData}
          addProudctModal={isAddProductModalOpen}
          setAddProudctModal={setIsAddProductModalOpen}
          products={products}
          setProducts={setProducts}
        />
      )}
    </>
  );
}
