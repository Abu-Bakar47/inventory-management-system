import { useState, useEffect, type FormEvent } from "react";
import PlainInput from "./reusableComponents/PlainInput";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";
import {
  createSupplierThunk,
  getSupplierThunk,
  updateSupplierThunk,
  type Supplier,
} from "../Redux/slice/inventorySlice";

interface FormDetailsProps {
  editSupplier?: Supplier | null;
  onCloseModal: () => void;
}

export default function FormDetails({
  editSupplier,
  onCloseModal,
}: FormDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editSupplier) {
      setForm({
        name: editSupplier.name,
        email: editSupplier.email,
        phone: editSupplier.phone,
        address: editSupplier.address,
      });
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [editSupplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editSupplier) {
      dispatch(
        updateSupplierThunk({ supplierId: editSupplier._id, payload: form })
      ).then(() => {
        dispatch(getSupplierThunk());
        onCloseModal();
      });
    } else {
      dispatch(createSupplierThunk(form)).then(() => {
        dispatch(getSupplierThunk());
        onCloseModal();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <PlainInput
        className="w-[70%] ml-2 border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Customer Name"
        label="Customer Name"
        required
      />
      <PlainInput
        className="w-[70%] ml-2 border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        label="Phone Number"
        required
      />
      <PlainInput
        className="w-[70%] ml-2 border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        label="Email"
        type="email"
      />
      <PlainInput
        className="w-[70%] ml-2 border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        label="Address"
        required
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editSupplier ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
