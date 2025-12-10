import React, { useState } from "react";
import PlainInput from "../components/reusableComponents/PlainInput";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    brandName: "",
    category: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    alertStocks: "",
    weight: "",
    unit: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.weight && !formData.unit) {
      alert("Please select a unit when weight is provided.");
      return;
    }

    const payload = {
      productName: formData?.productName,
      brandName: formData?.brandName,
      category: formData?.category,
      buyingPrice: Number(formData?.buyingPrice),
      sellingPrice: Number(formData?.sellingPrice),
      quantity: Number(formData?.quantity),
      alertStocks: Number(formData?.alertStocks),
      weight: formData?.weight ? Number(formData?.weight) : null,
      unit: formData?.unit || null,
    };

    onSave(payload);
    console.log("payload", payload);
    // onClose();
    setFormData({
      productName: "",
      brandName: "",
      category: "",
      buyingPrice: "",
      sellingPrice: "",
      quantity: "",
      alertStocks: "",
      weight: "",
      unit: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-md relative">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4">New Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <PlainInput
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="productName"
              onChange={handleChange}
              value={formData?.productName}
              label="Product Name"
              placeholder="Enter product name"
              type="text"
              required
            />
            <PlainInput
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="brandName"
              onChange={handleChange}
              value={formData?.brandName}
              label="Brand"
              placeholder="Enter brand name"
              type="text"
              required
            />
            <div className="w-full flex gap-2">
              <label className="w-[30%] text-nowrap text-sm font-semibold text-gray-700 flex items-center text-center">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full input border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              >
                <option>Select product category</option>
                <option value="Electronics">Electronics</option>
                <option value="Medicine">Medicine</option>
              </select>
            </div>
            <PlainInput
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="buyingPrice"
              onChange={handleChange}
              value={formData?.buyingPrice}
              label="Buying Price"
              placeholder="Enter buying price"
              type="number"
              required
            />
            <PlainInput
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="sellingPrice"
              onChange={handleChange}
              value={formData?.sellingPrice}
              label="Selling Price"
              placeholder="Enter selling price"
              type="number"
              required
            />
            <PlainInput
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="quantity"
              onChange={handleChange}
              value={formData?.quantity}
              label="Quantity/Stocks"
              placeholder="Enter quantity"
              type="number"
              required
            />
            <PlainInput
              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="alertStocks"
              onChange={handleChange}
              value={formData?.alertStocks}
              label="Stocks Alert"
              placeholder="Enter alert threshold"
              type="number"
              required
            />
            <div className="flex gap-1">
              <PlainInput
                className="w-[70%] ml-2 border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="weight"
                onChange={handleChange}
                value={formData?.weight}
                label="Weight (optional)"
                placeholder="Enter product weight"
                type="number"
              />
              <select
                name="unit"
                className="w-[30%] input border border-gray-400 rounded px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
                // value={formData.unit}
              >
                <option value="">Select Unit</option>
                <option value="Gram">Gram</option>
                <option value="kg">Kg</option>
                <option value="Quintal">Quintal</option>
                <option value="ml">ml</option>
                <option value="liter">Liter</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded cursor-pointer"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
