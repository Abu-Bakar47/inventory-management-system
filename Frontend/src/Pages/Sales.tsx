import { useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { salesTable } from "../Interface/data";
import ReusableModal from "../components/reusableComponents/ReusableModal";
import CustomerSelect from "../components/reusableComponents/SearchableSelect";
import { FaEye, 
  // FaRegEdit 
} from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../Redux/store";

const Sales = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [products, _] = useState<any[]>(salesTable);
  const [currentPage, setCurrentPage] = useState(1);
    

  const itemPerPage = 5;
  const totalPages = Math.ceil(products?.length / itemPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  // console.log("inventory",inventory)

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 w-full max-h-[90vh] overflow-y-auto flex gap-2 px-5">
        <div className="p-4 bg-white rounded-lg shadow-xs w-full max-w-7xl mx-auto mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Sales History
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpenModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Create Bill
              </button>
              <ReusableModal
                isOpen={isModalOpen}
                onClose={() => setIsOpenModal(false)}
                title=""
                size="md"
                height="80vh"
              >
                <CustomerSelect />
              </ReusableModal>

              <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
                Filters
              </button>
              <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
                Download all
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">S/N</th>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Total Products</th>
                  <th className="px-4 py-2">Total Amt.</th>
                  <th className="px-4 py-2">Payment</th>
                  <th className="px-4 py-2">Dues</th>
                  <th className="px-4 py-2">Bill</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((item, index) => (
                  <tr key={index} className="border-t border-t-gray-200">
                    <td className="px-4 py-2">{index+1}</td>

                    <td className="px-4 py-2">
                      {item.customerName}
                      <br />
                      <span className="text-gray-600 text-[10px]">
                        31 july 2025
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.totalProducts}</td>
                    <td className="px-4 py-2">{item.totalAmt}</td>
                    <td className="px-4 py-2">{item.payment}</td>
                    <td className="px-4 py-2">{item.dues}</td>
                    <td className="px-4 py-2">
                      <span className="w-28 flex gap-1 border border-gray-300 rounded-md items-center justify-between p-1">
                        <span>
                          <FaEye size={20} className="text-blue-700" />
                        </span>
                        <span>{item.bill}</span>
                        <span>
                          <CiSaveDown2 size={20} className="text-green-700" />
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                      onClick={() => navigate(`/dashboard/productDetails/${item?.id}`)}
                      className=" cursor-pointer bg-cyan-100 py-1 px-2 rounded-md hover:bg-cyan-200">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sales;
