import { useEffect, useState } from "react";
import ReusableModal from "../components/reusableComponents/ReusableModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStoreThunk, 
  fetchAllStoreThunk,
  selectStoreThunk,
} from "../Redux/slice/inventorySlice";
import type { AppDispatch, RootState } from "../Redux/store";
import { StoreModalDetails } from "../components/stores/StoreModalDetals";
import ThreeDotMenu from "../components/Menu";

export interface Store {
  id?: string;
  _id?: string;
  name?: string;
  manager?: string;
  mobile?: string | number;
  address?: string;
}

export default function ManageStore() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [editStore, setEditStore] = useState<Store | null>(null);
  const allStore = useSelector((state: RootState) => state.invent.stores);
  // console.log("allStore1111", allStore.stores);
  useEffect(() => {
    dispatch(fetchAllStoreThunk());
  }, [dispatch]);
  return (
    <div className="max-w-4xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Store</h2>
        <button
          onClick={() => setIsOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Add Store
        </button>
      </div>

      <div className="space-y-4">
        {allStore?.map((store) => (
          <div
            className={`flex justify-between p-4 border border-gray-200 rounded-lg ${
              store?.selected
                ? "bg-green-600 text-white"
                : "bg-blue-200 text-gray-700"
            } transition-colors`}
            key={store._id}
          >
            <div className="flex gap-6">
              <div className="w-48 font-semibold text-gray-700">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-K1WPX--UpE2nQ8AmO7MjJ1wh8hByzh49A&s"
                  alt="Inventory"
                />
              </div>
              <div>
                {/* {console.log("store",store)} */}
                <div className="font-semibold">{store.name}</div>
              </div>
            </div>
            <ThreeDotMenu
              onEdit={() => {
                setEditStore(store);
                setIsOpenModal(true);
              }}
              onSelect={() => {
                if (window.confirm("Are you sure to change store?")) {
                  localStorage.setItem("storeId",store._id);
                  dispatch(selectStoreThunk(store._id)).then(() =>
                    dispatch(fetchAllStoreThunk())
                  ); // 👈 Re-fetch stores
                }
              }}
              selected={store?.selected}
              onDelete={() => {
                if (
                  window.confirm("Are you sure you want to delete this store?")
                ) {
                  dispatch(deleteStoreThunk(store._id)).then(() =>
                    dispatch(fetchAllStoreThunk())
                  );
                }
              }}
            />
            {/* <button
              onClick={() => {
                setEditStore(store);
                setIsOpenModal(true);
              }}
              className={`text-blue-600 border ${
                true
                  ? "border-gray-300 text-white hover:bg-orange-300"
                  : "border-blue-600 hover:bg-blue-50"
              } px-3 py-1 h-10 rounded-md text-sm`}
            >
              Edit
            </button> */}
          </div>
        ))}
      </div>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsOpenModal(false);
          setEditStore(null);
        }}
        title={editStore ? "Edit Store" : "Add New Store"}
        size="md"
      >
        <StoreModalDetails
          editStore={editStore}
          onCloseModal={() => {
            setIsOpenModal(false);
            setEditStore(null);
          }}
        />
      </ReusableModal>
    </div>
  );
}
