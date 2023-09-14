import { Button, Card, Form, Input, Typography } from "antd";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { customerForgetPassword } from "../../redux/rtk/features/user/userSlice";
import SuccessPage from "./Page/SuccessPage";

const CustomerForgetPass = () => {
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(customerForgetPassword(values));
      setLoader(true);
      if (resp.payload.message === "success") {
        setLoader(false);
        setSuccess(true);
      } else {
        setLoader(false);
      }

      form.resetFields();
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className='flex justify-center items-center'
      style={{ height: "80vh" }}
    >
      {success ? (
        <SuccessPage />
      ) : (
        <div className='w-4/5 md:w-[500px]'>
          <Card bordered={false} className='rounded-lg'>
            <Title level={3} className='m-3 text-center'>
              Recover Password
            </Title>
            <p className='text-center mb-10'>
              Enter your email for recover your password
            </p>
            <Form
              form={form}
              className='m-4'
              name='basic'
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                name='email'
                rules={[
                  {
                    required: true,
                    message: "Please input email!",
                  },
                ]}
              >
                <Input placeholder='Enter your email' />
              </Form.Item>

              <Form.Item style={{ marginBottom: "10px" }} className='mb-2'>
                <Button
                  onClick={() => setLoader(true)}
                  block
                  type='primary'
                  htmlType='submit'
                  shape='round'
                  loading={loader}
                >
                  Recover Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerForgetPass;
