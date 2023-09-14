import { Button, Form, Modal, Input } from "antd";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import getRoleFromToken from "../../../utils/getRoleFromToken";

const resetPasswordApi = async (values, cust_id) => {
	const response = await axios.patch(
		`customer/reset-password/${cust_id}`,
		values
	);
	return { response, message: "success" };
};

const ResetUserPassword = ({ customerId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setLoading(false);
		form.resetFields();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setLoading(false);
		form.resetFields();
	};

	const navigate = useNavigate();

	const onFinish = async (values) => {
		try {
			const resp = await resetPasswordApi(values, customerId);
			if (
				resp.response.data.message === "Old Password not Matched" ||
				resp.response.data.message === "Old Password not Matched"
			) {
				toast.error("Old password not matched, Try again");
				setLoading(false);
			} else if (
				resp.response.data.message === "Password updated successfully"
			) {
				toast.success("Password reset successfully");
				form.resetFields();
				setLoading(false);
				//wait for 5 sec and then redirect
				setTimeout(() => {
					if (getRoleFromToken() !== "customer") navigate(-1);
					else navigate("/admin/auth/logout");
				}, 3000);
			} else {
				toast.error("Something went wrong, Try again");
				setLoading(false);
			}
		} catch (error) {
			console.log(error.message);
			setLoading(false);
		}
	};
	const onFinishFailed = (errorInfo) => {
		setLoading(false);
		toast.error("Something went wrong, Try again");
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<SettingOutlined onClick={showModal} />
			<Modal
				title='Reset Password'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				{/* Form Starts Here */}
				<Form
					form={form}
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 12,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<Form.Item
						label='Old Password'
						name='oldPassword'
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}>
						<Input.Password autoComplete='off' />
					</Form.Item>

					<Form.Item
						label='New Password'
						name='password'
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}>
						<Input.Password autoComplete='off' />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 12,
						}}>
						<Button
							type='primary'
							htmlType='submit'
							block
							onClick={() => setLoading(true)}
							loading={loading}>
							Submit
						</Button>
					</Form.Item>
				</Form>

				{/* Form Ends Here */}
			</Modal>
		</>
	);
};

export default ResetUserPassword;
