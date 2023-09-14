import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	deleteManyTask,
	loadAllTaskPaginated,
} from "../../../redux/rtk/features/crm/task/crmTaskSlice";
import ViewBtn from "../../Buttons/ViewBtn";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateDrawer from "../CommonUi/CreateDrawer";
import CrmSearch from "../CommonUi/CrmSearch";
import TableComponent from "../CommonUi/TableComponent";
import CreateTaskForm from "./CreateTaskForm";

const columns = [
	{
		title: "Name",
		key: "Name",
		render: ({ taskName, id }) =>
			id ? <Link to={`/admin/task/${id}`}>{taskName}</Link> : "-",
		sorter: (a, b) => a.taskName.localeCompare(b.taskName),
	},
	{
		title: "Priority",
		dataIndex: "taskPriority",
		render: (taskPriority) => taskPriority.taskPriorityName,
	},
	{
		title: "Status",
		dataIndex: "taskStatus",
		render: (taskStatus) => `${taskStatus?.taskStatusName}`,
	},
	{
		title: "Type",
		dataIndex: "taskType",
		render: (taskType) => `${taskType?.taskTypeName}`,
	},
	{
		title: "Assignee",
		dataIndex: "assignee",
		render: (assignee, item) => (
			<Link to={`/admin/setup/staffs/${item?.assigneeId}`}>
				{assignee?.firstName} {assignee?.lastName}
			</Link>
		),
	},

	{
		title: "Create date",
		dataIndex: "createdAt",
		render: (date) => moment(date).format("MMMM Do YYYY"),
	},
	{
		title: "Action",
		dataIndex: "id",
		key: "action",
		render: (id) => (
			<div className='flex justify-start'>
				<ViewBtn path={`/admin/task/${id}`} />
			</div>
		),
	},
];

const Tasks = () => {
	const dispatch = useDispatch();
	// Drawer state
	const [open, setOpen] = useState(false);
	const onClose = () => {
		setOpen(false);
	};
	// filter
	const [isFilter, setFilter] = useState(false);
	const filterToggle = () => {
		setFilter((prev) => !prev);
	};
	const { list, loading, total } = useSelector((state) => state.crmTask);

	useEffect(() => {
		dispatch(loadAllTaskPaginated({ status: true, page: 1, count: 10 }));
	}, [dispatch]);
	return (
		<div className='container'>
			<div className='bg-white dark:bg-DTableBg flex flex-col md:flex-row justify-between items-center gap-3 p-3 px-6 border'>
				<div className='flex justify-end items-center gap-5'>
					<button
						onClick={filterToggle}
						className={`hidden md:block ${
							isFilter ? "bg-transparent border border-red-600" : "bg-blue-500"
						}  px-5 py-2 rounded cursor-pointer`}
						type='submit'>
						{isFilter ? (
							<span className='flex justify-center dark:text-white items-center gap-2'>
								<AiOutlineClose /> Close
							</span>
						) : (
							<span className='text-white'>Filter</span>
						)}
					</button>
					{!isFilter ? (
						<CrmSearch paginatedThunk={loadAllTaskPaginated} />
					) : (
						<div className='flex text-md'>
							{/* <Form
                className='flex flex-wrap justify-center gap-2 md:items-center'
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout='inline'
                initialValues={{
                  status: ["true"],
                }}
              >
                <Form.Item name='quoteOwner' className='w-full md:w-[180px]'>
                  <Select
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder='Select Owner'
                    maxTagCount={0}
                    maxTagPlaceholder={<div className='w-[150px]'>Owner</div>}
                  >
                    {quoteOwner?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item?.firstName} {item?.lastName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name='quoteStage' className='w-full md:w-[180px]'>
                  <Select
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder='Select Stage'
                    maxTagCount={0}
                    maxTagPlaceholder={<div className='w-[150px]'>Stage</div>}
                  >
                    {quoteStage?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.quoteStageName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name='contact' className='w-full md:w-[180px]'>
                  <Select
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder='Select contact'
                    maxTagCount={0}
                    maxTagPlaceholder={<div className='w-[150px]'>Contact</div>}
                  >
                    {contact?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item?.firstName} {item?.lastName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name='company' className='w-full md:w-[180px]'>
                  <Select
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder='Select Company'
                    maxTagCount={0}
                    maxTagPlaceholder={<div className='w-[150px]'>Company</div>}
                  >
                    {company?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.companyName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name='opportunity' className='w-full md:w-[180px]'>
                  <Select
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder='Select Opportunity'
                    maxTagCount={0}
                    maxTagPlaceholder={
                      <div className='w-[150px]'>Opportunity</div>
                    }
                  >
                    {opportunity?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.opportunityName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name='status' className='w-full md:w-[180px]'>
                  <Select
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder='Please select'
                    defaultValue={["true"]}
                  >
                    <Option value='true'>True</Option>
                    <Option value='false'>False</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <div className='w-full md:w-[180px] flex justify-start'>
                  <button
                    className='bg-blue-500 text-white px-5 py-2 rounded cursor-pointer'
                    type='submit'
                  >
                    Filter
                  </button>
                  <button
                    onClick={filterToggle}
                    className='block md:hidden  px-5 py-2 rounded cursor-pointer ml-2 text-rose-700 transition-colors duration-150 border border-rose-500 focus:shadow-outline hover:bg-rose-500 hover:text-rose-100'
                  >
                    Cancel
                  </button>
                </div>
                </Form.Item>
              </Form> */}
						</div>
					)}
				</div>
				{!isFilter && (
					<UserPrivateComponent permission='create-quote'>
						<button
							onClick={() => setOpen(true)}
							className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'>
							<AiOutlinePlus /> Create Task
						</button>
					</UserPrivateComponent>
				)}
			</div>
			<UserPrivateComponent permission='readAll-crmTask'>
				<TableComponent
					list={list}
					total={total}
					loading={loading}
					columns={columns}
					paginatedThunk={loadAllTaskPaginated}
					deleteManyThunk={deleteManyTask}
					csvFileName={"Task-List"}
				/>
			</UserPrivateComponent>

			<UserPrivateComponent permission='create-crmTask'>
				<CreateDrawer onClose={onClose} open={open} title={"Task"}>
					<CreateTaskForm onClose={onClose} open={open} />
				</CreateDrawer>
			</UserPrivateComponent>
		</div>
	);
};
export default Tasks;
