import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MdDelete, MdEdit } from "react-icons/md";
import ReusableModal from "../components/reusableComponents/ReusableModal";
import FormDetails from "../components/FormDetails";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Redux/store";
import {
  deleteSupplierThunk,
  getSupplierThunk,
  type Supplier,
} from "../Redux/slice/inventorySlice";

const Suppliers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const supplierDetails = useSelector(
    (state: RootState) => state.invent?.supplier
  );
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };
  const openEditModal = (supplier: Supplier) => {
    // console.log("supplier", supplier);
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure to delete Supplier")) {
      dispatch(deleteSupplierThunk(id)).then(() => {
        dispatch(getSupplierThunk());
        setIsModalOpen(false);
      });
    }
  };

  useEffect(() => {
    dispatch(getSupplierThunk());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Supplier Details</h2>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-1 rounded-md"
          >
            Add Supplier
          </button>
        </div>
        <ReusableModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSupplier(null);
          }}
          title={editingSupplier ? "Edit Supplier" : "Add Supplier"}
          size="md"
        >
          <FormDetails
            editSupplier={editingSupplier}
            onCloseModal={() => {
              setIsModalOpen(false);
              setEditingSupplier(null);
            }}
          />
        </ReusableModal>
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {supplierDetails.length > 0 ? (
              supplierDetails.map((supplier: Supplier, index: number) => (
                <tr key={supplier._id} className="border-t border-t-gray-200">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{supplier.name}</td>
                  <td className="px-4 py-2">{supplier.phone}</td>
                  <td className="px-4 py-2">{supplier.email}</td>
                  <td className="px-4 py-2">{supplier.address}</td>
                  <td className="px-4 py-2 flex gap-4">
                    <button
                      onClick={() => openEditModal(supplier)}
                      className="cursor-pointer"
                    >
                      <MdEdit size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(supplier?._id)}
                      className="cursor-pointer"
                    >
                      <MdDelete size={20} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-md text-gray-600">
                  No Record Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;
