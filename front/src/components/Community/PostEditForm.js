import React, { useState } from "react";
import * as Api from "../../api";
import { Card, Form, Input, Button } from "antd";
const { TextArea } = Input;

function PostEditForm({ post, setTitle, setContent, setIsEditing }) {
  const [curTitle, setCurTitle] = useState(post.title);
  const [curContent, setCurContent] = useState(post.content);

  const onFinish = async () => {
    try {
      await Api.put(`post/${post.id}`, {
        title: curTitle,
        content: curContent,
      });
      // 수정 내용 변경
      setTitle(curTitle);
      setContent(curContent);

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
        임시 수정 폼 컴포넌트(영우님의 상세페이지 UI를 참조하여 고칠
        예정입니다..! -잘 만들고싶지만 디자인에 재능이 없는 사람-)
        <Form
          name="basic"
          initialValues={{
            title: curTitle,
            content: curContent,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요.",
              },
            ]}
          >
            <Input onChange={(e) => setCurTitle(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="내용"
            name="content"
            rules={[
              {
                required: true,
                message: "내용을 입력해주세요.",
              },
            ]}
          >
            <TextArea onChange={(e) => setCurContent(e.target.value)} />
          </Form.Item>
          <div className="BtnWrapper">
            <Button htmlType="submit">수정</Button>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
          </div>
        </Form>
      </Card>
    </>
  );
}

export default PostEditForm;
