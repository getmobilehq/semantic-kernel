import { Card, Table } from "antd";
import { Link } from "react-router-dom";

export default function DashboardTable({
  loading,
  list,
  columns,
  title,
  slug,
}) {
  return (
    <>
      <Card
        headStyle={{ padding: "0px 16px" }}
        bodyStyle={{ padding: 0 }}
        style={{ height: 307 }}
        extra={
          <Link className='dark:text-white' to={`/admin/${slug}`}>
            View More
          </Link>
        }
        title={title}
        loading={loading}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={list?.map((item) => ({ ...item, key: item.id }))}
          pagination={false}
          scroll={{ x: 800 }}
        ></Table>
      </Card>
    </>
  );
}
