import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

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
  background-color: #f8f9fa;
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
  width: 332px;
`;
const SecStaticsBox2 = styled(SecStaticsBox)`
  margin: 0;
`;

function SecondSection() {
  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
    1: useScrollFadeIn("up", 0.9, 0.1),
    2: useScrollFadeIn("up", 0.9, 0.2),
    3: useScrollFadeIn("up", 0.9, 0),
    4: useScrollFadeIn("up", 0.9, 0.1),
    5: useScrollFadeIn("up", 0.9, 0.2),
    6: useScrollFadeIn("up", 0.9, 0.3),
  };
  return (
    <>
      <SecSection>
        <ReasonWrapper>
          <ReasonTextWrapper>
            <ReasonTitle {...animatedItem[0]}>
              제목과 <span>강조</span>
            </ReasonTitle>
            <ReasonDesc {...animatedItem[1]}>
              Lorem Ipsum is simply dummy text of <br />
              the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's <br />
              standard dummy text ever since the 1500s,
            </ReasonDesc>
          </ReasonTextWrapper>
          <StaticsWrapper>
            <StaticsBox {...animatedItem[2]}></StaticsBox>
          </StaticsWrapper>
        </ReasonWrapper>
        <SecReasonWrapper>
          <SecrTextWrapper>
            <SecrTitle {...animatedItem[3]}>
              제목과 <span>강조</span>
            </SecrTitle>
            <SecrDesc {...animatedItem[4]}>
              Lorem Ipsum is simply dummy text of <br />
              the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's <br />
              standard dummy text ever since the 1500s,
            </SecrDesc>
          </SecrTextWrapper>
          <SecStaticsWrapper>
            <SecStaticsBox {...animatedItem[5]}></SecStaticsBox>
            <SecStaticsBox2 {...animatedItem[6]}></SecStaticsBox2>
          </SecStaticsWrapper>
        </SecReasonWrapper>
      </SecSection>
      <ThirdSection />
    </>
  );
}

export default SecondSection;
