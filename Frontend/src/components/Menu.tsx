import { useState, useRef, useEffect, type FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import Spiner from "./reusableComponents/Spiner";

type ThreeDotMenuProps = {
  onEdit: () => void;
  onSelect: () => void;
  onDelete: () => void;
  selected: boolean;
};

const ThreeDotMenu: FC<ThreeDotMenuProps> = ({
  onEdit,
  onDelete,
  onSelect,
  selected,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const loading = useSelector((state: RootState) => state.invent?.loading);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded hover:bg-gray-200"
        style={{ border: "none", background: "none", cursor: "pointer" }}
        aria-label="Open menu"
        tabIndex={0}
      >
        <BsThreeDotsVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-20 min-w-[120px]">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            {loading ? <Spiner /> : "Delete"}
          </button>
          <button
            disabled={selected}
            onClick={() =>{
              onSelect()
              setOpen(false)
            }}
            className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 
    ${selected ? "cursor-not-allowed" : "cursor-pointer"}
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
          >
            {selected ? "Selected" : "Select"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
