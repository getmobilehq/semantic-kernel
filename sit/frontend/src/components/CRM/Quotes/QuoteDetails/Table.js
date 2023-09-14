import { Table } from "antd";
import moment from "moment";
import { useState } from "react";
const columns = [
  {
    title: "NAME",
    dataIndex: "product",
    render: (product) => product.productName,
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
  },
  {
    title: "Quantity",
    dataIndex: "productQuantity",
  },
  {
    title: "Total",
    dataIndex: "productQuantity",
    render: (qyt, all) => qyt * all.unitPrice,
  },
  {
    title: "CREATE DATE(GMT+6)",
    dataIndex: "createdAt",
    render: (date) => moment(date).format("MMMM Do YYYY"),
  },
  {
    title: "UPDATE DATE(GMT+6)",
    dataIndex: "updatedAt",
    render: (date) => moment(date).format("MMMM Do YYYY"),
  },
];

const TableComponent = ({ loading, productList }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className='mt-2'>
      <div className='text-center p-3 font-bold text-xl mt-10'>
        Product List
      </div>
      <div>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={productList?.map((item) => ({ ...item, key: item.id }))}
        pagination={false}
        scroll={{ x: 1300 }}
      />
    </div>
  );
};
export default TableComponent;
