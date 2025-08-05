import { useEffect, useState } from "react";
import { AppHeader } from "../cmps/AppHeader";
import { AddProductModal } from "../cmps/AddProductModal";
import { ProductList } from "../cmps/ProductList";
import { axios } from "../services/axios";
import type { IProductModel, ProductCategory } from "../models/types";
import { Spinner } from "../cmps/Spinner";
import { FilterBy } from "../cmps/FilterBy";

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
  const [products, setProducts] = useState<IProductModel[]>([]);
  const [filterBy, setFilterBy] = useState<ProductCategory | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [yesOrNoModal, setYesOrNoModal] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    try {
      const getProducts = async () => {
        setProducts(await axios.getProducts(filterBy));
      };
      getProducts();
    } catch (error: any) {
      console.error(error.message);
    } finally {
      console.log("finnallly");

      setLoading(false);
    }
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
        await axios.deleteProduct(productId);
        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      } else {
        await axios.deleteProduct(selectedIds);
        setProducts((prev) =>
          prev.filter((product) => !selectedIds.includes(product._id))
        );
      }
      setSelectedIds([])
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setYesOrNoModal(false);
    }
  };
  if (loading) return <Spinner />;

  return (
    <>
      <AppHeader
        onDeleteProducts={onDeleteProducts}
        onAddProduct={onAddProduct}
        selectedIds={selectedIds}
        yesOrNoModal={yesOrNoModal}
        setYesOrNoModal={setYesOrNoModal}
      />

      <FilterBy filterBy={filterBy} setFilterBy={setFilterBy} />
      {products && products.length ? (
        <ProductList
          products={products}
          onEdit={() => {}}
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
          getExactlyOneWeekAgo={getExactlyOneWeekAgo}
          addProudctModal={addProudctModal}
          setAddProudctModal={setAddProudctModal}
        />
      )}
    </>
  );
}
