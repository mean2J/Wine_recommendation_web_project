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
  margin-top: 24px;
`;

const StepsContent = styled.div``;

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
        message.success(`추천 결과 ${res.data.length}개를 불러왔어요.`);
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
      <StepsContent>{steps[current].content}</StepsContent>
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
    </>
  );
}

export default StpesBtn;
