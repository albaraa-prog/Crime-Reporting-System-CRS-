import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
