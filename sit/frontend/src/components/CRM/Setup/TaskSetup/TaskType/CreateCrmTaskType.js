import { Drawer } from "antd";
import CreateCrmTaskTypeForm from "./CreateCrmTaskTypeForm";

export default function CreateCrmTaskType({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Task Type'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateCrmTaskTypeForm onClose={onClose} />
    </Drawer>
  );
}
