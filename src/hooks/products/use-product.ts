import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { createShop, getAllShops } from 'src/api/api';

import IShopeeProduct from './product.interface';

// ----------------------------------------------------------------------

export default function useProduct() {
  const [shopeeProducts, setShopeeProducts] = useState<IShopeeProduct[]>([]);
  const [shopeeProduct, setShopeeProduct] = useState<IShopeeProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchShopeeProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<IShopeeProduct[]>('http://localhost:8080/api/shopee-products');
      setShopeeProducts(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }

  const fetchShopeeProductByName = async (name: string) => {
    try {
      setLoading(true);
      // const response = await axios.get<IShopeeProduct>(`http://localhost:8080/api/shopee-product?productName=${name}`);
      const response = await axios.get<IShopeeProduct>(
        `http://localhost:8080/api/shopee-product?productName=${name}`,
        {
          headers: {
            // 'Authorization': 'Bearer your_token_here',
            'accept': '*/*'
          }
        }
      );
      setShopeeProduct(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }

  const fetchShopeeProductsByName = async (name: string) => {
    try {
      setLoading(true);
      const response = await axios.get<IShopeeProduct[]>(`http://localhost:8080/api/all-shopee-product?productName=${name}`);
      setShopeeProducts(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }

  // const handleCreateShopeeProduct = async (product: any) => {
  //   try {
  //     const data = await createShop(product);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return {
    loading,
    error,
    success,
    shopeeProducts,
    fetchShopeeProducts,
    fetchShopeeProductsByName,
    shopeeProduct,
    fetchShopeeProductByName
    // handleCreateShopeeProduct
  }
}
