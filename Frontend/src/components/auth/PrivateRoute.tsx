import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // These would come from Redux / Context / API calls
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  // console.log("isAuthenticated",isAuthenticated)
  const isSubscriptionValid = true;
// const hasRegisteredLab = false; // Example: change based on real data

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isSubscriptionValid) {
    return <Navigate to="/pricing" replace />;
  }

  // if (!hasRegisteredLab) {
  //   return <Navigate to="/register-lab" replace />;
  // }

  return <>{children}</>;
};

export default PrivateRoute;
