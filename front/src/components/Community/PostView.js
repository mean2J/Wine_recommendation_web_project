import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import styled from "styled-components";
import * as Api from "../../api";

/*
 * POST 상세 페이지
 */

const Container = styled.div`
  &:first-child {
    padding-top: 100px;
  }
  margin: 0 auto;
  background-color: #f8f9fa;
`;

const StyledCard = styled(Card)`
  width: 80%;
  height: auto;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 20px 20px 0 0;
  border: 0;
  z-index: 0;
  .ant-card-body {
    padding: 16px;
  }
  margin: 0 auto;
`;

function PostView(props) {
  const { postId } = useParams(); // 전달받은 postId
  const [post, setPost] = useState({});

  const getPost = useCallback(async () => {
    const res = await Api.get(`post/${postId}`);
    setPost(res.data.post);
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  console.log(postId);
  return (
    <>
      <Container>
        <StyledCard>
          <div>{post.title}</div>
          <div>{post.author}</div>
          <div>{post.createdAt}</div>
          <div>{post.content}</div>
          <div>{post.category}</div>
          <div>{post.view}</div>
        </StyledCard>
      </Container>
    </>
  );
}

export default PostView;
