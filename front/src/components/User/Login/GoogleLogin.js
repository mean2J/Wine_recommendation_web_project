import React from "react";
import * as Api from "../../../api";
import GoogleLogin from "react-google-login";

function GoogleLoginButton() {
  const clientID = "1093874473034-hdtcj2u53ldea72k8m0vsd1q1cr2imng.apps.googleusercontent.com";

  const onSuccess = async (response) => {
    const { tokenId } = response;
    const googleResponse = await Api.post("auth/google/signin", { token: tokenId });

    console.log(googleResponse);
  }

  const onFailure = (error) => {
    console.log(error);
  }

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