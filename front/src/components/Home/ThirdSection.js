import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

const TrdSection = styled.section`
  /* height: 100vh; */
  background-color: #f9fafb;
  height: 1080px;
`;

const Titlewrapper = styled.div`
  padding-top: 150px;
  padding-bottom: 150px;
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
  padding-left: 30px;
  padding-top: 77px;
`;

const ContentTitle = styled.span`
  font-weight: 600;
  font-size: 38px;
  line-height: 72px;
  display: flex;
  align-items: center;
  color: #fd6585;
  margin-bottom: 20px;
`;

const ContentDesc = styled.span`
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  align-items: center;
  color: #000000;
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
          다양한 개인 맞춤형 추천 서비스
        </FeatureTitle>
      </Titlewrapper>

      <ContentWrapper>
        <InnerWrapper {...animatedItem[1]}>
          <Contents>
            <ContentTitle>기능이름</ContentTitle>
            <ContentDesc>
              Lorem Ipsum is simply dummy text of <br />
              the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's <br />
              standard
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>기능이름</ContentTitle>
            <ContentDesc>
              Lorem Ipsum is simply dummy text of <br />
              the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's <br />
              standard
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>기능이름</ContentTitle>
            <ContentDesc>
              Lorem Ipsum is simply dummy text of <br />
              the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's <br />
              standard
            </ContentDesc>
          </Contents>
          <Contents>
            <ContentTitle>기능이름</ContentTitle>
            <ContentDesc>
              Lorem Ipsum is simply dummy text of <br />
              the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's <br />
              standard
            </ContentDesc>
          </Contents>
        </InnerWrapper>
      </ContentWrapper>
    </TrdSection>
  );
}
