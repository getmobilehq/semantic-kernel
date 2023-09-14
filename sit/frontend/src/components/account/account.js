import { Navigate } from "react-router-dom";

import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import GetAllAccount from "./getAllAccount";

const Account = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
      <UserPrivateComponent permission='readAll-account'>
        <GetAllAccount />
      </UserPrivateComponent>
    </div>
  );
};

export default Account;
