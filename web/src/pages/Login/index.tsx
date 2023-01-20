import React from "react";
import { Form, Button, Input, message } from "antd";
import "./index.less";
import { loginApi } from "@/api";
import { setToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
const Login: React.FC  = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    loginApi
      .login(values)
      .then((res) => {
        message.success("登录成功");
        setToken(res.token);
        navigate("/chat");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="header">登录</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <div className="container">
              <Input type="text" placeholder="请输入用户名" />
              <span className="left"></span>
              <span className="right"></span>
              <span className="top"></span>
              <span className="bottom"></span>
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <div className="container1">
              <Input type="password" placeholder="请输入密码" />
              <span className="left"></span>
              <span className="right"></span>
              <span className="top"></span>
              <span className="bottom"></span>
            </div>
          </Form.Item>
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
