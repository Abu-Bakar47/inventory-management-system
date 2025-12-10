// OrderSummaryChart.tsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const data = [
  { name: 'Jan', Ordered: 3800, Delivered: 3200 },
  { name: 'Feb', Ordered: 1200, Delivered: 3400 },
  { name: 'Mar', Ordered: 2400, Delivered: 3300 },
  { name: 'Apr', Ordered: 1600, Delivered: 3100 },
  { name: 'May', Ordered: 2100, Delivered: 3600 },
];

export default function OrderSummaryChart() {
  return (
    <div className="bg-white rounded-xl shadow p-3 w-full max-w-md">
       <h1 className="text-md font-semibold text-gray-700 mb-1">
             Order Summary
            </h1>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Ordered"
            stroke="#d1902b"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Delivered"
            stroke="#99c5ff"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
