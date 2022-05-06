import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import {
  Chart as ChartJS,
  registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SecSection = styled.section`
  height: 100vh;
`;

const ThirdSection = styled.div`
  height: 85vh;
`;

const ReasonWrapper = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
  padding: 0 48px;
  max-width: calc(1200px + 48px + 48px);
  margin: 0 auto;
`;

const ReasonTextWrapper = styled.div`
  text-align: left;
  width: 40%;
`;

const ReasonTitle = styled.p`
  position: absolute;
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 20px;
  top: 35%;
  span {
    color: #c365fd;
  }
`;

const ReasonDesc = styled.p`
  position: absolute;
  font-size: 20px;
  font-weight: 300;
  top: 42%;
  padding-top: 3vh;
  line-height: 24px;
`;

const StaticsWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 60%;
`;

const StaticsBox = styled.div`
  position: absolute;
  width: 700px;
  height: 450px;
  box-sizing: border-box;
  top: 20%;
  border-radius: 15px;
  text-align: right;
`;

const SecReasonWrapper = styled(ReasonWrapper)`
  height: 90vh;
`;
const SecrTextWrapper = styled(ReasonTextWrapper)``;
const SecrTitle = styled(ReasonTitle)`
  top: 20%;
`;
const SecrDesc = styled(ReasonDesc)`
  top: 27%;
`;
const SecStaticsWrapper = styled(StaticsWrapper)``;
const SecStaticsBox = styled(StaticsBox)`
  box-sizing: border-box;
  height: 427px;
  margin-right: 20px;
  position: relative;
  top: 5%;
  width: 700px;
`;

const ContentTitle = styled.span`
  font-weight: 500;
  font-size: 34px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  color: #fd6585;
  margin: 20px auto;
`;

const wineInfoData = {
  labels: ["2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "와인 수입량",
      data: [37384, 36144, 40292, 43495, 54127],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "와인 수입액",
      data: [19145, 21004, 24400, 25926, 33002],
      fill: true,
      backgroundColor: "rgba(113, 88, 145, 0.2)",
      borderColor: "rgba(113, 88, 145, 1)",
    },
  ],
};

const wineInfoOptions = {
  responsive: true,
  interaction: {
      mode: 'index',
      intersect: false,
    },
}

const growthData = {
  labels: ["2018", "2019", "2020"],
  datasets: [
    {
      label: "와인",
      data: [40291, 43495, 54192],
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      yAxisID: "y",
    },
    {
      label: "맥주",
      data: [387981, 360131, 277931],
      backgroundColor: "rgba(113, 88, 145, 0.2)",
      borderColor: "rgba(113, 88, 145, 1)",
      yAxisID: "y1",
    },
  ],
};

const growthOptions = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

function SecondSection() {
  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
    1: useScrollFadeIn("up", 0.9, 0.1),
    2: useScrollFadeIn("up", 0.9, 0.2),
    3: useScrollFadeIn("up", 0.9, 0),
    4: useScrollFadeIn("up", 0.9, 0.1),
    5: useScrollFadeIn("up", 0.9, 0.2),
  };
  return (
    <>
      <SecSection>
        <ReasonWrapper>
          <ReasonTextWrapper>
            <ReasonTitle {...animatedItem[0]}>
              대한민국은 <span>'와인'</span> 열풍
            </ReasonTitle>
            <ReasonDesc {...animatedItem[1]}>
              증가하는 대한민국의 와인 시장 속,
              <br />
              무슨 와인을 마실지 문제이신가요?
            </ReasonDesc>
          </ReasonTextWrapper>
          <StaticsWrapper>
            <StaticsBox {...animatedItem[2]}>
              <ContentTitle>와인 수입</ContentTitle>
              <Line data={wineInfoData} options={wineInfoOptions}/>
              출처:수출입무역통계(관세청) <br /> 단위:천 불(USD 1,000) / 톤(TON)
            </StaticsBox>
          </StaticsWrapper>
        </ReasonWrapper>
        <SecReasonWrapper>
          <SecrTextWrapper>
            <SecrTitle {...animatedItem[3]}>
              <span>와인</span>은 어렵다?
            </SecrTitle>
            <SecrDesc {...animatedItem[4]}>
              <br />
              나도 와인을 한 번 마셔볼까? <br />
              오늘은 어떤 와인을 마시지? <br />
              어떤 와인을 선물해주지? <br />
              <br />
              와인에 대한 다양한 고민을 해결해 드립니다!
            </SecrDesc>
          </SecrTextWrapper>
          <SecStaticsWrapper>
            <SecStaticsBox {...animatedItem[5]}>
              <ContentTitle>맥주 와인 수입량</ContentTitle>
              <Line data={growthData} options={growthOptions} />
              출처:맥주 와인 수입 통계(관세청) <br />  단위:톤(TON)
            </SecStaticsBox>
          </SecStaticsWrapper>
        </SecReasonWrapper>
      </SecSection>
      <ThirdSection />
    </>
  );
}

export default SecondSection;
