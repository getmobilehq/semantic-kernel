import { AiOutlineSetting } from "react-icons/ai";
import { BsAward, BsPersonWorkspace } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function Setup() {
  return (
    <>
      <div
        // style={{
        //   height: "calc(100vh - 400px)",
        // }}
        className='flex  justify-center items-center overflow-hidden h-[calc(100vh-200px)]  md:h-[calc(100vh-400px)]'
      >
        <div className='flex flex-wrap items-center justify-center gap-8'>
          <Link
            className='flex flex-col items-center gap-2 text-xl'
            to={"/admin/setup/account/balance-sheet"}
          >
            <div className='px-5 md:px-8 py-5 bg-teal-700 hover:bg-teal-500 text-white font-bold rounded flex items-center justify-center'>
              <MdAccountBalance className='text-3xl text-white fill-white' />
            </div>
            Balance Sheet
          </Link>
          <Link
            className='flex flex-col items-center gap-2 text-xl'
            to={"/admin/setup/staffs"}
          >
            <div className='px-5 md:px-8 py-5 bg-teal-700 hover:bg-teal-500 text-white font-bold rounded flex items-center justify-center'>
              <BsPersonWorkspace className='text-3xl text-white fill-white' />
            </div>
            Employee List
          </Link>
          <Link
            className='flex flex-col items-center gap-2 text-xl'
            to={"/admin/setup/announcement"}
          >
            <div className='px-5 md:px-8 py-5 bg-teal-700 hover:bg-teal-500 text-white font-bold rounded flex items-center justify-center'>
              <TfiAnnouncement className='text-3xl text-white fill-white' />
            </div>
            Announcement
          </Link>
          <Link
            className='flex flex-col items-center gap-2 text-xl'
            to={"/admin/setup/award"}
          >
            <div className='px-5 md:px-8 py-5 bg-teal-700 hover:bg-teal-500 text-white font-bold rounded flex items-center justify-center'>
              <BsAward className='text-3xl text-white fill-white' />
            </div>
            Award
          </Link>
          <Link
            className='flex flex-col items-center gap-2 text-xl'
            to={"/admin/setup/company-setting"}
          >
            <div className='px-5 md:px-8 py-5 bg-teal-700 hover:bg-teal-500 text-white font-bold rounded flex items-center justify-center'>
              <AiOutlineSetting className='text-3xl text-white fill-white' />
            </div>
            Company Setting
          </Link>
        </div>
      </div>
    </>
  );
}
