import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllOpportunity } from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllProduct } from "../../../redux/rtk/features/crm/product/productSlice";
import {
	addSingleQuote,
	loadAllQuotePaginated,
} from "../../../redux/rtk/features/crm/quote/quoteSlice";
import { loadAllQuoteStage } from "../../../redux/rtk/features/crm/quoteStage/quoteStageSlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import ProductAdd from "./ProductAdd";

export default function CreateQuoteForm({ onClose, createAs }) {
	// selector
	const { list: companyList, loading: companyLoading } = useSelector(
		(state) => state.company
	);
	const { list: contactList, loading: contactLoading } = useSelector(
		(state) => state.contact
	);
	const { list: productList, loading: productLoading } = useSelector(
		(state) => state.product
	);
	const { list: opportunityList, loading: opportunityLoading } = useSelector(
		(state) => state.opportunity
	);
	const { list: quoteStageList, loading: quoteStageLoading } = useSelector(
		(state) => state.quoteStage
	);
	const { list: staffList, loading: staffLoading } = useSelector(
		(state) => state.users
	);
	const { loading: quoteLoading } = useSelector((state) => state.quote);

	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllOpportunity());
		dispatch(loadAllCompany());
		dispatch(loadAllContact());
		dispatch(loadAllProduct());
		dispatch(loadAllQuoteStage());
		dispatch(loadAllStaff({ status: true }));
	}, [dispatch]);

	const onFinish = async (values) => {
		const formData = {
			...values,
			quoteOwnerId: parseInt(values.quoteOwnerId),
			companyId: parseInt(values.companyId),
			contactId: parseInt(values.contactId),
			opportunityId: parseInt(values.opportunityId),
			quoteStageId: parseInt(values.quoteStageId),
			discount: parseInt(values.discount),
		};

		// general create request

		const resp = await dispatch(addSingleQuote(formData));
		if (resp.payload.message === "success") {
			form.resetFields();
			if (createAs?.name) {
				dispatch(createAs.singleLoadThunk(createAs.value));
			} else {
				dispatch(loadAllQuotePaginated({ status: true }));
			}
			onClose();
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
				className='w-[90%]'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				colon={false}
				layout='vertical'
				form={form}
				initialValues={
					createAs
						? {
								[createAs.name]: createAs.value,
						  }
						: {}
				}>
				<div className='flex justify-center gap-5'>
					<div className='w-1/2'>
						<Form.Item
							style={{ width: "100%" }}
							label='Quote name'
							name='quoteName'
							tooltip='This is a required field'
							rules={[{ required: true, message: "Quote name is Required." }]}>
							<Input placeholder='Example name' />
						</Form.Item>

						<Form.Item
							label='Quote owner'
							name={"quoteOwnerId"}
							tooltip='This is a required field'
							rules={[
								{ required: true, message: "Quotation owner is Required." },
							]}>
							<Select
								style={{ width: "100%" }}
								loading={staffLoading}
								allowClear
								showSearch
								placeholder='Select quote owner name'>
								{staffList?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item?.firstName} {item?.lastName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label='Company' name='companyId'>
							<Select
								style={{ width: "100%" }}
								loading={companyLoading}
								allowClear
								showSearch
								placeholder='Select company Name'
								disabled={!!(createAs?.name === "companyId")}>
								{companyList?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.companyName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label='Opportunity' name='opportunityId'>
							<Select
								style={{ width: "100%" }}
								loading={opportunityLoading}
								allowClear
								showSearch
								placeholder='Select opportunity'
								disabled={!!(createAs?.name === "opportunityId")}>
								{opportunityList?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.opportunityName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</div>
					<div className='w-1/2'>
						<Form.Item
							label='Quote Date'
							name='quoteDate'
							tooltip='This is a required field'
							rules={[{ required: true, message: "Quote Date is Required." }]}>
							<DatePicker placeholder='Select Quotation Date' />
						</Form.Item>
						<Form.Item label='Expiration date' name='expirationDate'>
							<DatePicker placeholder='Select expiration date' />
						</Form.Item>
						<Form.Item label='Contact' name='contactId'>
							<Select
								style={{ width: "100%" }}
								loading={contactLoading}
								allowClear
								showSearch
								placeholder='Select contact name'
								disabled={!!(createAs?.name === "contactId")}>
								{contactList?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item?.firstName} {item?.lastName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label='Quote Stage' name='quoteStageId'>
							<Select
								style={{ width: "100%" }}
								loading={quoteStageLoading}
								allowClear
								showSearch
								placeholder='Select opportunity'>
								{quoteStageList?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item.quoteStageName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</div>
				</div>
				<div className='flex justify-center'>
					<div className='w-full'>
						<Form.Item label='Terms and conditions' name='termsAndConditions'>
							<Input placeholder='Terms' />
						</Form.Item>
						<Form.Item label='Description' name='description'>
							<Input.TextArea placeholder='Describe about quote' />
						</Form.Item>
						<div>
							<ProductAdd
								form={form}
								productList={productList}
								productLoading={productLoading}
							/>
						</div>
					</div>
				</div>
				<div className='flex justify-center'>
					<div className='w-full'>
						<Form.Item label=''>
							<div className='flex items-center gap-2'>
								<Button
									size={"large"}
									htmlType='submit'
									type='primary'
									loading={quoteLoading}>
									Create
								</Button>
								<Button
									size={"large"}
									htmlType='submit'
									type='danger'
									onClick={onCancel}>
									Cancel
								</Button>
							</div>
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	);
}
