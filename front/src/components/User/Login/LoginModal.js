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

const Notice = styled.p`
  font-size: 12px;
  color: #ff0000;
`;
function LoginModal({ isModal, getModalBoolean }) {
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  const dispatch = useContext(DispatchContext);

  //모달창을 닫기위해 상위 컴포넌트에 값을 전달하는 함수
  const sendModalBoolean = (e) => {
    getModalBoolean(e);
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
      const res = await Api.post("users/signin", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      message.info("로그인이 완료되었습니다.");
      sendModalBoolean(false);
    } catch (err) {
      message.info("로그인에 실패하였습니다.");
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  const handleCancel = () => {
    sendModalBoolean(false);
  };

  return (
    <>
      <Modal
        title="와인셀러 로그인"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="로그인"
        cancelText="취소"
      >
        <Form.Item name="email" style={{ marginBottom: "5px" }}>
          <Input
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
            prefix={<UserOutlined className="email" />}
          />
        </Form.Item>
        {!isEmailValid && <Notice>이메일 형식이 올바르지 않습니다.</Notice>}
        <Form.Item name="password" style={{ marginBottom: "5px" }}>
          <Input.Password
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="password" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        {!isPasswordValid && <Notice>비밀번호는 4글자 이상입니다.</Notice>}
      </Modal>
    </>
  );
}

export default LoginModal;
