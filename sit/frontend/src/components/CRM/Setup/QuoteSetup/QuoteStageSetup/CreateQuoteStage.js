import { Drawer } from "antd";
import CreateQuoteStageForm from "./CreateQuoteStageForm";

export default function CreateQuoteStage({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Quote Stage'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateQuoteStageForm onClose={onClose} />
    </Drawer>
  );
}
