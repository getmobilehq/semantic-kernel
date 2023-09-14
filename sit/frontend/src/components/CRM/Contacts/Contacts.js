import { Form, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllContactStage } from "../../../redux/rtk/features/crm/ContactStage/contactStageSlice";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import {
	deleteManyContact,
	loadAllContactPaginated,
} from "../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllContactSource } from "../../../redux/rtk/features/crm/contactSource/contactSourceSlice";
import { loadAllIndustry } from "../../../redux/rtk/features/crm/industry/industrySlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import ViewBtn from "../../Buttons/ViewBtn";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateDrawer from "../CommonUi/CreateDrawer";
import CrmSearch from "../CommonUi/CrmSearch";
import TableComponent from "../CommonUi/TableComponent";
import CreateContactForm from "./CreateContactForm";
import { loadAllOpportunity } from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";

const columns = [
	{
		title: "Name",
		key: "name",
		render: ({ firstName, lastName, id }) =>
			id ? (
				<Link to={`/admin/contact/${id}`}>
					{firstName} {lastName}
				</Link>
			) : (
				"-"
			),
		sorter: (a, b) => a?.firstName.localeCompare(b?.firstName),
	},
	{
		title: "Email",
		key: "email",
		dataIndex: "email",
	},
	{
		title: "Phone number",
		key: "phone",
		dataIndex: "phone",
	},
	{
		title: "Owner",
		dataIndex: "contactOwner",
		key: "owner",
		render: (contactOwner, item) => (
			<Link to={`/admin/setup/staffs/${item?.contactOwnerId}`}>
				{contactOwner?.firstName} {contactOwner?.lastName}
			</Link>
		),
	},
	{
		title: "Company",
		key: "Company",
		dataIndex: "company",
		render: (company, item) => (
			<Link to={`/admin/company/${item?.companyId}`}>
				{company?.companyName}
			</Link>
		),
	},

	{
		title: "Source",
		key: "contactSource",
		dataIndex: "contactSource",
		render: (contactSource) =>
			contactSource ? contactSource?.contactSourceName : "-",
	},
	{
		title: "Stage",
		key: "contactStage",
		dataIndex: "contactStage",
		render: (contactStage) =>
			contactStage ? contactStage?.contactStageName : "-",
	},
	{
		title: "Industry",
		key: "Industry",
		dataIndex: "industry",
		render: (industry) => industry.industryName,
	},
	{
		title: "Create date",
		key: "Create date",
		dataIndex: "createdAt",
		render: (date) => moment(date).format("MMMM Do YYYY"),
	},

	{
		title: "Action",
		dataIndex: "id",
		key: "action",
		render: (id) => (
			<div className='flex justify-start'>
				<UserPrivateComponent permission='readSingle-contact'>
					<ViewBtn path={`/admin/contact/${id}`} />
				</UserPrivateComponent>
			</div>
		),
	},
];

const Contacts = () => {
	const dispatch = useDispatch();
	const {
		list: contactList,
		loading,
		total,
	} = useSelector((state) => state.contact);
	// Drawer state
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	// filter
	const [isFilter, setFilter] = useState(false);
	const { Option } = Select;
	const contactSource = useSelector((state) => state.contactSource.list) || [];
	const contactStage = useSelector((state) => state.contactStage.list) || [];
	const company = useSelector((state) => state.company.list) || [];
	const industry = useSelector((state) => state.industry.list) || [];
	const contactOwner = useSelector((state) => state.users.list) || [];

	const filterToggle = () => {
		setFilter((prev) => !prev);
	};
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		dispatch(
			loadAllContactPaginated({
				...values,
			})
		);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		dispatch(loadAllContactPaginated({ status: true }));
		dispatch(loadAllIndustry());
		dispatch(loadAllCompany());
		dispatch(loadAllContactSource());
		dispatch(loadAllOpportunity());
		dispatch(loadAllContactStage());
		dispatch(loadAllIndustry());
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
						<CrmSearch paginatedThunk={loadAllContactPaginated} />
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
								<Form.Item name='contactOwner' className='w-full md:w-[180px]'>
									<Select
										placeholder='Select Contact Owner'
										showArrow
										mode='multiple'
										style={{ width: "100%" }}
										maxTagCount={0}
										maxTagPlaceholder={
											<div className='w-[150px]'>Contact Owner</div>
										}>
										{contactOwner?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item?.firstName} {item?.lastName}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									name='contactSource'
									className='w-full md:w-[180px] overflow-hidden'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Source'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={<div className='w-[150px]'>Source</div>}>
										{contactSource?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.contactSourceName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='contactStage' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Stage'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={<div className='w-[150px]'>Stage</div>}>
										{contactStage?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.contactStageName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='industry' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Industry'
										maxTagCount={0}
										showArrow
										maxTagPlaceholder={
											<div className='w-[150px]'>Industry</div>
										}>
										{industry?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.industryName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='company' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Company'
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
								<div className='min-w-[180px] flex justify-start'>
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
							</Form>
						</div>
					)}
				</div>
				{!isFilter && (
					<UserPrivateComponent permission='create-contact'>
						<button
							onClick={() => setOpen(true)}
							className='py-2 px-3 w-[163px] border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'>
							<AiOutlinePlus /> Create Contact
						</button>
					</UserPrivateComponent>
				)}
			</div>

			<UserPrivateComponent permission='readAll-contact'>
				<TableComponent
					columns={columns}
					list={contactList}
					total={total}
					loading={loading}
					paginatedThunk={loadAllContactPaginated}
					csvFileName={"Contact-List"}
					deleteManyThunk={deleteManyContact}
				/>
			</UserPrivateComponent>
			<UserPrivateComponent permission='create-contact'>
				<CreateDrawer
					onClose={onClose}
					open={open}
					title={"Contact"}
					width={50}>
					<CreateContactForm onClose={onClose} open={open} />
				</CreateDrawer>
			</UserPrivateComponent>
		</div>
	);
};
export default Contacts;
