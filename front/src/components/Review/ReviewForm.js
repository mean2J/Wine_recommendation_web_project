import { Button, Collapse, Input, List, Modal } from "antd";
import * as Api from "../../api";
import { useState, useEffect, useCallback } from "react";
import TextArea from "antd/lib/input/TextArea";
import WineReview from "./WineReview";
import styled from "styled-components";

const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)`
  width: 64%;
  height: auto;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 0 0 20px 20px;
  border: 0;
  margin-bottom: 30px;
  z-index: 0;
  &:active {
    border-radius: 0 0 20px 20px;
  }
`;

function ReviewForm({ wineId }) {
  const [accordion, setAccordion] = useState(false);
  const [review, setReview] = useState([]);
  const handleReview = async () => {
    setAccordion((accordion) => !accordion);
    if (accordion === false) {
      const res = await Api.get(`reviews/wines/${wineId}`);
      setReview(res.data.reviews);
    }
  };

  return (
    <StyledCollapse onChange={handleReview}>
      <Panel header="⭐리뷰 보기 / 작성⭐" key="1" style={{ border: "0" }}>
        <WineReview wineId={wineId} />
        <List
          itemLayout="horizontal"
          dataSource={review}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                key={item.id}
                title={<p>{item.title}</p>}
                description={<p>{item.content}</p>}
                rating={<p>{item.rating}</p>}
              />
            </List.Item>
          )}
        />
      </Panel>
    </StyledCollapse>
  );
}

export default ReviewForm;
