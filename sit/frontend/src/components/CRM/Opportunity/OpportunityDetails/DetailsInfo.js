import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  Input,
  Select,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSingleOpportunity,
  updateOpportunity,
} from "../../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllOpportunitySource } from "../../../../redux/rtk/features/crm/opportunitySource/opportunitySourceSlice";
import { loadAllOpportunityStage } from "../../../../redux/rtk/features/crm/opportunityStage/opportunityStageSlice";
import { loadAllOpportunityType } from "../../../../redux/rtk/features/crm/opportunityType/opportunityTypeSlice";
import getPermissions from "../../../../utils/getPermissions";

export default function DetailsInfo({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const dispatch = useDispatch();
  const { list: opportunitySourceList, loading: opportunitySourceLoading } =
    useSelector((state) => state.opportunitySource);
  const { list: opportunityTypeList, loading: opportunityTypeLoading } =
    useSelector((state) => state.opportunityType);
  const { list: opportunityStageList, loading: opportunityStageLoading } =
    useSelector((state) => state.opportunityStage);

  // company profile edit form
  const permissions = getPermissions();
  const canEdit = permissions?.includes("update-opportunity");

  useEffect(() => {
    dispatch(loadAllOpportunitySource());
    dispatch(loadAllOpportunityType());
    dispatch(loadAllOpportunityStage());
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      opportunityCreateDate: dayjs(values.opportunityCreateDate).format(
        "YYYY-MM-DD"
      ),
      opportunityCloseDate: dayjs(values.opportunityCloseDate).format(
        "YYYY-MM-DD"
      ),
      opportunityTypeId: parseInt(values.opportunityTypeId),
      opportunitySourceId: parseInt(values.opportunitySourceId),
      opportunityStageId: parseInt(values.opportunityStageId),
    };

    const resp = await dispatch(
      updateOpportunity({ id: data.id, values: formData })
    );
    if (resp.payload.message === "success") {
      dispatch(loadSingleOpportunity(data.id));
      setTriggerSave(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setTriggerSave(false);
    form.resetFields();
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Skeleton loading={loading} active>
        <Card
          bordered={false}
          headStyle={{ display: "none" }}
          bodyStyle={{
            padding: 0,
          }}
        >
          {data && (
            <Form
              form={form}
              colon={false}
              disabled={!canEdit}
              labelCol={{
                xs: {
                  span: 24,
                },
                sm: {
                  span: 8,
                },
              }}
              wrapperCol={{
                xs: {
                  span: 24,
                },
                sm: {
                  span: 16,
                },
              }}
              layout='inline'
              onFieldsChange={() => setTriggerSave(true)}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                opportunityTypeId: data?.opportunityTypeId || "",
                opportunityStageId: data?.opportunityStageId || "",
                opportunitySourceId: data?.opportunitySourceId || "",
                nextStep: data?.nextStep || "",
                competitors: data?.competitors || "",
                description: data?.description || "",
                opportunityCreateDate:
                  moment(data?.opportunityCreateDate) || "",
                opportunityCloseDate: moment(data?.opportunityCloseDate) || "",
              }}
            >
              <Collapse className='bg-transparent w-full' bordered={true}>
                <Collapse.Panel
                  header={
                    <span className='font-bold text-md dark:text-white'>
                      Details
                    </span>
                  }
                  key='1'
                  extra={
                    <>
                      {triggerSave && (
                        <Form.Item>
                          <div className='flex items-center gap-4'>
                            <Button type='primary' htmlType='submit'>
                              Save
                            </Button>
                            <Button
                              loading={loading}
                              type='danger'
                              onClick={onFinishFailed}
                            >
                              Cancel
                            </Button>
                          </div>
                        </Form.Item>
                      )}
                    </>
                  }
                >
                  <div className='flex flex-wrap xl:px-10'>
                    <div className='w-full xl:w-[50%] flex flex-col gap-2 p-3'>
                      <Form.Item
                        className='flex flex-col'
                        label='Opportunity Source'
                        name={"opportunitySourceId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={opportunitySourceLoading}
                        >
                          {opportunitySourceList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.opportunitySourceName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        className='flex flex-col'
                        label='Opportunity Type'
                        name={"opportunityTypeId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={opportunityTypeLoading}
                        >
                          {opportunityTypeList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.opportunityTypeName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        className='flex flex-col'
                        label='Opportunity Stage'
                        name={"opportunityStageId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={opportunityStageLoading}
                        >
                          {opportunityStageList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.opportunityStageName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label='Next Step' name={"nextStep"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Competitors' name={"competitors"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Create Date'
                        name={"opportunityCreateDate"}
                      >
                        <DatePicker
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Close Date'
                        name={"opportunityCloseDate"}
                      >
                        <DatePicker
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Description' name={"description"}>
                        <Input.TextArea
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Collapse.Panel>
              </Collapse>
            </Form>
          )}
        </Card>
      </Skeleton>
    </>
  );
}
