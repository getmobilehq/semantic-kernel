import { Button, Card, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateQuoteForm from "../Quotes/CreateQuoteForm";
import CreateDrawer from "./CreateDrawer";

export default function Quotes({ data, loading, name, singleLoadThunk }) {
	// Drawer state
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	const columns = [
		{
			title: "Name",
			key: "quoteName",
			render: ({ quoteName, id }) =>
				id ? <Link to={`/admin/quote/${id}`}>{quoteName}</Link> : "-",
			sorter: (a, b) => a.quoteName.localeCompare(b.quoteName),
		},
		{
			title: "Owner",
			dataIndex: "quoteOwner",
			render: (quoteOwner, item) => (
				<Link to={`/admin/setup/staffs/${item?.quoteOwnerId}`}>
					{quoteOwner?.firstName} {quoteOwner?.lastName}
				</Link>
			),
		},
		{
			title: "Quotation Date",
			dataIndex: "quotationDate",
			render: (date) => moment(date).format("MMMM Do YYYY"),
		},
		{
			title: "Expiration Date",
			dataIndex: "expirationDate",
			render: (date) => moment(date).format("MMMM Do YYYY"),
		},
		{
			title: "Total Amount",
			dataIndex: "totalAmount",
			key: "totalAmount",
			render: (total) => (total ? total : "-"),
		},

		{
			title: "Create Date",
			dataIndex: "createdAt",
			render: (date) => moment(date).format("MMMM Do YYYY"),
		},
	];

	return (
		<Card
			title={<span className='font-bold'>Quotes</span>}
			bodyStyle={{ padding: 0 }}
			extra={
				<UserPrivateComponent permission='create-quote'>
					<Button
						onClick={() => setOpen(true)}
						className='flex items-center'
						icon={<BiPlus />}>
						Add
					</Button>
				</UserPrivateComponent>
			}>
			<div>
				<UserPrivateComponent permission='readAll-quote'>
					<Table
						bordered
						columns={columns}
						loading={loading}
						dataSource={data ? data.quote : []}
						pagination={{ hideOnSinglePage: true }}
						scroll={{ x: 800, y: 500 }}
					/>
				</UserPrivateComponent>
			</div>

			<UserPrivateComponent permission='create-quote'>
				<CreateDrawer onClose={onClose} open={open} title={"Quote"}>
					<CreateQuoteForm
						onClose={onClose}
						open={open}
						createAs={{ name, value: data?.id, singleLoadThunk }}
					/>
				</CreateDrawer>
			</UserPrivateComponent>
		</Card>
	);
}
