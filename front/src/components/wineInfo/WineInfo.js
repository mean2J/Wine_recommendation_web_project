import React, { useState } from "react";
import * as Api from "../../api";
import { Steps, Button, message } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import WineType from "./WineType";
import WineTaste from "./WineTaste";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
`;

const StepWrapper = styled.div``;

const StepBox = styled.div`
  width: 900px;
  height: 560px;
  background: #ffffff;
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-radius: 20px;
`;

const StepsContent = styled.div``;

const StepsAction = styled.div`
  margin-top: 24px;
`;

const { Step } = Steps;

function WineInfo() {
  const [current, setCurrent] = useState(0);
  const [price, setPrice] = useState([0, 50000]);
  const [nation, setNation] = useState("");
  const [type, setType] = useState("");
  const [sweet, setSweet] = useState([0, 2]);
  const [acidity, setAcidity] = useState([0, 2]);
  const [body, setBody] = useState([0, 2]);
  const [tannin, setTannin] = useState([0, 2]);
  const [isChecked, setIsChecked] = useState(false);

  const steps = [
    {
      title: "인트로",
      description: "인트로 페이지입니다.",
    },
    {
      title: "와인 종류 선택하기",
      description: "어떤 종류의 와인을 추천해드릴까요?",
      content: (
        <WineType
          setPrice={setPrice}
          setNation={setNation}
          setType={setType}
          setIsChecked={setIsChecked}
        />
      ),
    },
    {
      title: "맛 선택하기",
      description: "어떤 맛을 선호하시나요?",
      content: (
        <WineTaste
          setSweet={setSweet}
          setAcidity={setAcidity}
          setBody={setBody}
          setTannin={setTannin}
        />
      ),
    },
  ];

  //현재 오류나는 부분 -> 제출하면 정상적으로 네트워크 요청이 처리 X
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Inputs = {
      price,
      nation,
      type,
      sweet,
      acidity,
      body,
      tannin,
      isChecked,
    };
    const Values = JSON.stringify(Inputs);
    console.log(Values);
    await Api.get("wines/recommend", Values).then((res) =>
      console.log(res.data)
    );
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>와인 추천 받아보기</title>
        </Helmet>
      </HelmetProvider>

      <MainContainer>
        <StepWrapper>
          <StepBox>
            <StepsContent>{steps[current].content}</StepsContent>
            <StepsAction>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  다음
                </Button>
              )}
              {current === steps.length - 1 && (
                <form onSubmit={handleSubmit}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => console.log("제출됨")}
                  >
                    결과보기 &rarr;
                  </Button>
                </form>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  이전으로
                </Button>
              )}
            </StepsAction>
          </StepBox>
        </StepWrapper>
        <Steps direction="vertical" size="small" current={current}>
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </Steps>
      </MainContainer>
    </>
  );
}

export default WineInfo;
