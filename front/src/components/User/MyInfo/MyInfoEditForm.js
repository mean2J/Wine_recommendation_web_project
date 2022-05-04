import React, { useState } from "react";
import "antd/dist/antd.min.css";
import { Card, Form, Input, Button } from "antd";
import * as Api from "../../../api";
import styled from "styled-components";

const { TextArea } = Input;

const MyInfoEditContainer = styled(Card)`
  width: 642px;
  margin-left: 260px;
  margin-top: 40px;
  margin-bottom: 40px;

  background: #f8f9fa;
  border-radius: 15px;
  border: none;

  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
`;

const NameForm = styled(Form.Item)`
  margin-top: 40px;
`;

const NameInput = styled(Input)`
  border-radius: 15px;
`;

const StyledArea = styled(TextArea)`
  border-radius: 15px;
`;

const MyInfoButton = styled(Button)`
  font-weight: 400;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 15px;
`;

function MyInfoEditForm({ user, setUser, setIsEditing }) {
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      // user 정보 수정 요청
      const res = await Api.put(`users`, {
        name,
        description,
      });
      const updateUser = res.data.user;
      setUser(updateUser);

      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <MyInfoEditContainer>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: name,
            description: description,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <NameForm
            label="이름"
            name="name"
            rules={[
              {
                required: true,
                message: "수정할 이름을 입력해주세요",
              },
            ]}
          >
            <NameInput onChange={(e) => setName(e.target.value)} />
          </NameForm>
          <Form.Item
            label="소개"
            name="description"
            rules={[
              {
                required: false,
                message: "소개를 입력해주세요",
              },
            ]}
          >
            <StyledArea
              maxLength={100}
              autoSize={{ minRows: 3, maxRows: 6 }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 15, span: 16 }}>
            <MyInfoButton htmlType="submit" style={{ color: "#c365fd" }}>
              수정하기
            </MyInfoButton>
            <MyInfoButton
              style={{ color: "red" }}
              onClick={() => setIsEditing(false)}
            >
              취소하기
            </MyInfoButton>
          </Form.Item>
        </Form>
      </MyInfoEditContainer>
    </>
  );
}

export default MyInfoEditForm;
