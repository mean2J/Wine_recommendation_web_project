import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import styled from "styled-components";
import * as Api from "../../api";

/*
 * POST 상세 페이지
 */

const Container = styled.div`
  padding-top: 100px;

  margin: 0 auto;
  background-color: #fff;
`;

const StyledCard = styled.div`
  width: 720px;
  position: relative;
  width: 100%;
  margin: 0px auto;
  box-sizing: border-box;
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
