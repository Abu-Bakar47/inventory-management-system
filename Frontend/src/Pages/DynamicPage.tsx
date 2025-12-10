import { MdOutlineFileDownload } from "react-icons/md";

const prodDetails = {
  customerDetails: {
    name: "Jane Smith",
    mobile: 9876543211,
    address: "F-21 New Delhi",
  },
  storeDetails: {
    shoapName: "Uday Supermart",
    mobile: 9876543211,
    address: "Bahadurganj Bihar(110025)",
  },
  selectedProducts: [
    {
      id: 7,
      name: "Oil",
      price: 150,
      weight: "1L",
      brand: "Fortune",
      quantity: 4,
    },
    {
      id: 12,
      name: "Biscuits",
      price: 40,
      weight: "200g",
      brand: "Britannia",
      quantity: 1,
    },
    {
      id: 1,
      name: "Meggi",
      price: 20,
      weight: "70g",
      brand: "Nestle",
      quantity: 1,
    },
    {
      id: 31,
      name: "Pizza",
      price: 300,
      weight: "1kg",
      brand: "Domino's",
      quantity: 1,
    },
    {
      id: 38,
      name: "Canned Beans",
      price: 50,
      weight: "400g",
      brand: "Heinz",
      quantity: 1,
    },
  ],
};

const DynamicPage = () => {
//   const totalQty = prodDetails.selectedProducts.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );
  const totalPrice = prodDetails.selectedProducts.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = totalPrice * 0.15;
  const discount = 100;
  const finalPrice = totalPrice + tax - discount;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <button className="border border-gray-200 px-2 rounded-md flex gap-1 cursor-pointer text-green-500">
          <span>Download</span>
          <span>
            <MdOutlineFileDownload size={20} />
          </span>
        </button>
      </div>

      <div className="flex">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold">Customer:</p>
            <p>{prodDetails.customerDetails.name}</p>
            <p>{prodDetails.customerDetails.address}</p>
            <p>Mobile: {prodDetails.customerDetails.mobile}</p>
          </div>
        </div>

        <div className="mb-4">
          <p>
            <span className="font-semibold">Invoice Date:</span> 01/08/2025
          </p>
          <p className="font-semibold">Supplier Details:</p>
          <p>Name: {prodDetails.storeDetails.shoapName}</p>
          <p>Address: {prodDetails.storeDetails.address}</p>
          <p>Mobile: {prodDetails.storeDetails.mobile}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Product Details:</p>
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">Product Name</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Unit Price</th>
              <th className="border px-2 py-1">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {prodDetails.selectedProducts.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{`${item.name} - ${item.weight}`}</td>
                <td className="border px-2 py-1 text-center">
                  {item.quantity}
                </td>
                <td className="border px-2 py-1 text-center">₹{item.price}</td>
                <td className="border px-2 py-1 text-center">
                  ₹{item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-6 space-y-1">
        <p>Price: ₹ {totalPrice.toFixed(2)}</p>
        <p>Tax 15%: ₹ {tax.toFixed(2)}</p>
        <p>Discount: ₹ {discount.toFixed(2)}</p>
        <p className="font-semibold text-lg">
          Total Price: ₹ {finalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default DynamicPage;
