import { Card, Col, Row } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import checkTokenExp from "../../../utils/checkTokenExp";

import AnnouncementBar from "./AnnouncementBar";
import Content from "./Content";
import DemoLine from "./Demoline";

const Dashboard = () => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  //Looging Out if token is expried

  const accessToken = localStorage.getItem("access-token");
  checkTokenExp(accessToken);
  return (
    <>
      <div className='container'>
        <div
          className='overflow-y-auto overflow-x-hidden'
          style={{ height: "calc(100vh - 102px)" }}
        >
          <div className='mb-3'>
            <Row>
              <Col span={24}>
                <DemoLine />
              </Col>
            </Row>
          </div>
          <div>
            <Content />
          </div>
          <div>
            <Card title='ANNOUNCEMENTS' className='mb-5'>
              <AnnouncementBar />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
