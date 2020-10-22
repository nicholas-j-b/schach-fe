export class UserConfig {
  static readonly validUsername = /^[A-Za-z0-9_]+$/;
  static readonly usernameMinLength = 3;
  static readonly usernameMaxLength = 16;
  static readonly passwordMinLength = 8;
  static readonly passwordMaxLength = 20;
}
