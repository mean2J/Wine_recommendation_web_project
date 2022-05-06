import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import moment from "moment";

import PostEditForm from "./PostEditForm";
import PostDeleteModal from "./PostDeleteModal";

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

function PostView() {
  const userState = useContext(UserStateContext);

  const { postId } = useParams(); // 전달받은 postId
  const [post, setPost] = useState({});
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false); // 삭제 모달 여부

  // 수정/삭제 권한 체크
  const [authorId, setAuthorId] = useState("");
  const currentUserId = userState.user.id;

  const getPost = useCallback(async () => {
    const res = await Api.get(`post/${postId}`);
    setPost(res.data.post);
  }, [postId]);

  useEffect(() => {
    getPost();
    setAuthorId(post.userId);
  }, [getPost, title, content, setAuthorId, post.userId]);

  return (
    <>
      <Container>
        {!isEditing ? (
          <StyledCard>
            <div>{post.title}</div>
            <div>{post.author}</div>
            <div>{moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
            <div>{post.content}</div>
            <div>{post.category}</div>
            <div>{post.view}</div>
            {authorId === currentUserId && (
              <div>
                <Button onClick={() => setIsEditing(true)}>수정</Button>
                <Button onClick={() => setIsModal(true)}>삭제</Button>
              </div>
            )}
            {isModal && (
              <PostDeleteModal
                postId={postId}
                isModal={isModal}
                setIsModal={setIsModal}
              />
            )}
          </StyledCard>
        ) : (
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
