import styled from "styled-components";

const Name = styled.span`
  font-size: 15px;
`;

const CustomIcon1 = () => {
  return <span style={{ color: "#f1c0ce", fontSize: "20px" }}>● </span>;
};
const CustomIcon2 = () => {
  return <span style={{ color: "#e999b0", fontSize: "20px" }}>● </span>;
};
const CustomIcon3 = () => {
  return <span style={{ color: "#e07392", fontSize: "20px" }}>● </span>;
};
const CustomIcon4 = () => {
  return <span style={{ color: "#d5406b", fontSize: "20px" }}>● </span>;
};
const CustomIcon5 = () => {
  return <span style={{ color: "#c70039", fontSize: "20px" }}>● </span>;
};
const CustomIcon6 = () => {
  return <span style={{ color: "#f0f0f0", fontSize: "20px" }}>● </span>;
};

function BookmarkInfoRate({ name, value }) {
  const rate = value;
  return (
    <>
      <Name>{name} </Name>
      {rate >= 1 ? <CustomIcon1 /> : <CustomIcon6 />}
      {rate >= 2 ? <CustomIcon2 /> : <CustomIcon6 />}
      {rate >= 3 ? <CustomIcon3 /> : <CustomIcon6 />}
      {rate >= 4 ? <CustomIcon4 /> : <CustomIcon6 />}
      {rate >= 5 ? <CustomIcon5 /> : <CustomIcon6 />}
    </>
  );
}

export default BookmarkInfoRate;
