import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthChecker = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  if (isLoggedIn) {
    return element;
  }
  return <Navigate to={"/login"} replace />;
};

export default AuthChecker;
