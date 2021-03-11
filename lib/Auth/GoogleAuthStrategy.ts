import * as Google from "expo-google-app-auth";
import AuthStrategy from "./AuthStrategy";

export class GoogleAuthStrategy implements AuthStrategy {
  private config = {
    iosClientId: process.env.YOUTUBE_OAUTH_IOS_APP_ID,
  };

  async signIn(): Promise<AuthCancelled | AuthInfo> {
    const response = await Google.logInAsync(this.config);

    if (response.type === "cancel") {
      return {
        cancelled: true,
      };
    }

    const { user, accessToken: token } = response;

    if (!user || !token) {
      throw new Error("Could not get User and/or Token from Google.");
    }

    return { token, userInfo: user as UserInfo };
  }

  async signOut(token: string): Promise<boolean> {
    try {
      await Google.logOutAsync({ ...this.config, accessToken: token });
      return true;
    } catch (e) {
      throw new Error(
        `An error has occurred when trying to sign out. ${e.message}`
      );
    }
  }
}
