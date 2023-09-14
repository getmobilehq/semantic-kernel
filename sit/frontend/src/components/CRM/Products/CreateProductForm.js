import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  addSingleProduct,
  loadAllProduct,
  updateProduct,
} from "../../../redux/rtk/features/crm/product/productSlice";

export default function CreateProductForm({ onClose, edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id
        ? updateProduct({ id: edit?.id, values })
        : addSingleProduct(values)
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllProduct());
      if (!edit?.id) {
        onClose();
        form.resetFields();
      }
    }
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='flex justify-center mt-5'>
      <Form
        className='w-4/5'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        colon={false}
        layout='vertical'
        initialValues={edit?.id ? { ...edit?.values } : {}}
        form={form}
      >
        <Form.Item
          style={{ width: "350px" }}
          label='Product Name'
          name='productName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "Product Name is Required." }]}
        >
          <Input placeholder='Product Name' />
        </Form.Item>

        <Form.Item label=''>
          <div className='flex items-center gap-2'>
            <Button size={"large"} htmlType='submit' type='primary'>
              {edit?.id ? "Update" : "Create"}
            </Button>
            {!edit?.id && (
              <Button
                size={"large"}
                htmlType='submit'
                type='danger'
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
