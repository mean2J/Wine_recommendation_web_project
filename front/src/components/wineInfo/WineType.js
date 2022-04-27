import { Slider, Select, Checkbox, message } from "antd";
import styled from "styled-components";

const { Option } = Select;

function WineType({ setPrice, setNation, setType, setIsChecked }) {
  const Nations = [
    "칠레 Chile",
    "프랑스 France",
    "미국 U.S.A",
    "이탈리아 Italy",
    "기타 국가 Others",
    "스페인 Spain",
    "호주 Australia",
  ];

  const Types = ["Red", "White", "Rose", "Sparkling"];

  const handleAfterChage = (value) => {
    setPrice(value);
  };
  const handleNation = (value) => {
    setNation(value);
  };
  const handleWineType = (value) => {
    setType(value);
  };
  function formatter(value) {
    return `${value}원`;
  }
  return (
    <>
      <Slider
        range
        tipFormatter={formatter}
        max={500000}
        min={0}
        step={10000}
        defaultValue={[0, 50000]}
        onAfterChange={handleAfterChage}
      />
      <Checkbox onChange={(e) => setIsChecked(e.target.checked)}>
        정보 없음 포함
      </Checkbox>
      <Select
        allowClear
        placeholder="생산국을 선택하세요"
        optionFilterProp="children"
        onChange={handleNation}
      >
        {Nations.map((nation, idx) => (
          <Option value={nation} key={idx}>
            {nation}
          </Option>
        ))}
      </Select>
      <Select
        allowClear
        placeholder="와인 종류를 선택하세요"
        optionFilterProp="children"
        onChange={handleWineType}
      >
        {Types.map((type, idx) => (
          <Option value={type} key={idx}>
            {type}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default WineType;
