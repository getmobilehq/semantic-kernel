import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import {
	loadAllNotePaginated,
	updateNote,
} from "../../../redux/rtk/features/crm/note/crmNoteSlice";
import { loadAllOpportunity } from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllQuote } from "../../../redux/rtk/features/crm/quote/quoteSlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";

export default function NoteUpdate({ onClose, id, note }) {
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
		const formData = {
			...values,
			noteOwnerId: parseInt(values.noteOwnerId),
			companyId: parseInt(values.companyId),
			opportunityId: parseInt(values.opportunityId),
			contactId: parseInt(values.contactId),
			quoteId: parseInt(values.quoteId),
		};

		const resp = await dispatch(updateNote({ id, values: formData }));
		if (resp.payload.message === "success") {
			form.resetFields();
			dispatch(loadAllNotePaginated({}));
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
			<UserPrivateComponent permission='create-note'>
				<Form
					className='w-4/5'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					colon={false}
					layout='vertical'
					form={form}
					initialValues={{
						title: note?.title,
						noteOwnerId: note?.noteOwnerId,
						companyId: note?.companyId,
						opportunityId: note?.opportunityId,
						contactId: note?.contactId,
						quoteId: note?.quoteId,
						description: note?.description,
					}}>
					<Form.Item
						style={{ width: "100%" }}
						label='Title'
						name='title'
						tooltip='This is a required field'
						rules={[{ required: true, message: "Title is Required." }]}>
						<Input placeholder='Note title' />
					</Form.Item>

					<Form.Item
						label='Note owner'
						name={"noteOwnerId"}
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
							placeholder='Select company Name'>
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
							placeholder='Select contact'>
							{contactList?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.fullName}
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
							placeholder='Select opportunity'>
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
							placeholder='Select quote'>
							{quoteList?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.quoteName}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label='Description' name='description'>
						<Input.TextArea placeholder='Describe about contact' />
					</Form.Item>

					<Form.Item label=''>
						<div className='flex items-center gap-2'>
							<Button size={"large"} htmlType='submit' type='primary'>
								Update
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
