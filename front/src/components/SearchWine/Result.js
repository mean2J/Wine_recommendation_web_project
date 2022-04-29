import { Card } from "antd";

function Result({ title, type }) {
  return (
    <Card title={title}>
      <p>와인타입: {type}</p>
    </Card>
  );
}

export default Result;
