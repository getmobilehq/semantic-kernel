import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addSingleAttachment,
	loadAllAttachmentPaginated,
} from "../../../redux/rtk/features/crm/attachment/crmAttachmentSlice";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllOpportunity } from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllQuote } from "../../../redux/rtk/features/crm/quote/quoteSlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import fileConfig from "../../../utils/fileConfig";

export default function CreateAttachmentForm({ onClose, createAs }) {
	// selector
	const { list: companyList, loading: companyLoading } = useSelector(
		(state) => state.company
	);
	const { list: contactList, loading: contactLoading } = useSelector(
		(state) => state.contact
	);
	const { list: opportunityList, loading: opportunityLoading } = useSelector(
		(state) => state.opportunity
	);

	const { loading: attatchmentLoading } = useSelector(
		(state) => state.crmAttachment
	);

	const { list: quoteList, loading: quoteLoading } = useSelector(
		(state) => state.quote
	);
	const { list: staffList, loading: staffLoading } = useSelector(
		(state) => state.users
	);
	const { loading: noteLoading } = useSelector((state) => state.crmNote);

	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllContact());
		dispatch(loadAllCompany());
		dispatch(loadAllOpportunity());
		dispatch(loadAllQuote());
		dispatch(loadAllStaff({ status: true }));
	}, [dispatch]);

	const onFinish = async (values) => {
		const formData = new FormData();
		if (values.attachmentOwnerId)
			formData.append("attachmentOwnerId", parseInt(values.attachmentOwnerId));
		if (values.companyId)
			formData.append("companyId", parseInt(values.companyId));
		if (values.contactId)
			formData.append("contactId", parseInt(values.contactId));
		if (values.opportunityId)
			formData.append("opportunityId", parseInt(values.opportunityId));
		if (values.quoteId) formData.append("quoteId", parseInt(values.quoteId));

		if (fileConfig() !== "laravel") {
			formData.append("files", values.files[0]?.originFileObj);
		} else {
			formData.append("files[]", values.files[0]?.originFileObj);
		}

		const resp = await dispatch(addSingleAttachment(formData));
		if (resp.payload.message === "success") {
			form.resetFields();
			if (createAs?.name) {
				dispatch(createAs.singleLoadThunk(createAs.value));
			} else {
				dispatch(loadAllAttachmentPaginated({}));
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
	const [fileLength, setFileLength] = useState(0);
	const normFile = (e) => {
		if (Array.isArray(e)) {
			setFileLength(e.length);
			return e;
		}
		setFileLength(e?.fileList?.length);
		return e?.fileList;
	};

	return (
		<div className='flex justify-center mt-5'>
			<UserPrivateComponent permission='create-note'>
				<Form
					className='w-4/5'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					colon={false}
					layout='vertical'
					form={form}
					initialValues={
						createAs
							? {
									[createAs?.name]: createAs?.value,
							  }
							: {}
					}>
					<Form.Item
						label='Attachment'
						name={"files"}
						valuePropName='fileList'
						getValueFromEvent={normFile}
						tooltip='This is a required field'
						rules={[{ required: true, message: "Please upload a file" }]}>
						<Upload listType='text' beforeUpload={() => false}>
							{!(fileLength >= 1) && (
								<div className='flex items-center border p-1 px-5 gap-3 '>
									<PlusOutlined />
									<div>Upload</div>
								</div>
							)}
						</Upload>
					</Form.Item>
					<Form.Item
						label='Attachment owner'
						name={"attachmentOwnerId"}
						tooltip='This is a required field'
						rules={[
							{ required: true, message: "attachment owner is Required." },
						]}>
						<Select
							style={{ width: "100%" }}
							loading={staffLoading}
							allowClear
							showSearch
							placeholder='Select note owner name'>
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

					<Form.Item label='contact' name='contactId'>
						<Select
							style={{ width: "100%" }}
							loading={contactLoading}
							allowClear
							showSearch
							placeholder='Select contact'
							disabled={!!(createAs?.name === "contactId")}>
							{contactList?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.fullName
										? item.fullName
										: item.firstName + " " + item.lastName}
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

					<Form.Item label='Quote' name='quoteId'>
						<Select
							style={{ width: "100%" }}
							loading={quoteLoading}
							allowClear
							showSearch
							placeholder='Select quote'
							disabled={!!(createAs?.name === "quoteId")}>
							{quoteList?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.quoteName}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label=''>
						<div className='flex items-center gap-2'>
							<Button
								size={"large"}
								htmlType='submit'
								type='primary'
								loading={attatchmentLoading}>
								Create
							</Button>
							<Button
								loading={noteLoading}
								size={"large"}
								htmlType='submit'
								type='danger'
								onClick={onCancel}>
								Cancel
							</Button>
						</div>
					</Form.Item>
				</Form>
			</UserPrivateComponent>
		</div>
	);
}
