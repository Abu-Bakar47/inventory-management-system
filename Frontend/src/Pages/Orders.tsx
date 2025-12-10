// import { useEffect, useMemo, useState } from 'react'
// import Pagination from '../components/Pagination'
// import ReusableModal from '../components/reusableComponents/ReusableModal'
// import OrderModal from '../components/order/OrderModal'
// import { tableList } from '../Interface/data'
// import Navbar from '../components/Navbar'
// import { useDispatch, useSelector } from 'react-redux'
// import type { AppDispatch, RootState } from '../Redux/store'
// import { fetchOrdersThunk, type OrderItem } from '../Redux/slice/inventorySlice'
// import { formateDate } from '../utils/formatDate'

// const Orders = () => {
//   const [products, _] = useState<any[]>(tableList);
//   const orderDetails = useSelector(
//   (state: RootState) => state.invent.purchaseOrders// Already an array
// );
//   const orders = useSelector(
//     (state: RootState) => state.invent.purchaseOrders || []
//   );
//   const dispatch = useDispatch<AppDispatch>();
//   const [isModalOpen, setIsOpenModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemPerPage = 5;

//   const allItems: OrderItem[] = useMemo(() => {
//   // @ts-ignore
//   return orderDetails?.purchaseOrders.flatMap((order: { items: any }) => order.items);
// }, [orderDetails]);
// // console.log("allItems",allItems)
//   const totalPages = Math.ceil(products?.length / itemPerPage);

//   const paginatedProducts = products.slice(
//     (currentPage - 1) * itemPerPage,
//     currentPage * itemPerPage
//   );
//   console.log("allItems", orderDetails)
//   console.log("orders", orders)

//   useEffect(() => {
//     dispatch(fetchOrdersThunk())

//   }, [])

//   return (
//     <div>
//       <Navbar />
//       <div className="bg-gray-50 w-full max-h-[90vh] overflow-y-auto flex gap-2 px-5">
//         <div className="p-4 bg-white rounded-lg shadow-xs w-full max-w-7xl mx-auto mt-3">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Products</h2>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsOpenModal(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
//               >
//                 Order
//               </button>
//               <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
//                 Filters
//               </button>
//               <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
//                 Download all
//               </button>
//             </div>
//           </div>

//           {/* for Modal */}
//           <ReusableModal
//             isOpen={isModalOpen}
//             onClose={() => setIsOpenModal(false)}
//             title="New Product"
//           >
//             <OrderModal />
//           </ReusableModal>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200 text-sm text-left">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2">S/N</th>
//                   <th className="px-4 py-2">Order Date</th>
//                   <th className="px-4 py-2">Products</th>
//                   <th className="px-4 py-2">Sku</th>
//                   <th className="px-4 py-2">Cost Price</th>
//                   <th className="px-4 py-2">Quantity</th>
//                   <th className="px-4 py-2">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allItems.map((item, index) => (
//                   <tr key={index} className="border-t border-t-gray-200">
//                     <td className="px-4 py-2">{index+1}</td>
//                     {/* <td className="px-4 py-2">{formateDate(item?.)}</td> */}
//                     <td className="px-4 py-2">{item.product.name}</td>
//                     <td className="px-4 py-2">{item.product.sku}</td>
//                     <td className="px-4 py-2">{item.product.costPrice}</td>
//                     <td className="px-4 py-2">{item.quantity}</td>
//                     <td className="px-4 py-2">{item.unitCost*item.quantity}</td>
//                     {/* <td className="px-4 py-2">{item.qty}</td>
//                     <td className="px-4 py-2">{item.stcok_alert}</td>
//                     <td className="px-4 py-2">{item.weight}</td> */}
//                     {/* <td className="px-4 py-2">
//                       <span
//                         className={`font-medium ${item.availability === "In-stock"
//                             ? "text-green-600"
//                             : item.availability === "Low stock"
//                               ? "text-yellow-500"
//                               : "text-red-600"
//                           }`}
//                       >
//                         {item.availability}
//                       </span>
//                     </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Orders


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../Redux/store';
import type { PurchaseOrder } from '../types/order';
import ReusableModal from '../components/reusableComponents/ReusableModal';
import OrderModal from '../components/order/OrderModal';
import { fetchOrdersThunk } from '../Redux/slice/inventorySlice';
import { useNavigate } from 'react-router-dom';
import { dateWithTime } from '../utils/formatDate';

