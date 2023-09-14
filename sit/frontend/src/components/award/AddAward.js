import { Button, Form, Input } from "antd";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addSingleAward,
  loadAllAward,
} from "../../redux/rtk/features/award/awardSlice";

const AddAward = () => {
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(addSingleAward(values));

    if (resp.payload.message === "success") {
      setLoader(false);
      form.resetFields();
      dispatch(loadAllAward());
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding department");
    setLoader(false);
  };
  return (
    <>
      <Form
        style={{ marginBottom: "40px" }}
        form={form}
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
            style={{ marginBottom: "10px" }}
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Please input your award name!",
              },
            ]}
          >
            <Input placeholder='Employee Of The Month' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "20px" }}
            label='Description'
            name='description'
            rules={[
              {
                required: true,
                message: "Please input your award description!",
              },
            ]}
          >
            <Input placeholder='Employee Who Performed Well' />
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
              Add New Award
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddAward;
