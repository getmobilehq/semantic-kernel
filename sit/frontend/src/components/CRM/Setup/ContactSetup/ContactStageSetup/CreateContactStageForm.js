import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  loadAllContactStage,
  addSingleContactStage,
  updateContactStage
} from "../../../../../redux/rtk/features/crm/ContactStage/contactStageSlice";

export default function CreateContactStageForm({ onClose, edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {

    const resp = await dispatch(
      edit?.id
        ? updateContactStage({ id: edit?.id, values })
        : addSingleContactStage(values)
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllContactStage());
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
          label='Contact Stage Name'
          name='contactStageName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "Product Name is Required." }]}
        >
          <Input placeholder='Contact stage name' />
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
