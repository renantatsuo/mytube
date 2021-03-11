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
