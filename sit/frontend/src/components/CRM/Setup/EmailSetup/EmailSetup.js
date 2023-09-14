import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteManyEmailConfig,
  loadAllEmailConfig,
} from "../../../../redux/rtk/features/crm/email/emailConfigSlice";
import UserPrivateComponent from "../../../PrivateRoutes/UserPrivateComponent";
import TableComponent from "./TableComponent";

const EmailSetup = () => {
  const dispatch = useDispatch();
  const { list: emailConfigList, loading } = useSelector(
    (state) => state.emailConfig
  );

  useEffect(() => {
    dispatch(loadAllEmailConfig());
  }, [dispatch]);

  return (
    <UserPrivateComponent permission='readAll-email'>
      <TableComponent
        list={emailConfigList}
        loading={loading}
        loadThunk={loadAllEmailConfig}
        deleteManyThunk={deleteManyEmailConfig}
        csvFileName={"EmailConfig-List"}
      />
    </UserPrivateComponent>
  );
};
export default EmailSetup;
