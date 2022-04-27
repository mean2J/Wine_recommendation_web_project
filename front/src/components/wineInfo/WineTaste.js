import { Slider } from "antd";
import styled from "styled-components";

function WineTaste({ setSweet, setAcidity, setBody, setTannin }) {
  const marks = {
    0: "0",
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
        min={0}
        step={null}
        defaultValue={[0, 2]}
        onAfterChange={(value) => {
          setSweet(value);
        }}
      />
      <span>산도</span>
      <Slider
        range
        marks={marks}
        max={5}
        min={0}
        step={null}
        defaultValue={[0, 2]}
        onAfterChange={(value) => {
          setAcidity(value);
        }}
      />
      <span>바디감</span>
      <Slider
        range
        marks={marks}
        max={5}
        min={0}
        step={null}
        defaultValue={[0, 2]}
        onAfterChange={(value) => {
          setBody(value);
        }}
      />
      <span>탄닌</span>
      <Slider
        range
        marks={marks}
        max={5}
        min={0}
        step={null}
        defaultValue={[0, 2]}
        onAfterChange={(value) => {
          setTannin(value);
        }}
      />
    </>
  );
}

export default WineTaste;
