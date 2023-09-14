import { Button, Card, Table } from "antd";
import { useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateTaskForm from "../Tasks/CreateTaskForm";
import UpdateTask from "../Tasks/TaskDetails/UpdateTask";
import CreateDrawer from "./CreateDrawer";

export default function Tasks({ data, loading, name, singleLoadThunk }) {
  // Drawer state
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const onCloseEdit = () => {
    setEdit(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "taskName",
      key: "TaskName",
      render: (taskName, item) =>
        taskName ? <Link to={`/admin/task/${item.id}`}>{taskName}</Link> : "-",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee) =>
        assignee?.firstName ? (
          <Link to={`/admin/setup/staffs/${assignee?.id}`}>
            {assignee?.firstName} {assignee?.lastName}
          </Link>
        ) : (
          "-"
        ),
    },
    {
      title: "Type",
      dataIndex: "taskType",
      key: "taskType",
      render: (type) => (type.taskTypeName ? type.taskTypeName : "-"),
    },
    {
      title: "Status",
      dataIndex: "taskStatus",
      key: "taskType",
      render: (status) => (status.taskStatusName ? status.taskStatusName : "-"),
    },
    {
      title: "Priority",
      dataIndex: "taskPriority",
      key: "taskType",
      render: (priority) =>
        priority.taskPriorityName ? priority.taskPriorityName : "-",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (notes) => (notes ? notes : "-"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, task) => (
        <span
          onClick={() => setEdit(task)}
          className='bg-teal-500 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded'
        >
          <BiEdit className='text-white' />
        </span>
      ),
    },
  ];

  return (
    <Card
      title={<span className='font-bold'>Tasks</span>}
      bodyStyle={{ padding: 0 }}
      extra={
        <UserPrivateComponent permission='create-crmTask'>
          <Button
            onClick={() => setOpen(true)}
            className='flex items-center'
            icon={<BiPlus />}
          >
            Add
          </Button>
        </UserPrivateComponent>
      }
    >
      <div>
        <UserPrivateComponent permission='readAll-crmTask'>
          <Table
            bordered
            columns={columns}
            loading={loading}
            dataSource={data ? data.crmTask : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 500 }}
          />
        </UserPrivateComponent>
      </div>
      <UserPrivateComponent permission='update-crmTask'>
        <UpdateTask
          open={edit}
          task={edit}
          id={edit?.id}
          onClose={onCloseEdit}
        />
      </UserPrivateComponent>
      <UserPrivateComponent permission='create-crmTask'>
        <CreateDrawer onClose={onClose} open={open} title={"Task"}>
          <CreateTaskForm
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          />
        </CreateDrawer>
      </UserPrivateComponent>
    </Card>
  );
}
