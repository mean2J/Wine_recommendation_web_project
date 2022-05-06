import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import { Doughnut, PolarArea, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  registerables,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
ChartJS.register(
  ...registerables,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

const nationData = {
  labels: ["프랑스", "이탈리아", "미국", "칠레", "스페인", "호주", "기타 국가"],
  datasets: [
    {
      label: "보유 와인 정보",
      data: [6892, 4258, 2744, 2027, 1629, 1478, 2211],
      fill: true,
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(34, 202, 236, .2)",
      ],
      borderWidth: 1,
    },
  ],
};

const priceData = {
  labels: [
    "-5만원",
    "5-10만원",
    "10-15만원",
    "15-30만원",
    "30-50만원",
    "50만원 이상",
  ],
  datasets: [
    {
      label: "와인 가격",
      data: [4330, 3469, 1377, 1976, 683, 651],
      fill: true,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  ],
};

const typeData = {
  labels: ["Red", "White", "Rose", "Sparkling"],
  datasets: [
    {
      label: "count",
      data: [13838, 5478, 336, 1587],
      fill: true,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 206, 86, 1)",
      ],
    },
  ],
};

const flavorMeanData = {
  labels: ["Sweet", "Acidity", "Body", "Tannin"],
  datasets: [
    {
      label: "March",
      backgroundColor: "rgba(34, 202, 236, .2)",
      borderColor: "rgba(34, 202, 236, 1)",
      pointBackgroundColor: "rgba(34, 202, 236, 1)",
      poingBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(34, 202, 236, 1)",
      data: [1, 2, 3, 5],
    },
  ],
};

const nationOptions = {
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const priceOptions = {
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const typeOptions = {
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
   interaction: {
      mode: 'index',
      intersect: false,
    },
};

const flavorRadarOptions = {
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scale: {
    r: {
      min: 0,
      max: 5,
      beginAtZero: true,
      angleLines: {
        display: false,
      },
      ticks: {
        display: false,
        stepSize: 1,
      },
    },
  },
};

const TrdSection = styled.section`
  background-color: #f9fafb;
  height: 85vh;
`;

const Titlewrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
`;

const FeatureTitle = styled.span`
  font-weight: 600;
  font-size: 54px;
  line-height: 54px;
  color: black;
  display: block;
  text-align: center;
  span {
    color: #c365fd;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Contents = styled.div`
  padding-top: 8vh;
  padding-right: 5px;
  padding-left: 5px;
  margin: auto;
`;

const ContentTitle = styled.span`
  font-weight: 500;
  font-size: 32px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  color: #fd6585;
  margin-bottom: 30px;
`;

const ContentDesc = styled.div`
  position: relative;
  margin: 0 auto;
`;

export function ThirdSection() {
  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
    1: useScrollFadeIn("up", 0.9, 0),
  };

  return (
    <TrdSection>
      <Titlewrapper>
        <FeatureTitle {...animatedItem[0]}>
          총 데이터량 <span>20,000+</span> <br />
          다양한 데이터 기반의 추천 서비스
        </FeatureTitle>
      </Titlewrapper>
      <ContentWrapper>
        <InnerWrapper {...animatedItem[1]}>
          <Contents>
            <ContentTitle>원산지</ContentTitle>
            <ContentDesc>
              <PolarArea
                data={nationData}
                width={280}
                height={280}
                options={nationOptions}
              />
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>가격</ContentTitle>
            <ContentDesc>
              <Doughnut
                data={priceData}
                width={280}
                height={280}
                options={priceOptions}
              />
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>와인 종류</ContentTitle>
            <ContentDesc>
              <Bar
                data={typeData}
                width={280}
                height={280}
                options={typeOptions}
              />
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>맛</ContentTitle>
            <ContentDesc>
              <Radar
                data={flavorMeanData}
                width={280}
                height={280}
                options={flavorRadarOptions}
              />
            </ContentDesc>
          </Contents>
        </InnerWrapper>
      </ContentWrapper>
    </TrdSection>
  );
}
