import React, { useState } from "react";
import * as Api from "../../../api";
import { Form, Button } from "antd";

function CommunityEditForm(comment, setCommentList, setIsEditing) {
  const [content, setContent] = useState(comment?.content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.put(`comment/${comment.id}`, {
      content,
    });
    // 유저 정보는 response의 data임.
    const res = await Api.get("commentlist");
    setCommentList(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="댓글을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Button>확인</Button>
        <Button onClick={() => setIsEditing(false)}>취소</Button>
      </Form.Group>
    </Form>
  );
}

export default CommunityEditForm;
