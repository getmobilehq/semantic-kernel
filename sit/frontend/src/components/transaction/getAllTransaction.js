import { Card, DatePicker, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllTransaction } from "../../redux/rtk/features/transaction/transactionSlice";
import CreateDrawer from "../CRM/CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import AddTransaction from "./AddTransaction";
import "./transaction.css";
import moment from "moment";

//Date functionalities
let startdate = moment().startOf("month");
let enddate = moment().endOf("month");

function CustomTable({ list, total, loading }) {
	const dispatch = useDispatch();
	//drawer state
	const [open, setOpen] = useState(false);
	const onClose = () => {
		setOpen(false);
	};
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
		},
		{
			id: 2,
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => dayjs(date).format("DD/MM/YYYY"),
		},

		{
			id: 3,
			title: "Debit Account",
			dataIndex: "debit",
			key: "debit",
			render: (debit) => debit?.name,
		},

		{
			id: 4,
			title: "Credit Account",
			dataIndex: "credit",
			key: "credit",
			render: (credit) => credit?.name,
		},

		{
			id: 5,
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			responsive: ["md"],
		},
		{
			id: 6,
			title: "Particulars",
			dataIndex: "particulars",
			key: "particulars",
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	const CSVlist = list?.map((i) => ({
		...i,
		debit: i?.debit?.name,
		credit: i?.credit?.name,
	}));

	return (
		<div>
			<div className='flex justify-between my-4'>
				{list && (
					<div className='flex gap-3'>
						<div>
							<ColVisibilityDropdown
								options={columns}
								columns={columns}
								columnsToShowHandler={columnsToShowHandler}
							/>
						</div>

						<CsvLinkBtn>
							<CSVLink
								data={CSVlist}
								filename='transaction'
								className='btn btn-dark btn-sm mb-1'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
					</div>
				)}
				<button
					onClick={() => setOpen(true)}
					className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'>
					<AiOutlinePlus /> Add Transaction
				</button>
			</div>
			<Table
				scroll={{ x: true }}
				loading={loading}
				pagination={{
					defaultPageSize: 20,
					pageSizeOptions: [10, 20, 50, 100, 200],
					showSizeChanger: true,
					total: total ? total : 0,

					onChange: (page, limit) => {
						dispatch(loadAllTransaction({ page, limit, startdate, enddate }));
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
			<CreateDrawer
				open={open}
				onClose={onClose}
				title={"Transaction"}
				width={40}>
				<AddTransaction />
			</CreateDrawer>
		</div>
	);
}

const GetAllTransaction = (props) => {
	const dispatch = useDispatch();
	const { list, loading } = useSelector((state) => state.transactions);

	const total = useSelector((state) => state.transactions.total);

	const { RangePicker } = DatePicker;

	useEffect(() => {
		dispatch(
			loadAllTransaction({
				page: 1,
				limit: 10,
				startdate: startdate.format("YYYY-MM-DD"),
				enddate: enddate.format("YYYY-MM-DD"),
			})
		);
	}, []);

	const onCalendarChange = (dates) => {
		startdate = (dates?.[0]).format("YYYY-MM-DD");
		enddate = (dates?.[1]).format("YYYY-MM-DD");
		dispatch(
			loadAllTransaction({
				page: 1,
				limit: 20,
				startdate: startdate,
				enddate: enddate,
			})
		);
	};

	return (
		<UserPrivateComponent permission={"readAll-transaction"}>
			<Card className=''>
				<div className='card-title  flex  justify-between mr-4'>
					<h5 className='text-xl txt-color-2'>
						<span>Transaction History</span>
					</h5>
					<div>
						<RangePicker
							className='range-picker'
							onCalendarChange={onCalendarChange}
							defaultValue={[startdate, enddate]}
						/>
					</div>
				</div>

				<CustomTable
					list={list ? list : []}
					loading={loading}
					total={total?._count?.id}
					startdate={startdate}
					enddate={enddate}
				/>
			</Card>
		</UserPrivateComponent>
	);
};

export default GetAllTransaction;
