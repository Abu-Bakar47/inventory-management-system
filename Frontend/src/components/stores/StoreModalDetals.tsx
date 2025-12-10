import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Redux/store";
import { useEffect, useState } from "react";
import {
  createStoreThunk,
  fetchAllStoreThunk,
  updateStoreThunk,
} from "../../Redux/slice/inventorySlice";
import PlainInput from "../reusableComponents/PlainInput";

// Reusable Modal Component
interface StoreModalProps {
  editStore: any; // Replace 'any' with a more specific type if available
  onCloseModal: () => void;
}

export function StoreModalDetails({
  editStore,
  onCloseModal,
}: StoreModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  // console.log("defaultData",defaultData)
  console.log("editStore", editStore);
  const [form, setForm] = useState({
    storeName: "",
    manager: "",
    city: "",
    pincode: "",
    phone: "",
    state: "",
  });

  useEffect(() => {
    if (editStore) {
      const [city = "", state = "", pincode = ""] = (
        editStore.address || ""
      ).split(",");
      setForm({
        storeName: editStore.name || "",
        manager: editStore.manager || "",
        phone: (editStore.mobile || "").toString(),
        city: city.trim(),
        pincode: pincode ? pincode.trim() : "",
        state: state ? state.trim() : "",
      });
    }
  }, [editStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // e.preventDefault();
    const payload = {
      name: form.storeName,
      manager: form.manager,
      address: `${form.city}, ${form.state}, ${form.pincode}`,
      mobile: Number(form.phone),
    };

    if (editStore) {
      // updateStoreThunk should be implemented in your slice
      dispatch(updateStoreThunk({ storeId: editStore._id, payload })).then(
        () => {
          onCloseModal();
          dispatch(fetchAllStoreThunk());
        }
      );
    } else {
      dispatch(createStoreThunk(payload)).then(() => {
        dispatch(fetchAllStoreThunk());
        onCloseModal();
      });
    }
  };
  return (
    <div className="w-full">
      <div className="bg-white p-6">
        <h2 className="text-lg font-semibold mb-4"></h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <PlainInput
            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="storeName"
            onChange={handleChange}
            value={form.storeName}
            placeholder="Store Name"
            label="Store Name"
            required
          />
          <PlainInput
            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="manager"
            onChange={handleChange}
            value={form.manager}
            placeholder="Manager Name"
            label="Manager Name"
          />
          <PlainInput
            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="phone"
            onChange={handleChange}
            value={form.phone}
            placeholder="Phone Number"
            label="Phone Number"
          />
          <PlainInput
            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="city"
            onChange={handleChange}
            value={form.city}
            placeholder="City"
            label="City"
          />
          <PlainInput
            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="pincode"
            onChange={handleChange}
            value={form.pincode}
            placeholder="Pincode"
            label="Pincode"
          />
          <PlainInput
            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="state"
            onChange={handleChange}
            value={form.state}
            placeholder="State"
            label="State"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editStore ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
