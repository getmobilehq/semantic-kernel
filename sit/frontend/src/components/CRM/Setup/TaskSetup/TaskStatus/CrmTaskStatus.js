import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CreateCrmTaskStatus from "./CreateCrmTaskStatus";
import TableComponent from "./Table";
import UserPrivateComponent from "../../../../PrivateRoutes/UserPrivateComponent";

export default function CrmTaskStatus() {
  // Drawer state
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='container'>
      <div className='py-4 flex justify-center md:justify-end'>
        <UserPrivateComponent permission={"create-crmTaskStatus"}>
          <button
            onClick={() => setOpen(true)}
            className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'
          >
            <AiOutlinePlus /> Create Task Status
          </button>
        </UserPrivateComponent>
      </div>
      <TableComponent />
      <UserPrivateComponent permission={"create-crmTaskStatus"}>
        <CreateCrmTaskStatus onClose={onClose} open={open} />
      </UserPrivateComponent>
    </div>
  );
}
