import React, { useState } from "react";
import * as Api from "../../api";
import styled from "styled-components";
import { Form, Input, Button, Radio, message } from "antd";
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

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 60px;
  width: 900px;
  margin: 0 auto;
`;
const StyledItem = styled(Form.Item)``;

function PostEditForm({
  post,
  setTitle,
  setContent,
  setCategory,
  setIsEditing,
}) {
  const [curTitle, setCurTitle] = useState(post.title);
  const [curContent, setCurContent] = useState(post.content);
  const [curCategory, setCurCategory] = useState(post.category);

  const onFinish = async () => {
    try {
      await Api.put(`post/${post.id}`, {
        title: curTitle,
        content: curContent,
      });
      // 수정 내용 변경
      setTitle(curTitle);
      setContent(curContent);
      setCategory(curCategory);

      setIsEditing(false);
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
        name="basic"
        initialValues={{
          title: curTitle,
          content: curContent,
          category: curCategory,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Editortop>
          <EditorTopSection />
          <EditorTitleWrapper>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "제목을 입력해주세요.",
                },
              ]}
            >
              <EditorTitle
                placeholder="제목을 입력해주세요."
                bordered={false}
                showCount
                autoFocus
                maxLength={20}
                onChange={(e) => setCurTitle(e.target.value)}
              />
            </Form.Item>
          </EditorTitleWrapper>
        </Editortop>
        <ContentsWrapper>
          <ContentsList>
            <Contents>
              <ContentsContainer>
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "내용을 입력해주세요.",
                    },
                  ]}
                >
                  <StyledArea
                    placeholder="내용을 입력해주세요. (1000자 이하)"
                    bordered={false}
                    autoSize
                    maxLength={999}
                    onChange={(e) => setCurContent(e.target.value)}
                  />
                </Form.Item>
              </ContentsContainer>
            </Contents>
          </ContentsList>
        </ContentsWrapper>
        <CategoryWrapper>
          <Form.Item
            label="카테고리"
            name="category"
            rules={[{ required: true, message: "필수 선택 항목이에요." }]}
          >
            <Radio.Group onChange={(e) => setCurCategory(e.target.value)}>
              <Radio.Button value="와인추천">와인추천</Radio.Button>
              <Radio.Button value="와인상식">와인상식</Radio.Button>
              <Radio.Button value="와인샵">와인샵</Radio.Button>
              <Radio.Button value="가격정보">가격정보</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <StyledItem>
            <Button
              style={{ marginRight: "10px" }}
              type="primary"
              htmlType="submit"
            >
              수정
            </Button>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
          </StyledItem>
        </CategoryWrapper>
      </Form>
    </Wrapper>
  );
}

export default PostEditForm;
