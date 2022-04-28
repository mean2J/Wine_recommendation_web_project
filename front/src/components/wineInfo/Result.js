import { Card } from "antd";

function Result({ nation, title, type, local, price, abv, varieties }) {
  return (
    <Card title={title}>
      <p>와인타입: {type}</p>
      <p>제조국: {nation}</p>
      <p>제조지역: {local}</p>
      <p>가격: {price}</p>
      <p>도수: {abv}</p>
      <p>주요 품종: {varieties}</p>
    </Card>
  );
}

export default Result;
