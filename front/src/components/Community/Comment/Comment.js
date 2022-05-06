import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../../../api";
import { Form, Button } from "antd";
import styled from "styled-components";
import CommentView from "./CommentView";

const Container = styled.div`
  &:first-child {
    padding-top: 100px;
  }
  margin: 0 auto;
  background-color: #f8f9fa;
`;

function Comment(props) {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState({});

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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="comment" className="mb-3">
            <Form.Control
              type="text"
              placeholder="댓글을 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              type="submit"
              style={{ margin: "10px auto", display: "flex" }}
            >
              등록
            </Button>
          </Form.Group>
        </Form>

        {commentList !== null ? (
          commentList.map((comment) => (
            <CommentView
              comment={comment}
              setCommentList={setCommentList}
              postId={postId}
            />
          ))
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
export default Comment;
