import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiBarChartAlt } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard, MdInventory, MdMenuOpen } from "react-icons/md";
import { RiStackFill, RiUserStarLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const links = [
    {
      name: "Dashboard",
      path: ".",
      icon: <MdDashboard size={24} />,
      end: true,
    }, // means /dashboard
    { name: "inventory", path: "Inventory", icon: <RiStackFill size={24} /> },
    { name: "Categories", path: "categories", icon: <RiStackFill size={24} /> },
    { name: "Products", path: "products", icon: <MdInventory size={24} /> },
    { name: "Reports", path: "reports", icon: <BiBarChartAlt size={24} /> },
    { name: "Sales", path: "sales", icon: <AiOutlineShoppingCart size={24} /> },
    {
      name: "Suppliers",
      path: "suppliers",
      icon: <RiUserStarLine size={24} />,
    },
    { name: "Orders", path: "orders", icon: <TbTruckDelivery size={24} /> },
    {
      name: "Manage Store",
      path: "manage-store",
      icon: <IoSettingsOutline size={24} />,
    },
    {
      name: "Customer List",
      path: "customer",
      icon: <FaHandsHelping size={24} />,
    },
  ];

  return (
    <nav
      className={`shadow-md h-screen p-2 flex flex-col gap-2 duration-500 ${
        open ? "w-48" : "w-16"
      }`}
    >
      <div className="flex px-3 py-2 justify-between items-center mb-5">
        <h2
          className={`text-2xl font-bold text-blue-600 ${
            open ? "block" : "hidden"
          }`}
        >
          KANBAN
        </h2>
        <MdMenuOpen
          className={`text-center cursor-pointer duration-500 ${
            !open && "rotate-180"
          }`}
          size={28}
          onClick={() => setOpen(!open)}
        />
      </div>

      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          end={link.end}
          className={({ isActive }) =>
            `block py-2 px-4 rounded mb-1 relative group   ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <div className="flex items-center text-center justify-start gap-2">
            <div>{link.icon}</div>
            <p
              className={`text-sm duration-500 overflow-hidden ${
                !open && "w-0 translate-x-24"
              }`}
            >
              {link.name}
            </p>
            <p
              className={`absolute left-36 z-50 bg-white shadow-md rounded-md text-sm duration-100 overflow-hidden w-0 p-0 group-hover:w-[110px] group-hover:p-2 group-hover:left-16 ${
                open && "hidden"
              }`}
            >
              {link.name}
            </p>
          </div>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
