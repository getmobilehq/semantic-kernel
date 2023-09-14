import { EllipsisOutlined } from "@ant-design/icons";
import { Card, Row, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";

import dayjs from "dayjs";
import {
  clearCustomer,
  loadSingleCustomer,
} from "../../../redux/rtk/features/crm/customer/customerSlice";
import getUserFromToken from "../../../utils/getUserFromToken";
import PopUpUpdateUser from "./PopUpUpdateUser";
import ResetUserPassword from "./ResetUserPassword";

export default function UserAccount() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);
  const id = getUserFromToken();
  const { Meta } = Card;
  useEffect(() => {
    dispatch(loadSingleCustomer(id));

    return () => {
      dispatch(clearCustomer());
    };
  }, [dispatch, id]);

  return (
    <Row justify={"center"} className=' font-poppins mt-4'>
      <Card
        className='w-full md:w-1/2'
        actions={[
          <ResetUserPassword customerId={customer?.id} />,
          <PopUpUpdateUser />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      >
        <Skeleton loading={!customer} avatar active>
          {/* <Meta
						avatar={<Avatar src='https://joesch.moe/api/v1/random' />}
						title={customer?.name}
						description={customer?.email}
					/> */}

          <h2 className='text-2xl font-semibold flex justify-center text-indigo-900 mb-2'>
            Customer Profile
          </h2>
          <div className='flex justify-center '>
            <ul className='list-inside list-none border-2 border-inherit dark:border-gray-700 rounded px-5 py-5 '>
              <ListItem>
                Name :{" "}
                <TextInside>{customer?.fullName.toUpperCase()}</TextInside>
              </ListItem>
              <ListItem>
                Email : <TextInside>{customer?.email}</TextInside>
              </ListItem>

              <ListItem>
                Phone : <TextInside>{customer?.phone}</TextInside>
              </ListItem>
              <ListItem>
                Date of Birth :{" "}
                <TextInside>
                  {customer?.dateOfBirth &&
                    dayjs(customer?.dateOfBirth).format("DD/MM/YYYY")}
                </TextInside>
              </ListItem>
              <ListItem>
                Job Title : <TextInside>{customer?.jobTitle}</TextInside>
              </ListItem>
              <ListItem>
                Social Media :{" "}
                <a
                  href={`https://${customer?.socialMediaUrl}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <TextInside>{customer?.socialMediaUrl}</TextInside>
                </a>
              </ListItem>
              <ListItem>
                Address : <TextInside>{customer?.address}</TextInside>
              </ListItem>

              <ListItem>
                City : <TextInside>{customer?.city}</TextInside>
              </ListItem>
              <ListItem>
                State : <TextInside>{customer?.state}</TextInside>
              </ListItem>
              <ListItem>
                Zip : <TextInside>{customer?.zip}</TextInside>
              </ListItem>
              <ListItem>
                Country : <TextInside>{customer?.country}</TextInside>
              </ListItem>
            </ul>
          </div>
        </Skeleton>
      </Card>
    </Row>
  );
}

const ListItem = tw.li`
text-sm
text-gray-600
font-semibold
py-2
px-4
bg-gray-100
mb-1.5
rounded
w-96
flex
justify-start
dark:bg-gray-800
dark:text-gray-400
dark:border-gray-700

`;

const TextInside = tw.p`
ml-2
text-sm
text-gray-800 
dark:text-gray-100

`;
