import "antd/dist/antd.css";
import { Card, Form, Input, Button } from "antd";

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
            nickname: user.nickname,
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
            <Input placeholder={user.email} />
          </Form.Item>
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[
              {
                required: true,
                message: "수정할 닉네임을 입력해주세요",
              },
            ]}
          >
            <Input placeholder={user.nickname} />
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
