import { useState } from "react";

import { Card, Button } from "antd";
import styled from "styled-components";
import WithdrawalModal from "./WithdrawalModal";

const MyInfoContainer = styled(Card)`
  width: 642px;
  height: 280px;
  left: 250px;
  top: 80px;

  background: #f8f9fa;
  border-radius: 15px;
  border: none;
`;

const Name = styled.div`
  font-size: 25px;
  line-height: 30px;
  font-weight: 500;

  margin-top: 28px;
  margin-bottom: 20px;
  margin-left: 23px;
`;

const Email = styled.div`
  font-size: 18px;
  line-height: 30px;
  font-weight: 400;

  margin-bottom: 5px;
  margin-left: 23px;
`;

const Description = styled.div`
  font-weight: 300;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);

  margin-left: 23px;
`;

const MyInfoButton = styled(Button)`
  top: 70px;
  left: 370px;
  font-weight: 400;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 15px;
`;

function MyInfo({ user, setIsEditing }) {
  // const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false); // 탈퇴 모달 열기/닫기
  const showModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <MyInfoContainer>
        <Name>{user?.name}</Name>
        <Email>{user?.email}</Email>
        <Description>{user?.description}</Description>
        <MyInfoButton onClick={() => setIsEditing(true)}>
          프로필 수정
        </MyInfoButton>
        <MyInfoButton style={{ color: "red" }} onClick={showModal}>
          회원 탈퇴
        </MyInfoButton>
        {isModal && (
          <WithdrawalModal isModal={isModal} setIsModal={setIsModal} />
        )}
      </MyInfoContainer>
    </>
  );
}

export default MyInfo;
