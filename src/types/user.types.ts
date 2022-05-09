export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  authToken?: string;
  refreshToken?: string;
}
export interface ILoginBody {
  email: string;
  password: string;
}
export interface IRegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
