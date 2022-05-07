import React, { useState, useContext } from "react";
import { Card, Button } from "antd";
import styled from "styled-components";
import CommentEditForm from "./CommentEditForm";
import { UserStateContext } from "../../../App";
import CommentDeleteModal from "./CommentDeleteModal";

const Container = styled.div`
  position: relative;
  width: 800px;
  margin: 20px auto;
  background-color: #fff;
`;

const StyledCard = styled(Card)`
  width: 100%;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 20px;
  border: 0;
  z-index: 0;
  .ant-card-body {
    padding: 16px;
  }
  margin: 20px auto;
`;
const Author = styled.div`
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

function CommentList({ comment, setCommentLists, getComment }) {
  const userState = useContext(UserStateContext);
  const [commentId] = useState(comment.id);
  const [content] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [authorId] = useState(comment.userId);
  const currentUserId = userState.user.user.id;

  const onClose = (e) => {
    setIsModal(e);
  };
  const showModal = () => {
    setIsModal(true);
  };

  return (
    <Container>
      {isEditing ? (
        <CommentEditForm
          comment={comment}
          setIsEditing={setIsEditing}
          setCommentLists={setCommentLists}
          getComment={getComment}
        ></CommentEditForm>
      ) : (
        <StyledCard>
          <Author>{comment.author}</Author>
          <div>{content}</div>
          {authorId === currentUserId && (
            <ButtonWrapper>
              <Button
                onClick={() => setIsEditing(true)}
                style={{ marginRight: "5px" }}
              >
                수정
              </Button>
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
            </ButtonWrapper>
          )}
        </StyledCard>
      )}
    </Container>
  );
}

export default CommentList;
