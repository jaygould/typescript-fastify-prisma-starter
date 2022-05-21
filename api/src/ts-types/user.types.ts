export interface IUserName {
  firstName: string;
  lastName: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserTokens {
  token?: string;
  refreshToken?: string;
}

export type IUser = IUserName &
  IUserLogin &
  IUserTokens & {
    id: number;
  };

export type LoginActivity = "login" | "signup";
