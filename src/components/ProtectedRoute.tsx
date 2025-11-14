import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProtectedRoute = () => {
  const [user, loading] = useAuthState(auth);

  if(loading) {
    return<div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;