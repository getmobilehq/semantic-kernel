import { Drawer } from "antd";
import CreateOpportunityTypeForm from "./CreateOpportunityTypeForm";

export default function CreateOpportunityType({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Contact type'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateOpportunityTypeForm onClose={onClose} />
    </Drawer>
  );
}
