import { useParams } from "react-router-dom";
import { plans } from "../Interface/data";
import { useMemo } from "react";

const PaymentPage = () => {
  const { planType, id } = useParams<{ planType: "monthly" | "yearly"; id: string }>();

  const selectedPlan = useMemo(() => {
    if (!planType || !id) return null;
    return plans[planType]?.find((plan) => plan.id === Number(id)) || null;
  }, [planType, id]);

  if (!selectedPlan) {
    return <div>Plan not found</div>;
  }

  return (
    <div>
      <h1>{selectedPlan.name}</h1>
      <p>{selectedPlan.price}</p>
      <p>{selectedPlan.subPrice}</p>
      <ul>
        {selectedPlan.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentPage;
