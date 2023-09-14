import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UserPrivateComponent from "../../../../PrivateRoutes/UserPrivateComponent";
import CreateOpportunityType from "./CreateOpportunityType";
import TableComponent from "./Table";

export default function OpportunityType() {
  // Drawer state
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='container'>
      <div className='py-4 flex justify-center md:justify-end'>
        <UserPrivateComponent permission={"create-opportunityType"}>
          <button
            onClick={() => setOpen(true)}
            className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'
          >
            <AiOutlinePlus /> Create Opportunity Type
          </button>
        </UserPrivateComponent>
      </div>
      <TableComponent />
      <UserPrivateComponent permission={"create-opportunityType"}>
        <CreateOpportunityType onClose={onClose} open={open} />
      </UserPrivateComponent>
    </div>
  );
}
