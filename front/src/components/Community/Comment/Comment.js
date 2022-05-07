import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../../../api";
import { Form, Button, Input } from "antd";
import styled from "styled-components";
import CommentList from "./CommentList";

const { TextArea } = Input;

const Container = styled.div`
  &:first-child {
    padding-top: 100px;
  }
  width: 70%;
  margin: 0 auto;
`;

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

function Comment(props) {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    Api.get(`commentlist/${postId}`).then((res) => {
      setCommentList(res.data.commentList);
    });
  }, [postId]);

  const onFinish = async (values) => {
    console.log("Success", values);
    try {
      console.log(postId, content);
      await Api.post(`comment`, {
        postId,
        content,
      });

      const res = await Api.get(`commentlist/${postId}`);
      setCommentList(res.data.comment);
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Container>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="inline"
        >
          <Form.Item>
            <StyledArea
              placeholder="내용을 입력해주세요. (200자 이하)"
              showCount
              autoSize={true}
              maxLength={200}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Item>

          <StyledItem>
            <CommentButton type="primary" htmlType="submit">
              등록
            </CommentButton>
          </StyledItem>
        </Form>

        {commentList !== {} ? (
          <></>
        ) : (
          commentList.map((comment) => (
            <CommentList
              comment={comment}
              setCommentList={setCommentList}
              postId={postId}
            />
          ))
        )}
      </Container>
    </>
  );
}
export default Comment;
