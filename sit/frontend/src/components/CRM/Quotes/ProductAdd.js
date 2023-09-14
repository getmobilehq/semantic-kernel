import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, InputNumber, Row, Select } from "antd";
import { useState } from "react";

export default function ProductAdd({ form, productList, productLoading }) {
  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const totalCalculator = () => {
    const productArray = form.getFieldValue("quoteProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.unitPrice || 0;
        return [...subTotal, price * quantity];
      }, []) || [];

    const total = subTotal.reduce((total, current) => total + current, 0) || 0;
    setSubTotal(subTotal);
    setTotal(total);
    const totalAmount = Boolean(total)
      ? total - (form.getFieldValue("discount") || 0) || 0
      : 0;
    setTotalAmount(totalAmount);
  };

  return (
    <>
      <Row>
        <Col span={2}>
          <div className='font-weight-bold'>SL</div>
        </Col>
        <Col span={6}>
          <div className='font-weight-bold'>Product</div>
        </Col>
        <Col span={5}>
          <div className='font-weight-bold'>Quantity</div>
        </Col>
        <Col span={5}>
          <div className='font-weight-bold'>Unit Price</div>
        </Col>
        <Col span={4}>
          <div className='font-weight-bold'>Total</div>
        </Col>
        <Col span={2}>
          <div>Delete</div>
        </Col>
      </Row>

      <hr style={{ backgroundColor: "black", marginTop: "0.5rem" }} />

      <Form.List
        name='quoteProduct'
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Row className='mt-2' gutter={[5]} key={key}>
                <Col span={2}>{index + 1}</Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "productId"]}
                    rules={[
                      {
                        required: true,
                        message: "Product is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder='Select Product'
                      showSearch
                      loading={productLoading}
                      optionFilterProp='children'
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={() => totalCalculator(index)}
                      //   onChange={(prodId) => handleSelectedProds(prodId, key)}
                    >
                      {productList?.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.productName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={5}>
                  <Form.Item
                    {...restField}
                    name={[name, "productQuantity"]}
                    rules={[
                      {
                        required: true,
                        message: "quantity is required",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      size={"small"}
                      placeholder='Quantity'
                      onChange={() => totalCalculator(index)}
                      //   onChange={(qty) => handleSelectedProdsQty(key, qty)}
                      //   value={
                      //     selectedProds[key] ? selectedProds[key].selectedQty : ""
                      //   }
                    />
                    {/* <p style={{ display: "none" }}>
                      {selectedProds[key] ? selectedProds[key].selectedQty : ""}
                    </p> */}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...restField}
                    name={[name, "unitPrice"]}
                    rules={[
                      {
                        required: true,
                        message: "Price is required",
                      },
                    ]}
                  >
                    <InputNumber
                      size='small'
                      style={{ width: "100%" }}
                      placeholder='50000'
                      onChange={() => totalCalculator(index)}
                      //   onChange={(salePrice) =>
                      //     handleSelectedProdsSalePrice(key, salePrice)
                      //   }
                    />
                    {/* <p style={{ display: "none" }}>
                      {selectedProds[key]
                        ? selectedProds[key].product_sale_price
                        : ""}
                    </p> */}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <div className='font-weight-bold totalMargin'>
                    {subTotal[index] || 0}
                  </div>
                </Col>
                <Col span={2}>
                  <Form.Item>
                    <Button
                      shape='circle'
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        remove(name);
                        totalCalculator(index);
                        // handleDeleteProd(key);
                      }}
                    ></Button>
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Form.Item style={{ marginTop: "20px" }}>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div className='py-2'>
        <div className='p-3 flex justify-between border'>
          <strong>Total: </strong>
          <strong>{total} tk</strong>
        </div>
        <div className='flex justify-between items-center'>
          <strong className=''>Discount: </strong>
          <Form.Item
            className='mt-2'
            name='discount'
            onChange={() => totalCalculator()}
          >
            <InputNumber defaultValue={0} max={total || 0} min={0} />
          </Form.Item>
        </div>
        <div className='p-3 mb-4 flex justify-between border'>
          <strong>Total amount: </strong>
          <strong>{totalAmount} tk</strong>
        </div>
      </div>
    </>
  );
}