// --- OrderCard Component (Remains the same) ---
// ... (Your OrderCard component definition goes here) ...
const OrderCard: React.FC<{ order: PurchaseOrder }> = ({ order }) => {
  const naviage = useNavigate();
  // console.log("order",order)
  // console.log("order",order._id)
  // ... (Your existing OrderCard code) ...

  // const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
  //   day: '2-digit',
  //   month: 'short',
  //   year: 'numeric',
  // });
  const currencySymbol = '₹';

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'bg-green-100 text-green-800 border-green-300';
      // ... (other cases) ...
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div
      className="bg-white shadow-lg rounded-xl p-4 mb-5 border border-gray-200 hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer"
    // onClick={() => console.log('View Order Detail:', order._id)}
    >
      <div className="flex justify-between items-center mb-1 pb-1 border-b border-gray-200">
        {/* Left: Order Info */}
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Order ID: #{order._id.toUpperCase()}
          </p>
          <h2 className="text-xl font-bold text-gray-800 mt-1">
            Supplier: {order.supplier.name}
          </h2>
          <p className="text-sm text-gray-600">
            Ordered On: {dateWithTime(order.createdAt)}
          </p>
        </div>

        {/* Right: Status and Total */}
        <div className="text-right flex flex-col items-end">
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full border ${getStatusClasses(order.status)}`}
          >
            {order.status.toUpperCase()}
          </span>
          <p className="text-3xl font-extrabold text-indigo-700 mt-2">
            {currencySymbol}{order.total.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      {/* Item Summary */}
      <div className="mt-2">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Order Items ({order.items.length})</h3>
        <div className="flex flex-wrap gap-2">
          {
          order.items.slice(0, 3).map((item) => 
          (
            <span
              key={item.product._id}
              className="text-xs px-3 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-200"
            >

              {item.product.name} (x{item.quantity})
            </span>
          ))}
          {order.items.length > 3 && (
            <span className="text-xs px-3 py-1 text-gray-500">
              ...and {order.items.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-5 text-right">
        <button
          onClick={() =>naviage(`/dashboard/orderDetails/${order._id}`)}
          className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md transition duration-150"
        >
          View Order Details
        </button>
      </div>
    </div>
  );
};
// --- Orders List Component ---
const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  // 💡 FIX IS HERE: Access the 'purchaseOrders' property, which is the array.
  const [isModalOpen, setIsOpenModal] = useState(false);
  const orders = useSelector(
    (state: RootState) => state.invent.purchaseOrders || []
  );
  // console.log(orders)

  useEffect(() => {
    dispatch(fetchOrdersThunk())

  }, [])

  const purchaseOrdersArray: PurchaseOrder[] = Array.isArray(orders) ? orders : (orders as any)?.purchaseOrders || [];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Recent Purchase Orders</h1>
        <button
          onClick={() => setIsOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer h-10"
        >
          Order
        </button>
      </div>

      {purchaseOrdersArray.length === 0 ? (
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            No Purchase Orders Found 😔
          </h1>
          <p className="text-gray-600">
            It looks like you haven't placed any orders yet.
          </p>
        </div>
      ) : (
        purchaseOrdersArray.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))
      )}

      {/* for Modal */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsOpenModal(false)}
        title="New Product"
      >
        <OrderModal setIsOpenModal={setIsOpenModal}/>
      </ReusableModal>
      {/* Use the safe array for mapping */}
      {purchaseOrdersArray.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
export default Orders;