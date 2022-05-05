import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Form, Input, Button, Rate } from "antd";
import * as Api from "../../../api";
import styled from "styled-components";

const { TextArea } = Input;

const ReviewEditContainer = styled(Card)`
  border: None;
  border-radius: 15px;
  background-color: #ffffff;

  width: 751px;
  height: auto;

  margin-top: 0px;
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  border-radius: 15px;
`;

const StyledArea = styled(TextArea)`
  border-radius: 15px;
  margin-bottom: 8px;
`;

const StyledRate = styled(Rate)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 70px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  position: absolute;
  bottom: 0;
  right: 0;
`;

const MyInfoButton = styled(Button)`
  font-weight: 400;
  font-size: 13px;
  border-radius: 5px;
  margin-right: 15px;
`;

function MyReviewEditForm({
  reviewId,
  setIsEditing,
  Info,
  setInfo,
  setMyReviewList,
  currentUserId,
}) {
  const [title, setTitle] = useState(Info.title);
  const [content, setContent] = useState(Info.content);
  const [rating, setRating] = useState(Info.rating);

  const onFinish = async () => {
    try {
      const res = await Api.put(`reviews/${reviewId}`, {
        title,
        content,
        rating,
      });

      let updated = await Api.get(`reviews/authors/${currentUserId}`);
      const data = updated.data.reviews;
      setMyReviewList(data);

      const updateReview = res.data.review;
      setInfo(updateReview);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    setRating(value);
  };

  return (
    <>
      <ReviewEditContainer>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            title: title,
            content: content,
            rating: rating,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <StyledRate defaultValue={rating} onChange={handleChange} />
          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요.",
              },
            ]}
          >
            <StyledInput onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="내용"
            name="content"
            rules={[
              {
                required: true,
                message: "내용을 입력해주세요.",
              },
            ]}
          >
            <StyledArea
              maxLength={100}
              autoSize={{ minRows: 3, maxRows: 6 }}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Item>
          <BtnWrapper>
            <MyInfoButton htmlType="submit" style={{ color: "#c365fd" }}>
              수정하기
            </MyInfoButton>
            <MyInfoButton
              style={{ color: "red" }}
              onClick={() => setIsEditing(false)}
            >
              취소하기
            </MyInfoButton>
          </BtnWrapper>
        </Form>
      </ReviewEditContainer>
    </>
  );
}

export default MyReviewEditForm;
