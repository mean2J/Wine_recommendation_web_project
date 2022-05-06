import { Radar } from "react-chartjs-2";
import styled from "styled-components";

const ContentDesc = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  float: right;
  position: relative;
`;
const Wrapper = styled.div`
  position: absolute;
  right: 20%;
`;

function WineChart({ sweet, acidity, body, tannin }) {
  const flavorMeanData = {
    labels: ["단맛", "산미", "바디감", "쓴맛"],
    datasets: [
      {
        backgroundColor: "rgba(149, 31, 153, 0.64)",
        borderColor: "rgba(155, 66, 176, 1)",
        pointBackgroundColor: "rgba(149, 31, 153, 0.65)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(149, 31, 153, 0.64)",
        data: [sweet, acidity, body, tannin],
      },
    ],
  };
  const flavorRadarOptions = {
    plugins: {
      legend: {
        display: false,
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
  return (
    <ContentDesc>
      <Wrapper>
        <Radar data={flavorMeanData} options={flavorRadarOptions} />
      </Wrapper>
    </ContentDesc>
  );
}

export default WineChart;
