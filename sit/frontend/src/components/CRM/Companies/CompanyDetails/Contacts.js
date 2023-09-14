import { Button, Card, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

import UserPrivateComponent from "../../../PrivateRoutes/UserPrivateComponent";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import CreateContactForm from "./../../Contacts/CreateContactForm";

export default function Contacts({ data, loading, name, singleLoadThunk }) {
	// Drawer state
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	const columns = [
		{
			title: "Name",
			key: "name",
			render: ({ firstName, lastName, id }) =>
				id ? (
					<Link to={`/admin/contact/${id}`}>
						{firstName} {lastName}
					</Link>
				) : (
					"-"
				),
			sorter: (a, b) => a.firstName.localeCompare(b.firstName),
		},
		{
			title: "Email",
			key: "email",
			dataIndex: "email",
		},
		{
			title: "Phone number",
			key: "phone",
			dataIndex: "phone",
		},
		{
			title: "Owner",
			dataIndex: "contactOwner",
			key: "owner",
			render: (contactOwner, item) => (
				<Link to={`/admin/setup/staffs/${item?.contactOwnerId}`}>
					{contactOwner?.firstName} {contactOwner?.lastName}
				</Link>
			),
		},

		{
			title: "Create date",
			key: "Create date",
			dataIndex: "createdAt",
			render: (date) => moment(date).format("MMMM Do YYYY"),
		},
	];

	return (
		<Card
			title={<span className='font-bold'>Contacts</span>}
			bodyStyle={{ padding: 0 }}
			extra={
				<UserPrivateComponent permission='create-contact'>
					<Button
						onClick={() => setOpen(true)}
						className='flex items-center'
						icon={<BiPlus />}>
						Add
					</Button>
				</UserPrivateComponent>
			}>
			<div>
				<UserPrivateComponent permission='readAll-contact'>
					<Table
						bordered
						columns={columns}
						loading={loading}
						dataSource={data ? data.contact : []}
						pagination={{ hideOnSinglePage: true }}
						scroll={{ x: 800, y: 300 }}
					/>
				</UserPrivateComponent>
			</div>

			<UserPrivateComponent permission='create-contact'>
				<CreateDrawer onClose={onClose} open={open} title={"Contact"}>
					<CreateContactForm
						onClose={onClose}
						open={open}
						createAs={{ name, value: data?.id, singleLoadThunk }}
					/>
				</CreateDrawer>
			</UserPrivateComponent>
		</Card>
	);
}
