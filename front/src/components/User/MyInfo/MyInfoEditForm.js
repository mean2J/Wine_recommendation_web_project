import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Form, Input, Button } from "antd";
import * as Api from "../../../api";

const { TextArea } = Input;

function MyInfoEditForm({ user, setUser, setIsEditing }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
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

      console.log("수정된 정보 업데이트", updateUser);

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
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            email: email,
            name: name,
            description: description,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* <Form.Item
            label="이메일"
            name="email"
          >
            <Input email disabled={true} />
          </Form.Item> */}
          <Form.Item
            label="이름"
            name="name"
            rules={[
              {
                required: true,
                message: "수정할 이름을 입력해주세요",
              },
            ]}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
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
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 120 }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              수정하기
            </Button>
            <Button type="primary" danger onClick={() => setIsEditing(false)}>
              취소하기
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default MyInfoEditForm;
