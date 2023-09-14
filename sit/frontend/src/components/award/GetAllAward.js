import { Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAward } from "../../redux/rtk/features/award/awardSlice";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import Loader from "../loader/loader";
import CustomDrawer from "./../CRM/CommonUi/CustomDrawer";
import AddAward from "./AddAward";

function GetAllAward() {
  const [columnsToShow, setColumnsToShow] = useState([]);
  const { list, loading } = useSelector((state) => state.award);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      id: 3,
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/setup/award/${id}/`} />,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(loadAllAward());
  }, [dispatch]);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <>
      {!loading ? (
        <Card className='mt-5'>
          <div className='text-center my-2 flex justify-between'>
            <h5 className='department-list-title text-color-2 text-xl mb-2'>
              Award List
            </h5>

            <CustomDrawer
              title={"Add Award"}
              permission={"create-award"}
              width={35}
            >
              <AddAward />
            </CustomDrawer>
          </div>

          <div className='flex items-center gap-3 mb-5'>
            {list && (
              <div>
                <ColVisibilityDropdown
                  options={columns}
                  columns={columns}
                  columnsToShowHandler={columnsToShowHandler}
                />
              </div>
            )}
            {list && (
              <div>
                <CsvLinkBtn>
                  <CSVLink
                    data={list}
                    className='btn btn-dark btn-sm mb-1'
                    filename='awards'
                  >
                    Download CSV
                  </CSVLink>
                </CsvLinkBtn>
              </div>
            )}
          </div>

          <Table
            scroll={{ x: true }}
            loading={!list || loading}
            columns={columnsToShow}
            dataSource={list ? addKeys(list) : []}
          />
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default GetAllAward;
