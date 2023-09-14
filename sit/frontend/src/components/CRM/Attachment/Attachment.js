import { Form, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	deleteManyAttachment,
	loadAllAttachmentPaginated,
} from "../../../redux/rtk/features/crm/attachment/crmAttachmentSlice";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllOpportunity } from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllQuote } from "../../../redux/rtk/features/crm/quote/quoteSlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import ViewBtn from "../../Buttons/ViewBtn";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateDrawer from "../CommonUi/CreateDrawer";
import CrmSearch from "../CommonUi/CrmSearch";
import TableComponent from "../CommonUi/TableComponent";
import CreateAttachmentForm from "./CreateAttachmentForm";
import getImageUrl from "../../../utils/getimageUrl";

const columns = [
	{
		title: "Name",
		key: "attachmentName",
		render: ({ attachmentName, attachmentPath }) =>
			attachmentName ? (
				<Link target='_blank' to={`${getImageUrl(attachmentPath)}`}>
					{attachmentName}
				</Link>
			) : (
				"-"
			),
		sorter: (a, b) => a.attachmentName.localeCompare(b.attachmentName),
	},

	{
		title: "Owner",
		dataIndex: "attachmentOwner",
		key: "owner",
		render: (attachmentOwner, item) => (
			<Link to={`/admin/setup/staffs/${item?.noteOwnerId}`}>
				{attachmentOwner?.fullName}
			</Link>
		),
	},

	{
		title: "Company",
		key: "company",
		dataIndex: "company",
		render: (company) =>
			company?.id ? (
				<Link to={`/admin/setup/company/${company?.id}`}>
					{company?.companyName}
				</Link>
			) : (
				"-"
			),
	},
	{
		title: "Contact",
		key: "contact",
		dataIndex: "contact",
		render: (contact) =>
			contact?.id ? (
				<Link to={`/admin/setup/contact/${contact?.id}`}>
					{contact?.firstName} {contact?.lastName}
				</Link>
			) : (
				"-"
			),
	},
	{
		title: "Opportunity",
		key: "opportunity",
		dataIndex: "opportunity",
		render: (opportunity) =>
			opportunity?.id ? (
				<Link to={`/admin/setup/opportunity/${opportunity?.id}`}>
					{opportunity?.opportunityName}
				</Link>
			) : (
				"-"
			),
	},
	{
		title: "Quote",
		key: "quote",
		dataIndex: "quote",
		render: (quote) =>
			quote?.id ? (
				<Link to={`/admin/setup/quote/${quote?.id}`}>{quote?.quoteName}</Link>
			) : (
				"-"
			),
	},
	{
		title: "Create date",
		key: "Create date",
		dataIndex: "createdAt",
		render: (date) => moment(date).format("MMMM Do YYYY"),
	},

	{
		title: "Action",
		key: "action",
		render: ({ attachmentPath }) => (
			<div className='flex justify-start'>
				<ViewBtn target={"_blank"} path={`${getImageUrl(attachmentPath)}`} />
			</div>
		),
	},
];

