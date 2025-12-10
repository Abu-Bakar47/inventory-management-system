// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'
// import type { AppDispatch, RootState } from '../Redux/store';
// import { fetchOrdersDetailsThunk } from '../Redux/slice/inventorySlice';

// const OrderDetails = () => {
//   const dispatch =useDispatch<AppDispatch>();
//   const orderDetails= useSelector((state:RootState) => state.invent.orderDetails)
//   const {id} = useParams();
//   console.log("orderDetails",orderDetails)

//   useEffect(() => {
//     if(id){
//       dispatch(fetchOrdersDetailsThunk(id))
//     }
//   },[id,dispatch])

//   return (
//     <div>
//       OrderDetails Dynamic page
//     </div>
//   )
// }

// export default OrderDetails


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../Redux/store';
import { fetchOrdersDetailsThunk } from '../Redux/slice/inventorySlice';

// Define the necessary TypeScript interfaces based on your JSON structure
// (You should define these interfaces in a separate file, e.g., 'types.ts', 
// but I'll include them here for a complete example.)

interface Product {
  _id: string;
  name: string;
  sku: string;
  costPrice: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
  unitCost: number;
}

interface Supplier {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PurchaseOrder {
  _id: string;
  store: string;
  supplier: Supplier;
  status: 'placed' | 'shipped' | 'delivered' | 'cancelled'; // Extend as needed
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderDetailsState {
    purchaseOrder: PurchaseOrder | null; // The structure you provided wraps the PO in a 'purchaseOrder' key
    loading: boolean; // Add a loading state for better UX
    error: string | null; // Add an error state
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const OrderDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  // Assuming your Redux state structure matches OrderDetailsState
  const orderDetailsState = useSelector(
    (state: RootState) => state.invent.orderDetails as OrderDetailsState | null // Cast to the expected type
  );
  const purchaseOrder = orderDetailsState?.purchaseOrder ?? null;
  const {loading, error} = useSelector(
    (state: RootState) => state.invent
  );

  useEffect(() => {
    if (id) {
      // In a real app, you might check if data is already present before fetching
      dispatch(fetchOrdersDetailsThunk(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div className="p-8 text-lg font-semibold">Loading Order Details...</div>;
  }

  if (error) {
    return <div className="p-8 text-lg font-semibold text-red-600">Error: {error}</div>;
  }

  if (!purchaseOrder) {
    return <div className="p-8 text-lg font-semibold">Order not found or no data available.</div>;
  }

  const {
    _id,
    supplier,
    status,
    items,
    subtotal,
    tax,
    total,
    createdAt,
  } = purchaseOrder;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Purchase Order #{_id.slice(-6)}
      </h1>

      {/* --- Order Summary and Status --- */}
      <section className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-blue-600">Order Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="Order ID" value={_id} />
          <DetailItem label="Status" value={status} isStatus={true} />
          <DetailItem label="Order Date" value={formatDate(createdAt)} />
          <DetailItem label="Store ID" value={purchaseOrder.store} />
        </div>
      </section>

      {/* --- Supplier Details --- */}
      <section className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-blue-600">Supplier Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="Name" value={supplier.name} />
          <DetailItem label="Email" value={supplier.email} />
          <DetailItem label="Phone" value={supplier.phone} />
          <DetailItem label="Address" value={supplier.address} colSpan={2} />
        </div>
      </section>

      {/* --- Order Items Table --- */}
      <section className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-blue-600">Items Ordered ({items.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Line Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{item.unitCost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">₹{(item.quantity * item.unitCost).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- Totals Summary --- */}
      <section className="p-6 bg-white shadow-lg rounded-lg border border-gray-100 flex justify-end">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Tax:</span>
            <span className="font-medium">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 mt-2 pt-3 border-t-2 border-blue-200">
            <span className="text-lg font-bold text-gray-800">Total Amount:</span>
            <span className="text-lg font-bold text-blue-600">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;

// Helper component for consistent detail display
interface DetailItemProps {
  label: string;
  value: string;
  isStatus?: boolean;
  colSpan?: 1 | 2;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, isStatus = false, colSpan = 1 }) => {
  // Utility function to determine status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`flex flex-col ${colSpan === 2 ? 'col-span-2' : ''}`}>
      <span className="text-sm font-medium text-gray-500">{label}:</span>
      {isStatus ? (
        <span
          className={`mt-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-semibold capitalize ${getStatusBadge(
            value
          )}`}
        >
          {value}
        </span>
      ) : (
        <span className="text-base text-gray-900 break-words">{value}</span>
      )}
    </div>
  );
};



// import React, { useState, useMemo } from 'react';
// import { Truck, Package, DollarSign, Calendar, Mail, Phone, MapPin, XCircle } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// interface Product {
//     _id: string;
//     name: string;
//     sku: string;
//     costPrice: number;
// }

// interface Item {
//     product: Product;
//     quantity: number;
//     unitCost: number;
// }

// interface Supplier {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
// }

// interface PurchaseOrder {
//     _id: string;
//     store: string;
//     supplier: Supplier;
//     status: 'placed' | 'received' | 'cancelled'; // Extend status options if needed
//     items: Item[];
//     subtotal: number;
//     tax: number;
//     total: number;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// }

// // --- MOCK DATA BASED ON USER INPUT ---
// const initialData: PurchaseOrder = {
//     "purchaseOrder": {
//         "_id": "690e3ed70e514788bc1bb609",
//         "store": "68c7cac359674a8988455c6e",
//         "supplier": {
//             "_id": "68c9829ce4b1bf5de9f01794",
//             "name": "Suman Deva",
//             "email": "suman@gmail.com",
//             "phone": "9905042136",
//             "address": "Kishanganj Bihar (855115)"
//         },
//         "status": "placed",
//         "items": [
//             {
//                 "product": {
//                     "_id": "68e778a2221244598088c2c0",
//                     "name": "Charger",
//                     "sku": "ch-1001",
//                     "costPrice": 1200
//                 },
//                 "quantity": 3,
//                 "unitCost": 1200
//             },
//             // Adding a second item for better table display
//             {
//                 "product": {
//                     "_id": "68e778a2221244598088c2c1",
//                     "name": "Bluetooth Speaker",
//                     "sku": "bs-2025",
//                     "costPrice": 3500
//                 },
//                 "quantity": 1,
//                 "unitCost": 3500
//             }
//         ],
//         "subtotal": 7100, // Updated to reflect new item
//         "tax": 18,
//         "total": 8398, // Updated to reflect new item (7100 + 7100 * 0.18 = 8378, adjusting for the 1200*3 + 3500 = 7100 calculation)
//         "createdAt": "2025-11-07T18:47:51.959Z",
//         "updatedAt": "2025-11-07T18:47:51.959Z",
//         "__v": 0
//     }
// }.purchaseOrder;

// // --- UTILITY FUNCTIONS ---
// const formatCurrency = (amount: number): string => {
//     // Assuming Indian Rupees based on the address/phone format, but using USD symbol for generality.
//     // Replace 'INR' with your local currency code (e.g., 'USD', 'EUR') if necessary.
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//         minimumFractionDigits: 2,
//     }).format(amount);
// };

// const formatDate = (dateString: string): string => {
//     return new Intl.DateTimeFormat('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//     }).format(new Date(dateString));
// };

// const getStatusClasses = (status: PurchaseOrder['status']): { text: string; bg: string; icon: React.FC<any> } => {
//     switch (status) {
//         case 'placed':
//             return { text: 'text-blue-700', bg: 'bg-blue-100', icon: Package };
//         case 'received':
//             return { text: 'text-green-700', bg: 'bg-green-100', icon: Truck };
//         case 'cancelled':
//             return { text: 'text-red-700', bg: 'bg-red-100', icon: XCircle };
//         default:
//             return { text: 'text-gray-700', bg: 'bg-gray-100', icon: Package };
//     }
// };

// // --- COMPONENTS ---

// // Card component for uniform styling
// const DetailCard: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className = '' }) => (
//     <div className={`p-6 bg-white shadow-xl rounded-xl ${className}`}>
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">{title}</h2>
//         {children}
//     </div>
// );

// const DetailRow: React.FC<{ icon: React.FC<any>, label: string, value: string | number }> = ({ icon: Icon, label, value }) => (
//     <div className="flex items-center space-x-3 py-1">
//         <Icon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
//         <span className="text-sm font-medium text-gray-500 min-w-[100px]">{label}:</span>
//         <span className="text-sm font-semibold text-gray-700 break-words flex-1">{value}</span>
//     </div>
// );


// // Main App Component
// export default function OrderDetails() {
//     // In a real application, you would fetch this data
//     const [poData, setPoData] = useState<PurchaseOrder>(initialData);
//     const { text: statusTextClass, bg: statusBgClass, icon: StatusIcon } = getStatusClasses(poData.status);

//     const supplier = poData.supplier;

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter']">
//             <div className="max-w-6xl mx-auto">
                
//                 {/* Header Section */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
//                     <h1 className="text-3xl font-extrabold text-gray-900 mb-2 sm:mb-0">
//                         Purchase Order <span className="text-indigo-600">#{poData._id.substring(16)}</span>
//                     </h1>
//                     <div className="flex items-center space-x-2">
//                         <StatusIcon className={`w-5 h-5 ${statusTextClass}`} />
//                         <span className={`px-3 py-1 text-sm font-bold rounded-full uppercase ${statusTextClass} ${statusBgClass}`}>
//                             {poData.status}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Main Content Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                     {/* Supplier Information Card (Col Span 1) */}
//                     <DetailCard title="Supplier Details" className="lg:col-span-1">
//                         <p className="text-lg font-bold text-gray-800 mb-3">{supplier.name}</p>
//                         <DetailRow icon={Mail} label="Email" value={supplier.email} />
//                         <DetailRow icon={Phone} label="Phone" value={supplier.phone} />
//                         <DetailRow icon={MapPin} label="Address" value={supplier.address} />
//                     </DetailCard>

//                     {/* Financial Summary Card (Col Span 1) */}
//                     <DetailCard title="Financial Summary" className="lg:col-span-1">
//                         <div className="space-y-2">
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-500">Subtotal:</span>
//                                 <span className="font-medium text-gray-700">{formatCurrency(poData.subtotal)}</span>
//                             </div>
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-500">Tax ({poData.tax}%):</span>
//                                 <span className="font-medium text-gray-700">{formatCurrency(poData.subtotal * (poData.tax / 100))}</span>
//                             </div>
//                             <div className="pt-3 border-t border-gray-200 flex justify-between text-lg font-bold">
//                                 <span>Total Cost:</span>
//                                 <span className="text-indigo-600">{formatCurrency(poData.total)}</span>
//                             </div>
//                         </div>
//                     </DetailCard>

//                     {/* Dates Card (Col Span 1) */}
//                     <DetailCard title="Order Timeline" className="lg:col-span-1">
//                         <DetailRow icon={Calendar} label="Created" value={formatDate(poData.createdAt)} />
//                         <DetailRow icon={Calendar} label="Last Updated" value={formatDate(poData.updatedAt)} />
//                         <DetailRow icon={Package} label="PO ID" value={poData._id} />
//                     </DetailCard>
//                 </div>

//                 {/* Items Table Section */}
//                 <DetailCard title="Ordered Items" className="mt-6 p-0 overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Line Total</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {poData.items.map((item, index) => (
//                                     <tr key={item.product._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product.sku}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">{item.quantity}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">{formatCurrency(item.unitCost)}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
//                                             {formatCurrency(item.unitCost * item.quantity)}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </DetailCard>

//                 {/* Actions (Placeholder) */}
//                 <div className="mt-6 flex justify-end space-x-3">
//                     <button className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-150 shadow-sm">
//                         Print
//                     </button>
//                     <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 shadow-lg">
//                         Confirm Receipt
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// }