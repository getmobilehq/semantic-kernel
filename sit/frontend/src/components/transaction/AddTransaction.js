import {
	Button,
	Card,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Select,
	Space,
	Typography,
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddTransaction.module.css";

import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getAllAccount from "../../api/getAllApis/getAllAccounts";
import {
	addTransaction,
	loadAllTransaction,
} from "../../redux/rtk/features/transaction/transactionSlice";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddAccount from "../account/AddAccount";

let startdate = moment().startOf("month");
let enddate = moment().endOf("month");

const AddTransaction = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { Title } = Typography;

	const [form] = Form.useForm();

	let [date, setDate] = useState(dayjs());
	const [loader, setLoader] = useState(false);

	const [accounts, setAccounts] = useState(null);
	const [account, setAccount] = useState({
		debitId: 0,
		creditId: 0,
	});

	useEffect(() => {
		const getAccounts = async () => {
			const response = await getAllAccount();
			setAccounts(response);
		};
		getAccounts();
	}, []);

	const onFinish = async (values) => {
		try {
			const data = {
				...values,
				date: date,
				amount: parseInt(values.amount),
				debitId: account.debitId,
				creditId: account.creditId,
			};

			const resp = await dispatch(addTransaction(data));

			console.log(resp);
			if (resp.payload.message === "success") {
				setLoader(false);
				navigate("/admin/setup/transaction");
				dispatch(
					loadAllTransaction({
						page: 1,
						limit: 10,
						startdate: startdate.format("YYYY-MM-DD"),
						enddate: enddate.format("YYYY-MM-DD"),
					})
				);
			}

			toast.success("Payment Successfully done");
			form.resetFields();
			setLoader(false);
		} catch (error) {
			console.log(error.message);
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		setLoader(false);
	};

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<>
			<UserPrivateComponent permission={"create-transaction"}>
				<Card bordered={false}>
					<Title level={3} className='m-2 mb-4 text-center'>
						Transaction
					</Title>
					<Form
						form={form}
						name='basic'
						labelCol={{
							span: 6,
						}}
						wrapperCol={{
							span: 16,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Form.Item label='Date' required>
							<DatePicker
								defaultValue={moment()}
								onChange={(value) => setDate(value?._d)}
								label='date'
								name='date'
								className='date-picker date-picker-transaction-create'
								rules={[
									{
										required: true,
										message: "Please input date!",
									},
								]}
							/>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							name='debitId'
							label='Debit Account'>
							<Space.Compact block>
								<Select
									onChange={(value) =>
										setAccount({ ...account, debitId: value })
									}
									loading={!accounts}
									showSearch
									placeholder='Select Debit ID'
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.children.includes(input)
									}
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(optionB.children.toLowerCase())
									}>
									{accounts &&
										accounts.map((acc) => (
											<Select.Option key={acc.id} value={acc.id}>
												{acc.name}
											</Select.Option>
										))}
								</Select>
								<BigDrawer
									title={"new debit account"}
									btnTitle={"Debit account"}
									children={<AddAccount drawer={true} />}
								/>
							</Space.Compact>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							name='creditId'
							label='Credit Account'>
							<Space.Compact block>
								<Select
									onChange={(value) =>
										setAccount({ ...account, creditId: value })
									}
									loading={!accounts}
									showSearch
									placeholder='Select Credit ID'
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.children.includes(input)
									}
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(optionB.children.toLowerCase())
									}>
									{accounts &&
										accounts.map((acc) => (
											<Select.Option key={acc.id} value={acc.id}>
												{acc.name}
											</Select.Option>
										))}
								</Select>
								<BigDrawer
									title={"new credit account"}
									btnTitle={"Credit account"}
									children={<AddAccount drawer={true} />}
								/>
							</Space.Compact>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Amount'
							name='amount'
							rules={[
								{
									required: true,
									message: "Please input amount!",
								},
							]}>
							<InputNumber className='w-full' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Particulars'
							name='particulars'
							rules={[
								{
									required: true,
									message: "Please input particulars!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							className={styles.payNowBtnContainer}>
							<Button
								type='primary'
								htmlType='submit'
								shape='round'
								size='large'
								loading={loader}
								onClick={() => setLoader(true)}>
								Pay Now
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</UserPrivateComponent>
		</>
	);
};

export default AddTransaction;
