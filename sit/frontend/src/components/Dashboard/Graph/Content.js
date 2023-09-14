import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllCompanyPaginated } from "../../../redux/rtk/features/crm/company/companySlice";
import { loadAllContactPaginated } from "../../../redux/rtk/features/crm/contact/contactSlice";
import { loadAllOpportunityPaginated } from "./../../../redux/rtk/features/crm/opportunity/opportunitySlice";
import { loadAllQuotePaginated } from "./../../../redux/rtk/features/crm/quote/quoteSlice";
import DashboardTable from "./DashboardTable";

const contactColumns = [
  {
    title: "Name",
    key: "name",
    render: ({ firstName, lastName, id }) =>
      id ? (
        <Link to={`/admin/contact/${id}`}>
          {firstName} {lastName}
        </Link>
      ) : (
        "-"
      ),
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Phone number",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Create Date",
    dataIndex: "createdAt",
    render: (date) => moment(date).format("MMMM Do YYYY"),
  },
];

const companyColumns = [
  {
    title: "Name",
    key: "COMPANY NAME",
    render: ({ companyName, id }) =>
      id ? <Link to={`/admin/company/${id}`}>{companyName}</Link> : "-",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Create Date",
    dataIndex: "createdAt",
    render: (date) => moment(date).format("MMMM Do YYYY"),
  },
];

const opportunityColumns = [
  {
    title: "Name",
    key: "Opportunity Name",
    render: ({ opportunityName, id }) =>
      id ? <Link to={`/admin/opportunity/${id}`}>{opportunityName}</Link> : "-",
  },
  {
    title: "Owner",
    dataIndex: "opportunityOwner",
    key: "owner",
    render: (opportunityOwner, item) => (
      <Link to={`/admin/setup/staffs/${item?.opportunityOwnerId}`}>
        {opportunityOwner.firstName} {opportunityOwner.lastName}
      </Link>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    amount: "amount",
  },
  {
    title: "Create Date",
    dataIndex: "createdAt",
    render: (date) => moment(date).format("MMMM Do YYYY"),
  },
];

const quoteColumns = [
  {
    title: "Name",
    key: "quoteName",
    render: ({ quoteName, id }) =>
      id ? <Link to={`/admin/quote/${id}`}>{quoteName}</Link> : "-",
  },
  {
    title: "Owner",
    dataIndex: "quoteOwner",
    render: (quoteOwner, item) => (
      <Link to={`/admin/setup/staffs/${item?.quoteOwnerId}`}>
        {quoteOwner.firstName} {quoteOwner.lastName}
      </Link>
    ),
  },
  {
    title: "Quotation Date",
    dataIndex: "quotationDate",
    render: (date) => moment(date).format("MMMM Do YYYY"),
  },
  {
    title: "Create Date",
    dataIndex: "createdAt",
    render: (date) => moment(date).format("MMMM Do YYYY"),
  },
];

export default function Content() {
  const dispatch = useDispatch();
  const { list: contactList, contactLoading } = useSelector(
    (state) => state.contact
  );
  const { list: companyList, companyLoading } = useSelector(
    (state) => state.company
  );
  const { list: opportunityList, opportunityLoading } = useSelector(
    (state) => state.opportunity
  );
  const { list: quoteList, quoteLoading } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(loadAllContactPaginated({ status: true, count: 5 }));
    dispatch(loadAllCompanyPaginated({ status: true, count: 5 }));
    dispatch(loadAllOpportunityPaginated({ status: true, count: 5 }));
    dispatch(loadAllQuotePaginated({ status: true, count: 5 }));
  }, [dispatch]);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3 pb-3'>
      <div className='w-full md:col-span-1'>
        <DashboardTable
          list={contactList}
          loading={contactLoading}
          title={"Recent contacts"}
          columns={contactColumns}
          slug={"contact"}
        />
      </div>
      <div className='w-full md:col-span-1'>
        <DashboardTable
          list={companyList}
          loading={companyLoading}
          title={"Recent companies"}
          columns={companyColumns}
          slug={"company"}
        />
      </div>
      <div className='w-full md:col-span-1'>
        <DashboardTable
          list={opportunityList}
          loading={opportunityLoading}
          title={"Recent opportunities"}
          columns={opportunityColumns}
          slug={"opportunity"}
        />
      </div>
      <div className='w-full md:col-span-1'>
        <DashboardTable
          list={quoteList}
          loading={quoteLoading}
          title={"Recent quotes"}
          columns={quoteColumns}
          slug={"quote"}
        />
      </div>
    </div>
  );
}
