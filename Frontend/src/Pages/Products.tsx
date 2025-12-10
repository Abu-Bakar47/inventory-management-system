import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import Pagination from "../components/Pagination";
// import { tableList } from "../Interface/data";
import ReusableModal from "../components/reusableComponents/ReusableModal";
import InventoryForms from "../components/forms/ProductsForms";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  deleteProductsThunk,
  getProductsThunk,
  // postProductsThunk,
} from "../Redux/slice/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Redux/store";
import type { AddProductState } from "../services/inventoryService";



const Products=() => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.invent.product);
  //  const allCategories = useSelector(
  //     (state: RootState) => state.invent?.categories
  //   );
  const [isModalOpen, setIsOpenModal] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [editProducts, setEditProducts] = useState<AddProductState | null>(
    null
  );

  // console.log("products",products)

  const openAddModal = () => {
    setEditProducts(null);
    setIsOpenModal(true);
  };
  const openEditModal = (products:AddProductState) => {
    setEditProducts(products);
    setIsOpenModal(true);
  }

  const handleDelete = (id: any) => {
    if (window.confirm("Are you sue to delete!!")) {
      dispatch(deleteProductsThunk(id)).then(() => {
        dispatch(getProductsThunk());
      });
    }
  };


  // const itemPerPage = 5;
  // const totalPages = Math.ceil(productsList?.length / itemPerPage);

  // const paginatedProducts = productsList.slice(
  //   (currentPage - 1) * itemPerPage,
  //   currentPage * itemPerPage
  // );

  useEffect(() => {
    // dispatch(postProductsThunk())
    dispatch(getProductsThunk());
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 w-full max-h-[90vh] overflow-y-auto flex gap-2 px-5">
        <div className="p-4 bg-white rounded-lg shadow-xs w-full max-w-7xl mx-auto mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <div className="flex gap-3">
              <button
                onClick={openAddModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Add Product
              </button>
              <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
                Filters
              </button>
              <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
                Download all
              </button>
            </div>
          </div>

          {/* for Modal */}
          <ReusableModal
            isOpen={isModalOpen}
            onClose={() =>{
              setIsOpenModal(false);
              setEditProducts(null)
            } }
            title="New Product"
          >
            <InventoryForms
              editProducts={editProducts}
              onCloseModal={() => {
                setIsOpenModal(false);
                setEditProducts(null)
              }}
            />
          </ReusableModal>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Products</th>
                  <th className="px-4 py-2">Brand</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Buying Price</th>
                  <th className="px-4 py-2">Selling Price</th>
                  <th className="px-4 py-2">Stocks</th>
                  {/* <th className="px-4 py-2">Stocks Alert</th> */}
                  <th className="px-4 py-2">Weight</th>
                  <th className="px-4 py-2">Availability</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item._id} className="border-t border-t-gray-200">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item?.brand}</td>
                      <td className="px-4 py-2">{item.category?.name}</td>
                      <td className="px-4 py-2">{item.costPrice}</td>
                      <td className="px-4 py-2">{item.sellPrice}</td>
                      <td className="px-4 py-2">300</td>
                      {/* <td className="px-4 py-2">{item.reorderLevel}</td> */}
                      <td className="px-4 py-2">
                        150g
                        {/* {item.weight} {item.} */}
                      </td>
                      <td className="px-4 py-2">
                        <span

                        // className={`font-medium ${
                        //   item.qty >0
                        //     ? "text-green-600"
                        //     : item.qty <1
                        //     ? "text-yellow-500"
                        //     : "text-red-600"
                        // }`}
                        >
                          Not available
                          {/* {item.qty>0 ? "Available":"Not Available"} */}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-4">
                        <button
                          onClick={() => openEditModal(item)}
                          className="cursor-pointer"
                        >
                          <MdEdit size={18} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(item?._id)}
                          className="cursor-pointer"
                        >
                          <MdDelete size={20} className="text-red-500" />
                        </button>
                      </td>
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

          {/* Pagination */}
          {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Products;
