import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Space, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import * as Api from "../../api";
import styled from "styled-components";

const Container = styled.div`
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  width: 800px;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #fff;
`;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function PostList() {
  const [posts, setPosts] = useState([]);

  /*
   * 게시글 리스트 조회
   */
  useEffect(() => {
    Api.get(`postlist`).then((res) => {
      setPosts(res.data.postList);
      // console.log(posts);
    });
  }, []);

  return (
    <Container>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={posts}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <div>{item.author}</div>,
              <IconText
                icon={MessageOutlined}
                text="댓글 갯수 예정"
                key="list-vertical-message"
              />,
              <div>조회 {item.view}</div>,
              <Tag>{item.category}</Tag>,
              <div>{item.createdAt}</div>,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/community/${item.id}`}>{item.title}</Link>}
              description={item.content}
            />
          </List.Item>
        )}
      />
    </Container>
  );
}

export default PostList;
