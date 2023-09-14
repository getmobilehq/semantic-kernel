import { Tag } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
dayjs.extend(relativeTime);

const TicketInformation = ({ ticket }) => {
  return (
    <div className='flex justify-start'>
      <Tag>
        <span className=''>
          Category: {ticket?.ticketCategory?.ticketCategoryName}
        </span>
      </Tag>
      <Tag>
        <span className=''>
          Priority: {ticket?.ticketPriority?.ticketPriorityName}
        </span>
      </Tag>
      <Tag>
        <span className=''>
          Resolve Time:{" "}
          {Math.floor(ticket?.ticketResolveTime / 60) +
            ":" +
            (ticket?.ticketResolveTime % 60)}
        </span>
      </Tag>
    </div>
  );
};

export default TicketInformation;
