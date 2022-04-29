import React, { useState } from "react";
import * as Api from "../../api";
import { Steps, Button, message, Card } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import WineType from "./WineType";
import WineTaste from "./WineTaste";
import { useRecoilValue } from "recoil";
import {
  acidityAtom,
  bodyAtom,
  isCheckedAtom,
  nationAtom,
  priceAtom,
  sweetAtom,
  tanninAtom,
  typeAtom,
} from "../../atoms";
import Result from "./Result";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState({});
  const price = useRecoilValue(priceAtom);
  const isChecked = useRecoilValue(isCheckedAtom);
  const nation = useRecoilValue(nationAtom);
  const type = useRecoilValue(typeAtom);
  const sweet = useRecoilValue(sweetAtom);
  const acidity = useRecoilValue(acidityAtom);
  const body = useRecoilValue(bodyAtom);
  const tannin = useRecoilValue(tanninAtom);
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
          price={price}
          isChecked={isChecked}
          nation={nation}
          type={type}
        />
      ),
    },
    {
      title: "맛 선택하기",
      description: "어떤 맛을 선호하시나요?",
      content: (
        <WineTaste
          sweet={sweet}
          acidity={acidity}
          body={body}
          tannin={tannin}
        />
      ),
    },
  ];

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
    await Api.post("wines/recommend", Inputs).then((res) => {
      if (res.data.length === 0) {
        message.info("범위를 다시 설정해주세요.");
      } else {
        setResult(res.data);
        setIsLoaded(true);
      }
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNextBtn = () => {
    if (current < 1) {
      setCurrent(current + 1);
    } else if (!nation && !type) {
      message.error("생산국, 와인 종류를 선택해주세요.");
    } else if (!nation) {
      message.error("생산국을 선택해주세요.");
    } else if (!type) {
      message.error("와인 종류를 선택해주세요.");
    } else {
      setCurrent(current + 1);
    }
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
          {!isLoaded ? (
            <StepBox>
              <StepsContent>{steps[current].content}</StepsContent>
              <Steps direction="vertical" size="small" current={current}>
                {steps.map((item) => (
                  <Step
                    key={item.title}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </Steps>
              <StepsAction>
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={handleNextBtn}>
                    다음
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <form onSubmit={handleSubmit}>
                    <Button type="primary" htmlType="submit">
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
          ) : (
            <div key={result.id} title={result.name}>
              {result.map((result) => (
                <Result
                  key={result.id}
                  wineId={result.id} // 와인 아이디 테스트 중
                  title={result.name}
                  type={result.type}
                  nation={result.nation}
                  local={result.local}
                  price={result.price}
                  abv={result.abv}
                  varieties={result.varieties}
                />
              ))}
              <Button onClick={() => setIsLoaded(false)}>돌아가기</Button>
            </div>
          )}
        </StepWrapper>
      </MainContainer>
    </>
  );
}

export default WineInfo;
