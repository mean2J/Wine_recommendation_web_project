import { Slider, Select, Checkbox, message } from "antd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isCheckedAtom, nationAtom, priceAtom, typeAtom } from "../../atoms";

const { Option } = Select;

function WineType({ price, nation, type, isChecked }) {
  const setPrice = useSetRecoilState(priceAtom);
  const setNation = useSetRecoilState(nationAtom);
  const setType = useSetRecoilState(typeAtom);
  const setIsChecked = useSetRecoilState(isCheckedAtom);

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
        defaultValue={price}
        onAfterChange={(value) => setPrice(value)}
      />
      <Checkbox
        defaultChecked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      >
        가격정보 없는 와인 포함
      </Checkbox>
      <Select
        allowClear
        defaultValue={!nation ? null : nation}
        placeholder="생산국을 선택하세요"
        optionFilterProp="children"
        onChange={(value) => setNation(value)}
      >
        {Nations.map((nation, idx) => (
          <Option value={nation} key={idx}>
            {nation}
          </Option>
        ))}
      </Select>
      <Select
        allowClear
        defaultValue={!type ? null : type}
        placeholder="와인 종류를 선택하세요"
        optionFilterProp="children"
        onChange={(value) => setType(value)}
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
