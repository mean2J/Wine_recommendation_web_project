import { Button, Card, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState, useEffect } from "react";
import * as Api from "../../api";

function WineReview({ wineId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [writing, setWriting] = useState(true);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await Api.post(`reviews/${wineId}`, {
    //     reviewTitle,
    //     reviewContent,
    //     reviewRating,
    //   });
    //   if (response.status === 200) {
    //     console.log(response.data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    const res = await Api.post(`reviews/${wineId}`, {
      title,
      content,
      rating,
    });
    // const res = await Api.get(`/reviews/${reviewId}`);
    setWriting(false);
  };
  const handleActive = () => {
    setWriting(true);
  };

  return (
    <>
      {writing ? (
        <form onSubmit={handleReviewSubmit}>
          <Input
            placeholder="제목을 입력해주세요."
            allowClear
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextArea
            placeholder="내용을 입력해주세요."
            allowClear
            onChange={(e) => setContent(e.target.value)}
          />
          <Button htmlType="submit">제출</Button>
        </form>
      ) : (
        <button onClick={handleActive}>리뷰 작성</button>
      )}
    </>
  );
}

export default WineReview;
