import { Card, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  loadAllProduct,
} from "../../../redux/rtk/features/crm/product/productSlice";
import ColVisibilityDropdown from "../../Shared/ColVisibilityDropdown";
import CustomDrawer from "../CommonUi/CustomDrawer";
import CreateProductForm from "./CreateProductForm";

const TableComponent = () => {
  const dispatch = useDispatch();
  const { list: productList, loading } = useSelector((state) => state.product);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {

    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    dispatch(loadAllProduct());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
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
    {
      title: "Action",
      dataIndex: "id",
      render: (id, values) => (
        <span className='flex items-center gap-2'>
          <CustomDrawer
            permission={"update-product"}
            update
            title={"Update Product"}
            width={25}
          >
            <CreateProductForm edit={{ id, values }} />
          </CustomDrawer>
          <span
            onClick={() => deleteHandler(id)}
            className='bg-red-500 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded'
          >
            <AiFillDelete className='text-white' />
          </span>
        </span>
      ),
    },
  ];

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
  }, []);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };
  return (
    <Card className='border mt-2'>
      <div className='flex justify-between items-center'>
        <div>
          {/* <Input
            placeholder='Search Name, Phone or Domain'
            id=''
            suffix={<BiSearch />}
          /> */}
        </div>
        <div className='flex items-center gap-2'>
          <span className='border px-2 py-1 rounded cursor-pointer bg-black text-white'>
            <CSVLink
              data={productList}
              className='btn btn-dark btn-sm'
              style={{ marginTop: "5px" }}
              filename='Products_CRM-OS'
            >
              Download CSV
            </CSVLink>
          </span>
          <ColVisibilityDropdown
            options={columns}
            columns={columns}
            columnsToShowHandler={columnsToShowHandler}
          />
        </div>
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
        columns={columnsToShow}
        dataSource={productList?.map((item) => ({ ...item, key: item.id }))}
        pagination={false}
        scroll={{ x: 500 }}
      />
    </Card>
  );
};
export default TableComponent;
