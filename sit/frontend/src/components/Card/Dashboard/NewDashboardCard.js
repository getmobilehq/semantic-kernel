import { Card, Col, Row, Statistic } from "antd";
import React from "react";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import {
  CgOrganisation,
  FiUser,
  GiReceiveMoney,
  HiOutlineUserCircle,
} from "../../../assets/Icons/Icons";
import "./style.css";

const NewDashboardCard = ({ information }) => {
  return (
    <>
      <section>
        <div className='site-statistic-demo-card '>
          <Row gutter={[16, 16]} justify={"space-between"}>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card className='ant-shadow txt-color-2' bordered={false}>
                <Statistic
                  title={<p className='text-xl  txt-color-2'> Total Users </p>}
                  loading={!information}
                  value={information?.totalUsers?.count}
                  valueStyle={{
                    color: "#115e59",
                  }}
                  prefix={
                    <FiUser
                      className='mr-4 mb-[-10px] text-[35px]'
                      style={{ fontSize: "35px" }}
                    />
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card className='ant-shadow txt-color-2' bordered={false}>
                <div className='flex justify-between'>
                  <Statistic
                    title={
                      <p className='text-xl  txt-color-2'>Total Contact</p>
                    }
                    loading={!information}
                    value={information?.contact?.count || 0}
                    valueStyle={{
                      color: "#115e59",
                    }}
                    prefix={
                      <HiOutlineUserCircle className='mr-4 mb-[-10px] text-[35px]' />
                    }
                  />
                  <Statistic
                    title={
                      <p className='text-xl  txt-color-2'>Total Company</p>
                    }
                    loading={!information}
                    value={information?.company?.count || 0}
                    valueStyle={{
                      color: "#115e59",
                    }}
                    prefix={
                      <CgOrganisation
                        className='mr-4 mb-[-10px] text-[35px]'
                        style={{ fontSize: "35px" }}
                      />
                    }
                  />
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card className='ant-shadow txt-color-2' bordered={false}>
                <div className='flex justify-between'>
                  <Statistic
                    title={<p className='text-xl  txt-color-2'>Opportunity</p>}
                    loading={!information}
                    value={information?.opportunity?.count || 0}
                    valueStyle={{
                      color: "#115e59",
                    }}
                    prefix={
                      <GiReceiveMoney className='mr-4 mb-[-10px] text-[35px]' />
                    }
                  />
                  <Statistic
                    title={<p className='text-xl  txt-color-2'>Value</p>}
                    loading={!information}
                    value={information?.opportunity?.value || 0}
                    valueStyle={{
                      color: "#115e59",
                    }}
                    prefix={
                      <FaRegMoneyBillAlt
                        className='mr-4 mb-[-10px] text-[35px]'
                        style={{ fontSize: "35px" }}
                      />
                    }
                  />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card className='ant-shadow txt-color-2' bordered={false}>
                <div className='flex justify-between'>
                  <Statistic
                    title={<p className='text-xl  txt-color-2'>Quote</p>}
                    loading={!information}
                    value={information?.quote?.count || 0}
                    valueStyle={{
                      color: "#115e59",
                    }}
                    prefix={
                      <TbFileInvoice className='mr-4 mb-[-10px] text-[35px]' />
                    }
                  />
                  <Statistic
                    title={<p className='text-xl  txt-color-2'>Value</p>}
                    loading={!information}
                    value={information?.quote?.value || 0}
                    valueStyle={{
                      color: "#115e59",
                    }}
                    prefix={
                      <FaRegMoneyBillAlt
                        className='mr-4 mb-[-10px] text-[35px]'
                        style={{ fontSize: "35px" }}
                      />
                    }
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default NewDashboardCard;
