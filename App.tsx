import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import GoogleIcon from "./assets/google-icon.svg";

export default function App() {
  return (
    <LoginContainer>
      <LoginButton onPress={() => ""}>
        <GoogleIcon height={30} width={40} />
        <ButtonText style={{ marginLeft: 10 }}>Sign in with Google</ButtonText>
      </LoginButton>
    </LoginContainer>
  );
}

const LoginContainer = styled.View({
  flex: 1,
  backgroundColor: "#fff",
  justifyContent: "center",
  paddingHorizontal: 30,
});

const LoginButton = styled.TouchableOpacity({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 15,
  shadowColor: "#000",
  shadowOffset: {
    width: 0.5,
    height: 2,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  backgroundColor: "#fff",
});

const ButtonText = styled.Text({
  fontWeight: "bold",
  color: "#666",
});
