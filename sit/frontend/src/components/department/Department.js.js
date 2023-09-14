import { Navigate } from "react-router-dom";
import DepartmentTable from "./AddDepartment";

const Department = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <DepartmentTable />
    </div>
  );
};

export default Department;
