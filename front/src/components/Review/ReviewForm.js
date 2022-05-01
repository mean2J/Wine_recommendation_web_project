import { Collapse, List } from "antd";
import * as Api from "../../api";
import { useState } from "react";

const { Panel } = Collapse;

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
    <Collapse onChange={handleReview}>
      <Panel header="리뷰 보기" key="1">
        <List
          itemLayout="horizontal"
          dataSource={review}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                key={item.id}
                title={<p>{item.title}</p>}
                description={<p>{item.content}</p>}
              />
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  );
}

export default ReviewForm;
