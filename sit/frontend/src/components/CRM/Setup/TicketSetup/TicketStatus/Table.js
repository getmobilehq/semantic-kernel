import { Card, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import ColVisibilityDropdown from "../../../../Shared/ColVisibilityDropdown";
import {
	deleteTicketStatus,
	loadAllTicketStatus,
} from "../../../../../redux/rtk/features/crm/ticketStatus/ticketStatusSlice";
import CustomDrawer from "../../../CommonUi/CustomDrawer";
import CreateCrmTicketStatusForm from "./CreateCrmTicketStatusForm";

const TableComponent = () => {
	const dispatch = useDispatch();
	const { list: crmTicketStatusList, loading } = useSelector(
		(state) => state.ticketStatus
	);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const onSelectChange = (newSelectedRowKeys) => {

		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;

	useEffect(() => {
		dispatch(loadAllTicketStatus());
	}, [dispatch]);

	const deleteHandler = async (id) => {
		const resp = await dispatch(deleteTicketStatus(id));
		if (resp.payload.message === "success") {
			dispatch(loadAllTicketStatus());
		}
	};

	const columns = [
		{
			title: "NAME",
			dataIndex: "ticketStatusName",
		},
		{
			title: "CREATE DATE",
			dataIndex: "createdAt",
			render: (date) => moment(date).format("MMMM Do YYYY"),
		},
		{
			title: "UPDATE DATE",
			dataIndex: "updatedAt",
			render: (date) => moment(date).format("MMMM Do YYYY"),
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (id, values) => (
				<span className='flex items-cupdate-contactSourceenter gap-2'>
					<CustomDrawer
						permission={"update-ticketStatus"}
						update
						title={"Update Ticket Status"}
						width={25}
					>
						<CreateCrmTicketStatusForm edit={{ id, values }} />
					</CustomDrawer >
					<span
						onClick={() => deleteHandler(id)}
						className='bg-red-700 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded'
					>
						<AiFillDelete className='text-white' />
					</span>
				</span>
			),
		},
	];

	// column select
	const [columnsToShow, setColumnsToShow] = useState([]);
	useEffect(() => {
		setColumnsToShow(columns);
	}, []);
	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};
	return (
		<Card className='border mt-2'>
			<div className='flex justify-between items-center'>
				<div></div>
				<div className='flex items-center gap-2'>
					<span className='border px-2 py-1 rounded cursor-pointer bg-black text-white'>
						<CSVLink
							data={crmTicketStatusList}
							className='btn btn-dark btn-sm'
							style={{ marginTop: "5px" }}
							filename='CRM-Ticket-Status_CRM-OS'>
							Download CSV
						</CSVLink>
					</span>
					<ColVisibilityDropdown
						options={columns}
						columns={columns}
						columnsToShowHandler={columnsToShowHandler}
					/>
				</div>
			</div>
			<div>
				<span
					style={{
						marginLeft: 8,
					}}>
					{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
				</span>
			</div>
			<Table
				loading={loading}
				rowSelection={rowSelection}
				columns={columnsToShow}
				dataSource={crmTicketStatusList?.map((item) => ({
					...item,
					key: item.id,
				}))}
				pagination={false}
				scroll={{ x: 500 }}
			/>
		</Card>
	);
};
export default TableComponent;
