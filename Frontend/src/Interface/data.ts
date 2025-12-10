export type PlanType = "monthly" | "yearly";

export interface Plan {
  id: number;
  name: string;
  price: string;
  subPrice: string;
  users: string;
  features: string[];
}

export const plans: Record<PlanType, Plan[]> = {
  monthly: [
    {
      id: 1001,
      name: "Starter Plan",
      price: "₹00",
      subPrice: "First month ₹499/month",
      users: "1 User",
      features: [
        "Track Inventory Stock",
        "Low Stock Alerts",
        "Add/Edit/Delete Products",
      ],
    },
    {
      id: 1002,
      name: "Premium Plan",
      price: "₹00",
      subPrice: "First month ₹999/month",
      users: "3 User",
      features: [
        "All Starter Features",
        "Purchase & Sales Management",
        "Supplier Management",
        "Export Reports to Excel/PDF",
      ],
    },
    {
      id: 1003,
      name: "Business Plan",
      price: "₹00",
      subPrice: "First month ₹1,299/month",
      users: "5 User",
      features: [
        "All Premium Features",
        "Stock Adjustment Logs",
        "Expiry & Batch Tracking",
        "Custom Role Permissions",
        "Dedicated Support Manager",
      ],
    },
  ],
  yearly: [
    {
      id: 2001,
      name: "Starter Plan",
      price: "₹00",
      subPrice: "First month ₹4,999/year",
      users: "1 User",
      features: [
        "Track Inventory Stock",
        "Low Stock Alerts",
        "Add/Edit/Delete Products",
      ],
    },
    {
      id: 1002,
      name: "Premium Plan",
      price: "₹00",
      subPrice: "First month ₹9,999/year",
      users: "3 User",
      features: [
        "All Starter Features",
        "Purchase & Sales Management",
        "Supplier Management",
        "Export Reports to Excel/PDF",
      ],
    },
    {
      id: 1003,
      name: "Business Plan",
      price: "₹00",
      subPrice: "First month ₹13,999/year",
      users: "5 User",
      features: [
        "All Premium Features",
        "Stock Adjustment Logs",
        "Expiry & Batch Tracking",
        "Custom Role Permissions",
        "Dedicated Support Manager",
      ],
    },
  ],
};

export const tableList = [
  {
    id:1,
    name: "Maggi",
    brand:"Nesley",
    category:"Grocery",
    buying_price: 430,
    selling_price: 450,
    qty: 0,
    stcok_alert: 11,
    weight:100,
    unit:"gram",
  },
  {
    id:2,
    name: "Maggi",
    brand:"Nesley",
    category:"Grocery",
    buying_price: 430,
    selling_price: 450,
    qty: 43,
    stcok_alert: 11,
    weight:100,
    unit:"gram",
  },
  {
    id:3,
    name: "Maggi",
    brand:"Nesley",
    category:"Grocery",
    buying_price: 430,
    selling_price: 450,
    qty: 43,
    stcok_alert: 11,
    weight:100,
    unit:"gram",
  },

];

export const salesTable =[
  {
    id:1,
    customerName:"Jhon Doe",
    totalProducts:5,
    totalAmt:3500,
    payment:2500,
    dues:1000,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:3,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:2,
    customerName:"Niyaz Alam",
    totalProducts:10,
    totalAmt:3500,
    payment:3500,
    dues:0,
    bill:"invoice",
  },
  {
    id:3,
    customerName:"Mirza Galib",
    totalProducts:8,
    totalAmt:3000,
    payment:2500,
    dues:500,
    bill:"invoice",
  }
]
