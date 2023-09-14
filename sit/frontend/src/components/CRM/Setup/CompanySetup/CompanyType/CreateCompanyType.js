import { Drawer } from "antd";
import CreateCompanyTypeForm from "./CreateCompanyTypeForm";

export default function CreateCompanyType({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Company Type'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateCompanyTypeForm onClose={onClose} />
    </Drawer>
  );
}
