import { Button, Col, DatePicker, Form, Input, Row, Typography } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  loadSingleCustomer,
  updateCustomer,
} from "../../../redux/rtk/features/crm/customer/customerSlice";

function UpdateUserDetail({ customer, open }) {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [dateOfBirth, setDateOfBirth] = useState(customer?.dateOfBirth);
  const [form] = Form.useForm();

  const id = customer?.id;

  const [initValues, setInitValues] = useState({
    firstName: customer?.firstName,
    lastName: customer?.lastName,
    phone: customer?.phone,
    dateOfBirth: customer?.dateOfBirth && dayjs(customer?.dateOfBirth),

    jobTitle: customer?.jobTitle,
    socialMediaUrl: customer?.socialMediaUrl,
    address: customer?.address,
    city: customer?.city,
    state: customer?.state,
    zip: customer?.zip,
    country: customer?.country,
  });

  const [loader, setLoader] = useState(false);
  const onClick = () => {
    setLoader(true);
  };

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(
        updateCustomer({
          id,
          values: {
            ...values,
            dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
          },
        })
      );
      if (resp.payload.message === "success") {
        setInitValues({});
        setLoader(false);
        // open(false);
        dispatch(loadSingleCustomer(customer?.id));
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/customer/login"} replace={true} />;
  }

  return (
    <>
      <div className='text-center'>
        <div className='m-2'>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              className='border rounded column-design'
            >
              <Form
                initialValues={{
                  ...initValues,
                }}
                form={form}
                className='m-4 text-center'
                name='basic'
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
              >
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "First Name" }]}
                  label='First Name'
                  name='firstName'
                  rules={[
                    {
                      required: true,
                      message: "Please input customer First Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Last Name" }]}
                  label='Last Name'
                  name='lastName'
                  rules={[
                    {
                      required: true,
                      message: "Please input customer Last Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Phone" }]}
                  label='Phone'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: "Please input customer Phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Date of Birth" }]}
                  label='Date of Birth'
                  name='dateOfBirth'
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Job Title" }]}
                  label='Job Title'
                  name='jobTitle'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Social Media Url" }]}
                  label='Social Media Url'
                  name='socialMediaUrl'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Address" }]}
                  label='Address'
                  name='address'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "City" }]}
                  label='City'
                  name='city'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "State" }]}
                  label='State'
                  name='state'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Zip" }]}
                  label='Zip'
                  name='zip'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Country" }]}
                  label='Country'
                  name='country'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 7,
                    span: 16,
                  }}
                >
                  <Button
                    onClick={onClick}
                    block
                    type='primary'
                    htmlType='submit'
                    shape='round'
                    loading={loader}
                  >
                    Update Now
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UpdateUserDetail;
