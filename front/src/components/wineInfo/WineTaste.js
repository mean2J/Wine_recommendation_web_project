import { Slider } from "antd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { acidityAtom, bodyAtom, sweetAtom, tanninAtom } from "../../atoms";

function WineTaste({sweet, acidity, body, tannin}) {
  const setSweet = useSetRecoilState(sweetAtom);
  const setAcidity = useSetRecoilState(acidityAtom);
  const setBody = useSetRecoilState(bodyAtom);
  const setTannin = useSetRecoilState(tanninAtom);
  const marks = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
  };
  return (
    <>
      <span>단맛</span>
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
      <span>산도</span>
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
      <span>바디감</span>
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
      <span>탄닌</span>
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
    </>
  );
}

export default WineTaste;
