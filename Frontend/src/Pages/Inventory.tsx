// Inventory.tsx
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar"
import type { AppDispatch, RootState } from "../Redux/store";
import { useEffect } from "react";
import { getInventoryThunk } from "../Redux/slice/inventorySlice";

// import { StoreNameDisplay } from "../components/stores/StoreNameDisplay";

const Inventory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { inventory, loading, error } = useSelector((state: RootState) => state.invent); // Destructure loading and error
//   const store = useSelector((state: RootState) => state.invent.store);
  // console.log("store in Inventory page:", inventory);

//   console.log("loading", loading);

  useEffect(() => {
    // Correct way to dispatch the thunk:
    dispatch(getInventoryThunk()); 
    // dispatch(fetchStoreById("68c7d9a059674a8988455d03"));
    
    // An alternative (better) approach: check if data has already loaded
    // if (!loading && inventory.length === 0 && !error) {
    //   dispatch(getInventoryThunk());
    // }
    
  }, [dispatch]); // Depend only on 'dispatch' to run once on mount

 

//   if (loading) return <div>Loading...</div>;
if(loading){
  return <p>Loading ....</p>
}
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 p-5">
        <div className="w-full bg-white shadow-xl border border-gray-300 rounded-lg">
          <p className="text-lg p-2 font-semibold text-gray-800">Overall Inventory</p>
          
          {/* Add your table UI here using Tailwind CSS */}

           <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200 text-sm text-left">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2">Products Name</th>
                            <th className="px-4 py-2">SKU</th>
                            <th className="px-4 py-2">Selling Price</th>
                            <th className="px-4 py-2">quantity</th>
                            <th className="px-4 py-2">status</th>
                            <th className="px-4 py-2">reorderLevel</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventory.length > 0 ? (
                            inventory.map((item,index) => (
                              <tr key={index} className="border-t border-t-gray-200">
                                
                                 <td className="px-4 py-2">{item?.product?.name}</td>
                                 <td className="px-4 py-2">{item?.product?.sku}</td>
                               <td className="px-4 py-2">₹: {item?.product?.sellPrice}</td>
                               {/* <td className="px-4 py-2">{ fetchName(item.store)}</td> */}
                                <td className="px-4 py-2">100</td>
                                <td className="px-4 py-2">Active</td>
                                <td className="px-4 py-2">200</td>
                              
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={10}
                                className="text-center text-lg text-gray-500"
                              >
                                No record found!!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
          
        </div>
      </div>
    </div>
  )
}

export default Inventory;
