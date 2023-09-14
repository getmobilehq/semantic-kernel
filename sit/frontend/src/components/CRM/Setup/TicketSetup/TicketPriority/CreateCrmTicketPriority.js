import { Drawer } from "antd";
import CreateCrmTicketPriorityForm from "./CreateCrmTicketPriorityForm";

export default function CreateCrmTicketPriority({ open, onClose }) {
	return (
		<Drawer
			width={450}
			title='Create Ticket Priority'
			placement='right'
			onClose={onClose}
			open={open}>
			<CreateCrmTicketPriorityForm onClose={onClose} />
		</Drawer>
	);
}
