import React, { useState, useContext } from "react";
import { Modal, Input, Form, message } from "antd";
import * as Api from "../../../api";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { DispatchContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLogin";

const Notice = styled.p`
  font-size: 12px;
  color: #ff0000;
`;

const LoginModalTile = styled.h1`
  color: #c365fd;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
`;

const LoginModalText = styled.h2`
  color: #c4c4c4;
  font-size: 14px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  width: 80%;
  height: 30px;
  display: block;
  margin: 20px auto 10px;
  background-color: #c365fd;
  border: 1px solid #c365fd;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  type: submit;
`;

const RegisterButton = styled.button`
  width: 80%;
  height: 30px;
  display: block;
  margin: 10px auto 10px;
  background-color: #c4c4c4;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const SNSLogin = styled.div`
  display: flex;
  justify-content: center;
`;

function LoginModal({ isModal, onClose }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useContext(DispatchContext);
  const [form] = Form.useForm();
  //모달창을 닫기위해 상위 컴포넌트에 값을 전달하는 함수
  const onOpen = (e) => {
    onClose(e);
  };
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

  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const handleOk = async (e) => {
    try {
      const res = await Api.post("auth/local/signin", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken.split(" ")[1]);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      onOpen(false);
      navigate("/", { replace: true });
      message.info("로그인이 완료되었습니다.");
    } catch (err) {
      message.info("로그인에 실패하였습니다.");
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  const handleCancel = () => {
    onOpen(false);
  };

  const handleSignUp = () => {
    onOpen(false);
    document.location.href = "/SignUp";
  };

  return (
    <>
      <Modal
        title=""
        visible={isModal}
        onCancel={handleCancel}
        width={400}
        footer={null}
      >
        <LoginModalTile>와인셀러</LoginModalTile>
        <LoginModalText>
          와인셀러는 세계 최고의 와인 추천 서비스입니다.
        </LoginModalText>

        <Form form={form}>
          <Form.Item name="email" style={{ marginBottom: "5px" }}>
            <Input
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "5px" }}
              prefix={
                <UserOutlined className="email" style={{ color: "#c365fd" }} />
              }
            />
          </Form.Item>
          {!isEmailValid && <Notice>이메일 형식이 올바르지 않습니다.</Notice>}
          <Form.Item name="password" style={{ marginBottom: "5px" }}>
            <Input.Password
              placeholder="비밀번호"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "5px" }}
              prefix={
                <LockOutlined
                  className="password"
                  style={{ color: "#c365fd" }}
                />
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          {!isPasswordValid && <Notice>비밀번호는 4글자 이상입니다.</Notice>}
          <Form.Item style={{ margin: "0" }}>
            <LoginButton onClick={handleOk}>로그인</LoginButton>
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <RegisterButton onClick={handleSignUp}>회원가입</RegisterButton>
          </Form.Item>
        </Form>
        <SNSLogin>
          <GoogleLoginButton onOpen={onOpen} />
        </SNSLogin>
      </Modal>
    </>
  );
}

export default LoginModal;
