import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Api from "../../../api";
import { useNavigate } from "react-router-dom";

const IntroDesc = styled.p`
  font-weight: 200;
  font-size: 15px;
  display: flex;
  color: #000000;
`;

const Notice = styled.p`
  font-size: 12px;
  color: #ff0000;
`;

function SignUpForm() {
  const navigate = useNavigate();
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email) || email === "";
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4 || password === "";
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword || confirmPassword === "";
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2 || name === "";

  const isFormValid =
    isEmailValid &&
    email !== "" &&
    isPasswordValid &&
    password !== "" &&
    isPasswordSame &&
    confirmPassword !== "" &&
    isNameValid &&
    name !== "";

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("users/signup", {
        email: values.email,
        password: values.password,
        name: values.name,
      });
      navigate("/");
      message.info("회원가입이 완료되었습니다.");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
      message.info("회원가입에 실패하였습니다.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 32,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="email" style={{ marginBottom: "5px" }}>
          <Input
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
            prefix={<UserOutlined className="email" />}
          />
        </Form.Item>
        {!isEmailValid && <Notice>이메일 형식이 올바르지 않습니다.</Notice>}
        <Form.Item name="name" style={{ marginBottom: "5px" }}>
          <Input
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
            prefix={<UserOutlined className="name" />}
          />
        </Form.Item>
        {!isNameValid && <Notice>이름은 2글자 이상이어야 합니다.</Notice>}
        <Form.Item name="password" style={{ marginBottom: "5px" }}>
          <Input.Password
            placeholder="input password"
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="password" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        {!isPasswordValid && (
          <Notice>비밀번호는 4글자 이상이어야 합니다.</Notice>
        )}
        <Form.Item name="confirmPassword" style={{ marginBottom: "5px" }}>
          <Input.Password
            placeholder="input password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            prefix={<LockOutlined className="verifyPassword" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        {!isPasswordSame && <Notice>비밀번호가 다릅니다.</Notice>}
        <IntroDesc>
          <Link to={`/`}>이미 회원이신가요?</Link>
        </IntroDesc>

        <Button type="primary" htmlType="submit" block disabled={!isFormValid}>
          회원가입
        </Button>
      </Form>
    </>
  );
}

export default SignUpForm;
