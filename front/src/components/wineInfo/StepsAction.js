import * as Api from "../../api";
import { Button, message } from "antd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  acidityAtom,
  bodyAtom,
  currentAtom,
  isCheckedAtom,
  isLoadedAtom,
  nationAtom,
  priceAtom,
  resultAtom,
  sweetAtom,
  tanninAtom,
  typeAtom,
} from "../../atoms";
import WineType from "./WineType";
import WineTaste from "./WineTaste";

const StepsAction = styled.div`
  display: flex;
  /* justify-content: flex-end;
  vertical-align: bottom; */
  /* margin-top: 20px;
  padding: 20px; */
  position: absolute;
  top: 87%;
  left: 77%;
`;

const TextWrapper = styled.div`
  padding-top: 40px;
  padding-left: 60px;
`;

const StepsTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.005em;
  color: #c365fd;
  margin-bottom: 15px;
`;

const StepsDesc = styled.span`
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: black;
`;

const StepsContent = styled.div`
  display: flex;
  flex-direction: column;
`;

function StpesBtn() {
  const [current, setCurrent] = useRecoilState(currentAtom);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedAtom);
  const [result, setResult] = useRecoilState(resultAtom);
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
      title: "와인 추천 ",
      description: "답변 데이터를 기반으로, 잘 맞는 와인를 추천해드릴게요.",
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
      if (res.data.isRandom === true) {
        message.success(
          "범위에 맞는 데이터가 없어, 가장 근접한 결과를 불러왔어요."
        );
        setResult(res.data.wines);
        setIsLoaded(true);
      } else {
        message.success(`추천 결과 ${res.data.wines.length}개를 불러왔어요.`);
        setResult(res.data.wines);
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
      <StepsContent>
        <TextWrapper>
          <StepsTitle>{steps[current].title}</StepsTitle>
          <StepsDesc>{steps[current].description}</StepsDesc>
        </TextWrapper>
        {steps[current].content}
      </StepsContent>
      <StepsAction>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={handleNextBtn}>
            다음
          </Button>
        )}
        {current === steps.length - 1 && (
          <form onSubmit={handleSubmit}>
            <Button type="primary" htmlType="submit">
              결과보기
            </Button>
          </form>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            이전으로
          </Button>
        )}
      </StepsAction>
    </>
  );
}

export default StpesBtn;
