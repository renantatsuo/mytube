import { useAuth } from "#context/AuthContext";
import styled from "@emotion/native";
import React from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

export default function Main() {
  const { isAuthenticated, signIn, signOut } = useAuth();

  return (
    <AppWrapper>
      {isAuthenticated ? (
        <AuthenticatedApp signOut={signOut} />
      ) : (
        <UnauthenticatedApp signIn={signIn} />
      )}
    </AppWrapper>
  );
}

const AppWrapper = styled.View({
  flex: 1,
  backgroundColor: "#2c2836",
});
