import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UserPrivateComponent from "../../../../PrivateRoutes/UserPrivateComponent";
import CreateIndustry from "./CreateIndustry";
import TableComponent from "./Table";

export default function Industry() {
  // Drawer state
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='container'>
      <div className='py-4 flex justify-center md:justify-end'>
        <UserPrivateComponent permission={"create-industry"}>
          <button
            onClick={() => setOpen(true)}
            className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'
          >
            <AiOutlinePlus /> Create Industry
          </button>
        </UserPrivateComponent>
      </div>
      <TableComponent />
      <UserPrivateComponent permission={"create-industry"}>
        <CreateIndustry onClose={onClose} open={open} />
      </UserPrivateComponent>
    </div>
  );
}
