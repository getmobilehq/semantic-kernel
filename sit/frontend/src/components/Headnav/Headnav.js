import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";
import getRoleFromToken from "../../utils/getRoleFromToken";

const Headnav = ({ mobile }) => {
  const permissions = getPermissions();

  const hasPermission = (item) => {
    return permissions?.includes(item ? item : "");
  };

  const menu = [
    permissions && {
      label: (
        <NavLink
          to={
            getRoleFromToken() !== "customer"
              ? "/admin/dashboard"
              : "/customer/dashboard"
          }
        >
          <span>Dashboard</span>
        </NavLink>
      ),
      key: "dashboard",
    },
    (hasPermission("readAll-contact") ||
      hasPermission("readSingle-contact") ||
      hasPermission("create-contact")) && {
      label: (
        <NavLink to='/admin/contact'>
          <span className='py-4'>Contact</span>
        </NavLink>
      ),
      key: "contact",
    },
    (hasPermission("readAll-company") ||
      hasPermission("readSingle-company") ||
      hasPermission("create-company")) && {
      label: (
        <NavLink to='/admin/company'>
          <span>Company</span>
        </NavLink>
      ),
      key: "company",
    },
    (hasPermission("readAll-opportunity") ||
      hasPermission("readSingle-opportunity") ||
      hasPermission("create-opportunity")) && {
      label: (
        <NavLink to='/admin/opportunity'>
          <span>Opportunity</span>
        </NavLink>
      ),
      key: "opportunity",
    },
    (hasPermission("readAll-quote") ||
      hasPermission("readSingle-quote") ||
      hasPermission("create-quote") ||
      hasPermission("readAll-product") ||
      hasPermission("readSingle-product") ||
      hasPermission("create-product")) && {
      label: (
        <span className='flex items-center gap-1'>
          Quote <IoIosArrowDown />
        </span>
      ),
      key: "quotes",

      children: [
        (hasPermission("readAll-quote") ||
          hasPermission("readSingle-quote") ||
          hasPermission("create-quote")) && {
          label: (
            <NavLink to='/admin/quote'>
              <span>Quote</span>
            </NavLink>
          ),
          key: "quote",
        },
        (hasPermission("readAll-product") ||
          hasPermission("readSingle-product") ||
          hasPermission("create-product")) && {
          label: (
            <NavLink to='/admin/products'>
              <span>Products</span>
            </NavLink>
          ),
          key: "products",
        },
      ],
    },
    (hasPermission("readAll-crmTask") ||
      hasPermission("readSingle-crmTask") ||
      hasPermission("create-crmTask")) && {
      label: (
        <NavLink to='/admin/task'>
          <span>Task</span>
        </NavLink>
      ),
      key: "task",
    },
    (hasPermission("readAll-note") ||
      hasPermission("readSingle-note") ||
      hasPermission("create-note") ||
      hasPermission("readAll-attachment") ||
      hasPermission("readSingle-attachment") ||
      hasPermission("create-attachment") ||
      hasPermission("readAll-email") ||
      hasPermission("readSingle-email") ||
      hasPermission("create-email")) && {
      label: (
        <span className='flex items-center gap-1'>
          Others <IoIosArrowDown />
        </span>
      ),
      key: "others",

      children: [
        (hasPermission("readAll-note") ||
          hasPermission("readSingle-note") ||
          hasPermission("create-note")) && {
          label: (
            <NavLink to='/admin/note'>
              <span>Note</span>
            </NavLink>
          ),
          key: "note",
        },
        (hasPermission("readAll-attachment") ||
          hasPermission("readSingle-attachment") ||
          hasPermission("create-attachment")) && {
          label: (
            <NavLink to='/admin/attachment'>
              <span>Attachment</span>
            </NavLink>
          ),
          key: "attachment",
        },
        (hasPermission("readAll-email") ||
          hasPermission("readSingle-email") ||
          hasPermission("create-email")) && {
          label: (
            <NavLink to='/admin/email'>
              <span>Email</span>
            </NavLink>
          ),
          key: "email",
        },
      ],
    },
    (getRoleFromToken() === "customer" || getRoleFromToken() === "admin") && {
      label: (
        <NavLink to='/support/ticket'>
          <span>Tickets</span>
        </NavLink>
      ),
      key: "ticket",
    },
    (hasPermission("readAll-contactSource") ||
      hasPermission("readAll-crmTaskStatus") ||
      hasPermission("readAll-opportunitySource")) && {
      label: (
        <NavLink to='/admin/setup'>
          <span>Setup</span>
        </NavLink>
      ),
      key: "setup",
    },
  ];

  if (mobile) {
    return (
      <>
        <Dropdown
          className='md:hidden'
          overlay={<Menu items={menu} mode='inline' />}
          trigger={["click"]}
        >
          <Button type='text' icon={<MenuOutlined />} className='mr-0' />
        </Dropdown>
      </>
    );
  }
  return (
    <div className='w-[90%] hidden md:block'>
      <Menu
        className='bg-teal-900 text-white border-none font-poppins'
        mode='horizontal'
        items={menu}
      />
    </div>
  );
};

export default Headnav;
