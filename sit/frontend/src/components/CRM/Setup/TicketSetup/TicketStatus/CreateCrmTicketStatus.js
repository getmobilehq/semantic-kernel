import { Drawer } from "antd";
import CreateCrmTicketStatusForm from "./CreateCrmTicketStatusForm";

export default function CreateCrmTicketStatus({ open, onClose }) {
	return (
		<Drawer
			width={450}
			title='Create Task Status'
			placement='right'
			onClose={onClose}
			open={open}>
			<CreateCrmTicketStatusForm onClose={onClose} />
		</Drawer>
	);
}
