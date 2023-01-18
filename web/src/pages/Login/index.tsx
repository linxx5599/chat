import React from "react";
import { Button, Form, Input, message } from "antd";
import "./index.less";
import { userApi } from "@/api";
const onFinish = (values: any) => {
  message.success("登录成功");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

let tableData: Array<any> = [];

const getUser = () => {
  userApi.getUser().then((result) => {
    tableData = result as Array<any>;
  });
};
getUser();
const Login = () => {
  return (
    <div className="login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[{ required: true, message: "请输入账号" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
