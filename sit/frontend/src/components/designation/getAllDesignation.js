import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "./designtaion.css";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";
import ViewBtn from "../Buttons/ViewBtn";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import AddDesignation from "./addDesignation";

function CustomTable({ list, loading }) {
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
    },

    {
      id: 3,
      title: "Action",
      key: "action",
      render: ({ id }) => (
        <UserPrivateComponent permission={"readSingle-designation"}>
          <ViewBtn path={`/admin/setup/designation/${id}`} />
        </UserPrivateComponent>
      ),
    },
  ];

  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className='mt-4'>
      <div className='text-center my-2 flex justify-between'>
        <h5 className='text-xl ml-4'>Designation List</h5>
        <UserPrivateComponent permission={"create-designation"}>
          <BigDrawer btnTitle={"Add New Designation"} title={"Designation"}>
            <AddDesignation />
          </BigDrawer>
        </UserPrivateComponent>
      </div>

      <div className='flex items-center gap-3 my-5'>
        {list && (
          <div className='ml-4'>
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            />
          </div>
        )}
        {list && (
          <div>
            <CsvLinkBtn>
              <CSVLink
                data={list}
                className='btn btn-dark btn-sm mb-1'
                filename='designation'
              >
                Download CSV
              </CSVLink>
            </CsvLinkBtn>
          </div>
        )}
      </div>

      <Table
        scroll={{ x: true }}
        loading={loading}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

const GetAllDesignation = (props) => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.designations);

  useEffect(() => {
    dispatch(loadAllDesignation());
  }, []);

  return (
    <div className='card column-design'>
      <div className='card-body'>
        <CustomTable list={list} loading={loading} />
      </div>
    </div>
  );
};

export default GetAllDesignation;
