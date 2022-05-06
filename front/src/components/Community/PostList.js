import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Space } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import * as Api from "../../api";

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
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
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
              <div>{item.category}</div>,
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
    </>
  );
}

export default PostList;
