import { Drawer } from "antd";
import CreateCrmTaskStatusForm from "./CreateCrmTaskStatusForm";

export default function CreateCrmTaskStatus({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Task Status'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateCrmTaskStatusForm onClose={onClose} />
    </Drawer>
  );
}
