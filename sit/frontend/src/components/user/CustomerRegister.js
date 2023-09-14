import { Button, Card, Form, Input, Typography } from "antd";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { customerRegister } from "../../redux/rtk/features/user/userSlice";
import SuccessPage from "./Page/SuccessPage";

const CustomerRegister = () => {
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(customerRegister(values));
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
    <div className='flex justify-center items-center h-[80vh]'>
      {success ? (
        <SuccessPage />
      ) : (
        <div className='w-4/5 md:[500px]'>
          <Card
            bordered={false}
            className='rounded-lg w-full max-w-[30rem] mx-auto'
          >
            <Title level={3} className='m-3 text-center mb-10'>
              Customer Support Registration
            </Title>
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
                <Input placeholder='Enter email' />
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
                  Register
                </Button>
              </Form.Item>
              <h6 className='text-center mt-5'>
                Already have an account ?{" "}
                <Link
                  to={"/customer/login"}
                  className='font-semibold text-indigo-600 '
                >
                  {" "}
                  Login Here
                </Link>
              </h6>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerRegister;
