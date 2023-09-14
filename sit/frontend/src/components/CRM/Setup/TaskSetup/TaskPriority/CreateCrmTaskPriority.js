import { Drawer } from "antd";
import CreateCrmTaskPriorityForm from "./CreateCrmTaskPriorityForm";

export default function CreateCrmTaskPriority({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Task Priority'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateCrmTaskPriorityForm onClose={onClose} />
    </Drawer>
  );
}
