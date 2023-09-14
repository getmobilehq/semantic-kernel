import { Layout } from "antd";
import { useState } from "react";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { Outlet } from "react-router-dom";
import SideBar from "../layouts/SideBar";

export default function SetupLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <Layout.Sider
          trigger={null}
          collapsed={collapsed}
          className='absolute md:static z-10 bg-teal-700 overflow-y-auto overflow-x-hidden'
          style={{ height: "calc(100vh - 102px)" }}
        >
          <div className='w-full md:hidden pt-2 pr-2 text-white flex justify-end'>
            <TbLayoutSidebarRightExpand
              onClick={() => setCollapsed(true)}
              className='text-3xl inline-block'
            />
          </div>

          <SideBar />
        </Layout.Sider>
        <Layout.Content
          className='px-4 overflow-y-auto overflow-x-hidden'
          style={{ height: "calc(100vh - 102px)" }}
        >
          {collapsed && (
            <div className='p-1 absolute left-0 z-10'>
              <TbLayoutSidebarRightCollapse
                onClick={() => setCollapsed(false)}
                className='text-3xl inline-block'
              />
            </div>
          )}
          <Outlet />
        </Layout.Content>
      </Layout>
    </>
  );
}
