import GoogleIcon from "#assets/google-icon.svg";
import MyTubeLogo from "#assets/mytube-logo.svg";
import MyTubeType from "#assets/mytube-type.svg";
import { GoogleAuth } from "#lib/Auth";
import styled from "@emotion/native";
import React from "react";

type UnauthenticatedAppProps = {
  signIn: AuthFunction;
};

export default function UnauthenticatedApp({
  signIn,
}: UnauthenticatedAppProps) {
  return (
    <LoginContainer>
      <LogoContainer>
        <MyTubeLogo height={120} width={120} />
        <MyTubeType height={120} width={170} />
      </LogoContainer>
      <LoginButton onPress={() => signIn(GoogleAuth)}>
        <GoogleIcon height={60} width={60} />
        <ButtonText style={{ marginLeft: 12 }}>Sign in with Google</ButtonText>
      </LoginButton>
    </LoginContainer>
  );
}

const LoginContainer = styled.View({
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 30,
});

const LoginButton = styled.TouchableOpacity({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#4285F4",
  borderRadius: 4,
});

const ButtonText = styled.Text({
  fontWeight: "bold",
  color: "#FFF",
});

const LogoContainer = styled.View({
  alignItems: "center",
  marginVertical: 30,
});
