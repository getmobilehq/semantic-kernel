import { Form, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllCompany } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContact } from "../../../redux/rtk/features/crm/contact/contactSlice";
import {
	deleteManyOpportunity,
	loadAllOpportunityPaginated,
} from "../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllOpportunitySource } from "../../../redux/rtk/features/crm/opportunitySource/opportunitySourceSlice";
import { loadAllOpportunityStage } from "../../../redux/rtk/features/crm/opportunityStage/opportunityStageSlice";
import { loadAllOpportunityType } from "../../../redux/rtk/features/crm/opportunityType/opportunityTypeSlice";
import { loadAllStaff } from "../../../redux/rtk/features/user/userSlice";
import ViewBtn from "../../Buttons/ViewBtn";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateDrawer from "../CommonUi/CreateDrawer";
import CrmSearch from "../CommonUi/CrmSearch";
import TableComponent from "../CommonUi/TableComponent";
import CreateOpportunityForm from "./CreateOpportunityForm";

const columns = [
	{
		title: "Name",
		key: "Opportunity Name",
		render: ({ opportunityName, id }) =>
			id ? <Link to={`/admin/opportunity/${id}`}>{opportunityName}</Link> : "-",
		sorter: (a, b) => a.opportunityName.localeCompare(b.opportunityName),
	},
	{
		title: "Owner",
		dataIndex: "opportunityOwner",
		key: "owner",
		render: (opportunityOwner, item) => (
			<Link to={`/admin/setup/staffs/${item?.opportunityOwnerId}`}>
				{opportunityOwner.firstName} {opportunityOwner.lastName}
			</Link>
		),
	},
	{
		title: "Amount",
		dataIndex: "amount",
		key: "amount",
		amount: "amount",
	},

	{
		title: "Company",
		dataIndex: "company",
		key: "company",
		render: (company, item) =>
			company.companyName ? (
				<Link to={`/admin/company/${item?.companyId}`}>
					{company?.companyName}
				</Link>
			) : (
				"-"
			),
	},

	{
		title: "Stage",
		key: "Stage",
		dataIndex: "opportunityStage",
		render: (field) => field?.opportunityStageName,
	},

	{
		title: "Type",
		dataIndex: "opportunityType",
		key: "opportunityType",
		render: (opportunityType) => opportunityType?.opportunityTypeName,
	},
	{
		title: "Source",
		dataIndex: "opportunitySource",
		key: "opportunitySource",
		render: (opportunitySource) => opportunitySource?.opportunitySourceName,
	},
	{
		title: "Create date",
		dataIndex: "createdAt",
		key: "createdAt",
		render: (date) => moment(date).format("MMMM Do YYYY"),
	},
	{
		title: "Action",
		dataIndex: "id",
		key: "action",
		render: (id) => (
			<div className='flex justify-start'>
				<ViewBtn path={`/admin/opportunity/${id}`} />
			</div>
		),
	},
];

const Opportunity = () => {
	const dispatch = useDispatch();
	// Drawer state
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	/// filter
	const [isFilter, setFilter] = useState(false);
	const filterToggle = () => {
		setFilter((prev) => !prev);
	};
	const { Option } = Select;
	const opportunityType =
		useSelector((state) => state.opportunityType.list) || [];
	const opportunityStage =
		useSelector((state) => state.opportunityStage.list) || [];
	const opportunitySource =
		useSelector((state) => state.opportunitySource.list) || [];
	const company = useSelector((state) => state.company.list) || [];
	const contact = useSelector((state) => state.contact.list) || [];
	const opportunityOwner = useSelector((state) => state.users.list) || [];
	const { list, loading, total } = useSelector((state) => state.opportunity);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		dispatch(
			loadAllOpportunityPaginated({
				...values,
			})
		);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		dispatch(loadAllContact());
		dispatch(loadAllCompany());
		dispatch(loadAllOpportunitySource());
		dispatch(loadAllOpportunityStage());
		dispatch(loadAllOpportunityType());
		dispatch(loadAllStaff({ status: true }));
		dispatch(loadAllOpportunityPaginated({ status: true }));
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
						<CrmSearch paginatedThunk={loadAllOpportunityPaginated} />
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
									name='opportunityOwner'
									className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Owner'
										maxTagCount={0}
										maxTagPlaceholder={
											<div className='w-[150px]'>Opportunity Owner</div>
										}>
										{opportunityOwner?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item?.firstName} {item?.lastName}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									name='opportunitySource'
									className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Source'
										maxTagCount={0}
										maxTagPlaceholder={<div className='w-[150px]'>Source</div>}>
										{opportunitySource?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.opportunitySourceName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									name='opportunityStage'
									className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Stage'
										maxTagCount={0}
										maxTagPlaceholder={<div className='w-[150px]'>Stage</div>}>
										{opportunityStage?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.opportunityStageName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									name='opportunityType'
									className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Type'
										maxTagCount={0}
										maxTagPlaceholder={<div className='w-[150px]'>Type</div>}>
										{opportunityType?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item.opportunityTypeName}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='contact' className='w-full md:w-[180px]'>
									<Select
										mode='multiple'
										style={{ width: "100%" }}
										placeholder='Select Contact'
										maxTagCount={0}
										maxTagPlaceholder={
											<div className='w-[150px]'>Contact</div>
										}>
										{contact?.map((item) => (
											<Option key={item.id} value={item.id}>
												{item?.firstName} {item?.lastName}
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
										defaultValue={["true"]}>
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
					<UserPrivateComponent permission='create-opportunity'>
						<button
							onClick={() => setOpen(true)}
							className='py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer flex items-center gap-2'>
							<AiOutlinePlus /> Create Opportunity
						</button>
					</UserPrivateComponent>
				)}
			</div>
			<UserPrivateComponent permission='readAll-opportunity'>
				<TableComponent
					list={list}
					total={total}
					loading={loading}
					columns={columns}
					paginatedThunk={loadAllOpportunityPaginated}
					deleteManyThunk={deleteManyOpportunity}
					csvFileName={"Opportunity-List"}
				/>
			</UserPrivateComponent>

			<UserPrivateComponent permission='create-opportunity'>
				<CreateDrawer onClose={onClose} open={open} title={"Opportunity"}>
					<CreateOpportunityForm onClose={onClose} open={open} />
				</CreateDrawer>
			</UserPrivateComponent>
		</div>
	);
};
export default Opportunity;
