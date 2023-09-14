import { Button, Card, Drawer, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { AiOutlinePlus } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import UserPrivateComponent from "../../../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../../../Shared/ColVisibilityDropdown";
import BulkDelete from "../../CommonUi/BulkDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import CreateEmailSetupForm from "./CreateEmailSetupForm";
import UpdateEmailConfig from "./UpdateEmailConfig";

const TableComponent = ({
  list,
  loading,
  csvFileName,
  loadThunk,
  deleteManyThunk,
}) => {
  // Drawer state
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setEdit(false);
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: ({ emailConfigName, id }) => (id ? <>{emailConfigName}</> : "-"),
      sorter: (a, b) => a.emailConfigName.localeCompare(b.emailConfigName),
    },
    {
      title: "Host",
      key: "emailHost",
      dataIndex: "emailHost",
    },
    {
      title: "Port",
      key: "emailPort",
      dataIndex: "emailPort",
    },
    {
      title: "emailUser",
      key: "emailUser",
      dataIndex: "emailUser",
      render: (emailUser) => (emailUser ? emailUser : "-"),
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
      key: "action",
      render: (id, config) => (
        <span
          onClick={() => setEdit(config)}
          className='bg-teal-500 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded'
        >
          <BiEdit className='text-white' />
        </span>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  return (
    <Card className='border mt-2'>
      <div className='pb-3'>
        <div className='w-full flex flex-col md:flex-row gap-2 items-center justify-between'>
          <div className='flex gap-2'>
            {!!selectedRowKeys.length && (
              <>
                <BulkDelete
                  setSelected={setSelectedRowKeys}
                  selected={selectedRowKeys}
                  updateThunk={deleteManyThunk}
                  loadThunk={loadThunk}
                />
              </>
            )}

            <Button type='primary'>
              <CSVLink
                data={list ? list : ""}
                className='btn btn-dark btn-sm'
                style={{ marginTop: "5px" }}
                filename={csvFileName}
              >
                Download CSV
              </CSVLink>
            </Button>
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            />
          </div>

          <div>
            <UserPrivateComponent permission='create-email'>
              <button
                onClick={() => setOpen(true)}
                className='py-2 px-3  border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'
              >
                <AiOutlinePlus /> Create Email Config
              </button>
            </UserPrivateComponent>
          </div>
        </div>
      </div>

      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columnsToShow}
        dataSource={list?.map((item) => ({ ...item, key: item.id }))}
        pagination={false}
        scroll={{ x: 1000, y: window.innerHeight - 350 }}
      />
      <UserPrivateComponent permission='create-email'>
        <CreateDrawer
          onClose={onClose}
          open={open}
          title={"Email config"}
          width={50}
        >
          <CreateEmailSetupForm onClose={onClose} open={open} />
        </CreateDrawer>
      </UserPrivateComponent>
      <UserPrivateComponent permission='update-email'>
        <Drawer
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          title={`Update Config`}
          placement='right'
          onClose={onClose}
          open={edit}
        >
          <UpdateEmailConfig onClose={onClose} edit={edit} />
        </Drawer>
      </UserPrivateComponent>
    </Card>
  );
};
export default TableComponent;