const Attachment = () => {
	const dispatch = useDispatch();
	const {
		list: attachmentList,
		loading,
		total,
	} = useSelector((state) => state.crmAttachment);
	// Drawer state
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	// filter
	const [isFilter, setFilter] = useState(false);
	const { Option } = Select;

	const company = useSelector((state) => state.company.list) || [];
	const contact = useSelector((state) => state.contact.list) || [];
	const opportunity = useSelector((state) => state.opportunity.list) || [];
	const quote = useSelector((state) => state.quote.list) || [];
	const attachmentOwner = useSelector((state) => state.users.list) || [];
	const filterToggle = () => {
		setFilter((prev) => !prev);
	};
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		dispatch(
			loadAllAttachmentPaginated({
				...values,
			})
		);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		dispatch(loadAllAttachmentPaginated({ status: true }));
		dispatch(loadAllOpportunity());
		dispatch(loadAllQuote());
		dispatch(loadAllCompany());
		dispatch(loadAllContact());
		dispatch(loadAllStaff({ status: true }));
	}, [dispatch]);

	return (
		<div className='container'>
			<div className='bg-white dark:bg-DTableBg flex flex-col md:flex-row justify-between items-center gap-3 p-3 px-6 border'>
				<div className='flex justify-end items-center gap-5'>
					<button
						onClick={filterToggle}
						className={`hidden md:block ${
							isFilter ? "bg-transparent border border-red-600" : "bg-blue-500"
						}  px-5 py-2 rounded cursor-pointer`}
						type='submit'>
						{isFilter ? (
							<span className='flex justify-center dark:text-white items-center gap-2'>
								<AiOutlineClose /> Close
							</span>
						) : (
							<span className='text-white'>Filter</span>
						)}
					</button>
					{!isFilter ? (
						<CrmSearch paginatedThunk={loadAllAttachmentPaginated} />
					) : (
						<div className='flex text-md'>
							<Form
								className='flex flex-wrap justify-center gap-2 md:items-center'
								form={form}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								layout='inline'
								initialValues={{
									status: ["true"],
								}}>
								<Form.Item
									name='attachmentOwner'
									className='w-full md:w-[180px]'>
									<Select
										placeholder='Select Attachment Owner'
										showArrow
										mode='multiple'
										style={{ width: "100%" }}
										maxTagCount={0}
										maxTagPlaceholder={
											<div className='w-[150px]'>Attachment Owner</div>
										}>
										{attachmentOwner?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item?.firstName} {item?.lastName}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									name='company'
									className='w-full md:w-[180px] overflow-hidden'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select company'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={
											<div className='w-[150px]'>Company</div>
										}>
										{company?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.companyName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='contact' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select contact'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={
											<div className='w-[150px]'>Contact</div>
										}>
										{contact?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.fullName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='opportunity' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select opportunity'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={
											<div className='w-[150px]'>Opportunity</div>
										}>
										{opportunity?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.opportunityName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='quote' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Quote'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={<div className='w-[150px]'>Quote</div>}>
										{quote?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.quoteName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='status' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Please select'
										defaultValue={["true"]}
										showArrow>
										<Option value='true'>True</Option>
										<Option value='false'>False</Option>
									</Select>
								</Form.Item>
								<Form.Item>
									<div className='w-full md:w-[180px] flex justify-start'>
										<button
											className='bg-blue-500 text-white px-5 py-2 rounded cursor-pointer'
											type='submit'>
											Filter
										</button>
										<button
											onClick={filterToggle}
											className='block md:hidden  px-5 py-2 rounded cursor-pointer ml-2 text-rose-700 transition-colors duration-150 border border-rose-500 focus:shadow-outline hover:bg-rose-500 hover:text-rose-100'>
											Cancel
										</button>
									</div>
								</Form.Item>
							</Form>
						</div>
					)}
				</div>
				{!isFilter && (
					<UserPrivateComponent permission='create-attachment'>
						<button
							onClick={() => setOpen(true)}
							className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center justify-center gap-2'>
							<AiOutlinePlus /> Create Attachment
						</button>
					</UserPrivateComponent>
				)}
			</div>

			<UserPrivateComponent permission='readAll-attachment'>
				<TableComponent
					columns={columns}
					list={attachmentList}
					total={total}
					loading={loading}
					paginatedThunk={loadAllAttachmentPaginated}
					csvFileName={"Attachment-List"}
					deleteManyThunk={deleteManyAttachment}
				/>
			</UserPrivateComponent>
			<UserPrivateComponent permission='create-attachment'>
				<CreateDrawer
					onClose={onClose}
					open={open}
					title={"Attachment"}
					width={45}>
					<CreateAttachmentForm onClose={onClose} open={open} />
				</CreateDrawer>
			</UserPrivateComponent>
		</div>
	);
};
export default Attachment;
