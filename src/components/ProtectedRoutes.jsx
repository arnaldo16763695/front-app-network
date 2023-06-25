import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth.token)
  if (!auth.token) {
    return <Navigate to={"login"} />;
  }
  return children ? children : <Outlet />;
};
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoutes;
