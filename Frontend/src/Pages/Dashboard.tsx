import Navbar from "../components/Navbar";
import Sale from "../assets/dashboard/Sales.svg";
import revenue from "../assets/dashboard/revenue.svg";
import profit from "../assets/dashboard/profit.svg";
import cost from "../assets/dashboard/Cost.svg";
import qunatity from "../assets/dashboard/summary/Quantity.svg";
import loaction from "../assets/dashboard/summary/location.svg";

import Purchase from "../assets/dashboard/PurchaseOverview/Purchase.svg";
import cancel from "../assets/dashboard/PurchaseOverview/Cancel.svg";
import SalesPurchaseChart from "../components/dashboard/Barchart";
import OrderSummaryChart from "../components/dashboard/CompareChart";
import TopSellingStockTable from "../components/dashboard/StockTable";
import LowStockList from "../components/dashboard/lowStockItems";

const Dashboard = () => {
  const sale = [
    {
      id: 1,
      icons: Sale,
      title: "Sales",
      totalAmount: 832,
    },
    {
      id: 2,
      icons: revenue,
      title: "Revenue",
      totalAmount: 18300,
    },
    {
      id: 4,
      icons: profit,
      title: "profit",
      totalAmount: 868,
    },
    {
      id: 4,
      icons: cost,
      title: "cost",
      totalAmount: 17432,
    },
  ];

  const pur_overview = [
    {
      id: 1,
      icons: Purchase,
      title: "Purchase",
      totalAmount: 82,
    },
    {
      id: 2,
      icons: cost,
      title: "Cost",
      totalAmount: 13573,
    },
    {
      id: 4,
      icons: cancel,
      title: "Cancel",
      totalAmount: 8,
    },
    {
      id: 4,
      icons: profit,
      title: "Return",
      totalAmount: 17432,
    },
  ];

  const inv_summary = [
    {
      id: 1,
      img: qunatity,
      qty: 868,
      title: "Quantity in Hand",
    },
    {
      id: 2,
      img: loaction,
      qty: 868,
      title: "Quantity in Hand",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 w-full max-h-[90vh] overflow-y-auto flex gap-2 px-5">
        <div className="w-[67%] m-2 flex flex-col gap-2">
          <div className="w-full bg-white mx-auto py-5  p-3 shadow-md rounded-lg">
            <h1 className="text-md font-semibold text-gray-700 mb-1">
              Sales Overview
            </h1>
            <div className="w-full flex justify-between">
              {sale.length > 0 &&
                sale.map((item) => {
                  return (
                    <div
                      className="flex flex-col justify-center items-center gap-1"
                      key={item?.id}
                    >
                      <img src={item.icons} alt="inventory" />
                      <div className="flex gap-3">
                        <p className="text-md text-gray-800 font-semibold">
                          ₹ {item?.totalAmount}
                        </p>
                        <p className="text-md text-gray-700">{item?.title}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="w-full bg-white mx-auto py-5  p-3 shadow-md rounded-lg">
            <h1 className="text-md font-semibold text-gray-700 mb-1">
              Purchase Overview
            </h1>
            <div className="w-full flex justify-between">
              {pur_overview.length > 0 &&
                pur_overview.map((item) => {
                  return (
                    <div
                      className="flex flex-col justify-center items-center gap-1"
                      key={item?.id}
                    >
                      <img src={item.icons} alt="inventory" />
                      <div className="flex gap-3">
                        <p className="text-md text-gray-800 font-semibold">
                          ₹ {item?.totalAmount}
                        </p>
                        <p className="text-md text-gray-700">{item?.title}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <SalesPurchaseChart/>
          <TopSellingStockTable/>
        </div>

        <div className="w-[33%] m-2 flex flex-col gap-2">
          <div className="w-full bg-white mx-auto p-2 shadow-md rounded-lg">
            <h1 className="text-md font-semibold text-gray-700">
              Inventory Summary
            </h1>
            <div className="w-full flex justify-between">
              {inv_summary.length > 0 &&
                inv_summary.map((item) => {
                  return (
                    <div
                      className="flex flex-col justify-center items-center gap-1"
                      key={item?.id}
                    >
                      <img src={item?.img} alt="inventory" />
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-md text-gray-800 font-semibold">
                          {item?.qty}
                        </p>
                        <p className="text-md  text-gray-600">
                          {item?.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

            <div className="w-full bg-white mx-auto p-2 shadow-md rounded-lg">
            <h1 className="text-md font-semibold text-gray-700">
             Product Summary
            </h1>
            <div className="w-full flex justify-between">
              {inv_summary.length > 0 &&
                inv_summary.map((item) => {
                  return (
                    <div
                      className="flex flex-col justify-center items-center gap-1"
                      key={item?.id}
                    >
                      <img src={item?.img} alt="inventory" />
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-md text-gray-800 font-semibold">
                          {item?.qty}
                        </p>
                        <p className="text-md text-gray-600">
                          {item?.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <OrderSummaryChart/>
          <LowStockList/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
