/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, DatePicker, Form, Input, Select, Skeleton } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadAllContactPaginated } from "../../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllOpportunity } from "../../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import {
	deleteTask,
	loadSingleTask,
	updateTask,
} from "../../../../redux/rtk/features/crm/task/crmTaskSlice";
import { loadAllTaskPriority } from "../../../../redux/rtk/features/crm/taskPriority/crmTaskPrioritySlice";
import { loadAllTaskStatus } from "../../../../redux/rtk/features/crm/taskStatus/crmTaskStatusSlice";
import { loadAllStaff } from "../../../../redux/rtk/features/user/userSlice";
import getPermissions from "../../../../utils/getPermissions";

export default function TaskProfile({ data, loading }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { TaskId: id } = useParams();
	const [form] = Form.useForm();
	const [triggerSave, setTriggerSave] = useState(false);

	const { list: ownerList, loading: ownerLoading } = useSelector(
		(state) => state.users
	);
	const { list: taskPriorityList, loading: taskPriorityLoading } = useSelector(
		(state) => state.crmTaskPriority
	);
	const { list: taskStatusList, loading: taskStatusLoading } = useSelector(
		(state) => state.crmTaskStatus
	);
	const { list: opportunityList, loading: opportunityLoading } = useSelector(
		(state) => state.opportunity
	);
	// delete contact
	const onDelete = async () => {
		var result = window.confirm("Are you sure you want to delete?");
		if (result) {
			const resp = await dispatch(deleteTask(id));
			if (resp.payload.message === "success") {
				navigate(-1);
				dispatch(loadAllContactPaginated({}));
			}
		}
	};

	// contact profile edit form
	const permissions = getPermissions();
	const canEdit = permissions?.includes("update-crmTask");
	const onFinish = async (values) => {
		const formData = {
			...values,
			assigneeId: parseInt(values.assigneeId),
			opportunityId: parseInt(values.opportunityId),
			taskPriorityId: parseInt(values.taskPriorityId),
			taskStatusId: parseInt(values.taskStatusId),
		};
		const resp = await dispatch(updateTask({ id: data.id, values: formData }));
		if (resp.payload.message === "success") {
			dispatch(loadSingleTask(data.id));
			setTriggerSave(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setTriggerSave(false);
		form.resetFields();
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		dispatch(loadAllOpportunity());
		dispatch(loadAllTaskPriority());
		dispatch(loadAllTaskStatus());
		dispatch(loadAllStaff({ status: true }));
	}, [dispatch]);

	return (
		<>
			<Skeleton loading={loading} active>
				{data && (
					<Card
						bordered
						headStyle={{ display: "none" }}
						bodyStyle={{ padding: 0 }}>
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
								taskName: data?.taskName || "",
								assigneeId: data?.assigneeId || "",
								opportunityId: data?.opportunityId || "",
								taskStatusId: data?.taskStatusId || "",
								taskPriorityId: data?.taskPriorityId || "",
								dueDate: moment(data?.dueDate) || "",
							}}>
							<div className='w-full'>
								<div className='flex justify-between items-center px-5 p-3 border-b'>
									<div className='flex gap-2 dark:text-white'>
										<span>Task Name:</span>
										<span className='font-bold'>{data.taskName}</span>
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
									<Form.Item label='Task Name' name='taskName'>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>
									<Form.Item
										className='flex flex-col'
										label='Assignee'
										name={"assigneeId"}
										tooltip='Change the assignee of this Task'>
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

									<Form.Item
										className='flex flex-col'
										label='Task Priority'
										name={"taskPriorityId"}>
										<Select
											bordered={false}
											loading={taskPriorityLoading}
											className='md:ml-5'>
											{taskPriorityList.map((item) => (
												<Select.Option key={item.id} value={item.id}>
													{item.taskPriorityName}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item
										className='flex flex-col'
										label='Task Status'
										name={"taskStatusId"}>
										<Select
											bordered={false}
											loading={taskStatusLoading}
											className='md:ml-5'>
											{taskStatusList.map((item) => (
												<Select.Option key={item.id} value={item.id}>
													{item.taskStatusName}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item
										className='flex flex-col'
										label='Opportunity'
										name={"opportunityId"}>
										<Select
											bordered={false}
											loading={opportunityLoading}
											className='md:ml-5'>
											{opportunityList.map((item) => (
												<Select.Option key={item.id} value={item.id}>
													{item.opportunityName}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item label='Due Date' name='dueDate'>
										<DatePicker
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
