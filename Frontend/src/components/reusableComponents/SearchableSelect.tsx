import React, { useState, type ChangeEvent, type FormEvent } from "react";

// ---------------------- Types ------------------------

type Customer = {
  id?: number;
  name: string;
  mobile?: number;
  address?: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  weight: string;
  brand: string;
};

type SelectedProduct = Product & {
  quantity: number;
};

// -------------------- Data --------------------------

const customers: Customer[] = [
  { id: 1, name: "John Doe", mobile: 9876543210, address: "F-20 New Delhi" },
  { id: 2, name: "Jane Smith", mobile: 9876543211, address: "F-21 New Delhi" },
  { id: 6, name: "David Green", mobile: 9876543215, address: "F-25 New Delhi" },
];

const products: Product[] = [
  { id: 1, name: "Meggi", price: 20, weight: "70g", brand: "Nestle" },
  { id: 2, name: "Sugar", price: 200, weight: "1kg", brand: "Sagar" },
  { id: 3, name: "Sugar", price: 20, weight: "250", brand: "Sagar" },
  { id: 4, name: "Sugar", price: 50, weight: "500g", brand: "Sagar" },
  { id: 5, name: "Rice", price: 100, weight: "1kg", brand: "Tata" },
  { id: 6, name: "Salt", price: 10, weight: "1kg", brand: "Tata" },
  { id: 7, name: "Oil", price: 150, weight: "1L", brand: "Fortune" },
  { id: 8, name: "Soap", price: 30, weight: "100g", brand: "Lux" },
  { id: 9, name: "Shampoo", price: 250, weight: "200ml", brand: "Dove" },
  { id: 10, name: "Toothpaste", price: 50, weight: "150g", brand: "Colgate" },
  { id: 11, name: "Detergent", price: 300, weight: "1kg", brand: "Surf" },
  { id: 12, name: "Biscuits", price: 40, weight: "200g", brand: "Britannia" },
  { id: 13, name: "Chips", price: 20, weight: "50g", brand: "Lays" },
  { id: 14, name: "Juice", price: 60, weight: "1L", brand: "Tropicana" },
  { id: 15, name: "Cereal", price: 150, weight: "500g", brand: "Kellogg's" },
  { id: 16, name: "Pasta", price: 80, weight: "500g", brand: "Barilla" },
  { id: 17, name: "Coffee", price: 200, weight: "100g", brand: "Nescafe" },
  { id: 18, name: "Tea", price: 100, weight: "250g", brand: "Tata" },
  { id: 19, name: "Honey", price: 300, weight: "250g", brand: "Dabur" },
  { id: 20, name: "Jam", price: 150, weight: "500g", brand: "Patanjali" },
  { id: 21, name: "Pickle", price: 80, weight: "300g", brand: "MTR" },
  { id: 22, name: "Sauce", price: 60, weight: "500g", brand: "Maggi" },
  { id: 23, name: "Spices", price: 50, weight: "100g", brand: "Everest" },
  { id: 24, name: "Flour", price: 40, weight: "1kg", brand: "Aashirvaad" },
  { id: 25, name: "Pulses", price: 120, weight: "1kg", brand: "Tata" },
  { id: 26, name: "Noodles", price: 30, weight: "70g", brand: "Maggi" },
  { id: 27, name: "Biscuit", price: 25, weight: "100g", brand: "Sunfeast" },
  { id: 28, name: "Chocolate", price: 50, weight: "50g", brand: "Cadbury" },
  { id: 29, name: "Ice Cream", price: 100, weight: "500ml", brand: "Amul" },
  { id: 30, name: "Cake", price: 200, weight: "1kg", brand: "Baker Street" },
  { id: 31, name: "Pizza", price: 300, weight: "1kg", brand: "Domino's" },
  { id: 32, name: "Burger", price: 150, weight: "200g", brand: "McDonald's" },
  { id: 33, name: "Sandwich", price: 80, weight: "150g", brand: "Subway" },
  {
    id: 34,
    name: "Pancake Mix",
    price: 60,
    weight: "500g",
    brand: "Pillsbury",
  },
  { id: 35, name: "Waffles", price: 70, weight: "200g", brand: "Eggo" },
  {
    id: 36,
    name: "Granola Bars",
    price: 40,
    weight: "200g",
    brand: "Nature Valley",
  },
  { id: 37, name: "Popcorn", price: 30, weight: "100g", brand: "Act II" },
  { id: 38, name: "Canned Beans", price: 50, weight: "400g", brand: "Heinz" },
  {
    id: 39,
    name: "Canned Tomatoes",
    price: 60,
    weight: "400g",
    brand: "Del Monte",
  },
  {
    id: 40,
    name: "Canned Tuna",
    price: 80,
    weight: "200g",
    brand: "John West",
  },
  {
    id: 41,
    name: "Canned Soup",
    price: 70,
    weight: "400g",
    brand: "Campbell's",
  },
  { id: 42, name: "Canned Fruit", price: 90, weight: "400g", brand: "Dole" },
  {
    id: 43,
    name: "Canned Vegetables",
    price: 50,
    weight: "400g",
    brand: "Green Giant",
  },
  {
    id: 44,
    name: "Frozen Pizza",
    price: 200,
    weight: "500g",
    brand: "DiGiorno",
  },
  {
    id: 45,
    name: "Frozen Vegetables",
    price: 100,
    weight: "1kg",
    brand: "Birds Eye",
  },
  {
    id: 46,
    name: "Frozen Fruits",
    price: 150,
    weight: "500g",
    brand: "Wyman's",
  },
  {
    id: 47,
    name: "Frozen Meals",
    price: 250,
    weight: "400g",
    brand: "Healthy Choice",
  },
  {
    id: 48,
    name: "Frozen Desserts",
    price: 300,
    weight: "500g",
    brand: "Haagen-Dazs",
  },
  {
    id: 49,
    name: "Frozen Snacks",
    price: 200,
    weight: "300g",
    brand: "TGI Fridays",
  },
  {
    id: 50,
    name: "Frozen Breakfast",
    price: 150,
    weight: "400g",
    brand: "Eggo",
  },
  {
    id: 51,
    name: "Frozen Lunch",
    price: 180,
    weight: "500g",
    brand: "Lean Cuisine",
  },
  {
    id: 52,
    name: "Frozen Dinner",
    price: 220,
    weight: "600g",
    brand: "Stouffer's",
  },
  {
    id: 53,
    name: "Frozen Soup",
    price: 120,
    weight: "400g",
    brand: "Amy's Kitchen",
  },
  {
    id: 54,
    name: "Frozen Salad",
    price: 130,
    weight: "300g",
    brand: "Fresh Express",
  },
  {
    id: 55,
    name: "Frozen Fruit Bars",
    price: 90,
    weight: "200g",
    brand: "Outshine",
  },
  { id: 56, name: "Frozen Yogurt", price: 110, weight: "500g", brand: "Yasso" },
  {
    id: 57,
    name: "Frozen Smoothies",
    price: 140,
    weight: "400g",
    brand: "Naked Juice",
  },
  {
    id: 58,
    name: "Frozen Burritos",
    price: 160,
    weight: "300g",
    brand: "Amy's Kitchen",
  },
  {
    id: 59,
    name: "Frozen Tacos",
    price: 170,
    weight: "400g",
    brand: "Old El Paso",
  },
  { id: 60, name: "Frozen Waffles", price: 80, weight: "200g", brand: "Eggo" },
  {
    id: 61,
    name: "Frozen Pancakes",
    price: 90,
    weight: "300g",
    brand: "Kellogg's",
  },
  {
    id: 62,
    name: "Frozen Omelettes",
    price: 100,
    weight: "200g",
    brand: "Birds Eye",
  },
  {
    id: 63,
    name: "Frozen Breakfast Burritos",
    price: 120,
    weight: "250g",
    brand: "Amy's Kitchen",
  },
  {
    id: 64,
    name: "Frozen Breakfast Sandwiches",
    price: 130,
    weight: "300g",
    brand: "Jimmy Dean",
  },
  {
    id: 65,
    name: "Frozen Breakfast Bowls",
    price: 140,
    weight: "400g",
    brand: "Healthy Choice",
  },
  {
    id: 66,
    name: "Frozen Breakfast Wraps",
    price: 150,
    weight: "350g",
    brand: "MorningStar Farms",
  },
  {
    id: 67,
    name: "Frozen Breakfast Skillets",
    price: 160,
    weight: "500g",
    brand: "Stouffer's",
  },
  {
    id: 68,
    name: "Frozen Breakfast Potatoes",
    price: 170,
    weight: "400g",
    brand: "Ore-Ida",
  },
  {
    id: 69,
    name: "Frozen Breakfast Sausages",
    price: 180,
    weight: "300g",
    brand: "Johnsonville",
  },
  {
    id: 70,
    name: "Frozen Breakfast Bacon",
    price: 190,
    weight: "200g",
    brand: "Oscar Mayer",
  },
  {
    id: 71,
    name: "Frozen Breakfast Ham",
    price: 200,
    weight: "250g",
    brand: "Hormel",
  },
  {
    id: 72,
    name: "Frozen Breakfast Turkey",
    price: 210,
    weight: "300g",
    brand: "Butterball",
  },
  {
    id: 73,
    name: "Frozen Breakfast Veggie",
    price: 220,
    weight: "200g",
    brand: "MorningStar Farms",
  },
  { id: 74, name: "Tea", price: 10, weight: "20g", brand: "Tata" },

  { id: 75, name: "Tea", price: 20, weight: "50g", brand: "Tata" },

  { id: 76, name: "Tea", price: 50, weight: "100g", brand: "Tata" },
];

