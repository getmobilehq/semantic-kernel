import { Popconfirm } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function RemoveImage({ id, loadThunk, updateThunk }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const update = await dispatch(
        updateThunk({ id, values: { image: null } })
      );
      if (update?.payload?.data) {
        setOpen(false);
        setConfirmLoading(false);
        dispatch(loadThunk(id));
      }
    } catch (err) { }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Popconfirm
      title='You are going to delete image. Are you sure?'
      open={open}
      onConfirm={handleOk}
      okButtonProps={{
        loading: confirmLoading,
      }}
      onCancel={handleCancel}
    >
      <button onClick={showPopconfirm}>Remove Image</button>
    </Popconfirm>
  );
}
