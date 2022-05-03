import { List } from "antd";

function ReviewCard({ title, content }) {
  return (
    <List
      itemLayout="horizontal"
      renderItem={
        <List.Item>
          title={<p>{title}</p>}
          description={<p>{content}</p>}
        </List.Item>
      }
    />
  );
}

export default ReviewCard;
