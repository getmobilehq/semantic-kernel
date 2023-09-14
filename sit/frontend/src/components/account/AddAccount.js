import { Button, Form, Input, Select } from "antd";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddNewAccount.module.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../../redux/rtk/features/account/accountSlice";
import { getMainAccount } from "./account.api";

const AddAccount = ({ drawer }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const getAccounts = async () => {
      const response = await getMainAccount();
      setAccounts(response);
    };
    getAccounts();
  }, []);

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addAccount(values));
      if (resp.payload.message === "success") {
        setLoader(false);
      }

      toast.success("Account Added");
      form.resetFields();
      setLoader(false);
    } catch (error) {
      toast.error("Error in adding account");
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <Form
      className='mt-10'
      form={form}
      name='basic'
      labelWrap
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
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
        name='name'
        label='Name'
        rules={[
          {
            required: true,
            message: "Please input debit account!",
          },
        ]}
      >
        <Input placeholder='Name' />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "10px" }}
        name='account_id'
        label='Account Type'
        rules={[
          {
            required: true,
            message: "Please input debit account!",
          },
        ]}
      >
        <Select
          loading={!accounts}
          showSearch
          placeholder='Select Account Type'
          optionFilterProp='children'
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {accounts &&
            accounts.map((acc) => (
              <Select.Option key={acc.id} value={acc.id}>
                {acc.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "10px" }}
        className={styles.addNewAccountBtnContainer}
      >
        <Button
          type='primary'
          htmlType='submit'
          shape='round'
          size='large'
          loading={loader}
          onClick={() => setLoader(true)}
        >
          Add New Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAccount;
