import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import PlainInput from "../reusableComponents/PlainInput";
// import type { productsListType } from "../../Pages/Products";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Redux/store";
import { getProductsThunk, postProductsThunk, updateProductsThunk } from "../../Redux/slice/inventorySlice";
import type { AddProductState } from "../../services/inventoryService";

type FormDataType = {
  name: string;
  sku: string;
  brand: string;
  category: string;
  costPrice: string | number;
  sellPrice: string | number;
  taxRate?: string | number;
  unit: string;
};

interface ProductsFormsProps {
  editProducts?: AddProductState | null;
  onCloseModal: () => void;
}
const ProductsForms = ({ editProducts, onCloseModal }: ProductsFormsProps) => {
  const AllCategories = useSelector(
    (state: RootState) => state.invent?.categories
  );
  const dispatch = useDispatch<AppDispatch>()

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    sku: "",
    brand: "",
    category: "",
    costPrice: "",  // <-- empty
    sellPrice: "",  // <-- empty
    unit: "",
  });

  useEffect(() => {
    if (editProducts) {
      setFormData({
        name: editProducts.name,
        sku: editProducts.sku,
        brand: editProducts.brand,
        category: editProducts.category._id,
        costPrice: Number(editProducts.costPrice),
        sellPrice: Number(editProducts.sellPrice),
        unit: editProducts.unit,
      });
    } else {
      setFormData({
        name: "",
        sku: "",
        brand: "",
        category: "",
        costPrice: "",
        sellPrice: "",
        unit: "",
      })
    }
  }, [editProducts]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      costPrice: Number(formData.costPrice),
      sellPrice: Number(formData.sellPrice),


    }
    if (editProducts) {
      // Need to be edit action
      dispatch(updateProductsThunk({ productId: editProducts?._id, payload: formData })).then(() => {
        dispatch(getProductsThunk());
        onCloseModal();
      })
    } else {
      dispatch(postProductsThunk(payload)).then(() => {
        dispatch(getProductsThunk());
        onCloseModal();
      })
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
        <PlainInput
          className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="name"
          onChange={handleChange}
          value={formData?.name}
          label="Product Name"
          placeholder="Enter product name"
          type="text"
          required
        />
        <PlainInput
          className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="sku"
          onChange={handleChange}
          value={formData?.sku}
          label="Sku"
          placeholder="Enter Sku code"
          type="text"
          optional={true}
          // required
        />
        <PlainInput
          className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="brand"
          onChange={handleChange}
          value={formData?.brand}
          label="Brand"
          placeholder="Enter brand name"
          type="text"
          required
        />
        <div className="w-full flex gap-2">
          <label className="w-[30%] text-nowrap text-sm font-semibold text-gray-700 flex items-center text-center">
            Category <span className="text-red-500 text-lg ml-1">*</span>
          </label>
          <select
            name="category"
            required
            className="w-full input border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Select product category</option>
            {AllCategories.length > 0 ? (
              AllCategories.map((cat) => (<option value={cat?._id} key={cat?._id}>{cat.name}</option>
              ))
            ) : <p>No Category Found</p>}
          </select>
        </div>
        <PlainInput
          className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="costPrice"
          onChange={handleChange}
          value={formData?.costPrice}
          label="Buying Price"
          placeholder="Enter buying price"
          type="number"
          // min="0"
          required
        />
        <PlainInput
          className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="sellPrice"
          onChange={handleChange}
          value={formData?.sellPrice}
          label="Selling Price"
          placeholder="Enter selling price"
          type="number"
          required
        />
        <div className="flex gap-1">
          <label className="w-[30%] text-nowrap text-sm font-semibold text-gray-700 flex items-center text-center">Units <span className="text-red-500 text-lg ml-1">*</span></label>
          <select
            name="unit"
            className="w-full input border border-gray-400 rounded px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleChange}
            value={formData.unit}
          >
            <option value="">Select Unit</option>
            <option value="gram">Gram</option>
            <option value="kg">Kg</option>
            <option value="Quintal">Quintal</option>
            <option value="ml">ml</option>
            <option value="meter">Meter</option>
            <option value="mm">mm</option>
            <option value="cm">cm</option>

          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded cursor-pointer"
        >
          {editProducts ? "Update" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductsForms;
