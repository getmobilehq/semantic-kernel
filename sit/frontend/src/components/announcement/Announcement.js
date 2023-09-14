import { Navigate } from "react-router-dom";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import GetAllAnnouncement from "./GetAllAnnouncement";

const Announcement = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <UserPrivateComponent permission='readAll-announcement'>
        <GetAllAnnouncement />
      </UserPrivateComponent>
    </div>
  );
};

export default Announcement;
