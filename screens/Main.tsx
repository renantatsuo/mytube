import GoogleIcon from "#assets/google-icon.svg";
import { useAuth } from "#context/AuthContext";
import { GoogleAuth } from "#lib/Auth";
import { YoutubeAPI } from "#lib/YoutubeAPI";
import styled from "@emotion/native";
import React from "react";
import { Button, ScrollView, Text, TextInput } from "react-native";

export default function Main() {
  const { userInfo, token, isAuthenticated, signIn, signOut } = useAuth();
  const [search, setSearch] = React.useState("");
  const [term, setTerm] = React.useState("Search");

  function termHandler(text: string) {
    setTerm(text);
  }

  function searchHandler(api: YoutubeAPI) {
    api.search(term).then(setSearch);
  }

  if (isAuthenticated) {
    const yAPI = new YoutubeAPI(token);

    return (
      <ScrollView>
        <Text>{search} </Text>
        <TextInput
          onChangeText={termHandler}
          returnKeyType="search"
          value={term}
          onSubmitEditing={() => searchHandler(yAPI)}
        />
        <Button onPress={() => signOut(GoogleAuth)} title="Sign out" />
      </ScrollView>
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
