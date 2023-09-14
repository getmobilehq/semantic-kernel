import { Button, Collapse, Form, Input, Select } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import {
	addSingleEmail,
	loadAllEmailPaginated,
} from "../../../redux/rtk/features/crm/email/crmEmailSlice";
import { loadAllOpportunity } from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllQuote } from "../../../redux/rtk/features/crm/quote/quoteSlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import BodyEditor from "./BodyEditor";
import TagInput from "./TagInput";
import { loadAllEmailConfig } from "../../../redux/rtk/features/crm/email/emailConfigSlice";

export default function CreateEmailForm({ onClose, createAs }) {
	const [cc, setCc] = useState([]);
	const [bcc, setBcc] = useState([]);
	const [body, setBody] = useState("");
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

	const { list: quoteList, loading: quoteLoading } = useSelector(
		(state) => state.quote
	);
	const { list: staffList, loading: staffLoading } = useSelector(
		(state) => state.users
	);

	const { loading: emailLoading } = useSelector((state) => state.crmEmail);

	const { list: emailConfigList } = useSelector((state) => state.emailConfig);

	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllContact());
		dispatch(loadAllCompany());
		dispatch(loadAllOpportunity());
		dispatch(loadAllQuote());
		dispatch(loadAllStaff({ status: true }));
		dispatch(loadAllEmailConfig({}));
	}, [dispatch]);

	const onFinish = async (values) => {
		const formData = {
			...values,
			emailOwnerId: parseInt(values.emailOwnerId),
			companyId: parseInt(values.companyId),
			opportunityId: parseInt(values.opportunityId),
			contactId: parseInt(values.contactId),
			quoteId: parseInt(values.quoteId),
			cc,
			bcc,
			body,
		};

		const resp = await dispatch(addSingleEmail(formData));
		if (resp.payload.message === "success") {
			form.resetFields();
			if (createAs?.name) {
				dispatch(createAs.singleLoadThunk(createAs.value));
			} else {
				dispatch(loadAllEmailPaginated({}));
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
			<UserPrivateComponent permission='create-email'>
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
						style={{ width: "100%" }}
						label='To'
						name='emailConfigName'
						tooltip='This is a required field'
						rules={[{ required: true, message: "From Email is Required." }]}>
						<Select style={{ width: "100%" }} placeholder='From Email'>
							{emailConfigList?.map((item) => (
								<Select.Option
									key={item.emailConfigName}
									value={item.emailConfigName}>
									{item.emailUser}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						style={{ width: "100%" }}
						label='To'
						name='receiverEmail'
						tooltip='This is a required field'
						rules={[
							{ required: true, message: "Receiver Email is Required." },
						]}>
						<Input placeholder='Receiver Email' />
					</Form.Item>
					<Form.Item
						style={{ width: "100%" }}
						label='Subject'
						name='subject'
						tooltip='This is a required field'
						rules={[{ required: true, message: "Subject is Required." }]}>
						<Input placeholder='Subject' />
					</Form.Item>
					<Collapse
						bordered={false}
						defaultActiveKey={["1"]}
						expandIcon={({ isActive }) => (
							<CaretRightOutlined rotate={isActive ? 90 : 0} />
						)}
						className='site-collapse-custom-collapse mb-4'>
						<Collapse.Panel header='CC & BCC' key='1'>
							<TagInput label={"CC"} tags={cc} setTags={setCc} />

							<TagInput label={"BCC"} tags={bcc} setTags={setBcc} />
						</Collapse.Panel>
					</Collapse>

					<BodyEditor content={body} setContent={setBody} label={"Body"} />
					<Form.Item
						label='Email owner'
						name={"emailOwnerId"}
						tooltip='This is a required field'
						rules={[{ required: true, message: "Owner is Required." }]}>
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
								loading={emailLoading}>
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
				</Form>
			</UserPrivateComponent>
		</div>
	);
}
