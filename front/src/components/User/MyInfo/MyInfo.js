import * as Api from "../../../api";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../../App";

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
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      await Api.del("users");
    }
    // sessionStorage 에 저장했던 JWT 토큰을 삭제
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로
    // navigate("/");
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
        <Button style={{ color: "red" }} onClick={handleDelete}>
          회원 탈퇴
        </Button>
      </MyInfoContainer>
    </>
  );
}

export default MyInfo;