// ------------------- Component ------------------------

const Dashboard: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isPermanent, setIsPermanent] = useState<boolean>(false);
  const [manualName, setManualName] = useState<string>("");
  const [productInput, setProductInput] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [gstRate, setGstRate] = useState<number>(0);
  const [payment, setPayment] = useState<"full" | "partially">("full");
  const [partiallyPaidAmount, setPartiallyPaidAmount] = useState<number>(0);

  const customerOptions = customers.map(
    (cust) => `${cust.name} - ${cust.mobile}`
  );

  const productOptions = products.map(
    (prod) => `${prod.name}-${prod.brand} - ${prod.weight} - ₹${prod.price}`
  );

  const handleCustomerChange = (value: string) => {
    const found = customers.find((c) => `${c.name} - ${c.mobile}` === value);
    setSelectedCustomer(found || { name: value });
  };

  const handleManualNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setManualName(val);
    setSelectedCustomer({ name: val });
  };

  const handleProductAdd = () => {
    const found = products.find(
      (p) => `${p.name}-${p.brand} - ${p.weight} - ₹${p.price}` === productInput
    );

    if (!found) return;

    const alreadyExists = selectedProducts.some((p) => p.id === found.id);

    if (alreadyExists) {
      alert("Already selected this item. Please select another item.");
      setProductInput("");
      return;
    }

    const wasEmpty = selectedProducts.length === 0;
    setSelectedProducts([...selectedProducts, { ...found, quantity: 1 }]);

    if (wasEmpty) {
      setPayment("full");
      setPartiallyPaidAmount(0);
    }

    setProductInput("");
  };

  const handleQuantityChange = (id: number, quantity: string) => {
    const cleanedQuantity = quantity.replace(/^0+(?!$)/, "");
    const updated = selectedProducts.map((prod) =>
      prod.id === id
        ? { ...prod, quantity: parseInt(cleanedQuantity) || 1 }
        : prod
    );
    setSelectedProducts(updated);
  };

  const handlePriceChange = (id: number, newPrice: string) => {
    const cleanedPrice = newPrice.replace(/^0+(?!$)/, "");
    const updated = selectedProducts.map((prod) =>
      prod.id === id ? { ...prod, price: parseFloat(cleanedPrice) || 0 } : prod
    );
    setSelectedProducts(updated);
  };

  const handleRemoveProduct = (id: number) => {
    const updated = selectedProducts.filter((prod) => prod.id !== id);
    setSelectedProducts(updated);
  };

  const subtotal = selectedProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gstAmount = (subtotal * gstRate) / 100;
  const totalAmount = subtotal + gstAmount;

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload={
      customerName:selectedCustomer,
      selectedProducts
    }
    localStorage.setItem("selectedItems",JSON.stringify(payload))
    alert("submitted")

  }

  return (
    <div className="max-w-2xl mx-auto overflow-y-scroll">
      <form
        onSubmit={handleSubmit}
      >
        <label className="items-center mb-2 font-semibold cursor-pointer inline-block">
          <input
            type="checkbox"
            className="mr-2"
            checked={isPermanent}
            onChange={(e) => {
              setIsPermanent(e.target.checked);
              setSelectedCustomer(null);
              setManualName("");
            }}
          />
          Existing Customer
        </label>

        {isPermanent ? (
          <>
            <input
              list="customerList"
              required
              onChange={(e) => handleCustomerChange(e.target.value)}
              className="border p-1 px-3 w-full rounded"
              placeholder="Select a customer"
            />
            <datalist id="customerList">
              {customerOptions.map((cust, idx) => (
                <option key={idx} value={cust} />
              ))}
            </datalist>
          </>
        ) : (
          <input
            type="text"
            required
            value={manualName}
            onChange={handleManualNameChange}
            placeholder="Enter customer name"
            className="border p-1 w-full rounded"
          />
        )}

        <div className="mt-2">
          <h2 className="font-semibold mb-2">Select Products</h2>
          <div className="flex gap-1">
            <input
              list="productList"
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              placeholder="Select product"
              className="border p-1 rounded w-full text-sm"
            />
            <button
            type="button"
              onClick={handleProductAdd}
              className="px-4 py-2 bg-blue-700 text-white rounded cursor-pointer"
            >
              Add
            </button>
          </div>
          <datalist id="productList">
            {productOptions.map((prod, idx) => (
              <option key={idx} value={prod} />
            ))}
          </datalist>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mt-4">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-1 text-left">Product</th>
                  <th className="border p-1 text-left">Weight</th>
                  <th className="border p-1 text-left">Price</th>
                  <th className="border p-1 text-left">Quantity</th>
                  <th className="border p-1 text-left">Subtotal</th>
                  <th className="border p-1 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((prod) => (
                  <tr key={prod.id}>
                    <td className="border p-1">{prod.name}</td>
                    <td className="border p-1">{prod.weight}</td>
                    <td className="border p-1">
                      <input
                        type="number"
                        value={prod.price}
                        min="0"
                        onChange={(e) =>
                          handlePriceChange(prod.id, e.target.value)
                        }
                        className="w-20 border rounded p-1"
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="number"
                        value={prod.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(prod.id, e.target.value)
                        }
                        className="w-16 border rounded p-1"
                      />
                    </td>
                    <td className="border p-1">
                      ₹{(prod.price * prod.quantity).toFixed(2)}
                    </td>
                    <td className="border p-1 self-center items-center">
                      <button
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleRemoveProduct(prod.id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <table className="text-sm border mt-4 w-full">
                <tbody>
                  <tr className="border">
                    <td className="border p-1">Subtotal</td>
                    <td className="border p-1 text-right">
                      ₹{subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border p-1">
                      GST
                      <input
                        type="number"
                        name="gstRate"
                        min={0}
                        value={gstRate}
                        placeholder="Enter GST Rate"
                        onChange={(e) =>
                          setGstRate(parseFloat(e.target.value) || 0)
                        }
                        className="w-40 border rounded p-1 text-sm ml-2"
                      />
                    </td>
                    <td className="border p-1 text-right">
                      <span className="mr-5">({gstRate}%)</span> ₹
                      {gstAmount.toFixed(2)}
                    </td>
                  </tr>

                  <tr className="border font-bold">
                    <td className="border p-1">Total</td>
                    <td className="border p-1 text-right">
                      ₹{totalAmount.toFixed(2)}
                    </td>
                  </tr>

                  <tr className="border p-1">
                    <td className="border p-1">
                      Payment
                      <select
                        className="ml-2 border border-gray-400 w-40 rounded-sm p-0.5"
                        onChange={(e) =>
                          setPayment(e.target.value as "full" | "partially")
                        }
                        value={payment}
                      >
                        <option value="full">Full</option>
                        <option value="partially">Partially</option>
                      </select>
                      {payment === "partially" && (
                        <input
                          type="number"
                          placeholder="Enter Amount"
                          className="w-28 ml-1 border border-gray-400 p-1 rounded-sm"
                          onChange={(e) =>
                            setPartiallyPaidAmount(
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      )}
                    </td>
                    <td className="border p-1 text-right">
                      {payment === "full"
                        ? `₹${totalAmount.toFixed(2)}`
                        : `₹${partiallyPaidAmount.toFixed(2)}`}
                    </td>
                  </tr>

                  <tr className="border font-bold">
                    <td className="border p-1">Balance</td>
                    <td className="border p-1 text-right">
                      ₹
                      {payment === "full"
                        ? "0.00"
                        : (totalAmount - partiallyPaidAmount).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <button
          type="submit"
          className=" bg-blue-600 text-white rounded-md p-1 cursor-pointer mt-4 w-full hover:bg-blue-700"
        >
          Pay and Continue
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
