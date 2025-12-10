// TopSellingStockTable.tsx
const topSellingStock = [
  { name: 'Surf Excel', sold: 30, remaining: 12, price: 100 },
  { name: 'Rin', sold: 21, remaining: 15, price: 207 },
  { name: 'Parle G', sold: 19, remaining: 17, price: 105 },
  // You can add more data here for testing scroll
];

export default function TopSellingStockTable() {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Top Selling Stock</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
      </div>

      <div className="overflow-x-auto max-h-60">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Sold Quantity</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Remaining Quantity</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Price</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {topSellingStock.map((item, index) => (
              <tr key={index} className="border-t border-t-gray-200">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.sold}</td>
                <td className="px-4 py-3">{item.remaining}</td>
                <td className="px-4 py-3">₹ {item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
