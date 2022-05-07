import { Slider, Tooltip, icons } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
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
        <LabelText>
          <Tooltip title="와인의 잔당감" placement="left" color={'#B2B2B2'}>
            <span> 단맛 <InfoCircleOutlined /></span>
          </Tooltip>
        </LabelText>
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
        <LabelText>
          <Tooltip title="와인의 산미" placement="left" color={'#B2B2B2'}>
            <span> 산도 <InfoCircleOutlined /></span>
          </Tooltip>
        </LabelText>
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

        <LabelText>
          <Tooltip title="맛의 밀도가 깊은 정도" placement="left" color={'#B2B2B2'}>
            <span>바디감 <InfoCircleOutlined /></span>
          </Tooltip>
        </LabelText>
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
        <LabelText>
          <Tooltip title="씁쓸하거나 떫은 정도" placement="left" color={'#B2B2B2'}>
            <span>탄닌 <InfoCircleOutlined /></span>
          </Tooltip>
        </LabelText>
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
