import { Badge, Button, Card, Skeleton, Typography } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteQuote,
  loadAllQuotePaginated,
  loadSingleQuote,
} from "../../../../redux/rtk/features/crm/quote/quoteSlice";
import Invoice from "./Invoice";
import TableComponent from "./Table";

export default function QuoteDetails() {
  const { QuoteId: id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quote, loading } = useSelector((state) => state.quote) || {};

  const onDelete = async () => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const resp = await dispatch(deleteQuote(id));
      if (resp.payload.message === "success") {
        navigate(-1);
        dispatch(loadAllQuotePaginated({ status: true }));
      }
    }
  };

  useEffect(() => {
    dispatch(loadSingleQuote(id));
  }, [dispatch, id]);
  return (
    <>
      <div>
        <Card>
          <div className='flex justify-center gap-3 items-center p-3 mb-2'>
            <Button onClick={onDelete} type='danger'>
              Delete
            </Button>
            <Invoice data={quote} />
          </div>

          <div className='tw-mt-5'>
            <div className='flex flex-col md:flex-row gap-2'>
              <div className='w-full md:w-1/2'>
                <Card title='Quote Information'>
                  <Skeleton loading={loading}>
                    <p>
                      <Typography.Text strong>Quote Name :</Typography.Text>{" "}
                      <strong>{quote?.quoteName}</strong>
                    </p>

                    <p>
                      <Typography.Text strong>Quote Date :</Typography.Text>{" "}
                      <strong>
                        {moment(quote?.quoteDate).format("MMMM Do YYYY")}
                      </strong>
                    </p>

                    <p>
                      <Typography.Text strong>
                        Expiration Date :
                      </Typography.Text>{" "}
                      <strong>
                        {moment(quote?.expirationDate).format("MMMM Do YYYY")}
                      </strong>
                    </p>

                    <p>
                      <Typography.Text strong>Quote Stage :</Typography.Text>{" "}
                      <strong>{quote?.quoteStage?.quoteStageName}</strong>
                    </p>

                    <p>
                      <Typography.Text strong>
                        Terms And Conditions :
                      </Typography.Text>{" "}
                      <strong>{quote?.termsAndConditions}</strong>
                    </p>

                    <p>
                      <strong className='text-center block border-b py-1'>
                        Description
                      </strong>
                      {quote?.description}
                    </p>
                  </Skeleton>
                </Card>
              </div>
              <div className='w-full md:w-1/2'>
                <Badge.Ribbon
                  text={quote?.quoteStage?.quoteStageName}
                  className='tw-mt-10'
                >
                  <Card title='Price Summary'>
                    <Skeleton loading={loading}>
                      <p>
                        <Typography.Text strong>Total Amount :</Typography.Text>{" "}
                        <strong>{quote?.totalAmount}</strong>
                      </p>
                      <p>
                        <Typography.Text strong>Discount :</Typography.Text>{" "}
                        <strong>{quote?.discount}</strong>
                      </p>
                    </Skeleton>
                  </Card>
                </Badge.Ribbon>
              </div>
            </div>
          </div>
          <TableComponent loading={loading} productList={quote?.quoteProduct} />
        </Card>
      </div>
    </>
  );
}
