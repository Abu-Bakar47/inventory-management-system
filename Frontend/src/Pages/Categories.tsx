import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import { IoAddOutline } from "react-icons/io5";
import ReusableModal from "../components/reusableComponents/ReusableModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryThunk,
  deleteCategoryThunk,
  getAllCategoriesThunk,
  updateCategoryThunk,
} from "../Redux/slice/inventorySlice";
import type { AppDispatch, RootState } from "../Redux/store";

type Category = { _id: string; name: string };

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoriesAll = useSelector(
    (state: RootState) => state.invent?.categories
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const handleEditCategory = (item: any) => {
    setEditCategory(item);
    setCategory(item.name);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = { name: category };
    if (editCategory) {
      dispatch(
        updateCategoryThunk({ categoryId: editCategory._id, payload })
      ).then(() => {
        dispatch(getAllCategoriesThunk());
        setIsModalOpen(false);
      });
    } else {
      dispatch(createCategoryThunk(payload)).then(() => {
        setEditCategory(null);
        dispatch(getAllCategoriesThunk());
        setIsModalOpen(false);
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full px-5">
        <div className="flex justify-between items-center border-b border-b-gray-200">
          <div className="">
            <p className="text-xl font-semibold p-0.5">Categories</p>
            <p className="text-gray-600 text-md">
              Organize your products with categories
            </p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditCategory(null);
              setCategory("");
            }}
            className="bg-blue-700 rounded-md p-2 text-white cursor-pointer flex items-center gap-1 hover:bg-blue-800"
          >
            <IoAddOutline size={20} className="text-white" />
            <span> Add Categories</span>
          </button>
          <ReusableModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setCategory("");
              setEditCategory(null);
            }}
            title={editCategory ? "Edit Category" : "Add Category"}
            size="md"
          >
            <form onSubmit={handleSubmit}>
              <input
                name="category"
                className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Enter Category.."
              />
              <button
                type="submit"
                className="w-full mt-5 text-white bg-blue-700 p-2 rounded-md cursor-pointer"
              >
                {editCategory ? "Update" : "Add"}
              </button>
            </form>
          </ReusableModal>
        </div>
      </div>
      <div className="mt-4">
      <table className="w-full border border-gray-200 border-collapse">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-left">Categories</th>
      <th className="px-4 py-2 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categoriesAll.length > 0 ? (
      categoriesAll.map((cat) => (
        <tr key={cat?._id} className="border-t border-t-gray-200">
          <td className="px-4 py-2">{cat?.name}</td>
          <td className="px-4 py-2">
            <div className="flex gap-2">
              <button
                onClick={() => handleEditCategory(cat)}
                className="bg-orange-500 px-2 py-1 rounded-sm text-white text-xs cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure to delete")) {
                    dispatch(deleteCategoryThunk(cat._id)).then(() => {
                      dispatch(getAllCategoriesThunk());
                      setIsModalOpen(false);
                    });
                  }
                }}
                className="bg-red-500 text-white px-2 py-1 rounded-sm text-xs cursor-pointer"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan={2}
          className="text-center text-gray-500 text-md py-4"
        >
          No record found!!
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default Categories;
