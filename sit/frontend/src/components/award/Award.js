import { Navigate } from "react-router-dom";

import AddAward from "./AddAward";

const Award = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <AddAward />
    </div>
  );
};

export default Award;
