import { useState } from "react";
import { Form, Input, Button, DatePicker, Row, Col, Upload } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../lib/image";
import type { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const InvoiceForm = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [form] = Form.useForm();

  const onFinish = () => {};

  const onChange: UploadProps["onChange"] = (info) => {
    getBase64(info.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="lg:p-6 mx-auto max-w-5xl border h-full "
    >
      <Row gutter={16}>
        {/* Logo Section */}
        <Col span={12}>
          <div>
            <Upload
              customRequest={() => null}
              listType="picture-card"
              onChange={onChange}
              showUploadList={false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                "Logo"
              )}
            </Upload>
          </div>
        </Col>

        {/* Invoice Title */}
        <Col span={12} className="flex justify-end items-start">
          <div className="text-right">
            <Form.Item className=" ">
              <Input
                defaultValue={"invoice"}
                name="invoice_title"
                className="text-xl lg:text-4xl 2xl:text-5xl font-bold uppercase  text-end   "
              />
            </Form.Item>
            <Form.Item className=" lg:w-[70%] ml-auto ">
              <Input prefix={<span>#</span>} className=" " />
            </Form.Item>
            <div>
              <Row>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Field value is required",
                      },
                    ]}
                  >
                    <Input
                      className=" bg-inherit border-none text-end"
                      placeholder="Date"
                      name="date"
                      defaultValue={"Date"}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Field value is required",
                      },
                    ]}
                  >
                    <DatePicker className="w-full rounded-none" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className=" ">
              <Form.List name="customFields">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      console.log([name, "fieldName"]);
                      return (
                        <Row key={key} gutter={16}>
                          <Col span={11}>
                            <Form.Item
                              {...restField}
                              name={[name, "fieldName"]}
                            >
                              <Input
                                className=" bg-inherit border-none text-end"
                                placeholder="Field Name"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={11}>
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
                          <Col span={2}>
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              className="text-xl mt-1 text-red-500 "
                            />
                          </Col>
                        </Row>
                      );
                    })}
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
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
