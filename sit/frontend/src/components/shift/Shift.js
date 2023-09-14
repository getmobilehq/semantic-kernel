import { Navigate } from "react-router-dom";
import ShiftTable from "./AddShift";

const Shift = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <ShiftTable />
    </div>
  );
};

export default Shift;
