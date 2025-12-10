// SalesPurchaseChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';

const weeklyData = [
  { name: 'Jan', Purchase: 55000, Sales: 48000 },
  { name: 'Feb', Purchase: 59000, Sales: 47000 },
  { name: 'Mar', Purchase: 46000, Sales: 52000 },
  { name: 'Apr', Purchase: 38000, Sales: 43000 },
  { name: 'May', Purchase: 45000, Sales: 48000 },
  { name: 'Jun', Purchase: 30000, Sales: 42000 },
  { name: 'Jul', Purchase: 53000, Sales: 48000 },
  { name: 'Aug', Purchase: 47000, Sales: 44000 },
];

export default function SalesPurchaseChart() {
  const [data, setData] = useState(weeklyData);
  const [filter, setFilter] = useState('Weekly');

  const handleFilterChange = (type: string) => {
    setFilter(type);
    // You can add logic here to switch between datasets (weekly/monthly/custom)
    setData(weeklyData); // placeholder
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <div className="flex justify-between items-center mb-4">
         <h1 className="text-md font-semibold text-gray-700 mb-1">
              Sales & Purchase
            </h1>
        <div className="flex items-center gap-2">
          {['Weekly', 'Monthly', 'Custom'].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`border px-3 py-1 rounded-lg text-sm ${
                filter === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <Bar dataKey="Purchase" fill="#7bb7f9" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Sales" fill="#62d26f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
