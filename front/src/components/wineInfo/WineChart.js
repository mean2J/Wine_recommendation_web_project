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
    labels: ["Sweet", "Acidity", "Body", "Tannin"],
    datasets: [
      {
        label: "Wine Taste",
        backgroundColor: "rgba(34, 202, 236, .2)",
        borderColor: "rgba(34, 202, 236, 1)",
        pointBackgroundColor: "rgba(34, 202, 236, 1)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(34, 202, 236, 1)",
        data: [sweet, acidity, body, tannin],
      },
    ],
  };
  const flavorRadarOptions = {
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
