import { Slider } from "antd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { acidityAtom, bodyAtom, sweetAtom, tanninAtom } from "../../atoms";

const marks = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

const SliderWrapper = styled.div`
  padding-left: 150px;
  padding-right: 150px;
  margin-top: 20px;
`;

const LabelText = styled.span`
  font-size: 14px;
  line-height: 25px;
  color: grey;
  margin-top: 30px;
`;

function WineTaste({ sweet, acidity, body, tannin }) {
  const setSweet = useSetRecoilState(sweetAtom);
  const setAcidity = useSetRecoilState(acidityAtom);
  const setBody = useSetRecoilState(bodyAtom);
  const setTannin = useSetRecoilState(tanninAtom);
  return (
    <>
      <SliderWrapper>
        <LabelText>단맛</LabelText>
        <Slider
          range
          marks={marks}
          max={5}
          min={1}
          step={null}
          defaultValue={sweet}
          onAfterChange={(value) => {
            setSweet(value);
          }}
        />
        <LabelText>산도</LabelText>
        <Slider
          range
          marks={marks}
          max={5}
          min={1}
          step={null}
          defaultValue={acidity}
          onAfterChange={(value) => {
            setAcidity(value);
          }}
        />
        <LabelText>바디감</LabelText>
        <Slider
          range
          marks={marks}
          max={5}
          min={1}
          step={null}
          defaultValue={body}
          onAfterChange={(value) => {
            setBody(value);
          }}
        />
        <LabelText>탄닌</LabelText>
        <Slider
          range
          marks={marks}
          max={5}
          min={1}
          step={null}
          defaultValue={tannin}
          onAfterChange={(value) => {
            setTannin(value);
          }}
        />
      </SliderWrapper>
    </>
  );
}

export default WineTaste;
