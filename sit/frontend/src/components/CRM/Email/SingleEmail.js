import { Card, Collapse, Drawer } from "antd";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";

export default function SingleEmail({ email, setSingleEmail }) {
  const cancelHandler = () => {
    setSingleEmail(false);
  };

  return (
    <>
      <UserPrivateComponent permission={"readSingle-email"}>
        <Drawer
          title='Email'
          open={!!email}
          onClose={cancelHandler}
          width={1000}
        >
          <Card>
            <div className='flex justify-evenly items-center gap-10 border-b py-2'>
              {email?.contact && (
                <div className='flex flex-col items-center gap-2'>
                  <span className='font-bold'>Contact</span>
                  <Link to={`/admin/contact/${email.contact?.id}`}>
                    {email.contact?.firstName} {email.contact?.lastName}
                  </Link>
                </div>
              )}
              {email?.company && (
                <div className='flex flex-col items-center gap-2'>
                  <span className='font-bold'>Company</span>
                  <Link to={`/admin/company/${email.company?.id}`}>
                    {email.company?.companyName}
                  </Link>
                </div>
              )}
              {email?.opportunity && (
                <div className='flex flex-col items-center gap-2'>
                  <span className='font-bold'>Opportunity</span>
                  <Link to={`/admin/opportunity/${email.opportunity?.id}`}>
                    {email.opportunity?.opportunityName}
                  </Link>
                </div>
              )}
              {email?.quote && (
                <div className='flex flex-col items-center gap-2'>
                  <span className='font-bold'>Quote</span>
                  <Link to={`/admin/quote/${email.quote?.id}`}>
                    {email.quote?.quoteName}
                  </Link>
                </div>
              )}
            </div>
            <div className='border-t border-b px-5 py-3'>
              To <span className='font-bold ml-2'>{email?.receiverEmail}</span>
            </div>
            <Collapse
              className='bg-transparent'
              bordered={false}
              defaultActiveKey={[]}
            >
              {!!email?.cc?.length && (
                <Collapse.Panel header='CC' key='1'>
                  <div className='flex flex-wrap gap-2'>
                    {email.cc.map((item, index) => (
                      <span>
                        {item.ccEmail}
                        {index !== email.cc.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </Collapse.Panel>
              )}
              {!!email?.bcc?.length && (
                <Collapse.Panel header='BCC' key='2'>
                  <div className='flex flex-wrap gap-2'>
                    {email.bcc.map((item, index) => (
                      <span>
                        {item.bccEmail}
                        {index !== email.bcc.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </Collapse.Panel>
              )}
            </Collapse>
            <div className='border-t border-b px-5 py-3'>
              Subject: <span className='font-bold ml-2'>{email?.subject}</span>
            </div>
            <Collapse
              bordered={false}
              className='bg-transparent'
              defaultActiveKey={["1"]}
            >
              <Collapse.Panel header='Body' key='1'>
                <div dangerouslySetInnerHTML={{ __html: email?.body }} />
              </Collapse.Panel>
            </Collapse>
          </Card>
        </Drawer>
      </UserPrivateComponent>
    </>
  );
}
