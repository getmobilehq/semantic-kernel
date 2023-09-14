import { Button, Card, Form, Input, Table } from "antd";

import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	addEmploymentStatus,
	loadAllEmploymentStatus,
} from "../../redux/rtk/features/employemntStatus/employmentStatusSlice";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";

import { HexColorPicker } from "react-colorful";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const EmploymentStatus = ({}) => {
	const dispatch = useDispatch();
	const { list, loading } = useSelector((state) => state.employmentStatus);

	useEffect(() => {
		dispatch(loadAllEmploymentStatus());
	}, []);

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
			title: "Color Code",
			dataIndex: "colourValue",
			key: "colourValue",
			render: (colourValue) => (
				<div className='flex'>
					<div
						className='rounded border border-gray-200'
						style={{
							marginRight: "10px",
							width: "20px",
							height: "20px",
							backgroundColor: colourValue,
						}}></div>
					{colourValue}
				</div>
			),
		},

		{
			id: 4,
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			id: 5,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => (
				<ViewBtn path={`/admin/setup/employment-status/${id}/`} />
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

	return (
		<UserPrivateComponent permission={"readAll-employmentStatus"}>
			<Card>
				<div className='text-center my-2 flex justify-between'>
					<h5 className='department-list-title text-color-2 text-xl mb-2'>
						Employement Status
					</h5>
					<BigDrawer btnTitle={"Add Employment Status"} title={"Status"}>
						<AddEmploymentStatus />
					</BigDrawer>
				</div>

				<div className='flex items-center gap-3 mb-5'>
					{list && (
						<ColVisibilityDropdown
							options={columns}
							columns={columns}
							columnsToShowHandler={columnsToShowHandler}
						/>
					)}
					{list && (
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='shift'>
								Download CSV
							</CSVLink>
						</CsvLinkBtn>
					)}
				</div>

				<Table
					scroll={{ x: true }}
					loading={loading}
					columns={columnsToShow}
					dataSource={list ? addKeys(list) : []}
				/>
			</Card>
		</UserPrivateComponent>
	);
};

export default EmploymentStatus;

function AddEmploymentStatus() {
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const [color, setColor] = useState("#ffffff");
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const FormData = {
			...values,
			colourValue: color,
		};

		setLoader(true);
		const resp = await dispatch(addEmploymentStatus(FormData));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllEmploymentStatus());
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding shift");
		setLoader(false);
	};

	return (
		<UserPrivateComponent permission={"create-employmentStatus"}>
			<Form
				form={form}
				style={{ marginTop: "40px" }}
				eventKey='shift-form'
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
						style={{ marginBottom: "10px" }}
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: "Please input your shift!",
							},
						]}>
						<Input placeholder='Parmanet' />
					</Form.Item>

					<Form.Item
						style={{ marginBottom: "10px" }}
						label='Color Code'
						name='colourValue'>
						<Input
							placeholder='#00FF00'
							value={color}
							onChange={(e) => setColor(e.target.value)}
							onClick={() => setShowColorPicker(true)}
						/>
						{showColorPicker && (
							<div className='flex justify-between mt-3 mb-3'>
								<HexColorPicker onChange={(i) => setColor(i)} color={color} />
								<Button type='danger' onClick={() => setShowColorPicker(false)}>
									Close
								</Button>
							</div>
						)}
					</Form.Item>

					<Form.Item
						style={{ marginBottom: "20px" }}
						label='Description'
						name={"description"}>
						<Input.TextArea placeholder='Description' />
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
							block
							htmlType='submit'
							loading={loader}>
							Add Employment Status
						</Button>
					</Form.Item>
				</div>
			</Form>
		</UserPrivateComponent>
	);
}
