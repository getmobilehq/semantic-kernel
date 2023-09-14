import { EditFilled } from "@ant-design/icons";
import { Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadSingleTicket,
  updateTicket,
} from "../../../../redux/rtk/features/crm/ticket/ticketSlice";
import { loadAllTicketStatus } from "../../../../redux/rtk/features/crm/ticketStatus/ticketStatusSlice";
import UserPrivateComponent from "../../../PrivateRoutes/UserPrivateComponent";
const TicketStatusUpdate = () => {
  const [open, setOpen] = useState(false);
  const [ticketStatusId, setTicketStatusId] = useState("");
  const { ticket, loading } = useSelector((state) => state.ticket);
  const { list, loading: ticketStatusLoading } = useSelector(
    (state) => state.ticketStatus
  );
  const { id } = useParams("id");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllTicketStatus());
  }, [dispatch]);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    const resp = await dispatch(
      updateTicket({ id: id, values: { ticketStatusId: ticketStatusId } })
    );
    if (resp.payload.message === "success") {
      dispatch(loadSingleTicket(id));
      setOpen(false);
      setTicketStatusId("");
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setTicketStatusId("");
  };
  return (
    <>
      <UserPrivateComponent permission={"update-ticket"}>
        <Button
          icon={<EditFilled />}
          type='primary'
          onClick={showModal}
          size='small'
          className='flex items-center gap-1'
        >
          Update Status
        </Button>
      </UserPrivateComponent>

      <Modal
        title='Update Ticket Status'
        open={open}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Select
          className='flex justify-center'
          defaultValue={ticket.ticketStatus.ticketStatusName}
          loading={ticketStatusLoading}
          onChange={(value) => {
            setTicketStatusId(value);
          }}
        >
          {list.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.ticketStatusName}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};
export default TicketStatusUpdate;
