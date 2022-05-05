import React, { useContext } from "react";
import * as Api from "../../../api";
import GoogleLogin from "react-google-login";
import { DispatchContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function GoogleLoginButton({ onOpen }) {
  const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const onSuccess = async (response) => {
    const { tokenId } = response;
    await Api.post("auth/google/signin", {
      token: tokenId,
    })
      .then((response) => {
        const user = response.data;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
        const jwtToken = user.user.token;
        // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
        sessionStorage.setItem("userToken", jwtToken.split(" ")[1]);
        navigate("/", { replace: true });
        modalClose(false);
        message.info("로그인이 완료되었습니다.");
      })
      .catch((err) => {
        message.info("로그인에 실패하였습니다.");
        console.log("로그인에 실패하였습니다.\n", err);
      });
  };

  const modalClose = (e) => {
    onOpen(e);
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientID}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleLoginButton;
