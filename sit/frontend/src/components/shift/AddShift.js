import { Button, Card, Form, Input, Table, TimePicker } from "antd";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addShift,
  loadAllShift,
} from "../../redux/rtk/features/shift/shiftSlice";
import ViewBtn from "../Buttons/ViewBtn";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";

const ShiftTable = () => {
  const list = useSelector((state) => state.shift.list);
  const dispatch = useDispatch();
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
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => dayjs(startTime).format("hh:mm A"),
    },

    {
      id: 4,
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => dayjs(endTime).format("hh:mm A"),
    },
    {
      id: 5,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/setup/shift/${id}/`} />,
    },
  ];

  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));
  useEffect(() => {
    dispatch(loadAllShift());
  }, []);
  return (
    <UserPrivateComponent permission={"readAll-shift"}>
      <Card>
        <div className='text-center my-2 flex justify-between'>
          <h5 className='department-list-title text-color-2 text-xl mb-2'>
            Shift List
          </h5>
          <BigDrawer btnTitle={"Add Shift"} title={"Shift"}>
            <AddShift />
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
                  filename='shift'
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

export default ShiftTable;

const AddShift = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(addShift(values));

    if (resp.payload.message === "success") {
      setLoader(false);
      form.resetFields();
      dispatch(loadAllShift());
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding shift");
    setLoader(false);
  };
  return (
    <>
      <UserPrivateComponent permission={"create-shift"}>
        <Form
          form={form}
          style={{ marginTop: "40px" }}
          eventKey='shift-form'
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
              style={{ marginBottom: "10px" }}
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: "Please input your shift!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Start Time'
              name='startTime'
              rules={[
                {
                  required: true,
                  message: "Please input your shift!",
                },
              ]}
            >
              <TimePicker />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              label='End Time'
              name='endTime'
              rules={[
                {
                  required: true,
                  message: "Please input your shift!",
                },
              ]}
            >
              <TimePicker />
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
                Add New Shift
              </Button>
            </Form.Item>
          </div>
        </Form>
      </UserPrivateComponent>
    </>
  );
};
