import { Card, Button } from "antd";

function MyInfo({ user, setIsEditing }) {
  return (
    <>
      <Card style={{ width: 300 }}>
        <div>이메일</div>
        <p>{user.email}</p>
        <div>닉네임</div>
        <p>{user.nickname}</p>
        <Button onClick={() => setIsEditing(true)}>수정하기</Button>
      </Card>
    </>
  );
}

export default MyInfo;
