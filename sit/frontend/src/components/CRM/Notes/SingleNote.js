import { Card, Drawer } from "antd";
import moment from "moment";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import NoteUpdate from "./NoteUpdate";

export default function SingleNote({ onClose, note }) {
  const [isEdit, setEdit] = useState();

  const editToggle = () => {
    setEdit((prev) => !prev);
  };
  const closeHandler = () => {
    onClose(false);
  };

  return (
    <>
      <UserPrivateComponent permission={"readSingle-note"}>
        <Drawer
          title='Note'
          extra={
            isEdit ? (
              <div
                onClick={editToggle}
                className='select-none py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer  flex items-center justify-center gap-2'
              >
                <CgFileDocument />
                View Note
              </div>
            ) : (
              <div
                onClick={editToggle}
                className='select-none py-2 px-3 border bg-teal-700 hover:bg-teal-500 text-white rounded cursor-pointer  flex items-center justify-center gap-2'
              >
                <AiFillEdit />
                Edit Note
              </div>
            )
          }
          open={!!note}
          onClose={closeHandler}
          width={1000}
        >
          {!isEdit ? (
            <Card>
              <div className='flex justify-evenly items-center gap-10 border-b py-2'>
                {note?.contact && (
                  <div className='flex flex-col items-center gap-2'>
                    <span className='font-bold'>Contact</span>
                    <Link to={`/admin/contact/${note.contact?.id}`}>
                      {note.contact?.firstName} {note.contact?.lastName}
                    </Link>
                  </div>
                )}
                {note?.company && (
                  <div className='flex flex-col items-center gap-2'>
                    <span className='font-bold'>Company</span>
                    <Link to={`/admin/company/${note.company?.id}`}>
                      {note.company?.companyName}
                    </Link>
                  </div>
                )}
                {note?.opportunity && (
                  <div className='flex flex-col items-center gap-2'>
                    <span className='font-bold'>Opportunity</span>
                    <Link to={`/admin/opportunity/${note.opportunity?.id}`}>
                      {note.opportunity?.opportunityName}
                    </Link>
                  </div>
                )}
                {note?.quote && (
                  <div className='flex flex-col items-center gap-2'>
                    <span className='font-bold'>Quote</span>
                    <Link to={`/admin/quote/${note.quote?.id}`}>
                      {note.quote?.quoteName}
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <div className='p-5'>
                  <p className='text-xl font-bold'>{note?.title}</p>
                  {note && <small>{moment(note.createdAt).fromNow()}</small>}
                </div>
                <p className='px-5'>{note?.description}</p>
              </div>
            </Card>
          ) : (
            <NoteUpdate onClose={editToggle} id={note?.id} note={note} />
          )}
        </Drawer>
      </UserPrivateComponent>
    </>
  );
}
