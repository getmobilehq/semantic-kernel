import { Button, Card, Collapse, Form, Input, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSinglCompany,
  updateCompany,
} from "../../../../redux/rtk/features/crm/company/companySlice";
import { loadAllCompanyType } from "../../../../redux/rtk/features/crm/companyType/companyTypeSlice";
import { loadAllIndustry } from "../../../../redux/rtk/features/crm/industry/industrySlice";
import getPermissions from "../../../../utils/getPermissions";

export default function CompanyInfo({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const dispatch = useDispatch();

  const { list: companyType, loading: companyTypeLoading } = useSelector(
    (state) => state.companyType
  );

  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry
  );
  // company profile edit form
  const permissions = getPermissions();
  const canEdit = permissions?.includes("update-company");

  useEffect(() => {
    dispatch(loadAllCompanyType());
    dispatch(loadAllIndustry());
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      companySize: parseInt(values.companySize),
      annualRevenue: parseInt(values.annualRevenue),
    };

    const resp = await dispatch(
      updateCompany({ id: data.id, values: formData })
    );
    if (resp.payload.message === "success") {
      dispatch(loadSinglCompany(data.id));
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
                companyName: data.companyName || "",
                website: data.website || "",
                phone: data.phone || "",
                email: data.email || "",
                companyOwnerId: data.companyOwnerId || "",
                companyTypeId: data.companyTypeId || "",
                industryId: data.industryId || "",

                companySize: data.companySize || "",
                annualRevenue: data.annualRevenue || "",

                billingStreet: data.billingStreet || "",
                billingCity: data.billingCity || "",
                billingState: data.billingState || "",
                billingCountry: data.billingCountry || "",
                billingZipCode: data.billingZipCode || "",

                shippingStreet: data.shippingStreet || "",
                shippingCity: data.shippingCity || "",
                shippingState: data.shippingState || "",
                shippingCountry: data.shippingCountry || "",
                shippingZipCode: data.shippingZipCode || "",
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
                        label='Company Type'
                        name={"companyTypeId"}
                      >
                        <Select
                          bordered={false}
                          className='md:ml-5'
                          loading={companyTypeLoading}
                        >
                          {companyType.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item?.companyTypeName}
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
                      <Form.Item label='Company Size' name={"companySize"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Annual Revenue' name={"annualRevenue"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                    </div>
                    <div className='w-full xl:w-[50%] flex flex-col gap-2 p-3'>
                      <div className='text-lg font-bold py-2 border-b'>
                        Billing Address
                      </div>
                      <Form.Item label='Billing Street' name={"billingStreet"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Billing City' name={"billingCity"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>

                      <Form.Item
                        label='Billing Zip Code'
                        name={"billingZipCode"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Billing State' name={"billingState"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Billing Country'
                        name={"billingCountry"}
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
                        Shipping Address
                      </div>
                      <Form.Item
                        label='Shipping Street'
                        name={"shippingStreet"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Shipping City' name={"shippingCity"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>

                      <Form.Item
                        label='Shipping Zip Code'
                        name={"shippingZipCode"}
                      >
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item label='Shipping State' name={"shippingState"}>
                        <Input
                          bordered={false}
                          className='md:ml-5'
                          suffix={<BsFillPencilFill />}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Shipping Country'
                        name={"shippingCountry"}
                      >
                        <Input
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
