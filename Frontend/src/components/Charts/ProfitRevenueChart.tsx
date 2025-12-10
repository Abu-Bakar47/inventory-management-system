import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  revenue: number;
  profit: number;
}

const data: ChartData[] = [
  { month: "Sep", revenue: 20000, profit: 15000 },
  { month: "Oct", revenue: 30000, profit: 20000 },
  { month: "Nov", revenue: 40000, profit: 35000 },
  { month: "Dec", revenue: 60000, profit: 45000 },
  { month: "Jan", revenue: 55000, profit: 50000 },
  { month: "Feb", revenue: 70000, profit: 60000 },
  { month: "Mar", revenue: 42000, profit: 38000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-3 border">
        <p className="text-xs text-gray-500">This Month</p>
        <p className="text-lg font-semibold text-gray-800">
          {payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    );
  }
  return null;
};

const ProfitRevenueChart: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Profit & Revenue</h2>
        <button className="flex items-center gap-2 px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100">
          📅 Weekly
        </button>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={2}
              dot={{ r: 4, fill: "#2563EB" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#FBBF24"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitRevenueChart;
