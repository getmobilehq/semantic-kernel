import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import UserPrivateComponent from "./../../PrivateRoutes/UserPrivateComponent";

export default function CustomDrawer({
  title,
  width,
  permission,
  children,
  update,
  color,
}) {
  // Drawer state
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <UserPrivateComponent permission={permission}>
        <button
          onClick={() => setOpen(true)}
          className={` text-sm md:text-base   border ${
            color
              ? color + "p-1"
              : update
              ? "bg-[#1890ff] hover:bg-[#42a4ff] p-2"
              : "bg-teal-700 hover:bg-teal-500 p-1"
          }  text-white rounded cursor-pointer`}
        >
          <div className='flex items-center gap-2'>
            {update ? (
              <EditOutlined />
            ) : (
              <>
                <PlusOutlined /> <div className='min-w-[110px]'>{title}</div>
              </>
            )}
          </div>
        </button>
        <Drawer
          width={
            window.innerWidth <= 768 ? "100%" : width ? `${width}%` : "45%"
          }
          title={`${title}`}
          placement='right'
          onClose={onClose}
          open={open}
        >
          <div className='px-5 pt-5'> {children}</div>
        </Drawer>
      </UserPrivateComponent>
    </>
  );
}
