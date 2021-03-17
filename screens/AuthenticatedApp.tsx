import MyTubeLogo from "#assets/mytube-logo.svg";
import SafeView from "#components/SafeView";
import Spinner from "#components/Spinner";
import YoutubeSnippet from "#components/YoutubeSnippet";
import { useYoutube } from "#hooks/useYoutube";
import { GoogleAuth } from "#lib/Auth";
import styled from "@emotion/native";
import React, { ReactNode } from "react";
import { Button, ScrollView } from "react-native";

type AuthenticatedAppProps = {
  signOut: AuthFunction;
};

export default function AuthenticatedApp({ signOut }: AuthenticatedAppProps) {
  const [term, setTerm] = React.useState("");
  const {
    search,
    searchContext: { videos, isPending },
  } = useYoutube();

  function searchHandler() {
    search(term);
  }

  return (
    <AppContainer>
      <Header>
        <MyTubeLogo height="48" width="48" />
        <SearchBox
          onChangeText={setTerm}
          returnKeyType="search"
          placeholder="Search"
          placeholderTextColor="#AC9CB4"
          value={term}
          onSubmitEditing={searchHandler}
        />
      </Header>
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        {isPending ? (
          <Spinner size={50} color="#AC9CB4" />
        ) : (
          videos.map((video) => <YoutubeSnippet key={video.id} video={video} />)
        )}
        <Button onPress={() => signOut(GoogleAuth)} title="Sign out" />
      </ScrollView>
    </AppContainer>
  );
}

function AppContainer({ children }: { children: ReactNode }) {
  return (
    <SafeView>
      {React.Children.map(children, (child) =>
        !React.isValidElement(child)
          ? child
          : React.cloneElement(child, {
              style: {
                padding: 10,
              },
            })
      )}
    </SafeView>
  );
}

const Header = styled.View({
  flexDirection: "row",
});

const SearchBox = styled.TextInput({
  flex: 1,
  borderRadius: 16,
  backgroundColor: "#1a091c",
  color: "#f8f8f2",
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginLeft: 10,
});
