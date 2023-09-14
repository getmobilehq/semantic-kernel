import { Button, Card, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import ColVisibilityDropdown from "../../Shared/ColVisibilityDropdown";
import BulkDelete from "./BulkDelete";

const TableComponent = ({
  columns,
  list,
  total,
  loading,
  csvFileName,
  paginatedThunk,
  deleteManyThunk,
  children,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dispatch = useDispatch();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const fetchData = (page, count) => {
    dispatch(paginatedThunk({ status: true, page, count }));
  };

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  return (
    <>
      <Card className='border mt-2'>
        <div className='pb-3'>
          <div className='w-full flex flex-col md:flex-row gap-2 items-center justify-between'>
            <div className='flex gap-2'>
              {!!selectedRowKeys.length && (
                <>
                  <BulkDelete
                    setSelected={setSelectedRowKeys}
                    selected={selectedRowKeys}
                    updateThunk={deleteManyThunk}
                    loadThunk={paginatedThunk}
                  />
                </>
              )}

              <Button type='primary'>
                <CSVLink
                  data={list ? list : ""}
                  className='btn btn-dark btn-sm'
                  style={{ marginTop: "5px" }}
                  filename={csvFileName}
                >
                  Download CSV
                </CSVLink>
              </Button>
              <ColVisibilityDropdown
                options={columns}
                columns={columns}
                columnsToShowHandler={columnsToShowHandler}
              />
            </div>

            <div className=''>
              {total >= 1 && (
                <Pagination
                  total={total}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                  onChange={fetchData}
                  defaultPageSize={10}
                  defaultCurrent={1}
                  showSizeChanger={total > 10}
                />
              )}
            </div>
          </div>
        </div>

        <Table
          loading={loading}
          rowSelection={rowSelection}
          columns={columnsToShow}
          dataSource={list?.map((item) => ({ ...item, key: item.id }))}
          pagination={false}
          scroll={{ x: 1000, y: window.innerHeight - 350 }}
        />
      </Card>
      {children && children}
    </>
  );
};
export default TableComponent;
