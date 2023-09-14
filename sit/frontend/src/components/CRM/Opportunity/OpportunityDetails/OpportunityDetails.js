import { Layout } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearOpportunity,
  loadSingleOpportunity,
} from "../../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllOpportunityStage } from "../../../../redux/rtk/features/crm/opportunityStage/opportunityStageSlice";
import Attachments from "../../CommonUi/Attachments";
import Emails from "../../CommonUi/Emails";
import Notes from "../../CommonUi/Notes";
import Quotes from "../../CommonUi/Quotes";
import Tasks from "../../CommonUi/Tasks";
import DetailsInfo from "./DetailsInfo";
import OpportunityProfile from "./OpportunityProfile";
import StageChanger from "./StageChanger";

export default function OpportunityDetails() {
  const { OpportunityId: id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { opportunity, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity
  );
  const { list: opportunityStage } = useSelector(
    (state) => state.opportunityStage
  );

  useEffect(() => {
    dispatch(loadSingleOpportunity(id));
    dispatch(loadAllOpportunityStage());
    return () => {
      clearOpportunity();
    };
  }, [dispatch, id]);

  const emailRef = useRef(null);
  const noteRef = useRef(null);
  const attachmentRef = useRef(null);
  const quoteRef = useRef(null);
  const taskRef = useRef(null);

  const handleEmailClick = () => {
    emailRef.current.scrollIntoView({ behavior: "smooth" });
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
                onClick={handleTaskClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Tasks
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {opportunity?.crmTask?.length}
                </span>
              </div>

              <div
                onClick={handleNoteClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Notes
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {opportunity?.note?.length}
                </span>
              </div>
              <div
                onClick={handleAttachmentClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Attachments
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {opportunity?.attachment?.length}
                </span>
              </div>
              <div
                onClick={handleEmailClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Emails
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {opportunity?.crmEmail?.length}
                </span>
              </div>
              <div
                onClick={handleQuoteClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Quotes
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {opportunity?.quote?.length}
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
            <StageChanger
              opportunityStage={opportunityStage}
              currentStage={opportunity}
            />
            <OpportunityProfile
              data={opportunity}
              loading={opportunityLoading}
            />
            <DetailsInfo data={opportunity} loading={opportunityLoading} />
            <div ref={taskRef}>
              <Tasks
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
            <div ref={noteRef}>
              <Notes
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
            <div ref={attachmentRef}>
              <Attachments
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
            <div ref={emailRef}>
              <Emails
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
            <div ref={quoteRef}>
              <Quotes
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
