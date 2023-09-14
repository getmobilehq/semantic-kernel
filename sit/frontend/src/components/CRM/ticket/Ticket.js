import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Form, Select, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiOutlineClose } from "react-icons/ai";
import {
	loadAllTicketByCustomerId,
	loadAllTicketPaginated,
} from "../../../redux/rtk/features/crm/ticket/ticketSlice";
import { loadAllTicketStatus } from "../../../redux/rtk/features/crm/ticketStatus/ticketStatusSlice";
import getRoleFromToken from "../../../utils/getRoleFromToken";
import getUserFromToken from "../../../utils/getUserFromToken";
import ViewBtn from "../../Buttons/ViewBtn";
import CrmSearch from "../CommonUi/CrmSearch";
import CreateBtn from "./CreateBtn";
import TableComponent from "./TableComponent";
dayjs.extend(relativeTime);

const columns = [
	{
		title: "ID",
		key: "ticketId",
		dataIndex: "ticketId",
		render: (ticketId) =>
			ticketId ? (
				<Link to={`/support/ticket/${ticketId}`}>{ticketId}</Link>
			) : (
				"-"
			),
	},
	{
		title: "Subject",
		key: "subject",
		dataIndex: "subject",
	},
	{
		title: "Category",
		key: "ticketCategory",
		dataIndex: "ticketCategory",
		render: (ticketCategory) => (
			<Tag color='blue'>{ticketCategory?.ticketCategoryName}</Tag>
		),
	},
	{
		title: "Status",
		dataIndex: "ticketStatus",
		key: "ticketStatus",
		render: (ticketStatus) => (
			<Tag color='red'>{ticketStatus?.ticketStatusName}</Tag>
		),
	},
	{
		title: "Priority",
		key: " ticketPriority",
		dataIndex: "ticketPriority",
		render: (ticketPriority) => (
			<Tag color='green'>{ticketPriority?.ticketPriorityName}</Tag>
		),
	},

	{
		title: "Resolve Time",
		key: "resolveTime",
		dataIndex: "ticketResolveTime",
		render: (ticketResolveTime) => {
			// in resolve time we have minutes so we need to convert it to hours and minutes

			return (
				// if hours is 0 then we will show only minutes
				<Tooltip title={"Resolve Time"}>
					{Math.floor(ticketResolveTime / 60) + ":" + (ticketResolveTime % 60)}
				</Tooltip>
			);
		},
	},
	{
		title: "Action",
		dataIndex: "ticketId",
		key: "action",
		render: (ticketId) => (
			<div className='flex justify-start'>
				<ViewBtn path={`/support/ticket/${ticketId}`} />
			</div>
		),
	},
];

const Ticket = () => {
	const dispatch = useDispatch();
	// filter
	const [isFilter, setFilter] = useState(false);
	const { Option } = Select;
	const filterToggle = () => {
		setFilter((prev) => !prev);
	};
	const {
		list: ticketList,
		loading,
		total,
	} = useSelector((state) => state.ticket);
	const { list: crmTicketStatusList } = useSelector(
		(state) => state.ticketStatus
	);

	const customerId = getUserFromToken() || null;
	const role = getRoleFromToken();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		if (role === "customer") {
			dispatch(
				loadAllTicketByCustomerId({ id: customerId, arg: { ...values } })
			);
		} else {
			dispatch(
				loadAllTicketPaginated({
					...values,
				})
			);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	useEffect(() => {
		if (role === "customer") {
			dispatch(
				loadAllTicketByCustomerId({ id: customerId, arg: { query: "all" } })
			);
			dispatch(loadAllTicketStatus());
		} else {
			dispatch(loadAllTicketPaginated({ query: "all" }));
			dispatch(loadAllTicketStatus());
		}
	}, [customerId, dispatch, role]);

	return (
		<div className='container'>
			<div className='flex justify-center items-center mt-5 mb-8'>
				<Link to='/support/ticket/create'>
					<CreateBtn />
				</Link>
			</div>
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
						<CrmSearch paginatedThunk={loadAllTicketPaginated} />
					) : (
						<div className='flex text-md'>
							<Form
								className='flex flex-wrap justify-center gap-2 md:items-center'
								form={form}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								layout='inline'>
								<Form.Item name='ticketStatus' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Ticket Status'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={
											<div className='w-[150px]'>Ticket Status</div>
										}>
										{crmTicketStatusList?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.ticketStatusName}
											</Option>
										))}
									</Select>
								</Form.Item>

								<div className='min-w-[180px] flex justify-start'>
									<button
										className='bg-blue-500 text-white px-5 py-2 rounded cursor-pointer'
										type='submit'>
										Filter
									</button>
									<button
										onClick={filterToggle}
										className='block md:hidden  px-5 py-2 rounded cursor-pointer ml-2 text-rose-700 transition-colors duration-150 border border-rose-500 focus:shadow-outline hover:bg-rose-500 hover:text-rose-100'>
										Cancel
									</button>
								</div>
							</Form>
						</div>
					)}
				</div>
			</div>

			<TableComponent
				total={total}
				role={role}
				customerId={customerId}
				paginatedThunk={loadAllTicketPaginated}
				columns={columns}
				list={ticketList}
				loading={loading}
				csvFileName={"Contact-List"}
			/>
		</div>
	);
};
export default Ticket;
