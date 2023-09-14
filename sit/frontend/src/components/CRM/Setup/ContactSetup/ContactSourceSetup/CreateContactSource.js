import { Drawer } from "antd";
import CreateContactSourceForm from "./CreateContactSourceForm";

export default function CreateContactSource({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Contact Source'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateContactSourceForm onClose={onClose} />
    </Drawer>
  );
}
