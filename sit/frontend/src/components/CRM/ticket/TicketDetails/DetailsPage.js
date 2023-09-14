import { Comment, Skeleton, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	clearTicket,
	loadSingleTicket,
} from "../../../../redux/rtk/features/crm/ticket/ticketSlice";
import Attachment from "./Comment/Attachment";
import TicketComment from "./Comment/TicketComment";
import TicketInformation from "./TicketInformation";
import TicketStatusUpdate from "./TicketStatusUpdate";

const DetailsComponent = ({ children, ticket }) => (
	<Comment
		author={
			<span className='dark:text-gray-400 text-base font-semibold text-gray-800'>
				Subject : {ticket?.subject}
			</span>
		}
		content={
			<>
				<p className=' dark:text-gray-400 ml-2 mt-4 mb-2'>
					{ticket?.description}
				</p>

				{ticket?.images?.length > 0 && (
					<span className='dark:text-gray-400 text-xs ml-2 font-semibold text-gray-800'>
						Attachments :
					</span>
				)}
				{ticket?.images?.length > 0 && (
					<Attachment attachments={ticket?.images} />
				)}
			</>
		}
		className='mb-4 p-4 rounded-lg '>
		{children}
	</Comment>
);

const TicketDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams("id");
	// const id = 1;
	const { ticket, loading } = useSelector((state) => state.ticket);

	useEffect(() => {
		dispatch(loadSingleTicket(id));
		return () => {
			dispatch(clearTicket());
		};
	}, [dispatch, id]);

	return (
		<div>
			<div className='container md:w-4/5'>
				<div className='flex justify-end p-2'>
					{ticket && <TicketStatusUpdate />}
				</div>
				<div className='p-6 rounded-lg bg-white dark:bg-gray-800'>
					<div>
						<div className='flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center'>
							<div className=''>
								<h1 className='text-xl flex flex-col md:flex-row gap-2 font-poppins txt-color-secondary mr-3'>
									Support Ticket
									<span className='flex items-center'>
										<span className='font-semibold'>#{ticket?.ticketId}</span>
										<Tag className='ml-2' color='green'>
											{ticket?.ticketStatus?.ticketStatusName}
										</Tag>
									</span>
								</h1>
							</div>
							<div className='flex flex-col md:flex-row items-center gap-2'>
								<TicketInformation ticket={ticket} />
								<h1 className='text-xl font-poppins txt-color-secondary'>
									{ticket?.customer?.fullName || "No Name"}
								</h1>
							</div>
						</div>
					</div>
					<Skeleton loading={loading}>
						<DetailsComponent ticket={ticket}>
							<TicketComment />
						</DetailsComponent>
					</Skeleton>
				</div>
			</div>
		</div>
	);
};
export default TicketDetails;
