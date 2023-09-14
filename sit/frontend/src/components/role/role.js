import { Navigate } from "react-router-dom";
import Role from "./AddRole";

const RoleList = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <Role />
    </div>
  );
};

export default RoleList;
