import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.less";
import { Form, Button, Input, message } from "antd";

import { useTranslation } from "react-i18next";

import { loginApi } from "@/api";
import { setToken } from "@/utils/auth";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const login = t("login");
  const addlogin = t("addlogin");
  const returnLogin = t("returnLogin")
  const add = t("add");
  const userNameTip = t("userNameTip");
  const userPasswordTip = t("userPasswordTip");

  const [loading, setLoading] = useState<boolean>(false);

  const [isAdd, setIsAdd] = useState<boolean>(false);

  const navigate = useNavigate();
  const onFinish = (values: any) => {
    setLoading(true);
    if (isAdd) {
      loginApi.insertUser(values).then(() => {
        message.success(t('addSuccess'));
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => setLoading(false));
      return
    }
    loginApi
      .login(values)
      .then((res) => {
        message.success(t('loginSuccess'));
        setToken(res.token);
        navigate("/chat");
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={style["login-container"]}>
      <div className={style["login"]}>
        <div className={style["header"]}>{isAdd ? addlogin : login}</div>
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
            rules={[{ required: true, message: userNameTip }]}
          >
            <div className={style["container"]}>
              <Input type="text" placeholder={userNameTip} />
              <span className={style["left"]}></span>
              <span className={style["right"]}></span>
              <span className={style["top"]}></span>
              <span className={style["bottom"]}></span>
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: userPasswordTip }]}
          >
            <div className={style["container1"]}>
              <Input type="password" placeholder={userPasswordTip} />
              <span className={style["left"]}></span>
              <span className={style["right"]}></span>
              <span className={style["top"]}></span>
              <span className={style["bottom"]}></span>
            </div>
          </Form.Item>
          <Button
            loading={loading}
            className={style["btn"]}
            type="primary"
            htmlType="submit"
          >
            {loading ? "" : isAdd ? add : login}
          </Button>
        </Form>
        {isAdd ? (
          <Button type="link" block onClick={() => setIsAdd(false)}>
          {returnLogin}
        </Button>
        ) : (
          <Button type="link" block onClick={() => setIsAdd(!isAdd)}>
            {addlogin}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;
