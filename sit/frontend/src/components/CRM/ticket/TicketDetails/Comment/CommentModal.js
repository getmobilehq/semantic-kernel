import { Button, Modal } from "antd";
import { useState } from "react";
import CreateCommentForm from "./CreateComment";
const CommentModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Button className='px-10' type='primary' onClick={showModal}>
				Reply
			</Button>
			<Modal
				onCancel={handleCancel}
				title='Reply Support Ticket'
				open={isModalOpen}
				footer={[<Button onClick={handleCancel}>Cancel</Button>]}>
				<CreateCommentForm setIsModalOpen={setIsModalOpen} />
			</Modal>
		</>
	);
};
export default CommentModal;
