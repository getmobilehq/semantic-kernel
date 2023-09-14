import { Drawer } from "antd";
import CreateContactStageForm from "./CreateContactStageForm";

export default function CreateContactStage({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Contact Stage'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateContactStageForm onClose={onClose} />
    </Drawer>
  );
}
