
const BestSellingProduct = () => {
  const data = [
    { product: "Tomato", id: "23567", category: "Vegetable", quantity: "225 kg", turnover: "₹17,000", increase: "2.3%" },
    { product: "Onion", id: "25831", category: "Vegetable", quantity: "200 kg", turnover: "₹12,000", increase: "1.3%" },
    { product: "Maggi", id: "56841", category: "Instant Food", quantity: "200 Packet", turnover: "₹10,000", increase: "1.3%" },
    { product: "Surf Excel", id: "23567", category: "Household", quantity: "125 Packet", turnover: "₹9,000", increase: "1%" },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Best selling product
        </h2>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          See All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-b-gray-200">
              <th className="py-2">Product</th>
              <th className="py-2">Product ID</th>
              <th className="py-2">Category</th>
              <th className="py-2">Remaining Quantity</th>
              <th className="py-2">Turn Over</th>
              <th className="py-2">Increase By</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-b-gray-200 last:border-none">
                <td className="py-3">{item.product}</td>
                <td className="py-3">{item.id}</td>
                <td className="py-3">{item.category}</td>
                <td className="py-3">{item.quantity}</td>
                <td className="py-3">{item.turnover}</td>
                <td className="py-3 text-green-600">{item.increase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellingProduct;
