import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../../../redux/rtk/features/dashboard/dashboardSlice";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";

const DemoLine = () => {
  const cardInformation = useSelector((state) => state.dashboard.list);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDashboardData({}));
  }, [dispatch]);

  return (
    <Fragment>
      <UserPrivateComponent permission={"readAll-dashboard"}>
        <NewDashboardCard information={cardInformation} />
      </UserPrivateComponent>
    </Fragment>
  );
};

export default DemoLine;
