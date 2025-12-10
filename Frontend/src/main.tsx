import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.tsx";
import Reports from "./Pages/Reports.tsx";
import Sales from "./Pages/Sales.tsx";
import Suppliers from "./Pages/Suppliers.tsx";
import Orders from "./Pages/Orders.tsx";
import ManageStore from "./Pages/ManageStore.tsx";
import Login from "./components/auth/Login.tsx";
import Signup from "./components/auth/Signup.tsx";
import PrivateRoute from "./components/auth/PrivateRoute.tsx";
import PricingPage from "./Pages/PricingPage.tsx";
import DynamicPage from "./Pages/DynamicPage.tsx";
import Categories from "./Pages/Categories.tsx";
import Customer from "./Pages/Customer.tsx";
import PaymentPage from "./Pages/Payments.tsx";
import Landingpage from "./Pages/Landingpage.tsx";
import DashboardLayout from "./Pages/DashboardLayout.tsx";
import {Provider}  from "react-redux";
import { store } from "./Redux/store.ts";
import Products from "./Pages/Products.tsx";
import Inventory from "./Pages/Inventory.tsx";
import OrderDetails from "./Pages/OrderDetails.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Landingpage /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/payment/:planType/:id",
    element: <PaymentPage />,
  },
 {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <Dashboard /> }, 
    { path: "categories", element: <Categories /> }, 
    { path: "inventory", element: <Inventory /> },   
    { path: "products", element: <Products /> },   
    { path: "reports", element: <Reports /> },   
    { path: "sales", element: <Sales /> },
    { path: "suppliers", element: <Suppliers /> },
    { path: "orders", element: <Orders /> },
    { path: "manage-store", element: <ManageStore /> },
    { path: "customer", element: <Customer /> },
    { path: "productDetails/:id", element: <DynamicPage /> },
    { path: "orderDetails/:id", element: <OrderDetails /> },
  ],
}
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
    <RouterProvider router={router} />
      </Provider>
  </StrictMode>
);
