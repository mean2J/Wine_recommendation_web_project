import styled from "styled-components";

const RedWrapper = styled.span`
  background-color: #a72c48;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  color: white;
`;

const SparklingWrapper = styled.span`
  background-color: #d7cea1;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
`;

const RoseWrapper = styled.span`
  background-color: #f39e9e;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
`;

const WhiteWrapper = styled.span`
  background-color: #fbe985;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
`;

const Red = () => (
  <div>
    <RedWrapper>Red</RedWrapper>
  </div>
);
const White = () => (
  <div>
    <WhiteWrapper>White</WhiteWrapper>
  </div>
);
const Sparkling = () => (
  <div>
    <SparklingWrapper>Sparkling</SparklingWrapper>
  </div>
);
const Rose = () => (
  <div>
    <RoseWrapper>Rose</RoseWrapper>
  </div>
);

function BookmarkInfoType({ type }) {
  return (
    <>
      {type === "Red" && <Red />}
      {type === "White" && <White />}
      {type === "Sparkling" && <Sparkling />}
      {type === "Rose" && <Rose />}
    </>
  );
}

export default BookmarkInfoType;
