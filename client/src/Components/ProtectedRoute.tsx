import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin" | "user";  // optional role
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  if (role && authUser.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
