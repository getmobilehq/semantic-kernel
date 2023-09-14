import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/rtk/features/user/userSlice";

import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";

const Login = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (isLogged) {
    return <Navigate to={"/admin/dashboard"} replace={true} />;
  }
  const onFinish = async (values) => {
    const resp = await dispatch(addUser(values));
    if (resp.payload.message === "success") {
      setLoader(false);
      window.location.href = "/admin/dashboard";
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
          <Card bordered={false}
            className='rounded-lg w-full max-w-[30rem] mx-auto'>
            <Title level={3} className='m-3 text-center'>
              Admin Login
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
                // label='Username'
                name='userName'
                rules={[
                  {
                    required: true,
                    message: "Please input your userName!",
                  },
                ]}
              >
                <Input placeholder="Enter Username or Email" />
              </Form.Item>

              <Form.Item
                className='mb-5'
                // label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  block
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Submit
                </Button>
              </Form.Item>
              <Form.Item >
                <Row>
                  <Col span={24}>
                    <LoginTable username={"admin"} password={"admin"} />
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
            </Form>
            <div className="flex justify-center">
              <Link to={"/customer/login"} className='bg-teal-500 p-1 mt-3 w-2/6 rounded text-white font-semibold  block text-center'>
                Customer login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
