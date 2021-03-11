export default interface AuthStrategy {
  signIn(): Promise<AuthCancelled | AuthInfo>;

  signOut(token: string): Promise<boolean>;
}
