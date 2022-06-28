import PostList from "./PostList";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MainContainer = styled.div`
  background-color: #f8f9fa;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 1200px;
  padding: 120px 48px;
  margin: 0 auto;
`;

const BoxWrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

const StepWrapper = styled.div`
  display: flex;
  margin-right: 100px;
  height: 50px;
`;

function PostMain() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>커뮤니티</title>
        </Helmet>
      </HelmetProvider>
      <MainContainer>
        <Container>
          <BoxWrapper>
            <PostList />
          </BoxWrapper>
          <StepWrapper>
            <Link to={`/community/newPost`}>
              <Button>글 작성하기✍</Button>
            </Link>
          </StepWrapper>
        </Container>
      </MainContainer>
    </>
  );
}

export default PostMain;
