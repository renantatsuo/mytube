import { AuthProvider } from "#context/AuthContext";
import React, { ReactNode } from "react";

export default function AppProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
