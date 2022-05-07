import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../../../api";
import { Form, Button, Input } from "antd";
import styled from "styled-components";
import CommentList from "./CommentList";

const { TextArea } = Input;

const Container = styled.div`
  position: relative;
  width: 800px;
  margin: 20px auto;
  background-color: #fff;
`;

const CommentNumDiv = styled.div`
  position: relative;
  width: 800px;
  margin: 20px auto;
  background-color: #fff;
`;

const CommentNum = styled.h1`
  font-weight: 600;
  font-size: 20px;
`;

const StyledArea = styled(TextArea)`
  color: #292929;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  min-height: 28px;
  width: 700px;
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

const TextWrapper = styled.div`
  word-break: break-all;
`;

function Comment(props) {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [commentLists, setCommentLists] = useState({});
  const [commentNum, setCommentNum] = useState(0);
  const [form] = Form.useForm();

  const getComment = useCallback(async () => {
    const res = await Api.get(`commentlist/${postId}`);
    setCommentNum(res.data.commentList.length);
    setCommentLists(res.data);
  }, [postId]);

  useEffect(() => {
    getComment();
  }, [getComment]);

  const onFinish = async (values) => {
    try {
      await Api.post(`comment`, {
        postId,
        content,
      });
      const res = await Api.get(`commentlist/${postId}`);
      setCommentLists(res.data);
      setContent("");
      getComment();
    } catch (err) {
      console.log(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <CommentNumDiv>
        <CommentNum>댓글 {commentNum}</CommentNum>
      </CommentNumDiv>
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
              value={content}
              autoSize={true}
              maxLength={200}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Form.Item>

          <StyledItem>
            <CommentButton type="primary" htmlType="submit">
              등록
            </CommentButton>
          </StyledItem>
        </Form>
      </Container>
      {commentLists.commentList &&
        commentLists.commentList.map((comment) => (
          <TextWrapper>
            <CommentList
              key={comment.id}
              comment={comment}
              setCommentLists={setCommentLists}
              getComment={getComment}
            />
          </TextWrapper>
        ))}
    </>
  );
}
export default Comment;
