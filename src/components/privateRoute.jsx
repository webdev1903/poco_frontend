import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { authenticated } = useSelector((store) => store);

  if (authenticated) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
