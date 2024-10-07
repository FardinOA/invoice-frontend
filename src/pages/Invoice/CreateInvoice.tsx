import { Form, Input, Button, Row, Col, DatePicker, InputNumber } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const CreateInvoice = () => {
  const [form] = Form.useForm();
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [title, setTitle] = useState("INVOICE");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const getSubtotal = () => {
    const items = form.getFieldValue("items") || [];
    return items.reduce(
      (acc: number, item: { quantity: number; rate: number }) =>
        acc + item?.quantity * item?.rate,
      0
    );
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const taxAmount = (subtotal * tax) / 100;
    return subtotal + taxAmount + Number(shipping) - Number(discount);
  };

  return (
    <div className="invoice-container">
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <div className="logo-placeholder">+ Add Your Logo</div>
            <Form.Item label="Who is this from?">
              <Input placeholder="Who is this from?" />
            </Form.Item>
            <Form.Item label="Bill To">
              <Input placeholder="Who is this to?" />
            </Form.Item>
            <Form.Item label="Ship To (optional)">
              <Input placeholder="Optional" />
            </Form.Item>
          </Col>
          <Col xs={24} md={{ span: 8, offset: 8 }}>
            <Form.Item>
              <Input
                value={title}
                onChange={handleTitleChange}
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              />
            </Form.Item>

            <Form.Item label="#">
              <Input placeholder="Invoice Number" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Client Name">
                  <Input placeholder="Client Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Company Name">
                  <Input placeholder="Company Name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Due Date">
              <Input placeholder="Due Date" />
            </Form.Item>

            <Form.List name="customFields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} style={{ marginBottom: "10px" }}>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "fieldName"]}
                          rules={[
                            {
                              required: true,
                              message: "Field name is required",
                            },
                          ]}
                        >
                          <Input placeholder="Field Name" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "fieldValue"]}
                          rules={[
                            {
                              required: true,
                              message: "Field value is required",
                            },
                          ]}
                        >
                          <Input placeholder="Field Value" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{
                            color: "red",
                            fontSize: "24px",
                            cursor: "pointer",
                          }}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Custom Field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>

        <Form.List
          name="items"
          initialValue={[{ description: "", quantity: 1, rate: 0 }]}
        >
          {(fields, { add, remove }) => (
            <>
              <div className="items-header">
                <Row>
                  <Col span={10}>Item</Col>
                  <Col span={4} style={{ textAlign: "center" }}>
                    Quantity
                  </Col>
                  <Col span={4} style={{ textAlign: "center" }}>
                    Rate
                  </Col>
                  <Col span={4} style={{ textAlign: "center" }}>
                    Amount
                  </Col>
                  <Col span={2} style={{ textAlign: "center" }}></Col>
                </Row>
              </div>

              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Row gutter={16}>
                      <Col xs={24} md={10}>
                        <Form.Item
                          name={[field.name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Please input item description",
                            },
                          ]}
                        >
                          <Input placeholder="Description of item/service" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={4}>
                        <Form.Item
                          name={[field.name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Please input quantity",
                            },
                          ]}
                        >
                          <InputNumber
                            min={1}
                            defaultValue={1}
                            placeholder="Quantity"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={4}>
                        <Form.Item
                          name={[field.name, "rate"]}
                          rules={[
                            { required: true, message: "Please input rate" },
                          ]}
                        >
                          <InputNumber min={0} prefix="$" placeholder="Rate" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={4}>
                        <span>
                          $
                          {(
                            (form.getFieldValue(["items", index, "quantity"]) ||
                              1) *
                            (form.getFieldValue(["items", index, "rate"]) || 0)
                          ).toFixed(2)}
                        </span>
                      </Col>
                      <Col xs={24} md={2}>
                        <span
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => remove(field.name)}
                        >
                          Remove
                        </span>
                      </Col>
                    </Row>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
              >
                Add Item
              </Button>
            </>
          )}
        </Form.List>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Notes">
              <Input.TextArea
                rows={4}
                placeholder="Notes - any relevant information not already covered"
              />
            </Form.Item>
            <Form.Item label="Terms">
              <Input.TextArea
                rows={4}
                placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Row justify="space-between">
              <Col span={12}>Subtotal</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                ${getSubtotal().toFixed(2)}
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Form.Item label="Tax">
                  <Input
                    type="number"
                    suffix="%"
                    value={tax}
                    onChange={(e) => setTax(+e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Form.Item label="Discount">
                  <Input
                    type="number"
                    prefix="$"
                    value={discount}
                    onChange={(e) => setDiscount(+e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Form.Item label="Shipping">
                  <Input
                    type="number"
                    prefix="$"
                    value={shipping}
                    onChange={(e) => setShipping(+e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "8px" }}>
              <Col span={12}>Total</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                ${getTotal().toFixed(2)}
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "8px" }}>
              <Col span={12}>Amount Paid</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Input
                  prefix="$"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(+e.target.value)}
                />
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "8px" }}>
              <Col span={12}>Balance Due</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                ${(getTotal() - amountPaid).toFixed(2)}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateInvoice;
