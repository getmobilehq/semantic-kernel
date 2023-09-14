import { Card, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskStatus,
  loadAllTaskStatus,
} from "../../../../../redux/rtk/features/crm/taskStatus/crmTaskStatusSlice";
import ColVisibilityDropdown from "../../../../Shared/ColVisibilityDropdown";
import CustomDrawer from "../../../CommonUi/CustomDrawer";
import CreateCrmTaskStatusForm from "./CreateCrmTaskStatusForm";

const TableComponent = () => {
  const dispatch = useDispatch();
  const { list: crmTaskStatusList, loading } = useSelector(
    (state) => state.crmTaskStatus
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {

    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    dispatch(loadAllTaskStatus());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteTaskStatus(id));
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "taskStatusName",
    },
    {
      title: "CREATE DATE",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      title: "UPDATE DATE",
      dataIndex: "updatedAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, values) => (
        <span className='flex items-cupdate-contactSourceenter gap-2'>
          <CustomDrawer
            permission={"update-crmTaskStatus"}
            update
            title={"Update Task Status"}
            width={25}
          >
            <CreateCrmTaskStatusForm edit={{ id, values }} />
          </CustomDrawer >
          <span
            onClick={() => deleteHandler(id)}
            className='bg-red-700 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded'
          >
            <AiFillDelete className='text-white' />
          </span>
        </span>
      ),
    },
  ];

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
  }, []);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };
  return (
    <Card className='border mt-2'>
      <div className='flex justify-between items-center'>
        <div></div>
        <div className='flex items-center gap-2'>
          <span className='border px-2 py-1 rounded cursor-pointer bg-black text-white'>
            <CSVLink
              data={crmTaskStatusList}
              className='btn btn-dark btn-sm'
              style={{ marginTop: "5px" }}
              filename='CRM-Task-Status_CRM-OS'
            >
              Download CSV
            </CSVLink>
          </span>
          <ColVisibilityDropdown
            options={columns}
            columns={columns}
            columnsToShowHandler={columnsToShowHandler}
          />
        </div>
      </div>
      <div>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columnsToShow}
        dataSource={crmTaskStatusList?.map((item) => ({
          ...item,
          key: item.id,
        }))}
        pagination={false}
        scroll={{ x: 500 }}
      />
    </Card>
  );
};
export default TableComponent;
