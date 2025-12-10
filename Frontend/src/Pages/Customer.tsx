import { useState } from "react";
import ReusableModal from "../components/reusableComponents/ReusableModal";
import { MdDelete, MdEdit } from "react-icons/md";
// import FormDetails from "../components/FormDetails";

export interface CustomerType {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Customer() {
  const [customerList, setCustomerList] = useState<CustomerType[]>([
    {
      id: 1,
      name: "Abubakar",
      email: "abubakar@gmail.com",
      phone: "9905042196",
      address: "Coimbatore",
    },
    {
      id: 2,
      name: "Nawab Arzoo",
      email: "nawab@gmail.com",
      phone: "9905042196",
      address: "Delhi",
    },
    {
      id: 3,
      name: "Mubarak Alam",
      email: "mubarak@gmail.com",
      phone: "9905042196",
      address: "Batla house delhi",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerType | null>(null);

  const openAddModal = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (customer: CustomerType) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const filtered = customerList.filter((cust) => cust.id !== id);
    setCustomerList(filtered);
  };

  // const handleSubmit = (formData: Omit<CustomerType, "id">, editId?: number) => {
  //   if (editId != null) {
  //     // update
  //     const updated = customerList.map((cust) =>
  //       cust.id === editId ? { ...cust, ...formData } : cust
  //     );
  //     setCustomerList(updated);
  //   } else {
  //     // add
  //     const newCustomer = {
  //       id: Date.now(),
  //       ...formData,
  //     };
  //     console.log("newCustomer",newCustomer)
  //     setCustomerList([...customerList, newCustomer]);
  //   }
  //   setIsModalOpen(false);
  // };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Add Customer
        </button>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
        size="md"
      >
        <p>Hello</p>
        {/* <FormDetails
          defaultValues={editingCustomer}
          onSubmit={handleSubmit}
        /> */}
      </ReusableModal>

      <table className="w-full border border-gray-200 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">S/N</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((item, index) => (
            <tr key={item.id} className="border-t border-t-gray-200">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.phone}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.address}</td>
              <td className="px-4 py-2 flex gap-4">
                <button onClick={() => openEditModal(item)}>
                  <MdEdit size={18} className="text-blue-600" />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <MdDelete size={20} className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
