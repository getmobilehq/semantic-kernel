import { Button, Card, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateNoteForm from "../Notes/CreateNoteForm";
import SingleNote from "../Notes/SingleNote";
import CreateDrawer from "./CreateDrawer";
import UpdateDrawer from "./UpdateDrawer";

export default function Notes({ data, loading, name, singleLoadThunk }) {
  // Drawer state
  const [open, setOpen] = useState(false);
  const [singleNote, setSingleNote] = useState(false);
  const [edit, setEdit] = useState(false);
  const onCloseEdit = () => {
    setEdit(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Title",
      key: "title",
      render: (note) =>
        note ? (
          <div className='cursor-pointer' onClick={() => setSingleNote(note)}>
            {note?.title}
          </div>
        ) : (
          "-"
        ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },

    {
      title: "Owner",
      dataIndex: "noteOwner",
      key: "owner",
      render: (noteOwner, item) => (
        <Link to={`/admin/setup/staffs/${item?.noteOwnerId}`}>
          {noteOwner?.firstName} {noteOwner?.lastName}
        </Link>
      ),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (description) =>
        description ? `${description.slice(0, 30)}...` : "-",
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, note) => (
        <span
          onClick={() => setEdit(note)}
          className='bg-teal-500 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded'
        >
          <BiEdit className='text-white' />
        </span>
      ),
    },
  ];

  return (
    <Card
      title={<span className='font-bold'>Notes</span>}
      bodyStyle={{ padding: 0 }}
      extra={
        <UserPrivateComponent permission='create-note'>
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
        <UserPrivateComponent permission='readAll-note'>
          <Table
            bordered
            columns={columns}
            loading={loading}
            dataSource={data ? data.note : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 300 }}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission='create-note'>
        <CreateDrawer onClose={onClose} open={open} title={"Note"}>
          <CreateNoteForm
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          />
        </CreateDrawer>
      </UserPrivateComponent>
      <UserPrivateComponent permission={"readSingle-note"}>
        <SingleNote note={singleNote} onClose={setSingleNote} />
      </UserPrivateComponent>
      {/* // edit */}
      <UserPrivateComponent permission='update-note'>
        <UpdateDrawer onClose={onCloseEdit} open={!!edit} title={"Note"}>
          <CreateNoteForm
            onClose={onCloseEdit}
            open={!!edit}
            edit={edit}
            singleLoad={{ thunk: singleLoadThunk, id: data?.id }}
          />
        </UpdateDrawer>
      </UserPrivateComponent>
    </Card>
  );
}
