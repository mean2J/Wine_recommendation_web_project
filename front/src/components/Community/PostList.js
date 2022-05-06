import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { List, Space, Pagination } from "antd";
import styled from "styled-components";
import { MessageOutlined } from "@ant-design/icons";
import * as Api from "../../api";

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 100px;
  background-color: #f8f9fa;
`;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function PostList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const currentPage = Number(page);
  const [totalPage, setTotalPage] = useState(0);
  const maxPost = 5;

  /*
   * 게시글 리스트 조회
   */
  const handlePosts = useCallback(async () => {
    const curPage = new URLSearchParams(location.search).get("page");
    if (curPage === null) {
      setPage(1);
    } else {
      setPage(curPage);
    }
    const res = await Api.get(`postlist/?page=${page}&maxPost=${maxPost}`);
    setTotalPage(res.data.finalPage);
    setPosts(res.data.postList);
  }, [page, maxPost, location]);

  /*
   * 페이지네이션
   */
  const handlePageChange = (value) => {
    navigate(`/community/postlist/?page=${value}&maxPost=${maxPost}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handlePosts();
  }, [handlePosts]);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
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
      <StyledPagination
        simple
        current={currentPage}
        defaultCurrent={1}
        onChange={handlePageChange}
        total={totalPage * 10}
      />
    </>
  );
}

export default PostList;
