import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Input, Radio, Form, Button } from "antd";
import * as Api from "../../api";

const { TextArea } = Input;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
  position: relative;
`;

const Editortop = styled.div`
  flex: 0 0 auto;
  max-width: 720px;
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
  border-bottom: 1px solid #eaebef;
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
  max-width: 720px;
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
  padding-bottom: 60px;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
`;

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, content, category);
    await Api.post("post", {
      category,
      title,
      content,
    });
  };

  return (
    <Wrapper>
      <div>?</div>
      <div>?</div>
      <div>?</div>
      <div>?</div>
      <Form>
        <Editortop>
          <EditorTopSection />
          <EditorTitleWrapper>
            <Form.Item
              rules={[{ required: true, message: "필수 입력 항목이에요." }]}
            >
              <EditorTitle
                placeholder="제목을 입력해주세요."
                bordered={false}
                showCount
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
            rules={[{ required: true, message: "필수 입력 항목이에요." }]}
          >
            <Radio.Group onChange={(e) => setCategory(e.target.value)}>
              <Radio.Button value="a">option1</Radio.Button>
              <Radio.Button value="b">option2</Radio.Button>
              <Radio.Button value="c">option3</Radio.Button>
              <Radio.Button value="d">option4</Radio.Button>
            </Radio.Group>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form.Item>
        </CategorieWrapper>
      </Form>
    </Wrapper>
  );
}

export default PostForm;
