import { useState, useEffect } from "react";
import { IProduct, IProductRes } from "../interfaces/Products";

const fetchProducts = async (page: number = 1, q: string = "") => {
  const limit = 20;
  const skip = limit * (page - 1);

  const res: IProductRes = await fetch(
    `https://dummyjson.com/products/search?q=${q}&limit=${limit}&skip=${skip}`
  ).then((res) => res.json());

  return res;
};

const useProducts = (page: number = 1, search: string = "") => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setProducts([]);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const data: IProductRes = await fetchProducts(page, search);
      const { products } = data;
      setProducts((prev) => [...prev, ...products]);
      setTotal(data.total);
    };

    fetchData();
  }, [page, search]);

  return { products, totalProducts: total };
};

export default useProducts;
