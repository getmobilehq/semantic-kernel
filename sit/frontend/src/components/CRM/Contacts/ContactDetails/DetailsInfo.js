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
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loadAllContactStage } from "../../../../redux/rtk/features/crm/ContactStage/contactStageSlice";
import { loadAllCompany } from "../../../../redux/rtk/features/crm/company/companySlice";
import {
  loadSingleContact,
  updateContact,
} from "../../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllContactSource } from "../../../../redux/rtk/features/crm/contactSource/contactSourceSlice";
import { loadAllIndustry } from "../../../../redux/rtk/features/crm/industry/industrySlice";
import { loadAllStaff } from "../../../../redux/rtk/features/user/userSlice";
import getPermissions from "../../../../utils/getPermissions";

export default function DetailsInfo({ contact, contactLoading }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);

  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  const { list: contactSourceList, loading: contactSourceLoading } =
    useSelector((state) => state.contactSource);
  const { list: contactStageList, loading: contactStageLoading } = useSelector(
    (state) => state.contactStage
  );
  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry
  );

  // contact profile edit form
  const permissions = getPermissions();
  const canEdit = permissions?.includes("update-contact");
  const onFinish = async (values) => {
    const formData = {
      ...values,
      dateOfBirth: values.dateOfBirth,
      companyId: parseInt(values.companyId),
      industryId: parseInt(values.industryId),
      contactSourceId: parseInt(values.contactSourceId),
      contactStageId: parseInt(values.contactStageId),
    };
    const resp = await dispatch(
      updateContact({ id: contact.id, values: formData })
    );
    if (resp.payload.message === "success") {
      dispatch(loadSingleContact(contact.id));
      setTriggerSave(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setTriggerSave(false);
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(loadAllContactSource());
    dispatch(loadAllCompany());
    dispatch(loadAllContactStage());
    dispatch(loadAllIndustry());
    dispatch(loadAllStaff({ status: true }));
  }, [dispatch]);
  return (
    <>
      <Skeleton loading={contactLoading} active>
        <Card
          bordered={false}
          headStyle={{ display: "none" }}
          bodyStyle={{
            padding: 0,
          }}
        >
          {contact && (
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
                dateOfBirth: moment(contact?.dateOfBirth) || "",
                companyId: contact?.companyId || "",
                industryId: contact?.industryId || "",
                contactStageId: contact?.contactStageId || "",
                contactSourceId: contact?.contactSourceId || "",
                department: contact?.department || "",
                linkedin: contact?.linkedin || "",
                twitter: contact?.twitter || "",
                presentAddress: contact?.presentAddress || "",
                presentCity: contact?.presentCity || "",
                presentZipCode: contact?.presentZipCode || "",
                presentState: contact?.presentState || "",
                presentCountry: contact?.presentCountry || "",
                permanentAddress: contact?.permanentAddress || "",
                permanentCity: contact?.permanentCity || "",
                permanentZipCode: contact?.permanentZipCode || "",
                permanentState: contact?.permanentState || "",
                permanentCountry: contact?.permanentCountry || "",
                description: contact?.description || "",
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
                              loading={contactLoading}
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
                      <Form.Item label='Date of birth' name={"dateOfBirth"}>
                        <DatePicker bordered={false} className='md:ml-5' />
                      </Form.Item>

                      <Form.Item
                        className='flex flex-col'
                        label='Company'
                        name={"companyId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={companyLoading}
                        >
                          {companyList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.companyName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        className='flex flex-col'
                        label='Industry'
                        name={"industryId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={industryLoading}
                        >
                          {industryList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.industryName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        className='flex flex-col'
                        label='Stage'
                        name={"contactStageId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={contactStageLoading}
                        >
                          {contactStageList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.contactStageName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        className='flex flex-col'
                        label='Source'
                        name={"contactSourceId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={contactSourceLoading}
                        >
                          {contactSourceList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.contactSourceName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item label='Department' name={"department"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                    </div>

                    <div className='w-full xl:w-[50%] flex flex-col gap-2 p-3'>
                      <div className='text-lg font-bold py-2 border-b'>
                        Social Link
                      </div>
                      <Form.Item label='Linkedin' name={"linkedin"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Twitter' name={"twitter"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                    </div>

                    <div className='w-full xl:w-[50%] flex flex-col gap-2 p-3'>
                      <div className='text-lg font-bold py-2 border-b'>
                        Present Address
                      </div>
                      <Form.Item label='Present Street' name={"presentAddress"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Present City' name={"presentCity"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Present ZipCode'
                        name={"presentZipCode"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Present State' name={"presentState"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Present Country'
                        name={"presentCountry"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                    </div>

                    <div className='w-full xl:w-[50%] flex flex-col gap-2 p-3'>
                      <div className='text-lg font-bold py-2 border-b'>
                        Permanent Address
                      </div>
                      <Form.Item
                        label='Permanent Address'
                        name={"permanentAddress"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Permanent City' name={"permanentCity"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Permanent ZipCode'
                        name={"permanentZipCode"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Permanent State'
                        name={"permanentState"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Permanent Country'
                        name={"permanentCountry"}
                      >
                        <Input
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
