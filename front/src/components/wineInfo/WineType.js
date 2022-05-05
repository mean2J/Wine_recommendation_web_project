import { Slider, Select, Checkbox, message } from "antd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isCheckedAtom, nationAtom, priceAtom, typeAtom } from "../../atoms";

const { Option } = Select;

const Nations = [
  "프랑스 France",
  "이탈리아 Italy",
  "미국 U.S.A",
  "칠레 Chile",
  "스페인 Spain",
  "호주 Australia",
  "기타 국가 Others",
];

const marks = {
  100000: "10만원",
  200000: "20만원",
  300000: "30만원",
  400000: "40만원",
  500000: "50만원",
};

const Types = ["Red", "White", "Rose", "Sparkling"];

const TypeWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InnerBox = styled.div`
  width: 75%;
  background: #f8f9fa;
  border-radius: 15px;
  height: 20vh;
  margin-top: 40px;
`;

const SliderWrapper = styled.div`
  position: absolute;
  width: 75%;
  padding-right: 7%;
  padding-left: 7%;
  margin-top: 40px;
`;

const PriceText = styled.span`
  margin-right: 20px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const NationWrapper = styled.div`
  margin-right: 10px;
`;

const WineTypeWarpper = styled.div``;

function WineType({ price, nation, type, isChecked }) {
  const setPrice = useSetRecoilState(priceAtom);
  const setNation = useSetRecoilState(nationAtom);
  const setType = useSetRecoilState(typeAtom);
  const setIsChecked = useSetRecoilState(isCheckedAtom);

  function formatter(value) {
    return `${value}원`;
  }
  return (
    <>
      <TypeWrapper>
        <InnerBox>
          <CheckboxWrapper>
            <PriceText>가격을 선택해주세요.</PriceText>
            <Checkbox
              defaultChecked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            >
              가격정보 없는 와인 포함
            </Checkbox>
          </CheckboxWrapper>
          <SliderWrapper>
            <Slider
              range
              marks={marks}
              tipFormatter={formatter}
              max={500000}
              min={0}
              step={10000}
              defaultValue={price}
              onAfterChange={(value) => setPrice(value)}
            />
          </SliderWrapper>
        </InnerBox>
        <SelectWrapper>
          <NationWrapper>
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
          </NationWrapper>
          <WineTypeWarpper>
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
          </WineTypeWarpper>
        </SelectWrapper>
      </TypeWrapper>
    </>
  );
}

export default WineType;
