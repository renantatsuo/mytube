import { useAsync } from "#hooks/useAsync";
import AuthStrategy from "#lib/Auth/AuthStrategy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";

const AUTH_STORAGE_KEY = "__auth_info__";

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

  const isAuthenticated = authState?.token && authState?.userInfo;

  React.useEffect(() => {
    if (authState === null) {
      AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
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

  async function signOut(auth: AuthStrategy) {
    if (authState) {
      await auth.signOut(authState.token);
      setAuthState(null);
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
