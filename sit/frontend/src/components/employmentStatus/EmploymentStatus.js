import { Navigate } from "react-router-dom";

import AddEmploymentStatus from "./AddEmploymentStatus";

const EmploymentStatus = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <AddEmploymentStatus />
    </div>
  );
};

export default EmploymentStatus;
