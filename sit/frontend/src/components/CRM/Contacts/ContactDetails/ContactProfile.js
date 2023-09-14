/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Button,
	Card,
	Dropdown,
	Form,
	Image,
	Input,
	Modal,
	Select,
	Skeleton,
} from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	deleteContact,
	loadAllContactPaginated,
	loadSingleContact,
	updateContact,
} from "../../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllStaff } from "../../../../redux/rtk/features/user/userSlice";
import getPermissions from "../../../../utils/getPermissions";
import UserPrivateComponent from "../../../PrivateRoutes/UserPrivateComponent";
import ImageUpload from "./../../CommonUi/ImageUpload";
import RemoveImage from "./../../CommonUi/RemoveImage";
import getImageUrl from "../../../../utils/getimageUrl";

export default function ContactProfile({ contact, contactLoading }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { ContactId: id } = useParams();
	const [form] = Form.useForm();
	const [triggerSave, setTriggerSave] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [visibleImage, setVisibleImage] = useState(false);

	const { list: ownerList, loading: ownerLoading } = useSelector(
		(state) => state.users
	);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// delete contact
	const onDelete = async () => {
		var result = window.confirm("Are you sure you want to delete?");
		if (result) {
			const resp = await dispatch(deleteContact(id));
			if (resp.payload.message === "success") {
				navigate(-1);
				dispatch(loadAllContactPaginated({}));
			}
		}
	};

	const itemsProfile = [
		contact?.image && {
			key: "1",
			label: <button onClick={() => setVisibleImage(true)}>View image</button>,
		},
		{
			key: "2",
			label: <button onClick={showModal}>Upload image</button>,
		},

		contact?.image && {
			key: "3",
			label: (
				<RemoveImage
					id={id}
					loadThunk={loadSingleContact}
					updateThunk={updateContact}
				/>
			),
		},
	];

	// contact profile edit form
	const permissions = getPermissions();
	const canEdit = permissions?.includes("update-contact");
	const onFinish = async (values) => {
		const formData = {
			...values,
			contactOwnerId: parseInt(values.contactOwnerId),
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
		dispatch(loadAllStaff({ status: true }));
	}, [dispatch]);

	return (
		<>
			<Skeleton loading={contactLoading} active>
				{contact && (
					<Card headStyle={{ display: "none" }} bodyStyle={{ padding: 0 }}>
						<Form
							form={form}
							colon={false}
							disabled={!canEdit}
							labelCol={{
								span: 2,
							}}
							wrapperCol={{
								span: 8,
							}}
							layout='inline'
							onFieldsChange={() => setTriggerSave(true)}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							initialValues={{
								firstName: contact?.firstName || "",
								lastName: contact?.lastName || "",
								contactOwnerId: contact?.contactOwnerId || "",
								email: contact?.email || "",
								phone: contact?.phone || "",
								jobTitle: contact?.jobTitle || "",
							}}>
							<div className='w-full'>
								<div className='flex justify-between items-center px-5 p-3 border-b'>
									<div className='flex items-end gap-5'>
										<div className='w-16 h-16 flex items-center justify-center rounded-full bg-slate-600 group relative'>
											{contact?.image && (
												<img
													className='w-full overflow-hidden rounded-full select-none'
													src={`${getImageUrl(contact?.image)}`}
													alt='logo'
												/>
											)}
											<Dropdown
												className='bg-blue-600'
												menu={{
													items: itemsProfile,
												}}
												placement='bottomLeft'
												arrow={{
													pointAtCenter: true,
												}}
												trigger={["click"]}>
												<div className='w-16 h-16 rounded-full bg-blue-600 cursor-pointer group hidden group-hover:flex absolute justify-center items-center'>
													<FaPencilAlt className='text-white text-xl' />
												</div>
											</Dropdown>
										</div>
										<div className='flex flex-col dark:text-white'>
											<span className='font-bold'>
												{contact?.firstName} {contact?.lastName}
											</span>
											{contact.jobTitle && contact.company?.companyName && (
												<span>
													{contact.jobTitle} at{" "}
													{
														<Link to={`/admin/company/${contact.companyId}`}>
															{contact.company?.companyName}
														</Link>
													}
												</span>
											)}
										</div>
									</div>
									<div className='flex items-center gap-2'>
										{triggerSave && (
											<Form.Item>
												<div className='flex items-center gap-4'>
													<Button type='primary' htmlType='submit'>
														Save
													</Button>
													<Button
														loading={contactLoading}
														type='danger'
														onClick={onFinishFailed}>
														Cancel
													</Button>
												</div>
											</Form.Item>
										)}
										<Button danger onClick={onDelete}>
											Delete
										</Button>
									</div>
								</div>
								<div className='flex flex-col gap-2 p-3'>
									<Form.Item
										className='flex flex-col'
										label='Contact Owner'
										name={"contactOwnerId"}>
										<Select
											className='md:ml-5'
											bordered={false}
											loading={ownerLoading}>
											{ownerList.map((item) => (
												<Select.Option key={item.id} value={item.id}>
													{item?.firstName} {item?.lastName}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item label='First Name' name='firstName'>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>
									<Form.Item label='Last Name' name='lastName'>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>

									<Form.Item label='Email' name={"email"}>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>

									<Form.Item label='Phone Number' name={"phone"}>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>
									<Form.Item label='Job Title' name={"jobTitle"}>
										<Input
											bordered={false}
											suffix={<BsFillPencilFill />}
											className='md:ml-5'
										/>
									</Form.Item>
								</div>
							</div>
						</Form>

						<Modal
							title='Upload a photo'
							open={isModalOpen}
							onOk={handleOk}
							onCancel={handleCancel}>
							<UserPrivateComponent permission='update-contact'>
								<ImageUpload
									handleCancel={handleCancel}
									id={id}
									loadThunk={loadSingleContact}
									updateThunk={updateContact}
								/>
							</UserPrivateComponent>
						</Modal>
						<Image
							style={{
								display: "none",
							}}
							src={`${getImageUrl(contact?.image)}`}
							preview={{
								visible: visibleImage,
								scaleStep: 1,
								src: `${getImageUrl(contact?.image)}`,
								onVisibleChange: (value) => {
									setVisibleImage(value);
								},
							}}
						/>
					</Card>
				)}
			</Skeleton>
		</>
	);
}
