import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/rtk/features/user/userSlice";

import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getRoleFromToken from "../../utils/getRoleFromToken";
import LoginTable from "../Card/LoginTable";

const CustomerLogin = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (isLogged) {
    return <Navigate to={"/customer/dashboard"} replace={true} />;
  }
  const onFinish = async (values) => {
    const resp = await dispatch(addCustomer(values));
    if (resp.payload.message === "success") {
      setLoader(false);
      if (getRoleFromToken() === "customer") {
        window.location.href = "/customer/dashboard";
      }
    } else {
      setLoader(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
    toast.error("Error at login Please try again");
  };

  return (
    <>
      <div className='card-row flex justify-center items-center h-[80vh]'>
        <div className='w-4/5 md:[500px]'>
          <Card
            bordered={false}
            className='rounded-lg w-full max-w-[30rem] mx-auto'
          >
            <Title level={3} className='m-3 mb-8 text-center'>
              Customer Support Login
            </Title>
            <Form
              name='basic'
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                className='mb-5'
                name='email'
                rules={[
                  {
                    required: true,
                    message: "Please input your email or username!",
                  },
                ]}
              >
                <Input placeholder='Enter email' />
              </Form.Item>

              <Form.Item
                className='mb-5'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder='Enter password' />
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type='primary'
                  htmlType='submit'
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col span={24}>
                    <LoginTable username={"dev@omega.ac"} password={"1234"} />
                  </Col>
                </Row>
              </Form.Item>
              <Link
                to={"/customer/forget-password"}
                className='font-semibold text-indigo-600 text-center block'
              >
                Forgot password?
              </Link>
              <h6 className='text-center mt-4'>
                Don't have an account ?{" "}
                <Link
                  to={"/customer/register"}
                  className='font-semibold text-indigo-600'
                >
                  Register Here
                </Link>
              </h6>
              <div className='flex justify-center'>
                <Link
                  to={"/admin/auth/login"}
                  className='bg-teal-500 p-1 w-2/6 justify-center mt-3 rounded text-white font-semibold  block text-center'
                >
                  Admin login
                </Link>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CustomerLogin;
