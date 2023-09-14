import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addSingleCompany,
	loadAllCompany,
} from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllCompanyType } from "../../../redux/rtk/features/crm/companyType/companyTypeSlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllIndustry } from "../../../redux/rtk/features/crm/industry/industrySlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";

export default function CreateCompanyForm({ onClose }) {
	const [form] = Form.useForm();
	const { list: industryList, loading: industryLoading } = useSelector(
		(state) => state.industry
	);

	const { loading: companyLoading } = useSelector((state) => state.company);

	const { list: companyTypeList, loading: companyTypeLoading } = useSelector(
		(state) => state.companyType
	);
	const { list: ownerList, loading: ownerLoading } = useSelector(
		(state) => state.users
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllIndustry());
		dispatch(loadAllContact());
		dispatch(loadAllCompanyType());
		dispatch(loadAllStaff({ status: true }));
	}, [dispatch]);

	const onFinish = async (values) => {
		const formData = {
			...values,
			companySize: parseInt(values.companySize),
			annualRevenue: parseInt(values.annualRevenue),
		};
		const resp = await dispatch(addSingleCompany(formData));
		if (resp.payload.message === "success") {
			form.resetFields();
			dispatch(loadAllCompany());
			onClose();
		}
	};

	const onCancel = () => {
		form.resetFields();
		onClose();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className='flex justify-center mt-5'>
			<Form
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				colon={false}
				layout='vertical'
				form={form}
				style={{
					width: "80%",
				}}>
				<Form.Item
					label='Company name'
					name='companyName'
					tooltip='This is a required field'
					rules={[{ required: true, message: "Company name is Required." }]}>
					<Input placeholder='XYZ Limited' />
				</Form.Item>

				<Form.Item
					label='Company owner'
					name='companyOwnerId'
					tooltip='This is a required field'
					rules={[
						{ required: true, message: "Company Owner name is Required." },
					]}>
					<Select
						style={{ width: "100%" }}
						loading={ownerLoading}
						allowClear
						showSearch
						placeholder='Select company owner name'>
						{ownerList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item?.firstName} {item?.lastName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item label='Industry' name='industryId'>
					<Select
						style={{ width: "100%" }}
						loading={industryLoading}
						allowClear
						showSearch
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase())
						}
						filterSort={(optionA, optionB) =>
							optionA.children
								.toLowerCase()
								.localeCompare(optionB.children.toLowerCase())
						}
						placeholder='Select Industry'>
						{industryList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.industryName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item label='Company Type' name='companyTypeId'>
					<Select
						style={{ width: "100%" }}
						loading={companyTypeLoading}
						allowClear
						showSearch
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase())
						}
						filterSort={(optionA, optionB) =>
							optionA.children
								.toLowerCase()
								.localeCompare(optionB.children.toLowerCase())
						}
						placeholder='Select Company Type'>
						{companyTypeList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.companyTypeName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item label='Company Size' name='companySize'>
					<Input placeholder='10' />
				</Form.Item>

				<Form.Item label='Annual Revenue' name='annualRevenue'>
					<Input placeholder='100000' />
				</Form.Item>

				<Form.Item label='Phone' name='phone'>
					<Input placeholder='+01 454884657' />
				</Form.Item>

				<Form.Item label='Email' name='email'>
					<Input placeholder='xyz@xyz.com' />
				</Form.Item>

				<Form.Item label='Website' name='website'>
					<Input placeholder='https://xyz.com' />
				</Form.Item>

				<Form.Item label='Linkedin' name='linkedin'>
					<Input placeholder='https://linkedin.com/in/xyz' />
				</Form.Item>

				<Form.Item label='Twitter' name='twitter'>
					<Input placeholder='https://twitter.com/xyz' />
				</Form.Item>

				<Form.Item label='Instagram' name='instagram'>
					<Input placeholder='https://instagram.com/xyz' />
				</Form.Item>

				<Form.Item label='Facebook' name='facebook'>
					<Input placeholder='https://facebook.com/xyz' />
				</Form.Item>

				<Form.Item label='Billing Street' name='billingStreet'>
					<Input placeholder=' Xyz road ' />
				</Form.Item>

				<Form.Item label='Billing City' name='billingCity'>
					<Input placeholder='LA' />
				</Form.Item>

				<Form.Item label='Billing Zip Code' name='billingZipCode'>
					<Input placeholder='45004' />
				</Form.Item>

				<Form.Item label='Billing State' name='billingState'>
					<Input placeholder='CA' />
				</Form.Item>

				<Form.Item label='Billing Country' name='billingCountry'>
					<Input placeholder='USA' />
				</Form.Item>

				<Form.Item label='Shipping Street' name='shippingStreet'>
					<Input placeholder=' zyx road' />
				</Form.Item>

				<Form.Item label='Shipping City' name='shippingCity'>
					<Input placeholder='Mancester City' />
				</Form.Item>

				<Form.Item label='Shipping Zip Code' name='shippingZipCode'>
					<Input placeholder='45871' />
				</Form.Item>

				<Form.Item label='Shipping State' name='shippingState'>
					<Input placeholder='ManCity' />
				</Form.Item>

				<Form.Item label='Shipping Country' name='shippingCountry'>
					<Input placeholder='UK' />
				</Form.Item>

				<Form.Item>
					<div className='flex items-center gap-2'>
						<Button
							size={"large"}
							htmlType='submit'
							type='primary'
							loading={companyLoading}>
							Create
						</Button>
						{/* 	<button
							className='py-1 px-3 text-lg border border-orange-500 rounded cursor-pointer'
							type='submit'>
							Create and add another
						</button> */}
						<Button
							size={"large"}
							htmlType='submit'
							type='danger'
							onClick={onCancel}>
							Cancel
						</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
}
