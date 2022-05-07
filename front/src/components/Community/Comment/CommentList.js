import React, { useState, useContext } from "react";
import { Card, Button } from "antd";
import styled from "styled-components";
import CommentEditForm from "./CommentEditForm";
import { UserStateContext } from "../../../App";
import CommentDeleteModal from "./CommentDeleteModal";

const StyledCard = styled(Card)`
  width: 70%;
  height: 100px;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 20px 20px 0 0;
  border: 0;
  z-index: 0;
  .ant-card-body {
    padding: 16px;
  }
  margin: 20px auto;
`;

function CommentList({ comment, setCommentLists, getComment }) {
  const userState = useContext(UserStateContext);
  const [commentId, setCommentId] = useState(comment.id);
  const [content, setContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [authorId, setAuthorId] = useState(comment.userId);
  const currentUserId = userState.user.user.id;

  const onClose = (e) => {
    setIsModal(e);
  };
  const showModal = () => {
    setIsModal(true);
  };

  return (
    <div>
      {isEditing ? (
        <CommentEditForm
          comment={comment}
          setIsEditing={setIsEditing}
          setCommentLists={setCommentLists}
          getComment={getComment}
        ></CommentEditForm>
      ) : (
        <StyledCard>
          <div>{comment.author}</div>
          <div>{content}</div>
          {authorId === currentUserId && (
            <>
              <Button onClick={() => setIsEditing(true)}>수정</Button>
              <Button onClick={showModal}>삭제</Button>
              {isModal && (
                <CommentDeleteModal
                  setCommentLists={setCommentLists}
                  commentId={commentId}
                  onClose={onClose}
                  isModal={isModal}
                  getComment={getComment}
                />
              )}
            </>
          )}
        </StyledCard>
      )}
    </div>
  );
}

export default CommentList;
