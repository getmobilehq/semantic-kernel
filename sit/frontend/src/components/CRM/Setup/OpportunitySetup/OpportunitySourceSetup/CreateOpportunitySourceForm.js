import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  addSingleOpportunitySource,
  loadAllOpportunitySource,
  updateOpportunitySource
} from "../../../../../redux/rtk/features/crm/opportunitySource/opportunitySourceSlice";

export default function CreateOpportunitySourceForm({ onClose, edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(edit?.id
      ? updateOpportunitySource({ id: edit?.id, values })
      : addSingleOpportunitySource(values)
    );
    if (resp.payload.message === "success") {
      
      dispatch(loadAllOpportunitySource());
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
          label='Opportunity Source Name'
          name='opportunitySourceName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "Filed Required." }]}
        >
          <Input placeholder='Opportunity Source name' />
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
