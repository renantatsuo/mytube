type UserInfo = {
  email: string;
  name: string;
  photoUrl: string;
};

type AuthInfo = {
  token: string;
  userInfo: UserInfo;
};

type AuthCancelled = {
  cancelled: true;
};

type AuthFunction = (authStrategy: AuthStrategy) => void;

type AuthResources = AuthInfo & {
  signIn: AuthFunction;
  signOut: AuthFunction;
  isAuthenticated: boolean;
};
