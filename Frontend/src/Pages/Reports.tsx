import ProfitRevenueChart from "../components/Charts/ProfitRevenueChart";
import Navbar from "../components/Navbar";
import BestSellingProduct from "../components/Report/BestSellingProduct";

const data = [
  { category: "Vegetable", turnover: "₹26,000", increase: "3.2%" },
  { category: "Instant Food", turnover: "₹22,000", increase: "2%" },
  { category: "Households", turnover: "₹22,000", increase: "1.5%" },
];


const Reports = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 w-full flex gap-4 flex-col h-[90vh] overflow-y-scroll">
        {/* section1 */}
        <div className="flex gap-2 px-5 pt-3">
          <div className="w-full bg-white shadow-md border border-gray-300 rounded-md p-2">
            <h3 className="text-gray-600 font-semibold mb-4 text-lg">Overview</h3>
            <div className="w-full flex justify-between">
              <div className="flex flex-col px-2">
                <p className="text-gray-500 text-md font-semibold">₹21,190</p>
                <p className="text-gray-500 text-xs">Total Profit</p>
              </div>
              <div>
                <p className="text-gray-500 text-md font-semibold">₹18,300</p>
                <p className="text-gray-500 text-xs">Revenue</p>
              </div>
              <div>
                <p className="text-gray-500 text-md font-semibold">₹17,432</p>
                <p className="text-gray-500 text-xs">Sales</p>
              </div>
            </div>
            <hr className="text-gray-200 mt-2" />
            <div className="w-full flex justify-between mt-5">
              <div className="flex flex-col px-2">
                <p className="text-gray-500 text-md font-semibold">₹1,17,432</p>
                <p className="text-gray-500 text-xs">Net purchase value</p>
              </div>
              <div>
                <p className="text-gray-500 text-md font-semibold">₹80,432</p>
                <p className="text-gray-500 text-xs">Net sales value</p>
              </div>
              <div>
                <p className="text-gray-500 text-md font-semibold">₹30,432</p>
                <p className="text-gray-500 text-xs">MoM Profit</p>
              </div>
              <div>
                <p className="text-gray-500 text-md font-semibold">₹1,10,432</p>
                <p className="text-gray-500 text-xs">YoY Profit</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white shadow-md border border-gray-300 rounded-md px-5 py-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-gray-600 font-semibold mb-4 text-lg">
                  Best selling category
                </h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  See All
                </button>
              </div>

              {/* Table */}
              <div className="space-y-3">
                {/* Table Header */}
                <div className="flex justify-between text-sm text-gray-500 font-medium border-b border-b-gray-200 pb-2">
                  <span className="w-1/3">Category</span>
                  <span className="w-1/3 text-right">Turn Over</span>
                  <span className="w-1/3 text-right">Increase By</span>
                </div>

                {/* Table Rows */}
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <span className="w-1/3">{item.category}</span>
                    <span className="w-1/3 text-right">{item.turnover}</span>
                    <span className="w-1/3 text-right text-green-600">
                      {item.increase}
                    </span>
                  </div>
                ))}
              </div>
          </div>
        </div>
        {/* section2 */}
        <div className="w-full px-5">
          <ProfitRevenueChart/>
        </div>
        {/* section3 */}
        <div className="w-full px-5 mb-3">
          <BestSellingProduct/>
        </div>
      </div>
    </div>
  );
};

export default Reports;
