import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";

export default function SideBar() {
  const permissions = getPermissions();
  const hasPermission = (item) => {
    return permissions?.includes(item ? item : "");
  };

  const menu = [
    (hasPermission("create-user") ||
      hasPermission("readAll-user") ||
      hasPermission("readAll-role") ||
      hasPermission("readAll-designation") ||
      hasPermission("readAll-department")) && {
      label: "Employee Manage",
      key: "EmployeeManage",
      children: [
        hasPermission("create-user") && {
          label: (
            <NavLink to='/admin/setup/staffs-new'>
              <span>New Employee</span>
            </NavLink>
          ),

          key: "staffs",
        },
        hasPermission("readAll-user") && {
          label: (
            <NavLink to='/admin/setup/staffs'>
              <span>Employee List</span>
            </NavLink>
          ),
          key: "users",
        },
        hasPermission("readAll-role") && {
          label: (
            <NavLink to='/admin/setup/role'>
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
        },
        hasPermission("readAll-designation") && {
          label: (
            <NavLink to='/admin/setup/designation'>
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
        },
        hasPermission("readAll-employmentStatus") && {
          label: (
            <NavLink to='/admin/setup/employment-status'>
              <span>Employment Status</span>
            </NavLink>
          ),
          key: "employmentStatus",
        },
        hasPermission("readAll-department") && {
          label: (
            <NavLink to='/admin/setup/department'>
              <span>Department</span>
            </NavLink>
          ),
          key: "department",
        },
        hasPermission("readAll-shift") && {
          label: (
            <NavLink to='/admin/setup/shift'>
              <span>Shift</span>
            </NavLink>
          ),
          key: "newShift",
        },
      ],
    },

    (hasPermission("readAll-contactSource") ||
      hasPermission("readAll-contactStage")) && {
      label: "Contact Setup",
      key: "ContactSetup",
      children: [
        {
          label: (
            <NavLink to='/admin/setup/contact-source'>
              <span>Contact Source</span>
            </NavLink>
          ),
          key: "contactSource",
        },
        {
          label: (
            <NavLink to='/admin/setup/contact-stage'>
              <span>Contact Stage</span>
            </NavLink>
          ),
          key: "contactStage",
        },
      ],
    },

    (hasPermission("readAll-companyType") ||
      hasPermission("readAll-industry")) && {
      label: "Company Setup",
      key: "CompanySetup",
      children: [
        {
          label: (
            <NavLink to='/admin/setup/company-type'>
              <span>Company type</span>
            </NavLink>
          ),
          key: "companyType",
        },
        {
          label: (
            <NavLink to='/admin/setup/industry'>
              <span>Industry</span>
            </NavLink>
          ),
          key: "industry",
        },
      ],
    },
    (hasPermission("readAll-opportunitySource") ||
      hasPermission("readAll-opportunityStage") ||
      hasPermission("readAll-opportunityType")) && {
      label: "Opportunity Setup",
      key: "OpportunitySetup",
      children: [
        {
          label: (
            <NavLink to='/admin/setup/opportunity-source'>
              <span>Opportunity source</span>
            </NavLink>
          ),
          key: "opportunity-source",
        },
        {
          label: (
            <NavLink to='/admin/setup/opportunity-type'>
              <span>Opportunity type</span>
            </NavLink>
          ),
          key: "opportunity-type",
        },
        {
          label: (
            <NavLink to='/admin/setup/opportunity-stage'>
              <span>Opportunity stage</span>
            </NavLink>
          ),
          key: "opportunity-stage",
        },
      ],
    },

    (hasPermission("readAll-crmTaskStatus") ||
      hasPermission("readAll-crmTaskType") ||
      hasPermission("readAll-crmTaskPriority")) && {
      label: "Task Setup",
      key: "TaskSetup",
      children: [
        {
          label: (
            <NavLink to='/admin/setup/task-status'>
              <span>Task status</span>
            </NavLink>
          ),
          key: "task-status",
        },
        {
          label: (
            <NavLink to='/admin/setup/task-type'>
              <span>Task type</span>
            </NavLink>
          ),
          key: "task-type",
        },
        {
          label: (
            <NavLink to='/admin/setup/task-priority'>
              <span>Task priority</span>
            </NavLink>
          ),
          key: "task-priority",
        },
      ],
    },
    hasPermission("readAll-quoteStage") && {
      label: "Quote Setup",
      key: "quoteSetup",
      children: [
        {
          label: (
            <NavLink to='/admin/setup/quote-stage'>
              <span>Quote stage</span>
            </NavLink>
          ),
          key: "quoteStage",
        },
      ],
    },

    (hasPermission("readAll-ticketCategory") ||
      hasPermission("readAll-ticketPriority") ||
      hasPermission("readAll-ticketStatus")) && {
      label: "Ticket Setup",
      key: "TicketSetup",
      children: [
        {
          label: (
            <NavLink to='/admin/setup/ticket-category'>
              <span>Ticket Category</span>
            </NavLink>
          ),
          key: "ticket-category",
        },
        {
          label: (
            <NavLink to='/admin/setup/ticket-priority'>
              <span>Ticket Priority</span>
            </NavLink>
          ),
          key: "ticket-priority",
        },
        {
          label: (
            <NavLink to='/admin/setup/ticket-status'>
              <span>Ticket Status</span>
            </NavLink>
          ),
          key: "task-status",
        },
      ],
    },

    hasPermission("readAll-announcement") && {
      label: "Announcement",
      key: "announcement",
      children: [
        hasPermission("readAll-announcement") && {
          label: (
            <NavLink to='/admin/setup/announcement'>
              <span>Announcement</span>
            </NavLink>
          ),
          key: "newLeave",
        },
      ],
    },

    (hasPermission("readAll-account") ||
      hasPermission("readAll-transaction") ||
      hasPermission("create-transaction")) && {
      label: "Account Manage",
      key: "AccountManage",
      children: [
        hasPermission("readAll-account") && {
          label: (
            <NavLink to='/admin/setup/account'>
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
        },
        hasPermission("readAll-transaction") && {
          label: (
            <NavLink to='/admin/setup/transaction'>
              <span>Transaction List</span>
            </NavLink>
          ),
          key: "transactionList",
        },
      ],
    },

    hasPermission("readAll-account") && {
      label: "Finance Report",
      key: "report",
      children: [
        hasPermission("readAll-account") && {
          label: (
            <NavLink to='/admin/setup/account/trial-balance'>
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
        },
        hasPermission("readAll-account") && {
          label: (
            <NavLink to='/admin/setup/account/balance-sheet'>
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
        },
        hasPermission("readAll-account") && {
          label: (
            <NavLink to='/admin/setup/account/income'>
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
        },
      ],
    },

    (hasPermission("crate-award") || hasPermission("readAll-award")) && {
      label: "Awards",
      key: "award",
      children: [
        hasPermission("readAll-award") && {
          label: (
            <NavLink to='/admin/setup/award'>
              <span>Award</span>
            </NavLink>
          ),
          key: "award",
        },
      ],
    },

    hasPermission("readAll-setting") && {
      label: "Organization Setup",
      key: "OrganizationSetup",
      children: [
        hasPermission("readAll-setting") && {
          label: (
            <NavLink to='/admin/setup/company-setting'>
              <span>Organization</span>
            </NavLink>
          ),
          key: "Organization",
        },
      ],
    },
    hasPermission("readAll-email") && {
      label: (
        <NavLink to='/admin/setup/email-config'>
          <span>Email Config</span>
        </NavLink>
      ),
      key: "emailSetup",
    },
  ];
  return (
    <>
      <div className='select-none'>
        <Menu
          className='bg-teal-700 text-white border-none font-poppins'
          mode='inline'
          items={menu}
        />
      </div>
    </>
  );
}
