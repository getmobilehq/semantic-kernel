import { Drawer } from "antd";

export default function CreateDrawer({
  open,
  onClose,
  title,
  width,
  children,
}) {
  return (
    <>
      <Drawer
        width={window.innerWidth <= 768 ? "100%" : width ? `${width}%` : "45%"}
        title={`Create ${title}`}
        placement='right'
        onClose={onClose}
        open={open}
      >
        {children}
      </Drawer>
    </>
  );
}
