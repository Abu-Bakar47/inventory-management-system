import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { plans, type PlanType } from "../Interface/data";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const navigate = useNavigate();
  const [planType, setPlanType] = useState<PlanType>("monthly");
  const [key, setKey] = useState(0); // For animation key

  const handleToggle = () => {
    setPlanType((prev) => (prev === "monthly" ? "yearly" : "monthly"));
    setKey((prev) => prev + 1); // Force re-animation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-10 text-center">
      <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
      <p className="text-sm text-gray-600 mb-6">
        1 month unlimited free trial. No contract or credit card required.
      </p>

      {/* Toggle */}
      <div className="flex justify-center items-center gap-4 mb-10">
        <span>Monthly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={planType === "yearly"}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
        <span>Yearly</span>
      </div>

      {/* Cards with flip animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {plans[planType].map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl shadow-md flex flex-col ${
                plan.name === "Business Plan"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold">{plan.price}</p>
              <p className="text-sm mb-4">{plan.subPrice}</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="font-medium">{plan.users}</li>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(`/payment/${planType}/${plan.id}`)}
                className={`w-full py-2 rounded-md font-medium mt-auto cursor-pointer ${
                  plan.name === "Business Plan"
                    ? "bg-white text-blue-600"
                    : "bg-blue-600 text-white"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PricingPage;
