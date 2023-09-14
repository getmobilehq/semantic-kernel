import { Button } from "antd";
import moment from "moment";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import getSetting from "../../../../api/getSettings";
import numberToWords from "../../../../utils/numberToWords";
import "./style.css";

const PrintToPdf = forwardRef(({ data, invoiceData, vatAmount }, ref) => {
  return (
    <>
      <div ref={ref} className='wrapper'>
        <div className='box2'>
          <h1 className='text-2xl font-semibold'>{invoiceData?.companyName}</h1>
          <h3 className='text-base font-medium'>{invoiceData?.tagLine}</h3>
          <p>{invoiceData?.address}</p>
          <p>{invoiceData?.phone}</p>
          <p>Email: {invoiceData?.email}</p>
          <p>Website: {invoiceData?.website}</p>
        </div>

        <div className='box4'>
          <hr className='hr1' />
          <h3 className='center font-medium'>Quote</h3>
          <hr className='hr1' />
        </div>

        <div className='box5'>
          {data?.contact ? (
            <table className='table2'>
              <tr>
                <th>Client ID</th>
                <td>{data?.contact.id}</td>
              </tr>
              <tr>
                <th>Client Name</th>
                <td>
                  {data?.contact.firstName} {data?.contact.lastName}
                </td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{data?.contact.presentAddress}</td>
              </tr>
              <tr>
                <th>Contact No</th>
                <td>{data?.contact?.phone}</td>
              </tr>
            </table>
          ) : (
            <>
              {data?.company && (
                <table className='table2'>
                  <tr>
                    <th>Client ID</th>
                    <td>{data?.company.id}</td>
                  </tr>
                  <tr>
                    <th>Client Name</th>
                    <td>{data?.company.companyName}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>
                      {data?.company.billingStreet} <br />
                      {data?.company.billingCity}
                    </td>
                  </tr>
                  <tr>
                    <th>Contact No</th>
                    <td>{data?.company.phone}</td>
                  </tr>
                </table>
              )}
            </>
          )}
        </div>

        <div className='box6'>
          <table className='table2'>
            <tr>
              <th>Quote Name</th>
              <td>{data?.quoteName}</td>
            </tr>
            <tr>
              <th>Quote Date</th>
              <td>{moment(data?.quoteDate).format("YYYY-MM-DD")}</td>
            </tr>
          </table>
        </div>

        <div className='box7'>
          <table className='table1'>
            <thead>
              <th>Sl</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </thead>
            <tbody>
              {data &&
                data.quoteProduct.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>
                      <p>{d.product.productName}</p>
                    </td>
                    <td>{d.productQuantity}</td>
                    <td>{d.unitPrice}</td>
                    <td>{d.productQuantity * d.unitPrice}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className='box9'>
          <table className='table2'>
            <tr>
              <th> Total</th>
              <td>{data?.totalAmount || 0}</td>
            </tr>
            <tr>
              <th>Discount (-)</th>
              <td>{data?.discount || 0}</td>
            </tr>
            <tr>
              <th>Grand total</th>
              <td>{data?.totalAmount - data?.discount || 0}</td>
            </tr>
          </table>
        </div>

        <div className='box10'>
          <hr />
          <p>Received By</p>
        </div>

        <div className='box11'>
          <hr />
          <p>Authorized By</p>
        </div>

        <div className='box12'>
          <hr />
          <p>Powered by CRM-OS | Contact: 01885 996601</p>
        </div>

        <div className='box13'>
          <p>
            <b>In Words: </b>
            {numberToWords(data?.totalAmount - data?.discount || 0)}
          </p>
        </div>
      </div>
    </>
  );
});

const Invoice = ({ data, vatAmount }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [invoiceData, setInvoiceData] = useState(null);
  useEffect(() => {
    getSetting().then((data) => setInvoiceData(data.result));
  }, []);

  return (
    <div>
      <div className='hidden'>
        <PrintToPdf
          ref={componentRef}
          data={data}
          invoiceData={invoiceData}
          vatAmount={vatAmount}
        />
      </div>
      {invoiceData && (
        <Button type='primary' shape='round' onClick={handlePrint}>
          Print PDF
        </Button>
      )}
    </div>
  );
};

export default Invoice;
