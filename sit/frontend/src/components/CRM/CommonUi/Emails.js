import { Button, Card, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateEmailForm from "../Email/CreateEmailForm";
import SingleEmail from "../Email/SingleEmail";
import CreateDrawer from "./CreateDrawer";

export default function Emails({ ref, data, loading, name, singleLoadThunk }) {
	// Drawer state
	const [open, setOpen] = useState(false);
	const [singleEmail, setSingleEmail] = useState();
	const onClose = () => {
		setOpen(false);
	};

	const columns = [
		{
			title: "Subject",
			key: "Subject",
			render: (email) =>
				email ? (
					<div className='cursor-pointer' onClick={() => setSingleEmail(email)}>
						{email.subject?.length > 20
							? email.subject.slice(0, 20)
							: email.subject}
					</div>
				) : (
					"-"
				),
			sorter: (a, b) => a.subject.localeCompare(b.subject),
		},
		{
			title: "Owner",
			dataIndex: "emailOwner",
			key: "owner",
			render: (emailOwner, item) => (
				<Link to={`/admin/setup/staffs/${item?.emailOwnerId}`}>
					{emailOwner?.firstName} {emailOwner?.lastName}
				</Link>
			),
		},
		{
			title: "Status",
			key: "emailStatus",
			dataIndex: "emailStatus",
			render: (emailStatus) => <span className='text-green-600'>Sent</span>,
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
			title={<span className='font-bold'>Emails</span>}
			bodyStyle={{ padding: 0 }}
			extra={
				<UserPrivateComponent permission='create-email'>
					<Button
						onClick={() => setOpen(true)}
						className='flex items-center'
						icon={<BiPlus />}>
						Add
					</Button>
				</UserPrivateComponent>
			}>
			<div>
				<UserPrivateComponent permission='readAll-email'>
					<Table
						bordered
						columns={columns}
						loading={loading}
						dataSource={data ? data.crmEmail : []}
						pagination={{ hideOnSinglePage: true }}
						scroll={{ x: 800, y: 300 }}
					/>
				</UserPrivateComponent>
			</div>

			<UserPrivateComponent permission='create-email'>
				<CreateDrawer onClose={onClose} open={open} title={"Email"}>
					<CreateEmailForm
						onClose={onClose}
						open={open}
						createAs={{ name, value: data?.id, singleLoadThunk }}
					/>
				</CreateDrawer>
			</UserPrivateComponent>
			<UserPrivateComponent permission={"readSingle-email"}>
				<SingleEmail email={singleEmail} setSingleEmail={setSingleEmail} />
			</UserPrivateComponent>
		</Card>
	);
}
