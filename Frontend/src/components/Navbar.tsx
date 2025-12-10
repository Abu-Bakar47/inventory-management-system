import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { logout } from "../Redux/slice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state:RootState) => state.auth.userDetails)
  // console.log("users1",users1)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const users = {
  //   name: "Md Naquee",
  //   email: "nak@gmail.com",
  // };

  const getInitials = (name: string) => {
    const words = name.split(" ");
    // console.log("words", words);
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        setDropdownOpen(false)
      }
    };

    document.addEventListener("mousedown",handleClickOutside);
    return () => {
      document.addEventListener("mousedown",handleClickOutside)
    }
  });
  return (
    <div className="w-full flex justify-end items-center p-1 shadow-sm border-b border-b-gray-300">
      <div className="relative px-4 float-right" ref={dropdownRef}>
        <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-blue-800 text-gray-100 cursor-pointer flex items-center justify-center font-bold focus:outline-none">
          {getInitials(users?.email || "")}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-xl z-10 mr-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-b-gray-100">
              {users?.email}
            </div>
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li
              onClick={() =>dispatch(logout()) }
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
