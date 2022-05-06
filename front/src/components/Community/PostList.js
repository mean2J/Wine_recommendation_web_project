import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import * as Api from "../../api";

function PostList() {
  const [posts, setPosts] = useState([]);

  const category = "free";
  const title = "title1";
  const content = "Do you know what is Jazz?";

  // const writePost = async () => {
  //   await Api.post("post", { category, title, content }).then((res) => {
  //     console.log(res);
  //   });
  // };

  // useEffect(() => {
  //   writePost();
  // }, []);

  /*
   * 게시글 리스트 조회
   */
  useEffect(() => {
    Api.get(`postlist`).then((res) => {
      console.log("😁", res.data);
    });
  }, []);

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "카테고리",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "작성자",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "날짜",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "조회수",
      dataIndex: "views",
      key: "views",
    },
  ];

  /*
   * dummy
   */
  const data = [
    {
      key: "1",
      idx: 1,
      title: "첫번째 게시글 제목",
      tags: ["nice", "developer"],
      author: "A",
      date: "2020-01-01",
      views: 1,
    },
    {
      key: "2",
      idx: 2,
      title: "두번째 게시글 제목",
      tags: ["category", "developer"],
      author: "B",
      date: "2020-05-01",
      views: 14,
    },
    {
      key: "3",
      idx: 3,
      title: "세번째 게시글 제목",
      tags: ["nice", "developer"],
      author: "C",
      date: "2020-06-01",
      views: 122,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />;
    </>
  );
}

export default PostList;
