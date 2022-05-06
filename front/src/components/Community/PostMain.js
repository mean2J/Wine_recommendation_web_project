import PostList from "./PostList";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

function PostMain() {
  return (
    <>
      <div>?</div>
      <div>?</div>
      <div>?</div>
      <div>?</div>
      <Link to={`/community/newPost`}>
        <Button>글 작성하기</Button>
      </Link>
      <PostList />
    </>
  );
}

export default PostMain;
