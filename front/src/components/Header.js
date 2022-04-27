/* import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserStateContext, DispatchContext } from '../App';
// import { Navbar } from 'react-bootstrap'; */
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: white;
  border-bottom: 1px solid #c4c4c4;
  z-index: 1;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
`;

const Logo = styled.p`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  min-height: 60px;
  background: linear-gradient(135deg, #F97794 0%, #623AA2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavItems = styled.p`
  justify-content: start;
  margin-left: 40px;
  font-size: 17px;
  font-weight: 400;
`;

const NavLoginItems = styled.p`
  margin-left: 20px;
  font-size: 17px;
  font-weight: 400;
`;

const NavLogin = styled.div`
  display: flex;
  justify-content: end;
  margin-left: auto;
`;

function Header() {
  /*   const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: 'LOGOUT' });
    // 기본 페이지로 돌아감.
    navigate('/'); */

  return (
    <>
      <Navbar>
        <NavContainer>
          <Logo>
            <Link to={`/`}>LOGO</Link>
          </Logo>
          <NavItems>
            <Link to={`/wine`}>와인 추천 받아보기🍷</Link>
          </NavItems>
          <NavItems>
            <Link to={`/community`}>커뮤니티 💬</Link>
          </NavItems>
          <NavLogin>
            <NavLoginItems>로그인</NavLoginItems>
          </NavLogin>
        </NavContainer>
      </Navbar>
    </>
  );
}

export default Header;
