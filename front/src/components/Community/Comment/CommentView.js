import React, { useState } from "react";
import * as Api from "../../../api";
import { Card, Button } from "antd";
import styled from "styled-components";
import CommentEditForm from "./CommentEditForm";

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

function CommentView(comment, setCommentList) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.delete(`deleteComment/${comment.id}`);
    const res = await Api.get("commentlist");
    setCommentList(res.data);
  };

  return (
    <div>
      {isEditing ? (
        <CommentEditForm
          comment={comment}
          setCommentList={setCommentList}
          setIsEditing={setIsEditing}
        ></CommentEditForm>
      ) : (
        <StyledCard>
          <div>{comment.author}</div>
          <div>{comment.content}</div>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            수정
          </Button>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            삭제
          </Button>
        </StyledCard>
      )}
    </div>
  );
}

export default CommentView;
