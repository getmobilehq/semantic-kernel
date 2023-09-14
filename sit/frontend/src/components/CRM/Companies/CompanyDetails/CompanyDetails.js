import { Layout } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearCompany,
  loadSinglCompany,
} from "../../../../redux/rtk/features/crm/company/companySlice";
import Attachments from "../../CommonUi/Attachments";
import Emails from "../../CommonUi/Emails";
import Notes from "../../CommonUi/Notes";
import Opportunities from "../../CommonUi/Opportunities";
import Quotes from "../../CommonUi/Quotes";
import Tasks from "../../CommonUi/Tasks";
import CompanyInfo from "./CompanyInfo";
import CompanyProfile from "./CompanyProfile";
import Contacts from "./Contacts";

export default function CompanyDetails() {
  const { CompanyId: id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { company, loading: companyLoading } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(loadSinglCompany(id));
    return () => {
      clearCompany();
    };
  }, [dispatch, id]);

  const emailRef = useRef(null);
  const noteRef = useRef(null);
  const opportunityRef = useRef(null);
  const attachmentRef = useRef(null);
  const quoteRef = useRef(null);
  const taskRef = useRef(null);
  const contactRef = useRef(null);

  const handleEmailClick = () => {
    emailRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpportunityClick = () => {
    opportunityRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleNoteClick = () => {
    noteRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleTaskClick = () => {
    taskRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleQuoteClick = () => {
    quoteRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleAttachmentClick = () => {
    attachmentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleContactClick = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Layout>
        <Layout.Sider
          className='dark:bg-DTableBg dark:text-white hidden md:block'
          collapsible
          trigger={null}
          collapsed={collapsed}
        >
          {!collapsed && (
            <div className='flex items-start flex-col gap-1 select-none'>
              <div className='w-full p-2 mb-10 flex justify-end'>
                <TbLayoutSidebarRightExpand
                  onClick={() => setCollapsed(true)}
                  className='text-3xl inline-block'
                />
              </div>

              <div
                onClick={handleOpportunityClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Opportunities
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.opportunity?.length}
                </span>
              </div>

              <div
                onClick={handleTaskClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Tasks
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.crmTask?.length}
                </span>
              </div>
              <div
                onClick={handleContactClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Contacts
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.contact?.length}
                </span>
              </div>

              <div
                onClick={handleNoteClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Notes
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.note?.length}
                </span>
              </div>
              <div
                onClick={handleAttachmentClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Attachments
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.attachment?.length}
                </span>
              </div>
              <div
                onClick={handleEmailClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Emails
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.crmEmail?.length}
                </span>
              </div>
              <div
                onClick={handleQuoteClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Quotes
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.quote?.length}
                </span>
              </div>
            </div>
          )}
        </Layout.Sider>
        <Layout.Content>
          <div
            className='container overflow-y-auto overflow-x-hidden flex flex-col gap-8'
            style={{ height: "calc(100vh - 114px)" }}
          >
            {collapsed && (
              <div className='p-1 absolute left-0 z-10'>
                <TbLayoutSidebarRightCollapse
                  onClick={() => setCollapsed(false)}
                  className='text-3xl inline-block'
                />
              </div>
            )}
            <CompanyProfile data={company} loading={companyLoading} />
            <CompanyInfo data={company} loading={companyLoading} />
            <div ref={opportunityRef}>
              <Opportunities
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div>
            <div ref={taskRef}>
              <Tasks
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div>
            <div ref={contactRef}>
              <Contacts
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div>
            <div ref={noteRef}>
              <Notes
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div>
            <div ref={attachmentRef}>
              <Attachments
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div>
            <div ref={emailRef}>
              <Emails
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div>
            <div ref={quoteRef}>
              <Quotes
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
