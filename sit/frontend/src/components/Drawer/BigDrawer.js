import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Space } from "antd";
import React, { useState } from "react";
import "./style.css";

const BigDrawer = ({ children, btnTitle, title }) => {
  const { Content } = Layout;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        // type='primary'
        id='btn-drawer'
        className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        {btnTitle}
      </Button>
      <Drawer
        title={`Create a ${title}`}
        width={"40%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button id='btn-drawer' type='danger' onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }
      >
        <Content>{children}</Content>
      </Drawer>
    </>
  );
};
export default BigDrawer;
