import React, { useState } from "react";
import * as Api from "../../../api";
import { Form, Button, Input } from "antd";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

const StyledArea = styled(TextArea)`
  color: #292929;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  min-height: 28px;
  width: 600px;
  resize: none;
`;

const StyledItem = styled(Form.Item)`
  display: flex;
  align-items: center;
`;

const CommentButton = styled(Button)`
  display: flex;
  align-items: center;
  margin: auto;
`;

const Container = styled.div`
  &:first-child {
    padding-top: 100px;
  }
  width: 70%;
  margin: 0 auto;
`;

function CommunityEditForm({
  comment,
  setIsEditing,
  setCommentLists,
  getComment,
}) {
  const { postId } = useParams();
  const [curContent, setCurContent] = useState(comment.content);

  const onFinish = async () => {
    try {
      await Api.put(`comment/${comment.id}`, {
        content: curContent,
      });
      // 유저 정보는 response의 data임.
      const res = await Api.get(`post/${postId}`);
      setCommentLists(res.data);
      setIsEditing(false);
      getComment();
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <Form
        initialValues={{
          content: curContent,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item name="content">
          <StyledArea
            showCount
            autoSize={true}
            maxLength={200}
            onChange={(e) => setCurContent(e.target.value)}
          />
        </Form.Item>

        <StyledItem>
          <CommentButton type="primary" htmlType="submit">
            수정
          </CommentButton>
          <Button onClick={() => setIsEditing(false)}>취소</Button>
        </StyledItem>
      </Form>
    </Container>
  );
}

export default CommunityEditForm;
