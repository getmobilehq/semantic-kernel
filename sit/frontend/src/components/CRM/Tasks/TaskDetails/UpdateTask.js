import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCompany } from "../../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllOpportunity } from "../../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllQuote } from "../../../../redux/rtk/features/crm/quote/quoteSlice";
import {
	loadSingleTask,
	updateTask,
} from "../../../../redux/rtk/features/crm/task/crmTaskSlice";
import { loadAllTaskPriority } from "../../../../redux/rtk/features/crm/taskPriority/crmTaskPrioritySlice";
import { loadAllTaskStatus } from "../../../../redux/rtk/features/crm/taskStatus/crmTaskStatusSlice";
import { loadAllTaskType } from "../../../../redux/rtk/features/crm/taskType/crmTaskTypeSlice";
import { loadAllStaff } from "../../../../redux/rtk/features/user/userSlice";

function UpdateTaskForm({ onClose, task, id }) {
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	// selector
	const { list: companyList, loading: companyLoading } = useSelector(
		(state) => state.company
	);
	const { list: contactList, loading: contactLoading } = useSelector(
		(state) => state.contact
	);
	const { list: opportunityList, loading: opportunityLoading } = useSelector(
		(state) => state.opportunity
	);
	const { list: quoteList, loading: quoteLoading } = useSelector(
		(state) => state.quote
	);

	const { list: taskPriorityList, loading: taskPriorityLoading } = useSelector(
		(state) => state.crmTaskPriority
	);
	const { list: taskTypeList, loading: taskTypeLoading } = useSelector(
		(state) => state.crmTaskType
	);
	const { list: taskStatusList, loading: taskStatusLoading } = useSelector(
		(state) => state.crmTaskStatus
	);

	const { list: ownerList, loading: ownerLoading } = useSelector(
		(state) => state.users
	);

	useEffect(() => {
		dispatch(loadAllTaskPriority());
		dispatch(loadAllTaskStatus());
		dispatch(loadAllTaskType());
		dispatch(loadAllContact());
		dispatch(loadAllCompany());
		dispatch(loadAllOpportunity());
		dispatch(loadAllQuote());
		dispatch(loadAllStaff({ status: true }));
	}, [dispatch]);
	const onFinish = async (values) => {
		const formData = {
			...values,
			assigneeId: parseInt(values.assigneeId),
			companyId: parseInt(values.companyId),
			contactId: parseInt(values.contactId),
			opportunityId: parseInt(values.opportunityId),
			quoteId: parseInt(values.quoteId),
			taskPriorityId: parseInt(values.taskPriorityId),
			taskStatusId: parseInt(values.taskStatusId),
			taskTypeId: parseInt(values.taskTypeId),
		};

		const resp = await dispatch(updateTask({ id, values: formData }));
		if (resp.payload.message === "success") {
			dispatch(loadSingleTask(id));
			onClose();
		}
	};

	const onFinishFailed = (errorInfo) => {
		form.resetFields();
		console.log("Failed:", errorInfo);
		onClose();
	};

	return (
		<>
			<div className='flex justify-center mt-5'>
				<Form
					className='w-4/5'
					form={form}
					colon={false}
					layout='vertical'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					initialValues={{
						taskName: task?.taskName || "",
						assigneeId: task?.assigneeId || "",
						contactId: task?.contactId || "",
						companyId: task?.companyId || "",
						opportunityId: task?.opportunityId || "",
						quoteId: task?.quoteId || "",
						taskTypeId: task?.taskTypeId || "",
						taskStatusId: task?.taskStatusId || "",
						taskPriorityId: task?.taskPriorityId || "",
						notes: task?.notes || "",
						dueDate: moment(task?.dueDate) || "",
					}}>
					<div>
						<Form.Item
							style={{ width: "100%" }}
							label='Task Name'
							name={"taskName"}>
							<Input />
						</Form.Item>
						<Form.Item
							style={{ width: "100%" }}
							className='flex flex-col'
							label='Assign'
							name={"assigneeId"}
							tooltip='Change the owner of this Task'>
							<Select style={{ width: "100%" }} loading={ownerLoading}>
								{ownerList.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item?.firstName} {item?.lastName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label='Due Date' name={"dueDate"}>
							<DatePicker />
						</Form.Item>
						<Form.Item
							className='flex flex-col'
							label='Task Type'
							name={"taskTypeId"}
							tooltip='Change the task type of this task'>
							<Select style={{ width: "100%" }} loading={taskTypeLoading}>
								{taskTypeList.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.taskTypeName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							className='flex flex-col'
							label='Task Priority'
							name={"taskPriorityId"}
							tooltip='Change the task priority of this task'>
							<Select style={{ width: "100%" }} loading={taskPriorityLoading}>
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
							name={"taskStatusId"}
							tooltip='Change the task status of this task'>
							<Select style={{ width: "100%" }} loading={taskStatusLoading}>
								{taskStatusList.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.taskStatusName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							className='flex flex-col'
							label='Company'
							name={"companyId"}
							tooltip='Change the company of this task'>
							<Select style={{ width: "100%" }} loading={companyLoading}>
								{companyList.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.companyName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							className='flex flex-col'
							label='Contact'
							name={"contactId"}
							tooltip='Change the contact of this task'>
							<Select style={{ width: "100%" }} loading={contactLoading}>
								{contactList.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item?.firstName} {item?.lastName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							className='flex flex-col'
							label='Opportunity'
							name={"opportunityId"}
							tooltip='Change the opportunity of this task'>
							<Select style={{ width: "100%" }} loading={opportunityLoading}>
								{opportunityList.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.opportunityName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							className='flex flex-col'
							label='Quote'
							name={"quoteId"}
							tooltip='Change the quote of this task'>
							<Select style={{ width: "100%" }} loading={quoteLoading}>
								{quoteList.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.quoteName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item style={{ width: "100%" }} label='Notes' name={"notes"}>
							<Input />
						</Form.Item>
					</div>
					<Form.Item>
						<div className='flex items-center justify-evenly gap-3'>
							<Button block type='primary' htmlType='submit'>
								Save
							</Button>
							<Button block type='danger' onClick={onFinishFailed}>
								Cancel
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}

export default function UpdateTask({ open, onClose, id, task }) {
	return (
		<>
			<Drawer
				width={window.innerWidth <= 768 ? "100%" : "35%"}
				title='Update Task'
				placement='right'
				onClose={onClose}
				open={open}>
				<UpdateTaskForm onClose={onClose} id={id} task={task} />
			</Drawer>
		</>
	);
}
