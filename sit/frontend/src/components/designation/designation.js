import { Navigate } from "react-router-dom";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import GetAllDesignation from "./getAllDesignation";

const Designation = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
      <UserPrivateComponent permission={"readAll-designation"}>
        <GetAllDesignation />
      </UserPrivateComponent>
    </div>
  );
};

export default Designation;
