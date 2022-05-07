import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Input, Radio, Form, Button, message } from "antd";
import * as Api from "../../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  position: relative;
  height: 100vh;
`;

const Editortop = styled.div`
  flex: 0 0 auto;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
`;

const EditorTopSection = styled.div`
  margin: 30px 0 0;
  padding: 0;
  border: none;
`;

const EditorTitleWrapper = styled.div`
  margin: 45px 0 0;
  position: relative;
`;

const EditorTitle = styled(Input)`
  border-bottom: 1px solid grey;
  padding: 15px 0 15px 0;
  font-size: 34px;
  line-height: 31px;
  width: 100%;
  margin: 0;
  color: #292929;
  font-weight: 500;
  line-height: 22px;
  .ant-input-show-count-suffix {
    font-size: 16px;
  }
`;

const ContentsWrapper = styled.div`
  flex: 1 0 auto;
  cursor: text;
`;

const ContentsList = styled.div`
  padding: 40px 0 30vh;
  cursor: text;
`;

const Contents = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentsContainer = styled.div`
  margin: 10px 0;
  position: relative;
`;

const StyledArea = styled(TextArea)`
  margin: 2px -3px;
  padding: 0 3px;
  color: #292929;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  min-height: 28px;
`;

const CategorieWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 60px;
  width: 900px;
  margin: 0 auto;
`;

const StyledItem = styled(Form.Item)``;

function PostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      console.log(title, content, category);
      await Api.post("post", {
        category,
        title,
        content,
      });
      navigate("/community/postList");
      message.success("글이 등록되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Wrapper>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Editortop>
          <EditorTopSection />
          <EditorTitleWrapper>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "필수 입력 항목이에요." }]}
            >
              <EditorTitle
                placeholder="제목을 입력해주세요."
                bordered={false}
                showCount
                autoFocus
                maxLength={20}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>
          </EditorTitleWrapper>
        </Editortop>
        <ContentsWrapper>
          <ContentsList>
            <Contents>
              <ContentsContainer>
                <StyledArea
                  placeholder="내용을 입력해주세요. (1000자 이하)"
                  bordered={false}
                  autoSize
                  maxLength={999}
                  onChange={(e) => setContent(e.target.value)}
                />
              </ContentsContainer>
            </Contents>
          </ContentsList>
        </ContentsWrapper>
        <CategorieWrapper>
          <Form.Item
            label="카테고리"
            name="radio-button"
            rules={[{ required: true, message: "필수 선택 항목이에요." }]}
          >
            <Radio.Group onChange={(e) => setCategory(e.target.value)}>
              <Radio.Button value="와인추천">와인추천</Radio.Button>
              <Radio.Button value="와인상식">와인상식</Radio.Button>
              <Radio.Button value="와인샵">와인샵</Radio.Button>
              <Radio.Button value="가격정보">가격정보</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <StyledItem
            style={{ marginLeft: "200px" }}
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              글 올리기
            </Button>
          </StyledItem>

          <StyledItem>
            <Link to={`/community/postList`}>
              <Button>목록으로 돌아가기</Button>
            </Link>
          </StyledItem>
        </CategorieWrapper>
      </Form>
    </Wrapper>
  );
}

export default PostForm;
