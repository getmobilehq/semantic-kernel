import { Drawer } from "antd";
import CreateProductForm from "./CreateProductForm";

export default function CreateProduct({ open, onClose }) {
  return (
    <Drawer
      width={450}
      title='Create Product'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <CreateProductForm onClose={onClose} />
    </Drawer>
  );
}
