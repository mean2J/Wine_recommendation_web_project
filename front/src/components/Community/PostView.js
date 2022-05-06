import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import styled from "styled-components";
import * as Api from "../../api";

import PostEditForm from "./PostEditForm";
import PostDeleteModal from "./PostDeleteModal";

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

function PostView() {
  const { postId } = useParams(); // 전달받은 postId
  const [post, setPost] = useState({});
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false); // 삭제 모달 여부

  const getPost = useCallback(async () => {
    const res = await Api.get(`post/${postId}`);
    setPost(res.data.post);
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost, title, content]);

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
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button onClick={() => setIsModal(true)}>삭제</button>
          {isModal && (
            <PostDeleteModal
              postId={postId}
              isModal={isModal}
              setIsModal={setIsModal}
            />
          )}
        </StyledCard>
        {isEditing && (
          <PostEditForm
            post={post}
            setIsEditing={setIsEditing}
            setTitle={setTitle}
            setContent={setContent}
          />
        )}
      </Container>
    </>
  );
}

export default PostView;
