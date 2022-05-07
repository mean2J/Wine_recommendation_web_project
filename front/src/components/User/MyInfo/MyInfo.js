import { useState } from "react";

import { Card, Button } from "antd";
import styled from "styled-components";
import WithdrawalModal from "./WithdrawalModal";

const MyInfoContainer = styled(Card)`
  width: 642px;
  margin-left: 150px;
  margin-top: 40px;
  margin-bottom: 70px;

  background: #f8f9fa;
  border-radius: 15px;
  border: none;

  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    display: relative;
    margin-left: 57px;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    display: relative;
    margin-left: 1px;
    width: 100%;
  }
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
  font-size: 14px;
  color: gray;

  margin-left: 23px;
`;

const MyInfoButton = styled(Button)`
  font-weight: 400;
  font-size: 12px;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 15px;
`;

const ButtonsWrapper = styled.div`
  margin-left: 370px;

  @media screen and (max-width: 1024px) {
    display: relative;
    margin-left: 30px;
  }
  @media screen and (max-width: 768px) {
    display: relative;
    margin-top: 5px;
  }
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
        <ButtonsWrapper>
          <MyInfoButton
            style={{ color: "#c365fd" }}
            onClick={() => setIsEditing(true)}
          >
            프로필 수정
          </MyInfoButton>
          <MyInfoButton style={{ color: "red" }} onClick={showModal}>
            회원 탈퇴
          </MyInfoButton>
        </ButtonsWrapper>
        {isModal && (
          <WithdrawalModal isModal={isModal} setIsModal={setIsModal} />
        )}
      </MyInfoContainer>
    </>
  );
}

export default MyInfo;
