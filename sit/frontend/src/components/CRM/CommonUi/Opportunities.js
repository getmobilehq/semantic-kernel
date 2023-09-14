import { Button, Card, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateOpportunityForm from "../Opportunity/CreateOpportunityForm";
import CreateDrawer from "./CreateDrawer";
import UpdateDrawer from "./UpdateDrawer";

export default function Opportunities({
  data,
  loading,
  name,
  singleLoadThunk,
}) {
  // Drawer state
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const onCloseEdit = () => {
    setEdit(false);
  };

  const columns = [
    {
      title: "Name",
      key: "Opportunity Name",
      render: ({ opportunityName, id }) =>
        id ? (
          <Link to={`/admin/opportunity/${id}`}>{opportunityName}</Link>
        ) : (
          "-"
        ),
      sorter: (a, b) => a.opportunityName.localeCompare(b.opportunityName),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      amount: "amount",
    },

    {
      title: "Stage",
      key: "Stage",
      dataIndex: "opportunityStage",
      render: (field) => field?.opportunityStageName,
    },

    {
      title: "Type",
      dataIndex: "opportunityType",
      key: "opportunityType",
      render: (opportunityType) => opportunityType?.opportunityTypeName,
    },
    {
      title: "Source",
      dataIndex: "opportunitySource",
      key: "opportunitySource",
      render: (opportunitySource) => opportunitySource?.opportunitySourceName,
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, opportunity) => (
        <span
          onClick={() => setEdit(opportunity)}
          className='bg-teal-500 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded'
        >
          <BiEdit className='text-white' />
        </span>
      ),
    },
  ];
  return (
    <Card
      title={<span className='font-bold'>Opportunities</span>}
      extra={
        <UserPrivateComponent permission='create-opportunity'>
          <Button
            onClick={() => setOpen(true)}
            className='flex items-center'
            icon={<BiPlus />}
          >
            Add
          </Button>
        </UserPrivateComponent>
      }
      bodyStyle={{ padding: 0 }}
    >
      <div>
        <UserPrivateComponent permission='readAll-opportunity'>
          <Table
            bordered
            columns={columns}
            loading={loading}
            dataSource={data ? data.opportunity : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 300 }}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission='create-opportunity'>
        <CreateDrawer onClose={onClose} open={open} title={"Opportunity"}>
          <CreateOpportunityForm
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          />
        </CreateDrawer>
      </UserPrivateComponent>
      {/* // edit */}
      <UserPrivateComponent permission='update-opportunity'>
        <UpdateDrawer onClose={onCloseEdit} open={!!edit} title={"Opportunity"}>
          <CreateOpportunityForm
            onClose={onCloseEdit}
            open={!!edit}
            edit={edit}
            singleLoad={{ thunk: singleLoadThunk, id: data?.id }}
          />
        </UpdateDrawer>
      </UserPrivateComponent>
    </Card>
  );
}
