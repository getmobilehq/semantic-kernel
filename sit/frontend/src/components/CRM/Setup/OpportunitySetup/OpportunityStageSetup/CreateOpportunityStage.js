import { Drawer } from "antd";
import CreateOpportunityStageForm from "./CreateOpportunityStageForm";

export default function CreateOpportunityStage({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Contact Stage'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateOpportunityStageForm onClose={onClose} />
    </Drawer>
  );
}
