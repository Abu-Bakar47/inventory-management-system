import { useEffect, useState } from "react";
import { getStoreByIdFn } from "../../services/inventoryService";

export const StoreNameDisplay = ({ storeId }: { storeId: string }) => {
  const [storeName, setStoreName] = useState<string>("");
//   console.log("storeName",storeName)

  useEffect(() => {
    const fetchName = async () => {
      try {
        const store = await getStoreByIdFn(storeId);
        setStoreName(store.name);
      } catch (error) {
        console.error("Error fetching store name:", error);
      }
    };

    if (storeId) fetchName();
  }, [storeId]);

  return <span>{storeName}</span>;
};
