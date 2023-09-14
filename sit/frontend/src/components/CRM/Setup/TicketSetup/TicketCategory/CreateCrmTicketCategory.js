import { Drawer } from "antd";
import CreateCrmTicketCategoryForm from "./CreateCrmTicketCategoryForm";

export default function CreateCrmTicketCategory({ open, onClose }) {
	return (
		<Drawer
			width={450}
			title='Create Ticket Category'
			placement='right'
			onClose={onClose}
			open={open}>
			<CreateCrmTicketCategoryForm onClose={onClose} />
		</Drawer>
	);
}
