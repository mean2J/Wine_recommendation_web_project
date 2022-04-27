import { Card, Button } from "antd";
import styled from "styled-components";

const MyInfoContainer = styled(Card)`
  width: 642px;
  height: 280px;

  background: #f8f9fa;
  border-radius: 15px;
  border: none;
`;

const Name = styled.div`
  font-size: 25px;
  line-height: 30px;
  font-weight: 500;
`;

const Email = styled.div`
  font-size: 18px;
  line-height: 30px;
  font-weight: 200;
`;

const Description = styled.div`
  font-weight: 200;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
`;

const MyInfoButton = styled(Button)`
  border-radius: 5px;
`;

function MyInfo({ user, setIsEditing }) {
  return (
    <>
      <MyInfoContainer>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
        <Description>{user.description}</Description>
        <MyInfoButton onClick={() => setIsEditing(true)}>
          프로필 수정
        </MyInfoButton>
        <Button>비밀번호 변경</Button>
        <Button style={{ color: "red" }}>회원 탈퇴</Button>
      </MyInfoContainer>
    </>
  );
}

export default MyInfo;
