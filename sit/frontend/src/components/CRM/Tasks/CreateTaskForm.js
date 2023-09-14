import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import {
	addSingleTask,
	loadAllTask,
	loadAllTaskPaginated,
} from "../../../redux/rtk/features/crm/task/crmTaskSlice";
import { loadAllTaskPriority } from "../../../redux/rtk/features/crm/taskPriority/crmTaskPrioritySlice";
import { loadAllTaskStatus } from "../../../redux/rtk/features/crm/taskStatus/crmTaskStatusSlice";
import { loadAllTaskType } from "../../../redux/rtk/features/crm/taskType/crmTaskTypeSlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import { loadAllOpportunity } from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllQuote } from "../../../redux/rtk/features/crm/quote/quoteSlice";

export default function CreateTaskForm({ onClose, createAs }) {
	// selector
	const { list: companyList, loading: companyLoading } = useSelector(
		(state) => state.company
	);
	const { list: contactList, loading: contactLoading } = useSelector(
		(state) => state.contact
	);
	const { list: quoteList, loading: quoteLoading } = useSelector(
		(state) => state.quote
	);
	const { list: opportunityList, loading: opportunityLoading } = useSelector(
		(state) => state.opportunity
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
	const { list: staffList, loading: staffLoading } = useSelector(
		(state) => state.users
	);
	const { loading: taskLoading } = useSelector((state) => state.crmTask);

	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllTaskPriority());
		dispatch(loadAllTaskStatus());
		dispatch(loadAllContact());
		dispatch(loadAllOpportunity());
		dispatch(loadAllCompany());
		dispatch(loadAllTaskType());
		dispatch(loadAllQuote());
		dispatch(loadAllStaff({ status: true }));
		dispatch(loadAllTask());
	}, [dispatch]);

	const onFinish = async (values) => {
		const formData = {
			...values,
			assigneeId: parseInt(values.assigneeId),
			companyId: parseInt(values.companyId),
			contactId: parseInt(values.contactId),
			opportunityId: parseInt(values.opportunityId),
			quoteId: parseInt(values.quoteId),
			taskTypeId: parseInt(values.taskTypeId),
			taskPriorityId: parseInt(values.taskPriorityId),
			taskStatusId: parseInt(values.taskStatusId),
		};

		const resp = await dispatch(addSingleTask(formData));
		if (resp.payload.message === "success") {
			form.resetFields();
			if (createAs?.name) {
				dispatch(createAs.singleLoadThunk(createAs.value));
			} else {
				dispatch(loadAllTaskPaginated({ status: true, page: 1, count: 10 }));
			}
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
				className='w-4/5'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				colon={false}
				layout='vertical'
				form={form}
				initialValues={
					createAs
						? {
								[createAs.name]: createAs.value,
						  }
						: {}
				}>
				<Form.Item
					style={{ width: "100%" }}
					label='Task name'
					name='taskName'
					tooltip='This is a required field'
					rules={[{ required: true, message: "Task name is Required." }]}>
					<Input placeholder='Example name' />
				</Form.Item>

				<Form.Item
					label='Assignee'
					name={"assigneeId"}
					tooltip='This is a required field'
					rules={[{ required: true, message: "Assignee is Required." }]}>
					<Select
						style={{ width: "100%" }}
						loading={staffLoading}
						allowClear
						showSearch
						placeholder='assignee name'>
						{staffList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item?.firstName} {item?.lastName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Company' name='companyId'>
					<Select
						style={{ width: "100%" }}
						loading={companyLoading}
						allowClear
						showSearch
						placeholder='Select company Name'
						disabled={!!(createAs?.name === "companyId")}>
						{companyList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.companyName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Contact' name='contactId'>
					<Select
						style={{ width: "100%" }}
						loading={contactLoading}
						allowClear
						showSearch
						disabled={!!(createAs?.name === "contactId")}
						placeholder='Select contact name'>
						{contactList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item?.firstName} {item?.lastName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Opportunity' name='opportunityId'>
					<Select
						style={{ width: "100%" }}
						loading={opportunityLoading}
						allowClear
						showSearch
						placeholder='Select opportunity Name'>
						{opportunityList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.opportunityName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Quote' name='quoteId'>
					<Select
						style={{ width: "100%" }}
						loading={quoteLoading}
						allowClear
						showSearch
						placeholder='Select quote Name'>
						{quoteList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.quoteName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label='Task Type'
					name='taskTypeId'
					tooltip='This is a required field'
					rules={[{ required: true, message: "Task type is Required." }]}>
					<Select
						style={{ width: "100%" }}
						loading={taskTypeLoading}
						allowClear
						showSearch
						placeholder='Select task type'>
						{taskTypeList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.taskTypeName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label='Task Priority'
					name='taskPriorityId'
					tooltip='This is a required field'
					rules={[{ required: true, message: "Task priority is Required." }]}>
					<Select
						style={{ width: "100%" }}
						loading={taskPriorityLoading}
						allowClear
						showSearch
						placeholder='Select task priority'>
						{taskPriorityList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.taskPriorityName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label='Task status'
					name='taskStatusId'
					tooltip='This is a required field'
					rules={[{ required: true, message: "Task status is Required." }]}>
					<Select
						style={{ width: "100%" }}
						loading={taskStatusLoading}
						allowClear
						showSearch
						placeholder='Select task status'>
						{taskStatusList?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.taskStatusName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label='Due Date'
					name='dueDate'
					tooltip='This is a required field'
					rules={[{ required: true, message: "Due date is Required." }]}>
					<DatePicker placeholder='Select Due Date' />
				</Form.Item>
				<Form.Item label='Notes' name='notes'>
					<Input placeholder='notes' />
				</Form.Item>

				<div className='w-[726.4px]'>
					<Form.Item label=''>
						<div className='flex items-center gap-2'>
							<Button
								size={"large"}
								htmlType='submit'
								type='primary'
								loading={taskLoading}>
								Create
							</Button>
							<Button size={"large"} type='danger' onClick={onCancel}>
								Cancel
							</Button>
						</div>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
}
