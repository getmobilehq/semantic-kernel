import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "./account.css";

import { Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAccount } from "../../redux/rtk/features/account/accountSlice";
import ViewBtn from "../Buttons/ViewBtn";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import AddAccount from "./AddAccount";

//Date fucntinalities
let startdate = dayjs(new Date()).format("YYYY-MM-DD");
let enddate = dayjs(new Date()).add(1, "day").format("YYYY-MM-DD");

function CustomTable({ list, total, loading }) {
	const dispatch = useDispatch();
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`/admin/account/${id}`}>{id}</Link>,
		},

		{
			id: 2,
			title: "Account",
			dataIndex: "name",
			key: "name",
		},

		{
			id: 3,
			title: "Account Type ",
			dataIndex: "account",
			key: "account",
			render: (account) => account?.name,
			responsive: ["md"],
		},
		{
			id: 4,
			title: "Action",
			key: "action",
			render: ({ id }) => (
				<UserPrivateComponent permission={"readSingle-account"}>
					<ViewBtn path={`/admin/setup/account/${id}`} />
				</UserPrivateComponent>
			),
		},
	];

	useEffect(() => {
		// setColumnItems(menuItems);
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	const CSVlist = list?.map((i) => ({
		...i,
		account: i?.account?.name,
	}));

	return (
		<Card>
			<div className='flex justify-between'>
				<h5 className=' text-2xl'>
					<span className='ml-4'>Accounts List</span>
				</h5>
				<UserPrivateComponent permission='create-account'>
					<BigDrawer btnTitle={"Add Account"} title={"Account"}>
						<AddAccount />
					</BigDrawer>
				</UserPrivateComponent>
			</div>
			<div className='flex items-center gap-3 my-5 '>
				{list && (
					<div className=' ml-5 '>
						<ColVisibilityDropdown
							options={columns}
							columns={columns}
							columnsToShowHandler={columnsToShowHandler}
						/>
					</div>
				)}
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink data={CSVlist} filename='accounts'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
					</div>
				)}
			</div>

			<Table
				scroll={{ x: true }}
				loading={loading}
				pagination={{
					defaultPageSize: 20,
					pageSizeOptions: [10, 20, 50, 100, 200],
					showSizeChanger: true,

					onChange: (page, limit) => {
						dispatch(loadAllAccount());
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</Card>
	);
}

const GetAllAccount = (props) => {
	const dispatch = useDispatch();
	const { list, loading } = useSelector((state) => state.accounts);

	useEffect(() => {
		dispatch(loadAllAccount());
	}, []);

	return (
		<CustomTable
			list={list}
			startdate={startdate}
			enddate={enddate}
			loading={loading}
		/>
	);
};

export default GetAllAccount;
