import { Button, Card, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateAttachmentForm from "../Attachment/CreateAttachmentForm";
import CreateDrawer from "./CreateDrawer";
import getImageUrl from "../../../utils/getimageUrl";

export default function Attachments({ data, loading, name, singleLoadThunk }) {
	// Drawer state
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	const columns = [
		{
			title: "Name",
			key: "attachmentName",
			render: ({ attachmentName, attachmentPath }) =>
				attachmentName ? (
					<Link target='_blank' to={`${getImageUrl(attachmentPath)}`}>
						{attachmentName}
					</Link>
				) : (
					"-"
				),
			sorter: (a, b) => a.attachmentName.localeCompare(b.attachmentName),
		},

		{
			title: "Owner",
			dataIndex: "attachmentOwner",
			key: "owner",
			render: (attachmentOwner, item) => (
				<Link to={`/admin/setup/staffs/${item?.noteOwnerId}`}>
					{attachmentOwner?.fullName}
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
			title={<span className='font-bold'>Attachments</span>}
			bodyStyle={{ padding: 0 }}
			extra={
				<UserPrivateComponent permission='create-attachment'>
					<Button
						onClick={() => setOpen(true)}
						className='flex items-center'
						icon={<BiPlus />}>
						Add
					</Button>
				</UserPrivateComponent>
			}>
			<div>
				<UserPrivateComponent permission='readAll-attachment'>
					<Table
						bordered
						columns={columns}
						loading={loading}
						dataSource={data ? data.attachment : []}
						pagination={{ hideOnSinglePage: true }}
						scroll={{ x: 800, y: 300 }}
					/>
				</UserPrivateComponent>
			</div>

			<UserPrivateComponent permission='create-attachment'>
				<CreateDrawer onClose={onClose} open={open} title={"Attachment"}>
					<CreateAttachmentForm
						onClose={onClose}
						open={open}
						createAs={{ name, value: data?.id, singleLoadThunk }}
					/>
				</CreateDrawer>
			</UserPrivateComponent>
		</Card>
	);
}
