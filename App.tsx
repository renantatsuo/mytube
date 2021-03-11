import React from "react";
import { AuthProvider } from "#context/AuthContext";
import Main from "#screens/Main";

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
