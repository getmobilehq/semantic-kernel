import { Modal } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import UpdateUserDetail from "./UpdateAccount";

const PopUpUpdateUser = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const customer = useSelector((state) => state.customer.customer);
	return (
		<>
			<EditOutlined key='edit' onClick={showModal} />
			<Modal
				title='Edit Account'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<UpdateUserDetail open={isModalOpen} customer={customer} />
			</Modal>
		</>
	);
};

export default PopUpUpdateUser;
