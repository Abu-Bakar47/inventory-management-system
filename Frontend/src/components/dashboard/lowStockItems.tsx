// LowStockList.tsx

const lowStockItems = [
  {
    name: 'Tata Salt',
    remaining: 10,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFUmj6ZSRv4j8M_afgvPsUnHLSTOigqMTXg&s', // replace with real image URL
  },
  {
    name: 'Lays',
    remaining: 15,
    image: 'https://www.quickpantry.in/cdn/shop/products/lay-s-spanish-tomato-tango-potato-chips-32-g-quick-pantry.jpg?v=1710538823&width=640', // replace with real image URL
  },
  {
    name: 'Lays',
    remaining: 15,
    image: 'https://www.quickpantry.in/cdn/shop/products/lay-s-spanish-tomato-tango-potato-chips-32-g-quick-pantry.jpg?v=1710538823&width=640', // replace with real image URL
  },
];

export default function LowStockList() {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Low Quantity Stock</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
      </div>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {lowStockItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Remaining Quantity : {item.remaining} Packet
                </p>
              </div>
            </div>
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
              Low
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
