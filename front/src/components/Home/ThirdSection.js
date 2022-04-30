import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import { Doughnut, PolarArea, Pie } from "react-chartjs-2";
import * as Api from "../../api";
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

const nationOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        title: function (data) {
          console.log(data);
          // return `${nationData.labels[tooltipItem.index].label} 와인은 맛있다`;
        },
      },
    },
  },
};

const TrdSection = styled.section`
  background-color: #f9fafb;
  height: 1080px;
`;

const Titlewrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 120px;
`;

const FeatureTitle = styled.span`
  font-weight: 600;
  font-size: 54px;
  line-height: 72px;
  color: black;
  display: block;
  text-align: center;
  span {
    color: #c365fd;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 48px;
  max-width: calc(960px + 48px + 48px);
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  display: flex;
  margin-left: -30px;
  margin-top: -77px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Contents = styled.div`
  padding-top: 24px;
`;

const ContentTitle = styled.span`
  font-weight: 500;
  font-size: 28px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  color: #fd6585;
  margin-bottom: 20px;
`;

const ContentDesc = styled.div`
  position: relative;
  width: 40vh;
  height: 100%;
  margin: 0 10px;
`;

export function ThirdSection() {
  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
    1: useScrollFadeIn("up", 0.9, 0),
  };
  const [statLists, setStatLists] = useState();
  const [firstData, setFirstData] = useState({});
  const [secondData, setSecondData] = useState({});
  const [thirdData, setThirdData] = useState({});
  const [fourthData, setFourthData] = useState({});
  const [fifthData, setFifthData] = useState({});

  useEffect(() => {
    Api.get("statlist").then((res) => {
      setStatLists(res.data);
    });
    Api.get("stat", 2).then((res) => {
      setFirstData({
        labels: res.data.labels,
        datasets: [
          {
            label: "type",
            data: res.data.y_ax,
            fill: true,
            backgroundColor: [
              "rgba(75, 192, 192, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
          },
        ],
      });
    });
    Api.get("stat", 3).then((res) => {
      setSecondData({
        labels: res.data.labels,
        datasets: [
          {
            label: "type",
            data: res.data.y_ax,
            fill: true,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
          },
        ],
      });
    });
    Api.get("stat", 4).then((res) => {
      setThirdData({
        labels: res.data.labels,
        datasets: [
          {
            label: "type",
            data: res.data.y_ax,
            fill: true,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
          },
        ],
      });
    });
    Api.get("stat", 5).then((res) => {
      setFourthData({
        labels: res.data.labels,
        datasets: [
          {
            label: "type",
            data: res.data.y_ax,
            fill: true,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
          },
        ],
      });
    });
    Api.get("stat", 5).then((res) => {
      setFifthData({
        labels: res.data.labels,
        datasets: [
          {
            label: "type",
            data: res.data.y_ax,
            fill: true,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
          },
        ],
      });
    });
  }, []);

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
            <ContentTitle>생산국</ContentTitle>
            <ContentDesc>
              <PolarArea data={nationData} options={nationOptions} />
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>와인 종류</ContentTitle>
            <ContentDesc>
              {statLists && firstData && <Doughnut data={firstData} />}
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>프랑스의 와인 생산 비율</ContentTitle>
            <ContentDesc>
              {statLists && secondData && <Pie data={secondData} />}
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>스페인의 와인 생산 비율</ContentTitle>
            <ContentDesc>
              {statLists && thirdData && <Pie data={thirdData} />}
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>독일의 와인 생산 비율</ContentTitle>
            <ContentDesc>
              {statLists && fourthData && <Pie data={fourthData} />}
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>뉴질랜드의 와인 생산 비율</ContentTitle>
            <ContentDesc>
              {statLists && fifthData && <Pie data={fifthData} />}
            </ContentDesc>
          </Contents>
        </InnerWrapper>
      </ContentWrapper>
    </TrdSection>
  );
}
