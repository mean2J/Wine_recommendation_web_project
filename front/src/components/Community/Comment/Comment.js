import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../../../api";
import { Form, Button, Input } from "antd";
import styled from "styled-components";
import CommentView from "./CommentView";

const Container = styled.div`
  &:first-child {
    padding-top: 100px;
  }
  width: 70%;
  margin: 0 auto;
`;

function Comment(props) {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState({});
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    Api.get(`commentlist/${postId}`).then((res) => {
      setCommentList(res.data.commentList);
    });
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.post(`/comment`, {
      postId,
      content,
    });

    const res = await Api.get(`commentlist/${postId}`);
    setCommentList(res.data.comment);
    setContent("");
  };

  return (
    <>
      <Container>
        <Form form={form}>
          <Form.Item>
            <TextArea
              showCount
              maxLength={200}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: 800, resize: "none" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              style={{ margin: "10px auto" }}
              onClick={handleSubmit}
            >
              등록
            </Button>
          </Form.Item>
        </Form>

        {commentList !== {} ? (
          <></>
        ) : (
          commentList.map((comment) => (
            <CommentView
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
