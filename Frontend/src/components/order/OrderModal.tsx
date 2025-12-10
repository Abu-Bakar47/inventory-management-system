import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Redux/store";
import { fetchOrdersThunk, placeOrderThunk } from "../../Redux/slice/inventorySlice";
interface Product {
  name: string;
  brand: string;
  costPrice: number;
}
interface OrderedProduct extends Product {
  quantity: number;
  total: number;
}
interface OrderModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const OrderModal: React.FC<OrderModalProps> = ({ setIsOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.invent.product);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [supplier, setSupplier] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [orderedProducts, setOrderedProducts] = useState<OrderedProduct[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const supplierDetails = useSelector(
    (state: RootState) => state.invent?.supplier
  );

  // console.log("supplierId",supplier)

  const handlePlaceOrder = async () => {
    if (orderedProducts.length === 0) return;

    const payload = {
      supplier: supplier,
      status: "placed",
      items: orderedProducts.map((p) => ({
        product: (p as any)._id,
        quantity: p.quantity,
      })),
      tax: 18,
    };

    try {
      await dispatch(placeOrderThunk(payload)).unwrap();
      setIsOpenModal(false);
      dispatch(fetchOrdersThunk());
    } catch (error) {
      console.error(error);
      alert("Failed to place the order. Please try again.");
    }
  };


  const handleProductSelect = (value: string) => {
    setInputValue(value);
    const found = products.find(
      (p) =>
        `${p.name} - ${p.brand}`.toLowerCase() === value.toLowerCase()
    );
    setSelectedProduct(found ?? null);
  };

  const handleAdd = () => {
    if (!selectedProduct) return;
    const duplicateIndex = orderedProducts.findIndex(
      (p) =>
        p.name === selectedProduct.name &&
        p.brand === selectedProduct.brand
    );

    // Show alert if product already exists and not editing
    if (duplicateIndex !== -1 && !isEditing) {
      alert("Product already added. Please select another item.");
      return;
    }

    const newProduct: OrderedProduct = {
      ...selectedProduct,
      quantity,
      total: selectedProduct?.costPrice * quantity,
    };

    if (isEditing && editIndex !== null) {
      const updated = [...orderedProducts];
      updated[editIndex] = newProduct;
      setOrderedProducts(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setOrderedProducts([...orderedProducts, newProduct]);
    }

    // Reset
    setSelectedProduct(null);
    setQuantity(1);
    setInputValue("");
    setSupplier("");
  };

  const handleEdit = (index: number) => {
    const prod = orderedProducts[index];
    setInputValue(`${prod.name} - ${prod.brand}`);
    setSelectedProduct(prod);
    setQuantity(prod.quantity);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const filtered = orderedProducts.filter((_, i) => i !== index);
    setOrderedProducts(filtered);

    // Cancel edit if deleted item is being edited
    if (editIndex === index) {
      setIsEditing(false);
      setEditIndex(null);
      setInputValue("");
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [])

  return (
    <div className="">
      <div>
        <label className="block font-semibold mb-2">Select Products</label>
        <div className="flex flex-col">
          <div>
            <input
              list="products"
              value={inputValue}
              onChange={(e) => handleProductSelect(e.target.value)}
              placeholder="Select product"
              className="border rounded w-full p-2"
            />
            <datalist id="products">
              {products
                // .filter((p) => p.name === "In-stock")
                .map((p, i) => (
                  <option key={i} value={`${p.name} - ${p.brand}`} />
                ))}
            </datalist>
          </div>
          <div className="mt-1">
            <label className="block font-semibold mb-2">Select Supplier(Option)</label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="border rounded w-full p-2"
            >
              <option value="">Select product</option>
              {supplierDetails.map((s, i) => (
                <option key={i} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 mt-1 cursor-pointer py-2"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>

        {selectedProduct && (
          <div className="mt-1 flex gap-4 items-center">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Unit Price</label>
              <input
                type="text"
                readOnly
                value={`₹${selectedProduct?.costPrice}`}
                className="border p-2 w-full rounded bg-gray-100"
              />
            </div>
          </div>
        )}
      </div>

      {orderedProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Brand</th>
                  <th className="p-2 border">Unit Price</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {orderedProducts.map((prod, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{prod.name}</td>
                    <td className="p-2 border">{prod.brand}</td>
                    <td className="p-2 border">₹{prod?.costPrice}</td>
                    <td className="p-2 border">{prod.quantity}</td>
                    <td className="p-2 border font-semibold">₹{prod.total}</td>
                    <td className="p-2 border font-semibold flex gap-1">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="bg-amber-700 text-gray-200 rounded-md px-2 py-0.5 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="bg-red-600 text-white rounded-md px-2 py-0.5 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-50">
                  <td colSpan={4} className="p-2 border text-right">
                    Grand Total
                  </td>
                  <td className="p-2 border">
                    ₹
                    {orderedProducts.reduce((acc, item) => acc + item.total, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 mt-6 w-full text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModal;
