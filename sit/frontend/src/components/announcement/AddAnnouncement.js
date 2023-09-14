import { Button, Form, Input, Typography } from "antd";

import React, { useEffect } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  addAnnouncement,
  loadAllAnnouncement,
} from "../../redux/rtk/features/announcement/announcementSlice";

const AddAnnouncement = ({ drawer }) => {
  const { loading } = useSelector((state) => state.announcement);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllAnnouncement());
  }, []);

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resp = await dispatch(addAnnouncement(values));

    if (resp.payload.message === "success") {
      form.resetFields();
      dispatch(loadAllAnnouncement());
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding shift");
  };

  return (
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
          label='Title'
          name='title'
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input placeholder='Meeting at 00:00' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label='Description'
          name={"description"}
        >
          <Input.TextArea placeholder='Description' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 6,
            span: 12,
          }}
        >
          <Button
            type='primary'
            size='large'
            block
            htmlType='submit'
            loading={loading}
          >
            Add Announcement
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddAnnouncement;
