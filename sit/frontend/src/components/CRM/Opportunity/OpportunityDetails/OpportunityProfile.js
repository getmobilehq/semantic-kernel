/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Form, Input, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadAllCompany } from "../../../../redux/rtk/features/crm/company/companySlice";
import {
	loadAllContact,
	loadAllContactPaginated,
} from "../../../../redux/rtk/features/crm/contact/contactSlice";
import {
	deleteOpportunity,
	loadSingleOpportunity,
	updateOpportunity,
} from "../../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllStaff } from "../../../../redux/rtk/features/user/userSlice";
import getPermissions from "../../../../utils/getPermissions";

export default function OpportunityProfile({ data, loading }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { OpportunityId: id } = useParams();
	const [form] = Form.useForm();
	const [triggerSave, setTriggerSave] = useState(false);

	const { list: ownerList, loading: ownerLoading } = useSelector(
		(state) => state.users
	);
	const { list: companyList, loading: companyLoading } = useSelector(
		(state) => state.company
	);
	const { list: contactList, loading: contactLoading } = useSelector(
		(state) => state.contact
	);
	// delete contact
	const onDelete = async () => {
		var result = window.confirm("Are you sure you want to delete?");
		if (result) {
			const resp = await dispatch(deleteOpportunity(id));
			if (resp.payload.message === "success") {
				navigate(-1);
				dispatch(loadAllContactPaginated({}));
			}
		}
	};

	// contact profile edit form
	const permissions = getPermissions();
	const canEdit = permissions?.includes("update-opportunity");
	const onFinish = async (values) => {
		const formData = {
			...values,
			opportunityOwnerId: parseInt(values.opportunityOwnerId),
			contactId: parseInt(values.contactId),
			companyId: parseInt(values.companyId),
		};
		const resp = await dispatch(
			updateOpportunity({ id: data.id, values: formData })
		);
		if (resp.payload.message === "success") {
			dispatch(loadSingleOpportunity(data.id));
			setTriggerSave(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setTriggerSave(false);
		form.resetFields();
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		dispatch(loadAllStaff({ status: true }));
		dispatch(loadAllCompany());
		dispatch(loadAllContact());
	}, [dispatch]);

	return (
		<>
			<Skeleton loading={loading} active>
				{data && (
					<Card headStyle={{ display: "none" }} bodyStyle={{ padding: 0 }}>
						<Form
							form={form}
							colon={false}
							disabled={!canEdit}
							labelCol={{
								span: 2,
							}}
							wrapperCol={{
								span: 8,
							}}
							layout='inline'
							onFieldsChange={() => setTriggerSave(true)}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							initialValues={{
								opportunityName: data?.opportunityName,
								amount: data?.amount,
								opportunityOwnerId: data?.opportunityOwnerId,
								contactId: data?.contactId,
								companyId: data?.companyId,
							}}>
							<div className='w-full'>
								<div className='flex justify-between items-center px-5 p-3 border-b'>
									<div className='flex gap-2 dark:text-white'>
										<span>Opportunity Name:</span>
										<span className='font-bold'>{data.opportunityName}</span>
									</div>
									<div className='flex items-center gap-2'>
										{triggerSave && (
											<Form.Item>
												<div className='flex items-center gap-4'>
													<Button type='primary' htmlType='submit'>
														Save
													</Button>
													<Button
														loading={loading}
														type='danger'
														onClick={onFinishFailed}>
														Cancel
													</Button>
												</div>
											</Form.Item>
										)}
										<Button danger onClick={onDelete}>
											Delete
										</Button>
									</div>
								</div>
								<div className='flex flex-col gap-2 p-3'>
									<Form.Item
										className='flex flex-col'
										label='Opportunity Owner'
										name={"opportunityOwnerId"}>
										<Select
											bordered={false}
											loading={ownerLoading}
											className='md:ml-5'>
											{ownerList.map((item) => (
												<Select.Option key={item.id} value={item.id}>
													{item?.firstName} {item?.lastName}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item label='Opportunity Name' name='opportunityName'>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>
									<Form.Item
										className='flex flex-col'
										label='Contact'
										name={"contactId"}>
										<Select
											bordered={false}
											loading={contactLoading}
											className='md:ml-5'>
											{contactList.map((item) => (
												<Select.Option key={item.id} value={item.id}>
													{item?.firstName} {item?.lastName}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item
										className='flex flex-col'
										label='Company'
										name={"companyId"}>
										<Select
											bordered={false}
											loading={companyLoading}
											className='md:ml-5'>
											{companyList.map((item) => (
												<Select.Option key={item.id} value={item.id}>
													{item.companyName}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item label='Amount' name='amount'>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>
								</div>
							</div>
						</Form>
					</Card>
				)}
			</Skeleton>
		</>
	);
}
