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

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const accessToken = localStorage.getItem('accessToken');

  const fetchShopeeProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<IShopeeProduct[]>(
        'http://localhost:8080/api/shopee-products',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setShopeeProducts(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  const fetchShopeeProductById = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get<IShopeeProduct>(
        `http://localhost:8080/api/shopee-product?id=${id}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*', // Allows all origins
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setShopeeProduct(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  const fetchShopeeProductsById = async (id: string) => {
    try {
      setLoading(true);
      // const response = await axios.get<IShopeeProduct[]>(`http://localhost:8080/api/all-shopee-product?productName=${name}`);
      const response = await axios.get<IShopeeProduct[]>(
        `http://localhost:8080/api/all-shopee-product?id=${id}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*', // Allows all origins
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setShopeeProducts(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  const fetchShopeeProductByName = async (name: string) => {
    try {
      setLoading(true);
      // const response = await axios.get<IShopeeProduct>(`http://localhost:8080/api/shopee-product?productName=${name}`);
      const response = await axios.get<IShopeeProduct>(
        `http://localhost:8080/api/shopee-product?productLink=${name}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*', // Allows all origins
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setShopeeProduct(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  const fetchShopeeProductsByName = async (name: string) => {
    try {
      setLoading(true);
      // const response = await axios.get<IShopeeProduct[]>(`http://localhost:8080/api/all-shopee-product?productName=${name}`);
      const response = await axios.get<IShopeeProduct[]>(
        `http://localhost:8080/api/all-shopee-product?productName=${name}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*', // Allows all origins
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setShopeeProducts(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

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
    fetchShopeeProductsById,
    fetchShopeeProductsByName,
    shopeeProduct,
    fetchShopeeProductById,
    fetchShopeeProductByName,
    // handleCreateShopeeProduct
  };
}
