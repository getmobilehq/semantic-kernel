import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UserPrivateComponent from "../../../../PrivateRoutes/UserPrivateComponent";
import CreateCompanyType from "./CreateCompanyType";
import TableComponent from "./Table";

export default function CompanyType() {
  // Drawer state
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='container'>
      <div className='py-4 flex justify-center md:justify-end'>
        <UserPrivateComponent permission={"create-companyType"}>
          <button
            onClick={() => setOpen(true)}
            className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'
          >
            <AiOutlinePlus /> Create Company Type
          </button>
        </UserPrivateComponent>
      </div>
      <TableComponent />
      <UserPrivateComponent permission={"create-companyType"}>
        <CreateCompanyType onClose={onClose} open={open} />
      </UserPrivateComponent>
    </div>
  );
}
