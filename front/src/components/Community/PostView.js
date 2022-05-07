import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, PageHeader, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import moment from "moment";

import PostEditForm from "./PostEditForm";
import PostDeleteModal from "./PostDeleteModal";
import Comment from "./Comment/Comment";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

/*
 * POST 상세 페이지
 */

const MainContainer = styled.div`
  padding-top: 50px;
  position: relative;
  flex: 0 0 auto;
`;

const Container = styled.div`
  position: relative;
  width: 800px;
  margin: 0 auto;
  background-color: #fff;
`;

const StyledCard = styled.div`
  width: 720px;
  position: relative;
  width: 100%;
  margin: 0px auto;
  box-sizing: border-box;
`;

const TopWrapper = styled.div`
  margin: 50px 0px 60px;
  padding: 0px;
  width: 100%;
`;

const HeadWarpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledHeader = styled(PageHeader)`
  padding: 0;
  .ant-page-header-heading-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: rgb(101, 110, 117);
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  float: right;
  Button {
    margin: 16px 0 16px 0;
  }
  Button:first-child {
    margin-right: 10px;
  }
`;

const Title = styled.p`
  margin: 15px 0px 32px;
  font-size: 32px;
  line-height: 42px;
  color: rgb(47, 52, 56);
  font-weight: 600;
  font-size: 32px;
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InnerAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorText = styled.div`
  margin-left: 12px;
`;

const AuthorUser = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: rgb(47, 52, 56);
`;
const TimeText = styled.span`
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  display: block;
  color: rgb(101, 110, 117);
`;

const ContentWrapper = styled.div`
  margin: 60px 0px;
  padding: 0px;
  font-size: 16px;
  line-height: 32px;
`;

const CategorieWrapper = styled.div`
  margin: 34px 0px 24px;
  padding: 0px;
  color: #c365fd;
`;

const CountWrapper = styled.div`
  margin: 8px 0px;
  padding: 0px;
  font-size: 14px;
  color: rgb(101, 110, 117);
`;

function PostView() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const { postId } = useParams(); // 전달받은 postId
  const [post, setPost] = useState({});
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false); // 삭제 모달 여부

  // 수정/삭제 권한 체크
  const [authorId, setAuthorId] = useState("");
  const currentUserId = userState.user.user.id;

  const getPost = useCallback(async () => {
    const res = await Api.get(`post/${postId}`);
    setPost(res.data.post);
  }, [postId]);

  const getView = useCallback(async () => {
    await Api.get(`post/view/${postId}`);
  }, [postId]);

  useEffect(() => {
    getPost();
    setAuthorId(post.userId);
  }, [getPost, title, content, category, setAuthorId, post.userId]);

  useEffect(() => {
    getView();
  }, [getView]);

  return (
    <>
      <MainContainer>
        <HelmetProvider>
          <Helmet>
            <title>{post.title}</title>
          </Helmet>
        </HelmetProvider>
        <Container>
          {!isEditing ? (
            <StyledCard>
              <TopWrapper>
                <HeadWarpper>
                  <StyledHeader
                    className="site-page-header"
                    onBack={() => navigate("/community")}
                    title="목록으로 돌아가기"
                  />
                </HeadWarpper>
                <Title>{post.title}</Title>
                <AuthorWrapper>
                  <InnerAuthor>
                    <Avatar size="large" icon={<UserOutlined />} />
                    <AuthorText>
                      <AuthorUser>{post.author}</AuthorUser>
                      <TimeText>
                        {moment(post.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                      </TimeText>
                    </AuthorText>
                  </InnerAuthor>
                </AuthorWrapper>
              </TopWrapper>
              <ContentWrapper>
                <p>{post.content}</p>
              </ContentWrapper>
              <CategorieWrapper>#{post.category}</CategorieWrapper>
              <CountWrapper>조회: {post.view}</CountWrapper>
              {authorId === currentUserId && (
                <BtnWrapper>
                  <Button onClick={() => setIsEditing(true)}>수정</Button>
                  <Button onClick={() => setIsModal(true)}>삭제</Button>
                </BtnWrapper>
              )}
              <Divider />
              {isModal && (
                <PostDeleteModal
                  postId={postId}
                  isModal={isModal}
                  setIsModal={setIsModal}
                />
              )}
            </StyledCard>
          ) : (
            <PostEditForm
              post={post}
              setIsEditing={setIsEditing}
              setTitle={setTitle}
              setContent={setContent}
              setCategory={setCategory}
            />
          )}
        </Container>
      </MainContainer>
      <Comment />
    </>
  );
}

export default PostView;
