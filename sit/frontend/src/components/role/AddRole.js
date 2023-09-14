import { Button, Card, Form, Input, Table, Typography } from "antd";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { addRole, loadAllRole } from "../../redux/rtk/features/role/roleSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AddRole = ({ list, setList }) => {
	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();

	const { Title } = Typography;

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await dispatch(addRole(values));

		if (resp.payload.message === "success") {
			setLoader(false);
			dispatch(loadAllRole());
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding role");
		setLoader(false);
	};

	return (
		<>
			<UserPrivateComponent permission={"create-role"}>
				<Form
					style={{ marginTop: "50px" }}
					eventKey='role-form'
					name='basic'
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 12,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<div>
						<Form.Item
							style={{ marginBottom: "20px" }}
							label='Name'
							name='name'
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							wrapperCol={{
								offset: 6,
								span: 12,
							}}>
							<Button
								onClick={() => setLoader(true)}
								type='primary'
								size='large'
								htmlType='submit'
								block
								loading={loader}>
								Add New Role
							</Button>
						</Form.Item>
					</div>
				</Form>
			</UserPrivateComponent>
		</>
	);
};

const Role = () => {
	const dispatch = useDispatch();
	const { list, loading } = useSelector((state) => state.role);

	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 2,
			title: "Name",
			dataIndex: "name",
			key: "name",
		},

		{
			id: 3,
			title: "Created at",
			dataIndex: "createdAt",
			key: "addrcreatedAtess",
			render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
		},
		{
			id: 4,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<>
					<UserPrivateComponent permission={"readSingle-role"}>
						<ViewBtn path={`/admin/setup/role/${id}`} />
					</UserPrivateComponent>
				</>
			),
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	useEffect(() => {
		dispatch(loadAllRole());
	}, []);

	return (
		<UserPrivateComponent permission={"readAll-role"}>
			<Card>
				<div className='text-center my-2 flex justify-between'>
					<h5 className='text-xl role-list-title mb-2'>Role List</h5>
					<BigDrawer btnTitle={"Add New Role"} title={"Role"}>
						<AddRole list={list} />
					</BigDrawer>
				</div>

				<div className='flex items-center gap-3 mb-5'>
					{list && (
						<div>
							<ColVisibilityDropdown
								options={columns}
								columns={columns}
								columnsToShowHandler={columnsToShowHandler}
							/>
						</div>
					)}
					{list && (
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='roles'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
					)}
				</div>

				<Table
					scroll={{ x: true }}
					loading={!list}
					columns={columnsToShow}
					dataSource={list ? addKeys(list) : []}
				/>
			</Card>
		</UserPrivateComponent>
	);
};

export default Role;
