import { Drawer } from "antd";
import CreateOpportunitySourceForm from "./CreateOpportunitySourceForm";

export default function CreateOpportunitySource({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Opportunity Source'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateOpportunitySourceForm onClose={onClose} />
    </Drawer>
  );
}
