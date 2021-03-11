import React from "react";
import styled from "@emotion/native";
import GoogleIcon from "#assets/google-icon.svg";
import { useAuth } from "#context/AuthContext";
import { View, Text, Button } from "react-native";
import { GoogleAuth } from "#lib/Auth";

export default function Main() {
  const { userInfo, isAuthenticated, signIn, signOut } = useAuth();

  if (isAuthenticated) {
    return (
      <View>
        <Text>{JSON.stringify(userInfo, null, 2)} </Text>
        <Button onPress={() => signOut(GoogleAuth)} title="Sign out" />
      </View>
    );
  }

  return (
    <LoginContainer>
      <LoginButton onPress={() => signIn(GoogleAuth)}>
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
