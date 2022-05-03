import { Comment, Tooltip, Avatar, Tag, Rate, Divider } from "antd";
import { UserOutlined, StarOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";

const StyledTitle = styled.span`
  font-size: 16px;
  color: black;
  font-weight: 500;
  /* margin-right: 10px; */
`;

const ReviewCard = ({ title, content, createdAt, rating }) => {
  return (
    <>
      <Comment
        author={
          <>
            <StyledTitle>{title}</StyledTitle>
          </>
        }
        avatar={
          <Tag icon={<StarOutlined />} color="gold">
            {rating}
          </Tag>
        }
        content={<p>{content}</p>}
        datetime={
          <Tooltip title={moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment(createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
      {/* <Divider /> */}
    </>
  );
};

export default ReviewCard;
