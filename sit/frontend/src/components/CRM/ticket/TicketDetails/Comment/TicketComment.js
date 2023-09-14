import { Avatar, Comment, Skeleton, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadAllTicketCommentByTicketId } from "../../../../../redux/rtk/features/crm/ticketComment/ticketCommentSlice";
import Attachment from "./Attachment";
import CommentModal from "./CommentModal";
dayjs.extend(relativeTime);

const TicketComment = () => {
	const dispatch = useDispatch();
	const { id } = useParams("id");

	const { list, loading } = useSelector((state) => state.ticketComment);

	useEffect(() => {
		dispatch(loadAllTicketCommentByTicketId(id));
	}, [dispatch, id]);

	return (
		<>
			<Skeleton loading={loading}>
				<div>
					{list?.map((item) => (
						<Comment
							className='bg-gray-100 dark:bg-gray-700 mb-2 rounded-lg px-2'
							author={item.repliedBy.toUpperCase()}
							avatar={
								<Avatar
									src='https://images.freeimages.com/images/large-previews/7e8/man-avatar-1632965.jpg'
									alt={item.repliedBy.toUpperCase()}
								/>
							}
							content={
								<div>
									<div>{item.description}</div>
									{item?.images?.length > 0 && (
										<div className='mt-2'>
											<span className='text-xs text-gray-900 font-semibold'>
												{" "}
												Attachments:{" "}
											</span>
											{item?.images?.length > 0 && (
												<Attachment attachments={item?.images} />
											)}
										</div>
									)}
								</div>
							}
							datetime={
								<Tooltip title={dayjs(item.createdAt).format("DD/MM/YYYY")}>
									<span>{dayjs(item.createdAt).fromNow()}</span>
								</Tooltip>
							}
						/>
					))}
				</div>
			</Skeleton>
			<div className='flex justify-center items-center mt-4'>
				<CommentModal />
			</div>
		</>
	);
};
export default TicketComment;
