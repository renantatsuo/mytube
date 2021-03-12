import { Button, ScrollView, Text, TextInput } from "react-native";
import React from "react";
import { YoutubeAPI } from "#lib/YoutubeAPI";
import { GoogleAuth } from "#lib/Auth";

type AuthenticatedAppProps = {
  signOut: AuthFunction;
  token: string;
};

export default function AuthenticatedApp({
  signOut,
  token,
}: AuthenticatedAppProps) {
  const [search, setSearch] = React.useState("");
  const [term, setTerm] = React.useState("Search");

  function termHandler(text: string) {
    setTerm(text);
  }

  function searchHandler(api: YoutubeAPI) {
    api.search(term).then(setSearch);
  }

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
