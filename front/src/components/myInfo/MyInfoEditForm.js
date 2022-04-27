import "antd/dist/antd.css";
import { Card, Form, Input, Button } from "antd";

const { TextArea } = Input;

function MyInfoEditForm({ user, setIsEditing }) {
  return (
    <>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            email: user.email,
            name: user.name,
            description: user.description,
            password: user.password,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              {
                required: true,
                message: "수정할 이메일을 입력해주세요",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="이름"
            name="name"
            rules={[
              {
                required: true,
                message: "수정할 이름을 입력해주세요",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="소개"
            name="description"
            rules={[
              {
                required: false,
                message: "소개를 입력해주세요",
              },
            ]}
          >
            <TextArea showCount maxLength={100} style={{ height: 120 }} />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "수정할 비밀번호를 입력해주세요",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              수정하기
            </Button>
            <Button type="primary" danger onClick={() => setIsEditing(false)}>
              취소하기
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default MyInfoEditForm;
