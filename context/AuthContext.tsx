import { useAsync } from "#hooks/useAsync";
import AuthStrategy from "#lib/Auth/AuthStrategy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";

const AUTH_STORAGE_KEY = "__auth_info__";

type AuthResources = AuthInfo & {
  signIn: (AuthProvider: AuthStrategy) => void;
  signOut: (AuthProvider: AuthStrategy) => void;
  isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthResources | any>({});
AuthContext.displayName = "AuthContext";

async function loadUser() {
  const authState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

  if (authState) {
    return JSON.parse(authState);
  }

  return null;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: authState,
    setData: setAuthState,
    isPending,
    isIdle,
    execute,
  } = useAsync<AuthInfo>();

  const isAuthenticated = !!authState;

  React.useEffect(() => {
    if (authState) {
      AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    }
  }, [authState]);

  React.useEffect(() => {
    execute(loadUser());
  }, [execute]);

  async function signIn(auth: AuthStrategy) {
    const authInfo = await auth.signIn();
    setAuthState(authInfo);
  }

  async function signOut(authProvider: AuthStrategy) {
    if (authState) {
      await authProvider.signOut(authState.token);
      setAuthState(undefined);
    }
  }

  if (isPending || isIdle) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, ...authState }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthResources {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`Called useAuth() outside of an AuthContext.`);
  }

  return context;
}

export { useAuth, AuthProvider };
