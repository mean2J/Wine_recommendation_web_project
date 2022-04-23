import React from "react";
import { Input, Button, Form } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const IntroDesc = styled.p`
  font-weight: 200;
  font-size: 15px;
  display: flex;
  color: #000000;
`;

function SignUpForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
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
        <Form.Item
          name="userEmail"
          rules={[
            {
              required: true,
              message: "이메일을 입력해주세요",
            },
            {
              type: "email",
              message: "이메일 형식으로 입력해주세요",
            },
          ]}
        >
          <Input
            placeholder="이메일"
            prefix={<UserOutlined className="userEmail" />}
          />
        </Form.Item>
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "이름을 입력해주세요",
            },
          ]}
        >
          <Input
            placeholder="이름"
            prefix={<UserOutlined className="userName" />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요",
            },
          ]}
        >
          <Input.Password
            placeholder="input password"
            prefix={<LockOutlined className="verifyPassword" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="ConfirmPassword"
          rules={[
            {
              required: true,
              message: "비밀번호를 확인해주세요",
            },
          ]}
        >
          <Input.Password
            placeholder="input password"
            prefix={<LockOutlined className="verifyPassword" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <IntroDesc>
          <Link to={`/`}>이미 회원이신가요?</Link>
        </IntroDesc>

        <Button type="primary" htmlType="submit" block>
          회원가입
        </Button>
      </Form>
    </>
  );
}

export default SignUpForm;
