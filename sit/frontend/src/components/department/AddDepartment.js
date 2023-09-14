import { Button, Card, Form, Input, Table } from "antd";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { addDepartment, getDepartments } from "./departmentApis";

function AddDepartment({ list, setList }) {
  const [loader, setLoader] = useState(false);
  const onFinish = async (values) => {
    setLoader(true);
    const resp = await addDepartment(values);

    if (resp.message === "success") {
      setLoader(false);
      const newList = [...list];
      newList.push(resp.data);
      setList(newList);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding department");
    setLoader(false);
  };

  return (
    <UserPrivateComponent permission={"create-department"}>
      <Form
        style={{ marginTop: "40px" }}
        eventKey='department-form'
        name='basic'
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div>
          <Form.Item
            style={{ marginBottom: "20px" }}
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button
              onClick={() => setLoader(true)}
              type='primary'
              size='large'
              htmlType='submit'
              block
              loading={loader}
            >
              Add New department
            </Button>
          </Form.Item>
        </div>
      </Form>
    </UserPrivateComponent>
  );
}

const DepartmentTable = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    getDepartments()
      .then((d) => setList(d))
      .catch((error) => console.log(error));
  }, []);

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
    },

    {
      id: 3,
      title: "Created at",
      dataIndex: "createdAt",
      key: "addCreatedAt",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/setup/department/${id}/`} />,
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
    <UserPrivateComponent permission={"readAll-department"}>
      <Card>
        <div className='text-center my-2 flex justify-between'>
          <h5 className='department-list-title text-color-2 text-xl mb-2'>
            Department List
          </h5>
          <BigDrawer btnTitle={"Add Department"} title={"Department"}>
            <AddDepartment list={list} setList={setList} />
          </BigDrawer>
        </div>

        <div className='flex items-center gap-3 mb-5'>
          {list && (
            <div>
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
                  filename='departments'
                >
                  Download CSV
                </CSVLink>
              </CsvLinkBtn>
            </div>
          )}
        </div>

        <Table
          scroll={{ x: true }}
          loading={!list}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </Card>
    </UserPrivateComponent>
  );
};

export default DepartmentTable;
