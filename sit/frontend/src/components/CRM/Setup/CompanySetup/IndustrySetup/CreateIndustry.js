import { Drawer } from "antd";
import CreateIndustryForm from "./CreateIndustryForm";

export default function CreateIndustry({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Industry'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateIndustryForm onClose={onClose} />
    </Drawer>
  );
}
