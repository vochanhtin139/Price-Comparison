import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createShop, getAllShops } from 'src/api/api';

// ----------------------------------------------------------------------

export default function useShop() {
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      const data = await getAllShops();
      setShops(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateShop = async (shop: any) => {
    try {
      const data = await createShop(shop);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    shops,
    fetchShops,
    handleCreateShop,
  };
}
